"""
внутренние утилиты для midi-источников: receiver, emulator, parser

mido у нас опциональный (его может не быть в окружении - например, в
CI без midi-стека). _require_mido даёт человекочитаемую ошибку
вместо ImportError на старте модуля
"""

from __future__ import annotations

import queue
import time
from typing import Any, Dict, Union

try:
    import mido
except ModuleNotFoundError:
    mido = None

__all__ = [
    "MidiEvent",
    "MidiEventQueue",
    "_drain_queue",
    "_push_event",
    "_require_mido",
]


MidiEvent = Dict[str, Union[float, int]]
MidiEventQueue = "queue.Queue[MidiEvent]"


def _require_mido() -> Any:
    """Return the imported ``mido`` module or raise a helpful error."""
    if mido is None:
        raise RuntimeError(
            "mido не установлен. установи или положи в локальную .vendor"
        )
    return mido


def _drain_queue(events: queue.Queue) -> list[MidiEvent]:
    """Empty ``events`` non-blockingly and return everything we drained."""
    drained: list[MidiEvent] = []

    while True:
        try:
            drained.append(events.get_nowait())
        except queue.Empty:
            return drained


def _push_event(
    events: queue.Queue,
    pitch: int,
    timestamp: float | None = None,
) -> None:
    """Push ``{pitch, timestamp}`` onto ``events`` with overflow drop policy."""
    event: MidiEvent = {
        "pitch": int(pitch),
        "timestamp": float(time.time() if timestamp is None else timestamp),
    }

    try:
        events.put_nowait(event)
    except queue.Full:
        try:
            events.get_nowait()
        except queue.Empty:
            pass

        try:
            events.put_nowait(event)
        except queue.Full:
            pass
