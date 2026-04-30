# MusicTech — Real-Time Score Following

**Команда мастерской MusicTech, Центральный Университет (Т-Банк), 2026**

Репозиторий научной статьи на тему *real-time score following* с
HMM, OLTW и инновационным RL-модулем для предсказания темпа.
Цель — подача на конференцию **«Центральный Телеграф»** (17 мая 2026)
и в перспективе на **ISMIR 2026** (Abu Dhabi).

## Структура репозитория

```
musictech/
├── paper/                    ← ИСХОДНИКИ СТАТЬИ (LaTeX, шаблон ISMIR 2026)
│   ├── main.tex
│   ├── sections/             ← по одному файлу на раздел
│   ├── figures/tikz/         ← все диаграммы (только ЧБ)
│   ├── references.bib
│   └── README.md             ← инструкции по сборке + workflow
│
├── ScoreFollowing.pdf        ← методичка Никиты Н. (математический аппарат)
├── MusicTech (1).docx        ← официальное описание проекта от Т-Банка
├── musictech_text.txt        ← извлечённый текст из docx (для grep)
│
├── ismir-template-raw/       ← оригинальный ISMIR-шаблон (для справки)
│
├── .cursor/
│   ├── rules/                ← правила Cursor (контекст команды + стиль)
│   │   ├── project-context.mdc
│   │   ├── latex-paper-style.mdc
│   │   ├── tikz-figures.mdc
│   │   └── bibliography.mdc
│   └── skills/               ← скиллы Cursor (workflows)
│       ├── write-paper-section/
│       └── tikz-bw-figure/
│
├── .gitignore
└── README.md                 ← этот файл
```

## Кто за что отвечает

| Модуль                  | Раздел статьи                       | Ответственные                                  |
|-------------------------|-------------------------------------|------------------------------------------------|
| HMM                     | §3 Background, §7 RL, координация   | Никита Новицкий, Никита Борисов                |
| OLTW                    | §3 Background (subsec:oltw)         | TBD                                            |
| Realtime / входные данные | §5 Real-time Pipeline             | TBD                                            |
| Датасеты партитур       | §4 Datasets                         | TBD                                            |
| Выходной модуль         | §5 Real-time Pipeline (subsec:output)| TBD                                            |
| Корнер-кейсы            | §6 (subsec:corners)                 | TBD                                            |
| CNN для аудио           | §6 (subsec:cnn)                     | TBD                                            |

## План работы команды

Полный roadmap с этапами, контрольными точками и распределением
по модулям — в [`ROADMAP.md`](ROADMAP.md). Тематические подборки:

- [`docs/literature.md`](docs/literature.md) — статьи (10
  обязательных + 17 дополнительных) с прямыми ссылками для скачивания.
- [`docs/datasets.md`](docs/datasets.md) — открытые датасеты
  (MAESTRO, MAPS, MSMD, ASAP, Bach10, URMP, MusicNet, SMD,
  GiantMIDI-Piano, ATEPP) и собственный CU-Concerto-2026.
- [`docs/competitors.md`](docs/competitors.md) — Cadenza Live,
  MyPianist, Antescofo, Music Plus One и другие; что и как тестировать.
- [`docs/tools.md`](docs/tools.md) — Python-стек (librosa, music21,
  partitura, mido, sounddevice, FluidSynth, PyTorch, gymnasium,
  stable-baselines3) и опциональный JUCE-слой на C++.
- [`docs/hmm-extensions.md`](docs/hmm-extensions.md) — современные
  расширения HMM (HSMM, hierarchical HMM, CRF, Neural HMM,
  switching SSM, Bayesian HMM, transformer alignment).

## Дедлайны

- **5 мая** — все драфты разделов готовы (минимум по абзацу на subsec).
- **10 мая** — внутренний review, эксперименты RL запущены.
- **14 мая** — финальная вёрстка, все цифры в таблицах.
- **17 мая** — submission.

## Сборка статьи

См. `paper/README.md`. TL;DR:

```powershell
cd paper
.\build.ps1
```

или загрузить `paper/` в Overleaf.

## Использование Cursor

Все правила и скиллы лежат в `.cursor/`. При работе с файлами
автоматически подхватываются:

- `project-context.mdc` — всегда (дает контекст проекта).
- `latex-paper-style.mdc` — при редактировании `.tex` в `paper/`.
- `tikz-figures.mdc` — при редактировании TikZ-фигур.
- `bibliography.mdc` — при редактировании `references.bib`.

Скиллы можно вызывать явно:
- *«Напиши/доработай раздел X»* → активируется `write-paper-section`.
- *«Нарисуй фигуру для X»* → активируется `tikz-bw-figure`.
