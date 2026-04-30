# Конкуренты и аналоги

Список существующих систем «виртуального оркестра / умного
аккомпанемента». Для каждой указаны: что умеет, на каких
алгоритмах построена, чем мы планируем выделиться.

Цель раздела — сделать **таблицу сравнения** и подготовить
**§V Обзор существующих работ** в статье. Каждый член команды
должен **скачать или попробовать онлайн** хотя бы 2 продукта из
списка и заполнить таблицу `docs/competitors-test-results.md`.

---

## 1. Коммерческие приложения

### 1.1. Cadenza Live

- **Что:** мобильное и desktop приложение, оркестр следует за
  солистом в реальном времени.
- **Алгоритм:** проприетарный score-following, по слухам — гибрид
  HMM + neural net (закрыт).
- **Платформы:** macOS, iOS.
- **Цена:** подписка $9.99/мес.
- **Сайт:** [cadenzamusic.com](https://www.cadenzamusic.com).
- **Что попробовать:** установить на телефон, сыграть фрагмент
  концерта Моцарта, отметить: что ловит, что теряет, как ведёт
  себя при rubato.

### 1.2. MyPianist

- **Что:** виртуальный концертмейстер для соло-инструментов
  (скрипка, флейта, виолончель, фортепиано).
- **Алгоритм:** не раскрыт; вероятно DTW + heuristics.
- **Платформы:** iOS, Android.
- **Цена:** freemium + подписка.
- **Сайт:** [mypianistapp.com](https://mypianistapp.com).
- **Что попробовать:** проверить устойчивость к ошибкам
  (намеренно сыграть фальшивую ноту — посмотреть, как
  восстанавливается).

### 1.3. Tonara

- **Что:** интерактивные ноты с автоматическим переворотом
  страниц для учеников музыки.
- **Алгоритм:** DTW + ML для onset detection.
- **Платформы:** iOS.
- **Цена:** freemium.
- **Сайт:** [tonara.com](https://tonara.com).
- **Что попробовать:** оценить latency и качество перелистывания.

### 1.4. AnyPiano (Antescofo Mobile)

- **Что:** мобильный аккомпанемент от команды IRCAM.
- **Алгоритм:** Antescofo (см. ниже, академический) в обёртке
  для iOS.
- **Платформы:** iOS.
- **Сайт:** [anytune.com](https://anytune.com) или
  [antescofo.ircam.fr](http://repmus.ircam.fr/antescofo/home).

### 1.5. SmartMusic

- **Что:** обучающий софт для школ и колледжей с
  «следованием за исполнителем».
- **Алгоритм:** DTW + статистический анализ ошибок исполнения.
- **Платформы:** Web + iPad.
- **Цена:** подписка для школ.
- **Сайт:** [smartmusic.com](https://www.smartmusic.com).

### 1.6. Newzik

- **Что:** «умные ноты» с автопереворотом и подсветкой текущего
  такта.
- **Сайт:** [newzik.com](https://newzik.com).

### 1.7. Synchestra

- **Что:** «оркестр следует за вами», заявлено как
  пианистические концерты.
- **Сайт:** [synchestra.io](https://www.synchestra.io)
  (если открывается; продукт молодой).

---

## 2. Академические / исследовательские системы

### 2.1. Antescofo (IRCAM)

- **Что:** профессиональная система реал-тайм аккомпанемента,
  используется в концертной практике с 2007 года.
- **Алгоритм:** иерархическая HMM с явной моделью длительности
  (Cont 2010 — статья [7] в `docs/literature.md`).
- **Открытый код:** [github.com/Ircam-Antescofo](https://github.com/Ircam-Antescofo).
- **Документация:** [Antescofo на сайте IRCAM](http://repmus.ircam.fr/antescofo).
- **Что взять у себя:** реализация duration-augmented HMM как в
  Cont 2010.

### 2.2. Music Plus One (Christopher Raphael, Indiana University)

- **Что:** старейшая академическая система, 25+ лет разработки.
- **Алгоритм:** switching state-space модель.
- **Сайт:** [www.music.informatics.indiana.edu/papers](http://www.music.informatics.indiana.edu/papers/).
- **Демо-видео:** на YouTube ищется по «Music Plus One Raphael».
- **Что взять:** философия плавных переходов между моделями,
  сравнима с нашим подходом HMM↔OLTW.

### 2.3. Carol (CMU)

- **Что:** Cyber-Score-Follower из лаборатории Дэннеберга.
- **Открытый код:** [github.com/RBDannenberg/carol](https://github.com/RBDannenberg/carol)
  (если репо доступен).

### 2.4. CPJKU Score Following Suite

- **Что:** академический исследовательский стек от группы
  Видмера (JKU Linz), включает audio-sheet matching и нейросетевые
  трекеры.
- **Открытый код:** [github.com/CPJKU/cyolo_score_following](https://github.com/CPJKU/cyolo_score_following),
  [github.com/CPJKU/score_following_game](https://github.com/CPJKU/score_following_game).
- **Что взять:** есть готовые baseline’ы и среды для RL,
  можно брать как референс для нашего `src/rl/env.py`.

### 2.5. Antescofo demo для оркестра (Phenicx)

- **Что:** европейский проект 2013-2016, виртуальный концертный
  опыт.
- **Сайт:** [phenicx.upf.edu](http://phenicx.upf.edu).

---

## 3. Библиотеки / open-source основа

Из этих репозиториев можно взять готовые модули и не писать с нуля:

### 3.1. partitura

- **Что:** Python-библиотека для работы с MusicXML/MEI/MIDI,
  включает выравнивание performance ↔ score.
- **GitHub:** [github.com/CPJKU/partitura](https://github.com/CPJKU/partitura).
- **Что взять:** функции `partitura.musicalign.dtw_alignment` —
  готовая offline DTW для бенчмарков.

### 3.2. madmom

- **Что:** библиотека MIR с готовыми onset/beat-детекторами.
- **GitHub:** [github.com/CPJKU/madmom](https://github.com/CPJKU/madmom).
- **Что взять:** `madmom.features.onsets` для предобработки
  аудио + сравнение с собственным CNN-фронтендом.

### 3.3. librosa

- **Что:** базовая библиотека анализа аудио в Python.
- **Сайт:** [librosa.org](https://librosa.org/).
- **Что взять:** все спектральные признаки для CNN.

### 3.4. mir_eval

- **Что:** стандартные метрики MIR, включая alignment evaluation.
- **GitHub:** [github.com/craffel/mir_eval](https://github.com/craffel/mir_eval).
- **Что взять:** `mir_eval.alignment` для F1/MAE — единые с
  литературой формулы.

### 3.5. music21

- **Что:** старейший Python-toolkit для анализа партитур.
- **Сайт:** [web.mit.edu/music21](https://web.mit.edu/music21/).
- **Что взять:** парсинг MusicXML, конвертация в MIDI,
  музыкально-теоретический анализ.

### 3.6. Magenta (Google)

- **Что:** ML-стек для генерации музыки.
- **GitHub:** [github.com/magenta/magenta](https://github.com/magenta/magenta).
- **Что взять:** Onsets-and-Frames архитектура для
  CNN-фронтенда.

---

## 4. Видео и доклады для просмотра

- **Christopher Raphael, "Music Plus One"** —
  [TEDxBloomington 2014](https://www.youtube.com/watch?v=k9V2BR7ovw0).
- **Antescofo демо с IRCAM ContemporanyMusic Lab** —
  [youtube/Antescofo](https://www.youtube.com/results?search_query=antescofo+demo).
- **Christopher Raphael ICML 2010 keynote** —
  [video.ml.icml2010](http://videolectures.net/icml2010_raphael_mpomml/) (если
  страница доступна).
- **CPJKU группы Widmer на ISMIR/ICASSP** — индивидуальные
  доклады есть на YouTube под их именем.

---

## 5. Шаблон таблицы сравнения

Заполнить по результатам тестирования в
`docs/competitors-test-results.md`:

| Система       | Тип      | Платформа | Latency, мс | Робастность к ошибкам | Открытый код | Цена   |
|---------------|----------|-----------|-------------|------------------------|---------------|--------|
| Cadenza Live  | прод.    | macOS/iOS |             |                        | нет           | $9.99/мес |
| MyPianist     | прод.    | iOS/Android|            |                        | нет           | freemium |
| Tonara        | прод.    | iOS       |             |                        | нет           | freemium |
| Antescofo     | акад.    | Linux/macOS|            |                        | да            | бесплатно |
| Music Plus One| акад.    | Windows   |             |                        | частично      | бесплатно |
| Наш прототип  | акад.    | Win/Linux |             |                        | да (после статьи) | бесплатно |

---

## 6. Чем мы выделяемся

Из изученной картины мы планируем сделать акцент на
**трёх вещах, которых нет ни у одного конкурента**:

1. **Опережающее RL-предсказание темпа** — все известные системы
   реактивны (отрабатывают то, что уже произошло), у нас политика
   действует на горизонте 200–500 мс.
2. **Гибрид HMM+OLTW с явной моделью уверенности** — Antescofo
   и Music Plus One используют HMM, Cadenza/MyPianist скорее
   DTW; мы первыми объединяем оба механизма с понятной
   confidence-метрикой.
3. **Прозрачность и воспроизводимость** — после конференции
   выкладываем весь код и модели под лицензией MIT.

Эти три тезиса — сердцевина gap statement в §V.
