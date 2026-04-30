# MusicTech — Real-Time Score Following

**Команда мастерской MusicTech, Центральный Университет (Т-Банк), 2026**

Репозиторий научного проекта по *real-time score following*: HMM/OLTW-
бейзлайн + инновационный RL-модуль предсказания темпа для виртуального
оркестрового аккомпанемента. Цель — статья на конференцию
**«Центральный Телеграф»** (submission — **3 мая 2026**, доклад —
17 мая 2026), позже — англоязычная версия для **ISMIR 2026** (Abu Dhabi).

---

## Что где лежит

```
music-tech/
├── README.md                ← этот файл
├── ROADMAP.md               ← план команды и календарь до 17 мая
├── .gitignore
├── ScoreFollowing.pdf       ← методичка по DTW / OLTW / HMM
│
├── article/                 ← всё про статью
│   ├── README.md            ← описание папки + ссылки на разделы
│   ├── main.tex             ← главный LaTeX-файл (REVTeX 4-2)
│   ├── main.pdf             ← собранный PDF (открывается в GitHub)
│   ├── references.bib       ← библиография (BibTeX)
│   ├── mainNotes.bib        ← рабочие заметки и черновые ссылки
│   ├── build.ps1            ← сборка PDF одной командой
│   ├── ismir.sty            ← резервный ISMIR-шаблон
│   ├── IEEEtran.bst         ← BibTeX-стиль (для ISMIR-режима)
│   ├── cite.sty             ← пакет цитирования
│   ├── cc_by.{eps,pdf,png}  ← логотип лицензии (нужен ISMIR-LBD)
│   │
│   ├── sections/            ← все разделы статьи (12 .tex)
│   │   ├── 01-introduction.tex
│   │   ├── 02-related-work.tex
│   │   ├── 03-background.tex
│   │   ├── 04-datasets.tex
│   │   ├── 05-realtime-pipeline.tex
│   │   ├── 06-cnn-and-corner-cases.tex
│   │   ├── 07-rl-anticipation.tex          ← изюминка статьи (RL)
│   │   ├── 08-experiments.tex
│   │   ├── 09-conclusion.tex
│   │   ├── A-appendix-hmm.tex
│   │   ├── B-appendix-oltw.tex
│   │   └── C-appendix-rl.tex
│   │
│   ├── figures/
│   │   ├── example.png      ← пример вставки растрового изображения
│   │   └── tikz/            ← все ч/б TikZ-диаграммы (7 файлов)
│   │       ├── cnn_arch.tex
│   │       ├── demo_rubato_error.tex
│   │       ├── demo_tempo_latency.tex
│   │       ├── dtw_matrix.tex
│   │       ├── hmm_states.tex
│   │       ├── pipeline.tex
│   │       └── rl_agent.tex
│   │
│   └── docs/                ← подборки для команды (.md)
│       ├── literature.md         ← 27 ключевых статей со ссылками
│       ├── datasets.md           ← открытые датасеты + CU-Concerto-2026
│       ├── competitors.md        ← Cadenza Live, Antescofo и др.
│       ├── tools.md              ← Python-стек, FluidSynth, JUCE
│       └── hmm-extensions.md     ← современные расширения HMM
│
└── src/                     ← исследовательский код (Jupyter, скрипты)
    └── README.md            ← пояснение, что сюда класть
```

---

## Быстрая навигация

### Документы команды (markdown)

- [Roadmap и план работы](ROADMAP.md) — этапы, дедлайны, ответственные.
- [Содержимое папки со статьёй](article/README.md) — что там и как собирать.
- [Литература](article/docs/literature.md) — 27 ключевых статей со
  ссылками для скачивания.
- [Датасеты](article/docs/datasets.md) — MAESTRO, MAPS, MSMD, ASAP,
  Bach10, URMP, MusicNet, SMD, GiantMIDI, ATEPP + собственный
  CU-Concerto-2026.
- [Конкуренты и аналоги](article/docs/competitors.md) — Cadenza Live,
  MyPianist, Antescofo, Music Plus One и другие.
- [Стек инструментов](article/docs/tools.md) — Python-библиотеки,
  FluidSynth, JUCE и т.д.
- [Современные расширения HMM](article/docs/hmm-extensions.md) — HSMM,
  CRF, Neural HMM, switching SSM, transformer alignment.

### Сама статья

- [Свежий PDF статьи](article/main.pdf) — открывается прямо в GitHub.
- [LaTeX-исходники](article/) и [README по сборке](article/README.md).

---

## Кто за что отвечает

| Модуль                       | Раздел статьи           | Ответственные                   |
|------------------------------|-------------------------|---------------------------------|
| HMM (математика, Forward, Viterbi) | §VI Background, Прил. А | Никита Новицкий, Никита Борисов |
| OLTW                         | §VI Background, Прил. Б | TBD                             |
| Real-time / входные данные   | §VIII Real-time pipeline | TBD                             |
| Датасеты партитур            | §VII Datasets           | TBD                             |
| Выходной модуль              | §VIII Real-time (output) | TBD                             |
| Корнер-кейсы                 | §IX Corner cases        | TBD                             |
| CNN для аудио                | §IX CNN                 | TBD                             |
| RL-модуль (изюминка)         | §X RL Anticipation, Прил. В | Н. Новицкий + ML            |

Полное распределение и подробный план — в [ROADMAP.md](ROADMAP.md).

---

## Дедлайны

| Дата          | Событие                                                |
|---------------|--------------------------------------------------------|
| 30 апр. 2026  | Полный драфт всех разделов и приложений собран         |
| 1 мая 2026    | Финальная вычитка, проверка ссылок, формул, орфографии |
| 2 мая 2026    | Внутренний review ментора, последние правки            |
| **3 мая 2026** | **SUBMISSION статьи на «Центральный Телеграф»**       |
| 4–16 мая 2026 | Слайды, демо-видео прототипа, презентация              |
| 17 мая 2026   | Доклад на конференции                                  |
| Лето 2026     | Англоязычная версия и подача на ISMIR 2026             |

---

## Сборка PDF

```powershell
cd article
.\build.ps1
```

Подробности — в [article/README.md](article/README.md). Альтернативно:
загрузить папку `article/` в Overleaf.

---

## Кому первым делом что делать

1. **Прочитать** [ROADMAP.md](ROADMAP.md) (5 минут на содержание +
   30 минут на свой раздел).
2. Посмотреть свежий [PDF статьи](article/main.pdf) — это текущее
   состояние.
3. Открыть [`article/docs/literature.md`](article/docs/literature.md) и
   взять 2–3 статьи из своей зоны ответственности.
4. Скачать датасеты по списку в
   [`article/docs/datasets.md`](article/docs/datasets.md).
5. Поставить стек по [`article/docs/tools.md`](article/docs/tools.md).
6. Зайти в свой каталог в `src/` (Jupyter / эксперименты) и в
   `article/sections/` (свой раздел статьи) — и начать работу.
