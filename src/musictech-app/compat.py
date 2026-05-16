"""Compatibility shim. The real implementation lives in
:mod:`musictech.utils.compat`. This file is kept so legacy imports
(``from compat import compat_zip``) keep working.
"""

# используется в:
#   - interactive_tester
#   - legacy_cli.stress_test_hybrid
#   - smart_hand_splitter

from musictech.utils.compat import compat_zip

__all__ = ["compat_zip"]
