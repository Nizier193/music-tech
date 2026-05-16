"""
скрытая марковская модель (rabiner 1989) для трекинга партитуры

одно состояние на каждую ноту партитуры, эмиссии - гауссиана по pitch
в полутонах, переходы между состояниями три типа: stay / advance / skip.
веса переходов зависят от времени, проведённого в текущем state - это
даёт мягкое представление о длительности нот без честного hsmm

используется как обучающий пример и в cli main_legacy. в боевом стеке
работает hybrid (см. .hybrid), внутри которого hsmm + oltw
"""

# используется в:
#   - hmm_follower

from __future__ import annotations

import json
from pathlib import Path

import numpy as np

from ...utils.compat import compat_zip

__all__ = ["ScoreFollowerHMM"]


class ScoreFollowerHMM:
    """реалтайм-трекер партитуры с учётом длительности нот в forward-обновлении"""

    BASE_P_STAY = 0.3
    BASE_P_ADVANCE = 0.6
    BASE_P_SKIP = 0.1

    def __init__(self, score_json_path: str | Path, sigma: float = 2.0) -> None:
        """конструктор: грузит score.json и инициализирует alpha"""
        if sigma <= 0:
            raise ValueError("sigma должна быть положительной")

        score_path = Path(score_json_path)
        if score_path.suffix.lower() in {".mid", ".midi"}:
            raise ValueError(
                "ScoreFollowerHMM ожидает score.json, а не midi-файл. "
                "сконвертируй midi через `midi_to_score.py` и передай .json"
            )

        try:
            score_data = json.loads(score_path.read_text(encoding="utf-8"))
        except UnicodeDecodeError as exc:
            raise ValueError(
                f"не удалось прочитать score как utf-8 json: {score_path}. "
                "передай .json в формате партитуры проекта"
            ) from exc
        except json.JSONDecodeError as exc:
            raise ValueError(
                f"невалидный score json: {score_path}. "
                "ожидается объект с полем `notes` верхнего уровня"
            ) from exc
        notes = score_data.get("notes")

        if not isinstance(notes, list) or not notes:
            raise ValueError("score json должен содержать непустой список `notes`")

        self.score_path = score_path
        self.score_data = score_data
        self.N = len(notes)
        self.sigma = float(sigma)

        self.pitches = np.asarray(
            [float(note["pitch"]) for note in notes],
            dtype=np.float64,
        )
        self.nominal_durations = np.maximum(
            np.asarray(
                [float(note["nominal_duration"]) for note in notes],
                dtype=np.float64,
            ),
            1e-6,
        )

        self.alpha = np.zeros(self.N, dtype=np.float64)
        self.alpha[0] = 1.0

        self.current_index = 0
        self.current_state_started_at: float | None = None
        self.last_timestamp: float | None = None
        self.seen_event = False
        self.last_transition_probabilities = (
            self.BASE_P_STAY,
            self.BASE_P_ADVANCE,
            self.BASE_P_SKIP,
        )

        self._gaussian_norm = 1.0 / (self.sigma * np.sqrt(2.0 * np.pi))
        self._tiny = np.finfo(np.float64).tiny

    def process_event(self, event: dict) -> int:
        """обрабатывает одно midi-событие в реальном времени и возвращает индекс state"""
        pitch = float(event["pitch"])
        timestamp = float(event["timestamp"])

        if self.last_timestamp is not None and timestamp < self.last_timestamp:
            timestamp = self.last_timestamp

        if self.current_state_started_at is None:
            self.current_state_started_at = timestamp

        emission = self._emission_probabilities(pitch)

        if self.seen_event:
            elapsed = max(0.0, timestamp - self.current_state_started_at)
            expected = float(self.nominal_durations[self.current_index])
            transition_probabilities = self._transition_probabilities(elapsed, expected)
            prior = self._apply_banded_transition(self.alpha, transition_probabilities)
            self.last_transition_probabilities = transition_probabilities
        else:
            prior = self.alpha.copy()
            self.last_transition_probabilities = (1.0, 0.0, 0.0)

        new_alpha = prior * emission
        normalizer = float(new_alpha.sum())

        if not np.isfinite(normalizer) or normalizer <= 0.0:
            prior_sum = float(prior.sum())
            if not np.isfinite(prior_sum) or prior_sum <= 0.0:
                new_alpha = np.zeros_like(self.alpha)
                new_alpha[self.current_index] = 1.0
            else:
                new_alpha = prior / prior_sum
        else:
            new_alpha /= normalizer

        self.alpha = new_alpha

        predicted_index = int(np.argmax(self.alpha))
        if predicted_index != self.current_index:
            self.current_index = predicted_index
            self.current_state_started_at = timestamp

        self.last_timestamp = timestamp
        self.seen_event = True
        return predicted_index

    def _emission_probabilities(self, observed_pitch: float) -> np.ndarray:
        """считает b_i(o) - гауссова эмиссия для всех state одновременно"""
        deltas = (observed_pitch - self.pitches) / self.sigma
        emission = self._gaussian_norm * np.exp(-0.5 * np.square(deltas))
        return np.maximum(emission, self._tiny)

    def _transition_probabilities(
        self,
        elapsed_time: float,
        expected_duration: float,
    ) -> tuple[float, float, float]:
        """веса (stay, advance, skip) от соотношения elapsed / nominal_duration"""
        if elapsed_time > 1.5 * expected_duration:
            advance_probability = 0.95
        elif elapsed_time >= expected_duration:
            advance_probability = 0.8
        else:
            advance_probability = self.BASE_P_ADVANCE

        remaining_probability = max(0.0, 1.0 - advance_probability)
        base_remaining = self.BASE_P_STAY + self.BASE_P_SKIP

        stay_probability = remaining_probability * (self.BASE_P_STAY / base_remaining)
        skip_probability = remaining_probability * (self.BASE_P_SKIP / base_remaining)

        return stay_probability, advance_probability, skip_probability

    def _apply_banded_transition(
        self,
        alpha: np.ndarray,
        transition_probabilities: tuple[float, float, float],
    ) -> np.ndarray:
        """применяет 3-диагональную матрицу переходов к текущему alpha"""
        stay_probability, advance_probability, skip_probability = transition_probabilities
        prior = alpha * stay_probability

        if self.N > 1:
            prior[1:] += alpha[:-1] * advance_probability
            prior[-1] += alpha[-1] * (advance_probability + skip_probability)
            prior[-1] += alpha[-2] * skip_probability
        else:
            prior[0] += alpha[0] * (advance_probability + skip_probability)

        if self.N > 2:
            prior[2:] += alpha[:-2] * skip_probability

        return prior


def _demo(score_path: Path, midi_path: Path) -> None:  # pragma: no cover
    """диагностический прогон трекера: печатает таблицу с предсказаниями

    оставлен на уровне модуля чтобы старый блок `__main__` в hmm_follower.py
    продолжал работать после переезда пакета. `compat_zip` импортируется
    лениво - он нужен только для диагностического цикла
    """
    from ...cli.dataset_viewer import load_performance

    follower = ScoreFollowerHMM(score_path)
    performance = load_performance(midi_path)
    predictions = [follower.process_event(event) for event in performance]
    expected = list(range(follower.N))

    for event, predicted_index in compat_zip(performance, predictions, strict=True):
        score_pitch = int(follower.pitches[predicted_index])
        print(
            f"t={event['timestamp']:.3f}с pitch={int(event['pitch']):>3} "
            f"-> state={predicted_index:>2} score_pitch={score_pitch:>3}"
        )

    if predictions != expected:
        raise SystemExit("hmm-демо не сумел отследить ideal-сценарий")
    print("hmm-демо успешно прошёл ideal-сценарий от начала до конца")
