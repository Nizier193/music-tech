# MusicTech — paper sources (REVTeX 4-2 two-column edition)

Это исходники научной статьи команды **MusicTech / HMM** для подачи на
конференцию **«Центральный Телеграф»** (Центральный Университет /
Т-Банк). Дедлайн загрузки статьи — **3 мая 2026**, доклад на
конференции — 17 мая 2026.

## Формат вёрстки

Шаблон на **REVTeX 4-2** (`aps, pre, twocolumn, groupedaddress`) —
двухколоночный, в стиле журналов APS Physical Review.
Референс — `../пример/main.tex` (Meibohm et al., оптимальное
управление коллоидными частицами).

## Структура

```
paper/
├── main.tex                  # главный файл (REVTeX 4-2)
├── main_aip.tex.bak          # backup AIP-style single-column
├── main_ismir.tex.bak        # backup ISMIR 2-column 6-страничный
├── ismir.sty / cite.sty      # ISMIR style files (нужны для backup)
├── IEEEtran.bst              # IEEE стиль (используется в backup-ах)
├── references.bib            # общая библиография
├── build.ps1                 # быстрая сборка для Windows/PowerShell
├── sections/
│   ├── 01-introduction.tex          ← переведена на русский, REVTeX-style
│   ├── 02-related-work.tex          ← English drafts (await перевод)
│   ├── 03-background.tex            ← English drafts
│   ├── 04-datasets.tex              ← English drafts
│   ├── 05-realtime-pipeline.tex     ← English drafts
│   ├── 06-cnn-and-corner-cases.tex  ← English drafts
│   ├── 07-rl-anticipation.tex       ← English drafts
│   ├── 08-experiments.tex           ← English drafts
│   └── 09-conclusion.tex            ← English drafts
└── figures/
    ├── tikz/                 # все .tex с TikZ — ЧЁРНО-БЕЛЫЕ
    │   ├── pipeline.tex
    │   ├── cnn_arch.tex
    │   └── hmm_states.tex
    └── *.png / *.pdf         # растровые иллюстрации
```

## Бюджет страниц (REVTeX two-column)

| Раздел                          | Страниц | Кто пишет                  |
|---------------------------------|---------|-----------------------------|
| §1 Введение                     | 0.5–1   | Никита Н.                   |
| §2 Существующие подходы         | 1       | все по 2-3 ссылки от модуля |
| §3 Математика моделей           | 2–2.5   | HMM team                    |
| §4 Датасеты                     | 0.5–1   | Datasets team               |
| §5 Конвейер реального времени   | 1–1.5   | Realtime + Output           |
| §6 CNN + Corner cases           | 1       | CNN + Corner-cases          |
| §7 RL-предсказание темпа        | 1.5–2   | Никита Н. + RL              |
| §8 Эксперименты                 | 1–1.5   | все, HMM координирует       |
| §9 Заключение                   | 0.25–0.5| Никита Н.                   |
| References                      | 1–2     | все                         |
| **Итого**                       | **8–10**|                             |

В двухколоночной вёрстке 8–10 страниц это эквивалент ≈ 25–30 страниц
single-column текста — то есть полный объём академической статьи,
а не короткой conference paper.

## Жёсткие правила стиля

См. `.cursor/rules/paper-style.mdc`. Кратко:

- Разделы — через `\paragraph*{Название}\seclab{xxx}`, **без
  нумерации** (никаких «1. INTRODUCTION»).
- Никаких `enumerate` и `itemize` — перечисления плотным текстом.
- Минимум `\textbf` и `\textit` в body.
- Формулы — через `\begin{equation} ... \eqlab{name} \end{equation}`,
  всегда с номером справа.
- Cross-refs только через хелперы: `\Eqref{}`, `\Figref{}`,
  `\Secref{}`, `\Tabref{}`.

## Workflow

1. Каждый владелец редактирует **только свой** `sections/0X-*.tex`.
2. Все TODO-комментарии помечены `% TODO(<owner>): ...`.
3. Новые ссылки кидать в `references.bib`.
4. Графики — только TikZ, только ЧБ.
5. Не редактировать `main.tex` без согласования.

## Сборка

### Локально (TeX Live или MiKTeX, Windows)

```powershell
cd paper
.\build.ps1
```

### Вручную

```powershell
cd paper
pdflatex -interaction=nonstopmode main.tex
bibtex   main
pdflatex -interaction=nonstopmode main.tex
pdflatex -interaction=nonstopmode main.tex
```

### Overleaf

Залить весь `paper/` как новый проект, выбрать `main.tex` как root,
компилятор — `pdfLaTeX`.

## Восстановление backup-вариантов

Если потребуется вернуться к AIP single-column или ISMIR 2-column:

```powershell
# AIP single-column (как у Кудряшова):
Move-Item paper\main.tex paper\main_revtex.tex.bak
Move-Item paper\main_aip.tex.bak paper\main.tex

# ISMIR compact 6-страничный:
Move-Item paper\main.tex paper\main_revtex.tex.bak
Move-Item paper\main_ismir.tex.bak paper\main.tex
```

## Известные особенности REVTeX 4-2

- `\title`, `\author`, `\affiliation`, `\begin{abstract}` ОБЯЗАНЫ
  находиться **внутри** `\begin{document}`. Иначе компиляция падает
  с ошибкой `\collaboration@sw undefined`.
- Cyrillic-ударения вроде `ы́` ломают сборку — используем без
  ударения (`временные`, не `временны́е`).
- `\paragraph*{...}` заменяет `\section{...}`. Это именно тот
  inline run-in heading, который виден в примере.

## Языки

- По умолчанию документ — на **русском** (`\selectlanguage{russian}`).
- Английские технические термины (HMM, OLTW, score following, MIDI)
  не переводить.
- Для переключения на английский: заменить `\selectlanguage{russian}`
  на `\selectlanguage{english}` и перевести разделы (или сделать
  ветку `en`).
