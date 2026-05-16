"""
полифил для zip(strict=True) на старых python (< 3.10)
"""

# используется в:
#   - compat
#   - hmm_follower

from __future__ import annotations

from itertools import zip_longest

_ZIP_SENTINEL = object()


def compat_zip(*iterables, strict: bool = False):
    """замена для zip с опциональным strict (PEP 618).

    strict-вариант кидает ValueError если длины разные, как в python 3.10+
    """
    if not strict:
        return zip(*iterables)
    return _compat_zip_strict(*iterables)


def _compat_zip_strict(*iterables):
    for values in zip_longest(*iterables, fillvalue=_ZIP_SENTINEL):
        if any(value is _ZIP_SENTINEL for value in values):
            raise ValueError("zip() arguments have different lengths")
        yield values
