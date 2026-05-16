"""
печатает список midi output устройств доступных через pygame.midi

запускается перед interactive_tester чтобы знать какой id выбрать
"""

# используется в:
#   - list_midi

from __future__ import annotations

import os

__all__ = ["main"]


def main() -> int:
    os.environ.setdefault("PYGAME_HIDE_SUPPORT_PROMPT", "1")

    try:
        import pygame.midi
    except ModuleNotFoundError as exc:
        if exc.name == "pygame":
            print(
                "pygame is not installed. Install it into the local environment "
                "or fall back to MidiEmulator-only mode."
            )
        else:
            print(f"pygame.midi недоступен в этой сборке (отсутствует модуль: {exc.name}).")
        return 1

    pygame.midi.init()
    try:
        found = False
        count = pygame.midi.get_count()

        print("доступные midi-устройства вывода:")
        for device_id in range(count):
            interface, name, _is_input, is_output, _opened = pygame.midi.get_device_info(
                device_id
            )
            if not is_output:
                continue

            found = True
            device_name = name.decode("utf-8", errors="replace")
            interface_name = interface.decode("utf-8", errors="replace")
            print(f"ID {device_id}: {device_name} ({interface_name})")

        if not found:
            print("midi-устройства вывода не найдены")
    finally:
        pygame.midi.quit()

    return 0
