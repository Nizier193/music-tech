"""
plain-dataclass dto для слоя playback

отделены от musictech.core.dto: тот описывает контракт между слоями
(follower -> rl-агент -> evaluation), а здесь dto живут внутри одного
слоя (tempo tracker -> dispatcher -> orchestra player)
"""

# используется в:
#   - output_dispatcher

from __future__ import annotations

from dataclasses import dataclass
from typing import Callable

__all__ = ["DispatchCallback", "DispatchEvent", "TempoObservation"]


DispatchCallback = Callable[[int, float], None]


@dataclass(frozen=True)
class TempoObservation:
    """A single tempo measurement derived from two control points."""

    nominal_elapsed: float
    actual_elapsed: float
    raw_ratio: float


@dataclass(frozen=True)
class DispatchEvent:
    """One follower prediction queued for delivery to subscribers."""

    index: int
    timestamp: float
    tempo_update: bool = True
