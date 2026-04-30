# Датасеты партитур и исполнений

Полный список открытых и собираемых самостоятельно датасетов для
проекта MusicTech. Для каждого источника указаны прямая ссылка для
скачивания, размер, формат, лицензия и применимость в нашей задаче.

---

## 1. Открытые датасеты (внешние)

### 1.1. MAESTRO v3

- **Что:** ~200 часов фортепианной игры с MIDI-разметкой,
  записанной на Yamaha Disklavier во время Международного конкурса
  ePiano. Обновляется ежегодно.
- **Использование:** обучение и оценка CNN-эмиссии в аудио-режиме,
  оценка трекера на профессиональных исполнениях.
- **Размер:** ~120 GB (audio FLAC + MIDI).
- **Лицензия:** CC-BY-NC-SA 4.0 (некоммерческое исследование).
- **Скачать:** [magenta.tensorflow.org/datasets/maestro](https://magenta.tensorflow.org/datasets/maestro).
- **Документация:** [Hawthorne et al. ICLR 2019](https://arxiv.org/abs/1810.12247).

### 1.2. MAPS (MIDI Aligned Piano Sounds)

- **Что:** ~270 произведений фортепианной музыки, синтезированные
  и реально записанные на Disklavier, с покадровой MIDI-разметкой.
- **Использование:** тренировка CNN-фронтенда (классическая
  бенчмарк-выборка для polyphonic transcription).
- **Размер:** ~40 GB.
- **Лицензия:** только для исследования, регистрация по запросу.
- **Скачать:** [amubox.univ-amu.fr/index.php/s/iNG0xc5Td1Nv4rR](https://amubox.univ-amu.fr/index.php/s/iNG0xc5Td1Nv4rR).
- **Альтернативная ссылка:** [adasilva.github.io/2017-04-15/maps-dataset/](https://adasilva.github.io/2017-04-15/maps-dataset/).
- **Описание:** [Emiya, Bertin, David, Badeau, IEEE TASLP 2010](https://hal.inria.fr/inria-00544155).

### 1.3. MSMD (Multimodal Sheet Music Dataset)

- **Что:** ~497 произведений с попарным выравниванием аудио ↔
  изображения партитуры.
- **Использование:** проверка переноса CNN на симульное
  audio-sheet matching, baseline для сравнения с Henkel et al.
- **Размер:** ~5 GB.
- **Лицензия:** CC-BY 4.0.
- **Скачать:** [github.com/CPJKU/msmd](https://github.com/CPJKU/msmd).
- **Описание:** [Dorfer et al. TISMIR 2018](https://transactions.ismir.net/articles/10.5334/tismir.12/).

### 1.4. ASAP (Aligned Scores And Performances)

- **Что:** ~1067 выровненных performance + score, всё в MIDI с
  ground-truth выравниванием.
- **Использование:** идеальный train для нашего HMM —
  выравнивания уже сделаны, можно сразу строить функцию ошибки.
- **Размер:** ~250 MB.
- **Лицензия:** MIT.
- **Скачать:** [github.com/fosfrancesco/asap-dataset](https://github.com/fosfrancesco/asap-dataset).
- **Описание:** [Foscarin et al. ISMIR 2020](https://archives.ismir.net/ismir2020/paper/000003.pdf).

### 1.5. Bach10

- **Что:** 10 четырёхголосных хоралов Баха с разделёнными
  по партиям аудио и MIDI.
- **Использование:** проверка полифонической эмиссии CNN на
  чистом ансамблевом материале.
- **Размер:** ~200 MB.
- **Лицензия:** только для исследования.
- **Скачать:** [music.cs.northwestern.edu/data/Bach10.html](http://music.cs.northwestern.edu/data/Bach10.html).
- **Описание:** [Duan et al. IEEE TASLP 2010](https://duanduomusic.github.io/research/bach10).

### 1.6. URMP (University of Rochester Multi-Modal Music Performance)

- **Что:** 44 ансамблевых записи (струнные + духовые) с видео,
  отдельными аудио-дорожками и MIDI.
- **Использование:** тестирование расширения за рамки фортепиано.
- **Размер:** ~12 GB.
- **Лицензия:** CC-BY-NC-SA 4.0.
- **Скачать:** [www.cs.rochester.edu/~cxu22/d/vagan/](https://www.cs.rochester.edu/~cxu22/d/vagan/).

### 1.7. MusicNet

- **Что:** 330 свободно доступных классических записей с
  многоинструментальной разметкой нот по тактам.
- **Использование:** обучение CNN на оркестровом материале
  (вторая фаза проекта).
- **Размер:** ~12 GB.
- **Лицензия:** CC-BY 4.0.
- **Скачать:** [homes.cs.washington.edu/~thickstn/musicnet.html](https://homes.cs.washington.edu/~thickstn/musicnet.html).

### 1.8. Saarland Music Data (SMD)

- **Что:** ~50 фортепианных произведений с синхронизированным
  MIDI и аудио (запись на Yamaha N3).
- **Использование:** малый бенчмарк для отладки HMM.
- **Размер:** ~2 GB.
- **Лицензия:** только для исследования.
- **Скачать:** [www.audiolabs-erlangen.de/resources/MIR/SMD](https://www.audiolabs-erlangen.de/resources/MIR/SMD).

### 1.9. GiantMIDI-Piano

- **Что:** ~10 854 классических MIDI-файла, транскрибированных
  автоматически.
- **Использование:** большой источник симульных
  данных, для предобучения / нагенерации синтетического трека.
- **Размер:** ~5 GB MIDI.
- **Лицензия:** только для исследования (ByteDance).
- **Скачать:** [github.com/bytedance/GiantMIDI-Piano](https://github.com/bytedance/GiantMIDI-Piano).

### 1.10. ATEPP (Aligned Transcribed Expressive Piano Performances)

- **Что:** ~1000 экспрессивных исполнений в MIDI, транскрибированных
  из реальных записей; есть выравнивания с симульной партитурой.
- **Использование:** обучение «учительской» темповой траектории
  для behavioural cloning RL-агента.
- **Размер:** ~1 GB.
- **Лицензия:** CC-BY 4.0.
- **Скачать:** [github.com/BetsyTang/ATEPP](https://github.com/BetsyTang/ATEPP).
- **Описание:** [Zhang et al. ISMIR 2022](https://archives.ismir.net/ismir2022/paper/000041.pdf).

### 1.11. PerformanceMIDI / Vienna 4×22

- **Что:** 4 произведения, исполненные 22 пианистами в студии
  Yamaha Disklavier.
- **Использование:** изучение межисполнительской вариативности —
  пригодится для генерации синтетических возмущений RL-среды.
- **Скачать:** [www.cp.jku.at/datasets/pianoperf](https://www.cp.jku.at/datasets/pianoperf).

---

## 2. Партитурные источники (MusicXML / MIDI)

Помимо аудио-датасетов нужны ноты в символьном формате, чтобы
строить score-side нашего трекера.

### 2.1. IMSLP (Petrucci Library)

- **Что:** крупнейший открытый архив нот в Public Domain.
- **Использование:** взять PDF/MusicXML концертов Чайковского,
  Рахманинова, прелюдий Шопена и др.
- **Лицензия:** Public Domain в большинстве юрисдикций.
- **Сайт:** [imslp.org](https://imslp.org).
  - [Прелюдии Op. 28 Chopin](https://imslp.org/wiki/Préludes,_Op.28_(Chopin,_Frédéric))
  - [Концерт b-moll Tchaikovsky](https://imslp.org/wiki/Piano_Concerto_No.1,_Op.23_(Tchaikovsky,_Pyotr))
  - [Концерт c-moll Rachmaninoff](https://imslp.org/wiki/Piano_Concerto_No.2,_Op.18_(Rachmaninoff,_Sergei))

### 2.2. MuseScore.com

- **Что:** библиотека пользовательских нот, многие в MusicXML.
- **Использование:** альтернативный источник, удобно для
  редкого репертуара.
- **Лицензия:** разная, проверять каждое произведение.
- **Сайт:** [musescore.com](https://musescore.com).

### 2.3. OpenScore

- **Что:** полностью открытый, выверенный корпус классики.
- **Использование:** надёжные MusicXML без проблем с правами.
- **Сайт:** [openscore.cc](https://openscore.cc).

### 2.4. Mutopia Project

- **Что:** ноты в LilyPond + PDF.
- **Сайт:** [mutopiaproject.org](https://www.mutopiaproject.org).

---

## 3. Собственный датасет CU-Concerto-2026

Этот раздел — внутренний; не передаётся вовне без согласования.

### 3.1. Что собираем

- 4–6 пианистов-консерваторцев исполняют первые части концертов
  Чайковского b-moll и Рахманинова c-moll.
- 5–6 дублей на каждое произведение, всего ~12 запусков на
  пианиста, плюс камерные репетиции.
- Полная программа: ~42 часа MIDI + параллельная аудиозапись.

### 3.2. Оборудование

- Цифровое пианино **Yamaha CLP-735** (USB-MIDI, низкая задержка).
- Конденсаторный микрофон **AKG C414** (или **Rode NT1**)
  через интерфейс **Focusrite Scarlett 2i2**.
- Запись MIDI: `mido` или `python-rtmidi` с системными
  таймштампами.
- Запись аудио: `Audacity` или `REAPER`, формат 24-bit / 48 kHz WAV.

### 3.3. Разметка

- Границы тактов: автоматически по MIDI + ручная корректировка
  в [Sonic Visualiser](https://www.sonicvisualiser.org/).
- Ферматы, ритардандо, ачелерандо, повторы, пропуски, фальшивые
  ноты: вручную через текстовый аннотатор (см. `tools/annotator/`).
- Выравнивание performance ↔ score: `partitura.musicalign`
  + ручная вычитка.

### 3.4. Этика

- Каждый участник подписывает **информированное согласие**
  (`docs/consent_form.pdf`).
- Аудио хранится только локально на сервере университета.
- Опубликовать можно только производные признаки (MIDI с
  выравниванием, спектральные признаки), но не оригинальное аудио.

### 3.5. Структура каталога

```
data/cu-concerto-2026/
├── meta.csv                 ← список исполнений
├── consents/                ← подписанные согласия
├── tchaikovsky-b-minor/
│   ├── pianist-01-take-01/
│   │   ├── midi.mid
│   │   ├── audio.wav
│   │   ├── alignment.csv    ← (score_event_id, perf_time_ms)
│   │   └── annotations.json ← ферматы, ритардандо, ошибки
│   ├── pianist-01-take-02/
│   ...
├── rachmaninoff-c-minor/
│   ...
└── splits/
    ├── train.txt
    ├── val.txt
    └── test.txt
```

### 3.6. Разбиение

Делается **по уровню исполнителя**, чтобы исключить утечку:

- train: пианисты #1, #2, #3 — все произведения.
- val: пианист #4 — только Чайковский.
- test: пианисты #5, #6 — оба концерта.

---

## 4. Скачать всё разом

Скрипт-загрузчик в репо: `scripts/download_external_datasets.sh`.
Он скачивает MAESTRO, MSMD, ASAP, SMD и Bach10 в `data/external/`.
MAPS и URMP требуют ручной регистрации.

```bash
bash scripts/download_external_datasets.sh   # ~150 GB
```

После загрузки запустить `python scripts/build_splits.py`,
чтобы сформировать единый train/val/test для всех экспериментов.

---

## 5. Полезные сравнительные таблицы

### 5.1. Что использовать для какой задачи

| Цель                                  | Лучший датасет           |
|---------------------------------------|--------------------------|
| Обучение CNN-эмиссии (фортепиано)     | MAESTRO v3 + MAPS        |
| Обучение CNN-эмиссии (полифон. ансамбль)| Bach10 + URMP          |
| Готовое выравнивание для HMM-baseline | ASAP                     |
| Симульный audio-sheet matching        | MSMD                     |
| Большой синт. источник для предобучения| GiantMIDI-Piano         |
| Изучение межисполнительской вариативности | PianoPerf 4×22 + ATEPP |
| Свой репертуар (концерты)             | CU-Concerto-2026         |

### 5.2. Лицензии

- **CC-BY-NC-SA 4.0:** MAESTRO, URMP — нельзя использовать
  коммерчески без разрешения.
- **CC-BY 4.0:** MSMD, MusicNet, ATEPP — можно с указанием
  авторства.
- **MIT:** ASAP — самая свободная лицензия в подборке.
- **Только для исследования:** MAPS, Bach10, SMD,
  GiantMIDI-Piano — нельзя публиковать derived dataset без
  разрешения авторов.
- **Public Domain:** IMSLP, OpenScore.

При публикации статьи указать каждый используемый датасет в
разделе **Acknowledgments** и в `references.bib`.
