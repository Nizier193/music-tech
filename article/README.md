# article/ — материалы статьи

Здесь лежит **всё про статью**: LaTeX-исходники, собранный PDF,
библиография, ч/б TikZ-фигуры, разделы и приложения, плюс подборки
литературы / датасетов / инструментов в подпапке `docs/`.

Цель — submission на конференцию **«Центральный Телеграф»**
(Центральный Университет / Т-Банк). Дедлайн загрузки текста статьи —
**3 мая 2026**, доклад — 17 мая 2026.

---

## Что где лежит

```
article/
├── README.md              ← этот файл
├── main.tex               ← главный LaTeX (REVTeX 4-2 двухколоночный)
├── main.pdf               ← свежая собранная версия (открывается в GitHub)
├── references.bib         ← библиография (BibTeX)
├── build.ps1              ← сборка PDF одной командой
├── sections/              ← 9 разделов + 3 приложения
│   ├── 01-introduction.tex
│   ├── 02-related-work.tex
│   ├── 03-background.tex
│   ├── 04-datasets.tex
│   ├── 05-realtime-pipeline.tex
│   ├── 06-cnn-and-corner-cases.tex
│   ├── 07-rl-anticipation.tex      ← изюминка статьи (RL)
│   ├── 08-experiments.tex
│   ├── 09-conclusion.tex
│   ├── A-appendix-hmm.tex
│   ├── B-appendix-oltw.tex
│   └── C-appendix-rl.tex
├── figures/
│   └── tikz/              ← 7 ч/б TikZ-диаграмм (compile из main.tex)
└── docs/                  ← документация для команды
    ├── literature.md
    ├── datasets.md
    ├── competitors.md
    ├── tools.md
    └── hmm-extensions.md
```

---

## Документы команды

Подборки, по которым каждый член команды готовится к написанию своего
раздела:

- [`docs/literature.md`](docs/literature.md) — 10 обязательных + 17
  дополнительных статей со ссылками для скачивания и шаблоном
  одностраничной выжимки.
- [`docs/datasets.md`](docs/datasets.md) — все открытые датасеты
  (MAESTRO, MAPS, MSMD, ASAP, Bach10, URMP, MusicNet, SMD,
  GiantMIDI-Piano, ATEPP) + инструкция по сбору собственного
  CU-Concerto-2026.
- [`docs/competitors.md`](docs/competitors.md) — Cadenza Live, MyPianist,
  Antescofo, Music Plus One, SmartMusic, Tonara, Newzik и другие;
  что попробовать и в чём наше преимущество.
- [`docs/tools.md`](docs/tools.md) — Python-стек (librosa, music21,
  partitura, mido, sounddevice, FluidSynth, PyTorch, gymnasium,
  stable-baselines3) и опциональный JUCE-слой на C++.
- [`docs/hmm-extensions.md`](docs/hmm-extensions.md) — современные
  расширения HMM (HSMM, hierarchical HMM, CRF, Neural HMM,
  switching SSM, Bayesian HMM, transformer alignment).

---

## Сборка PDF

```powershell
cd article
.\build.ps1
```

Скрипт прогоняет `pdflatex` 3 раза + `bibtex` (стандартная
последовательность для REVTeX 4-2 с библиографией). Итог — `main.pdf`
рядом с `main.tex`.

Альтернатива: загрузить эту папку в [Overleaf](https://www.overleaf.com)
и выбрать `main.tex` в качестве главного файла.

---

## Стиль и формат

- Шаблон: **REVTeX 4-2** с опциями
  `aps, pre, twocolumn, superscriptaddress, longbibliography,
  nofootinbib, showkeys, amsmath, amssymb, floatfix`.
- Язык: русский (`\selectlanguage{russian}`), кодировка UTF-8 + T2A.
- Шрифт: Computer Modern для текста + Times-style для математики
  (`mathptmx` + `\rmdefault{cmr}`).
- Заголовки разделов: ALL CAPS BOLD по центру через макрос
  `\sect{Имя}{label}`.
- Подписи: `РИС. N.` / `ТАБЛ. N.`, без bold/italic.
- Все цитаты в формате `\cite{Key}` → `[1]`, `[2]`, … кликабельные
  в PDF-вьюере.
- Подробные правила вёрстки лежат в `.cursor/rules/paper-style.mdc` в
  родительском проекте.

---

## Workflow редактирования

1. Каждому разделу соответствует свой `sections/0X-...tex`.
2. Лид модуля редактирует только свой файл, не трогая остальные.
3. После каждого набора правок — `.\build.ps1` локально, затем
   `git add . && git commit -m "..." && git push`.
4. Периодически смотрим [`main.pdf`](main.pdf) на GitHub, чтобы
   видеть текущее состояние всем сразу.

---

## Распределение разделов

См. таблицу в [корневом README](../README.md#кто-за-что-отвечает) и
полный план в [ROADMAP.md](../ROADMAP.md).
