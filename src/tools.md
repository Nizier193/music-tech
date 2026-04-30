# Инструменты и стек разработки

Все библиотеки, фреймворки, синтезаторы и DAW, которые
понадобятся команде. Разделено по этапам и зонам ответственности.

---

## 1. Базовая среда

- **Python 3.11** (через [miniconda](https://docs.conda.io/projects/miniconda/en/latest/) или
  [uv](https://github.com/astral-sh/uv)).
- **Git + GitHub** для совместной работы.
- **VS Code** или **Cursor** с расширениями: Python, Pylance,
  Jupyter, GitLens.
- **Pre-commit hooks**: `black`, `isort`, `flake8`,
  `mypy --strict` (опционально).
- **pytest** + **pytest-cov** для тестов.
- **Docker** (для воспроизводимых экспериментов): образ
  `musictech/dev:latest` на базе
  [pytorch/pytorch:2.3.0-cuda12.1-cudnn8-runtime](https://hub.docker.com/r/pytorch/pytorch).

Базовый `requirements.txt` (минимальный):

```
numpy>=1.26
scipy>=1.11
matplotlib>=3.8
pandas>=2.1
pytest>=7.4
black>=23.12
flake8>=6.1
```

---

## 2. Работа с MIDI и партитурами

- **mido** — низкоуровневая работа с MIDI-файлами и потоками
  ([mido.readthedocs.io](https://mido.readthedocs.io/)).
- **pretty_midi** — высокоуровневый интерфейс к MIDI
  ([github.com/craffel/pretty-midi](https://github.com/craffel/pretty-midi)).
- **python-rtmidi** — real-time приём событий из MIDI-устройств
  ([spotlightkid.github.io/python-rtmidi](https://spotlightkid.github.io/python-rtmidi/)).
- **music21** — парсинг и анализ MusicXML
  ([web.mit.edu/music21](https://web.mit.edu/music21/)).
- **partitura** — единое API для MusicXML, MIDI, MEI; включает
  готовый DTW-выравниватель
  ([github.com/CPJKU/partitura](https://github.com/CPJKU/partitura)).

Команда: `pip install mido pretty_midi python-rtmidi music21 partitura`.

---

## 3. Работа с аудио

- **librosa** — спектрограммы, признаки, ресемплирование
  ([librosa.org](https://librosa.org/)).
- **soundfile** — чтение/запись WAV/FLAC через libsndfile
  ([github.com/bastibe/python-soundfile](https://github.com/bastibe/python-soundfile)).
- **sounddevice** — real-time захват и воспроизведение через
  PortAudio ([python-sounddevice.readthedocs.io](https://python-sounddevice.readthedocs.io/)).
- **pyaudio** — альтернатива sounddevice для Windows.
- **madmom** — onset/beat detection
  ([github.com/CPJKU/madmom](https://github.com/CPJKU/madmom)).
- **essentia** — расширенный MIR-стек (C++ ядро + Python биндинги)
  ([essentia.upf.edu](https://essentia.upf.edu/)).

Команда: `pip install librosa soundfile sounddevice madmom`.

---

## 4. Машинное обучение

### CNN-фронтенд и эмиссия

- **PyTorch 2.3** + **torchaudio**
  ([pytorch.org](https://pytorch.org/get-started/locally/)).
- **lightning** или чистый PyTorch — на выбор лида CNN-команды.
- **torchmetrics** для F1/precision/recall.
- Готовые архитектуры: Magenta Onsets-and-Frames
  ([magenta GitHub](https://github.com/magenta/magenta/tree/main/magenta/models/onsets_frames_transcription)).

### RL

- **gymnasium** — стандарт RL-сред (преемник OpenAI Gym)
  ([gymnasium.farama.org](https://gymnasium.farama.org/)).
- **stable-baselines3** — готовый PPO/SAC/A2C
  ([stable-baselines3.readthedocs.io](https://stable-baselines3.readthedocs.io/)).
- **wandb** или **tensorboard** для логов экспериментов.
- **hydra** для управления конфигами
  ([hydra.cc](https://hydra.cc/)).

### Утилиты ML

- **scikit-learn** для baseline-классификаторов и метрик.
- **mir_eval** для стандартных MIR-метрик
  ([github.com/craffel/mir_eval](https://github.com/craffel/mir_eval)).
- **numba** или **cython** для ускорения горячих циклов
  (Forward-рекурсия HMM).

Команда:

```
pip install torch torchaudio torchmetrics gymnasium stable-baselines3
pip install wandb tensorboard hydra-core mir_eval scikit-learn numba
```

---

## 5. Синтез и воспроизведение оркестра

### 5.1. Свободные

- **FluidSynth** (C++) + **pyfluidsynth** (Python обёртка)
  ([github.com/nwhitehead/pyfluidsynth](https://github.com/nwhitehead/pyfluidsynth)).
  Воспроизведение SoundFont’ов (`.sf2`).
- **SoundFonts** для оркестра:
  - [GeneralUser GS](https://www.schristiancollins.com/generaluser.php) — общий, маленький, бесплатный.
  - [Sonatina Symphonic Orchestra](https://github.com/peastman/sso) — open-source оркестр.
  - [Virtual Playing Orchestra (VPO)](http://virtualplaying.com/virtual-playing-orchestra/) — свободный оркестр для FluidSynth.
- **timidity++** — альтернативный MIDI-синтезатор.

### 5.2. Платные / профессиональные (для будущей продуктовой версии)

- [Spitfire BBC Symphony Orchestra Discover](https://www.spitfireaudio.com/shop/a-z/bbc-symphony-orchestra-discover/) — бесплатный starter.
- [Vienna Symphonic Library (VSL)](https://www.vsl.co.at) — индустриальный стандарт.
- [Native Instruments Symphony Series](https://www.native-instruments.com/en/products/komplete/cinematic/symphony-series-collection/).

### 5.3. Time-stretching

- **pyrubberband** — обёртка над библиотекой `rubberband`
  ([github.com/bmcfee/pyrubberband](https://github.com/bmcfee/pyrubberband)).
- **librosa.effects.time_stretch** — фазовый вокодер,
  достаточно для прототипа.

---

## 6. DAW и средства разметки

- **REAPER** — лёгкий, кросс-платформенный DAW, скрипты на Lua/Python
  ([reaper.fm](https://www.reaper.fm/)).
- **Ardour** — open-source DAW
  ([ardour.org](https://ardour.org/)).
- **Audacity** — для базовой записи и проверки аудио
  ([audacityteam.org](https://www.audacityteam.org/)).
- **Sonic Visualiser** — анализ и аннотирование аудио, идеально для
  ручной разметки CU-Concerto-2026
  ([sonicvisualiser.org](https://www.sonicvisualiser.org/)).
- **MuseScore** — нотный редактор, импорт/экспорт MusicXML
  ([musescore.org](https://musescore.org/)).

---

## 7. Real-time C++ слой (опционально, для production)

Если решим делать production-grade приложение, основа — JUCE.

- **JUCE** — C++ фреймворк для аудио-приложений
  ([juce.com](https://juce.com/)).
- **JUCE Audio Plugin Host** — для тестирования.
- **RtAudio / RtMidi** — низкоуровневые C++ библиотеки.
- **CMake** + **Conan** для сборки.

JUCE даёт:

- задержку 1–3 мс на ASIO/WASAPI;
- одинаковый код на Windows/macOS/Linux;
- возможность собрать VST/AU плагин (для интеграции в любой DAW).

---

## 8. UI/UX (для будущего MVP)

- **PyQt6** или **PySide6** для desktop UI на Python.
- **customtkinter** — современный tkinter с тёмной темой.
- **Electron + React** — кроссплатформенный desktop UI.
- **Flutter** — для мобильной версии (если развивать
  пользовательский продукт).

---

## 9. Воспроизводимость экспериментов

- **DVC** ([dvc.org](https://dvc.org/)) — версионирование больших
  файлов (датасеты, чекпойнты).
- **MLflow** или **wandb** — трекинг экспериментов.
- **Hydra** — управление конфигурациями.
- **Snakemake** или **Makefile** — воспроизводимый pipeline
  обучения.

---

## 10. Документация и совместная работа

- **Markdown** + **MkDocs** или **docusaurus** — внутренний сайт
  документации.
- **Notion** или **Confluence** — для общих заметок и встреч.
- **draw.io / excalidraw.com** — диаграммы.
- **Overleaf** — резервный вариант для совместного редактирования
  LaTeX (но основной — этот репо в Cursor).

---

## 11. Структура репо `musictech-prototype` (рекомендуемая)

```
musictech-prototype/
├── src/
│   ├── tracker/
│   │   ├── hmm/
│   │   ├── oltw/
│   │   ├── cnn/
│   │   ├── corners/
│   │   └── tracker.py            ← общий API
│   ├── rl/
│   │   ├── env.py
│   │   ├── policy.py
│   │   ├── train_bc.py
│   │   └── train_ppo.py
│   ├── io/
│   │   ├── midi_input.py
│   │   ├── audio_input.py
│   │   └── cleaner.py
│   ├── renderer/
│   │   ├── fluidsynth_backend.py
│   │   └── time_stretch.py
│   ├── data/
│   │   ├── dataset_loader.py
│   │   └── synthetic_chopin.py
│   └── app.py                    ← end-to-end запуск
├── data/
│   ├── external/                 ← скачанные открытые датасеты
│   ├── synthetic/
│   └── cu-concerto-2026/         ← внутренний, не в git
├── experiments/
│   ├── baseline_hmm/
│   ├── cnn_emission/
│   ├── rl_anticipation/
│   └── final_results.csv
├── tests/                        ← unit-тесты
├── notebooks/                    ← Jupyter для exploratory analysis
├── scripts/
│   ├── download_external_datasets.sh
│   └── build_splits.py
├── docs/                         ← MkDocs-сайт документации
├── pyproject.toml
├── Dockerfile
└── README.md
```

---

## 12. Шаги поднятия среды

```bash
# 1. Клонирование
git clone https://github.com/musictech-cu/prototype
cd prototype

# 2. Установка uv (быстрая альтернатива pip)
curl -LsSf https://astral.sh/uv/install.sh | sh   # Linux/macOS
# Windows:
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# 3. Виртуальное окружение
uv venv && source .venv/bin/activate    # Linux/macOS
uv venv && .\.venv\Scripts\Activate.ps1 # Windows

# 4. Установка зависимостей
uv pip install -r requirements.txt

# 5. Smoke test
python -c "import torch, librosa, music21, mido; print('OK')"

# 6. (опционально) Docker
docker build -t musictech/dev:latest .
docker run -it --gpus all -v $PWD:/workspace musictech/dev:latest
```
