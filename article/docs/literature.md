# Литература

Подборка статей и книг для команды MusicTech. Разделена на три
блока: **обязательное чтение** (10 статей, без которых невозможно
писать §VI/§X), **дополнительное чтение** (расширяет контекст) и
**RL для музыки** (узкая, но критическая для нашей изюминки тема).

Если ссылка ведёт на платную статью, есть три варианта получить
PDF:

1. Через университетский прокси Центрального Университета /
   ВШЭ (большинство IEEE и Springer открываются).
2. На [arXiv.org](https://arxiv.org/) — почти все ML-статьи
   выкладывают препринт.
3. Через [Google Scholar](https://scholar.google.com) → кнопка
   «PDF» справа от названия.

---

## 1. Обязательное чтение (10 статей)

Каждый член команды читает свои 2–3 статьи и пишет одностраничную
выжимку в подпапке `literature-summaries/` (рядом с этим файлом).

### 1.1. Классические работы по score-following

#### [1] Dannenberg, R. B. (1984). *An On-Line Algorithm for Real-Time Accompaniment.*

- **Конференция:** ICMC 1984, pp. 193–198.
- **Кому читать:** OLTW + HMM teams, real-time team.
- **Зачем:** первая работа по теме, обязательная историческая ссылка.
- **PDF:** [Carnegie Mellon mirror](https://www.cs.cmu.edu/~rbd/bib-accomp.html).

#### [2] Vercoe, B. (1984). *The Synthetic Performer in the Context of Live Performance.*

- **Конференция:** ICMC 1984, pp. 199–200.
- **Кому читать:** real-time team.
- **Зачем:** параллельная независимая разработка, базовая ссылка.
- **PDF:** [MIT Media Lab archive](http://mitpress.mit.edu/sites/default/files/titles/content/9780262570954_sch_0001.pdf).

#### [3] Sakoe, H., & Chiba, S. (1978). *Dynamic Programming Algorithm Optimization for Spoken Word Recognition.*

- **Журнал:** IEEE Trans. Acoust., Speech, Signal Process., 26(1), 43–49.
- **Кому читать:** OLTW team.
- **Зачем:** оригинал DTW, источник идеи Sakoe-Chiba band.
- **DOI:** [10.1109/TASSP.1978.1163055](https://doi.org/10.1109/TASSP.1978.1163055).

#### [4] Rabiner, L. R. (1989). *A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition.*

- **Журнал:** Proceedings of the IEEE, 77(2), 257–286.
- **Кому читать:** HMM team (обязательно, наизусть).
- **Зачем:** базовый учебник HMM, источник всех формул Forward/Viterbi.
- **PDF:** [open mirror](https://www.cs.ubc.ca/~murphyk/Bayes/rabiner.pdf).

#### [5] Dixon, S. (2005). *Live Tracking of Musical Performances Using On-Line Time Warping.*

- **Конференция:** DAFx 2005, pp. 92–97.
- **Кому читать:** OLTW team.
- **Зачем:** первая чёткая формулировка OLTW, RunCount.
- **PDF:** [QMUL mirror](http://www.eecs.qmul.ac.uk/~simond/pub/2005/dafx05.pdf).

### 1.2. Современные HMM-следователи

#### [6] Orio, N., & Déchelle, F. (2001). *Score Following Using Spectral Analysis and Hidden Markov Models.*

- **Конференция:** ICMC 2001, pp. 151–154.
- **Кому читать:** HMM team, CNN team.
- **Зачем:** первая HMM-схема для аудио, источник эмиссионной модели.
- **PDF:** через [IRCAM HAL archive](https://hal.archives-ouvertes.fr/hal-01161443).

#### [7] Cont, A. (2010). *A Coupled Duration-Focused Architecture for Real-Time Music-to-Score Alignment.*

- **Журнал:** IEEE TPAMI, 32(6), 974–987.
- **Кому читать:** HMM team, RL team.
- **Зачем:** иерархическая HMM с явной моделью длительности — лучшая
  готовая основа для нашего duration-augmented HMM.
- **DOI:** [10.1109/TPAMI.2009.106](https://doi.org/10.1109/TPAMI.2009.106).
- **Связан с системой Antescofo** (см. [`competitors.md`](competitors.md)).

#### [8] Nakamura, E., Yoshii, K., & Sagayama, S. (2015). *Real-Time Audio-to-Score Alignment of Music Performances Containing Errors and Arbitrary Repeats and Skips.*

- **Журнал:** IEEE/ACM TASLP, 23(11), 1911–1925.
- **Кому читать:** HMM team, corner-cases team.
- **Зачем:** прямая ссылка для §IX о пропусках/повторах.
- **DOI:** [10.1109/TASLP.2015.2436577](https://doi.org/10.1109/TASLP.2015.2436577).
- **arXiv:** [1503.07313](https://arxiv.org/abs/1503.07313).

#### [9] Arzt, A. (2016). *Flexible and Robust Music Tracking.* PhD thesis, JKU Linz.

- **Кому читать:** все.
- **Зачем:** энциклопедия современного score-following, источник
  бесчисленных идей по DTW + HMM + neural.
- **PDF:** [JKU IR](https://www.jku.at/fileadmin/gruppen/173/Research/arzt_phd.pdf).

#### [10] Henkel, F., & Widmer, G. (2021). *Real-Time Music Following in Score Sheet Images via Multi-Resolution Prediction.*

- **Журнал:** Frontiers in Computer Science / arXiv:2110.03408.
- **Кому читать:** CNN team, real-time team.
- **Зачем:** state-of-the-art нейросетевой трекер на изображениях
  партитур.
- **arXiv:** [2110.03408](https://arxiv.org/abs/2110.03408).
- **Код:** [github.com/CPJKU/cyolo_score_following](https://github.com/CPJKU/cyolo_score_following).

---

## 2. Дополнительное чтение

### Учебники и обзоры

#### [11] Müller, M. (2007). *Information Retrieval for Music and Motion.* Springer.

- Глава 4 — DTW, глава 5 — выравнивание музыки. Купить или
  посмотреть PDF в [SpringerLink](https://doi.org/10.1007/978-3-540-74048-3).

#### [12] Müller, M. (2015). *Fundamentals of Music Processing.* Springer (2-е изд. 2021).

- Энциклопедия MIR-методов. Глава 3.2 — DTW, глава 5 — выравнивание.
- [Open companion](https://www.audiolabs-erlangen.de/resources/MIR/FMP/) с Jupyter-ноутбуками
  (FMP Notebooks) — обязательно к ознакомлению команде.

#### [13] Raphael, C. (2010). *Music Plus One and Machine Learning.*

- ICML 2010, pp. 21–28.
- Switching state-space модели для аккомпанемента.
- [PDF](https://www.music.informatics.indiana.edu/papers/icml10/).

#### [14] Dorfer, M., Hajič jr., J., Arzt, A., Frostel, H., & Widmer, G. (2018).
*Learning Audio–Sheet Music Correspondences for Cross-Modal Retrieval and Piece Identification.*

- TISMIR 1(1), 22–33.
- Применение CNN для сопоставления аудио и нотного изображения.
- [DOI](https://doi.org/10.5334/tismir.12), код:
  [github.com/CPJKU/audio_sheet_retrieval](https://github.com/CPJKU/audio_sheet_retrieval).

### Полезное по аудио и обработке сигналов

#### [15] Brazier, A., & Widmer, G. (2020). *Towards Reliable Real-Time Score Following.*

- ISMIR 2020 LBD.
- Анализ failure modes современных трекеров.
- [arXiv 2009.07383](https://arxiv.org/abs/2009.07383).

#### [16] Maezawa, A. (2019). *Music Alignment Using Deep Symbolic and Spectral Representations.*

- ISMIR 2019.
- Гибрид symbolic + spectral признаков, прямой пример для нашей
  CNN-эмиссии.
- [PDF](http://archives.ismir.net/ismir2019/paper/000020.pdf).

#### [17] Hawthorne, C., et al. (2018). *Onsets and Frames: Dual-Objective Piano Transcription.*

- ISMIR 2018.
- Базовая архитектура CNN+RNN для распознавания нот, на которой
  сидит большая часть последующих работ. Помогает спроектировать
  наш `src/tracker/cnn/`.
- [arXiv 1710.11153](https://arxiv.org/abs/1710.11153).
- [Код Magenta](https://github.com/magenta/magenta/tree/main/magenta/models/onsets_frames_transcription).

#### [18] Hawthorne, C., et al. (2019). *Enabling Factorized Piano Music Modeling and Generation with the MAESTRO Dataset.*

- ICLR 2019.
- Описание датасета MAESTRO, который мы используем.
- [arXiv 1810.12247](https://arxiv.org/abs/1810.12247).

---

## 3. RL для музыки и общий RL-аппарат

### Обязательная RL-классика

#### [19] Sutton, R. S., & Barto, A. G. (2018). *Reinforcement Learning: An Introduction* (2nd ed.). MIT Press.

- Главы 3 (MDP), 4 (DP), 13 (policy gradient), 17 (frontiers).
- Бесплатный [PDF](http://incompleteideas.net/book/the-book-2nd.html).

#### [20] Schulman, J., et al. (2017). *Proximal Policy Optimization Algorithms.*

- arXiv:1707.06347.
- Алгоритм, который мы используем во второй стадии обучения.
- [arXiv](https://arxiv.org/abs/1707.06347).

#### [21] Schulman, J., et al. (2016). *High-Dimensional Continuous Control Using Generalized Advantage Estimation.* (GAE)

- ICLR 2016.
- λ_GAE = 0.95 в нашей конфигурации — отсюда.
- [arXiv 1506.02438](https://arxiv.org/abs/1506.02438).

#### [22] Christiano, P., et al. (2017). *Deep Reinforcement Learning from Human Preferences.*

- NeurIPS 2017.
- Будущая работа: preference learning от музыкантов.
- [arXiv 1706.03741](https://arxiv.org/abs/1706.03741).

#### [23] Kaelbling, L. P., Littman, M. L., & Cassandra, A. R. (1998). *Planning and Acting in Partially Observable Stochastic Domains.*

- Artificial Intelligence, 101(1–2), 99–134.
- POMDP-формализм, для будущей работы по belief-state.
- [DOI](https://doi.org/10.1016/S0004-3702(98)00023-X).

### RL применительно к музыке (мало, но есть)

#### [24] Jaques, N., et al. (2017). *Tuning Recurrent Neural Networks with Reinforcement Learning.*

- ICLR Workshop.
- RL для генерации музыки, не нашей задачи, но стиль похож.
- [arXiv 1611.02796](https://arxiv.org/abs/1611.02796).

#### [25] Yi, L., & Goldsmith, J. (2007). *Automated Generation of Interactive Music Accompaniment Using a Hierarchical Hidden Semi-Markov Model.*

- AIIDE 2007.
- HSMM с действиями — концептуально близкая работа.
- [PDF](https://cdn.aaai.org/AAAI/2007/AAAI07-281.pdf).

#### [26] Pereira, R. F. M., & Iyengar, S. S. (2020). *Reinforcement Learning for Music Generation: A Survey.*

- Обзор RL-методов в музыкальной генерации.
- [arXiv 2010.16014](https://arxiv.org/abs/2010.16014).

#### [27] Cuthbert, M., & Ariza, C. (2010). *music21: A Toolkit for Computer-Aided Musicology.*

- ISMIR 2010.
- Технический референс к нашему пайплайну предобработки партитур.
- [PDF](http://archives.ismir.net/ismir2010/paper/000139.pdf).

---

## 4. Как составлять выжимки

Шаблон одностраничной выжимки в `literature-summaries/NN-author-year.md`:

```markdown
# Author Year — Title

- **Конференция / журнал:**
- **Ключевые ссылки:** DOI / arXiv / GitHub
- **Кому в команде это важно:**

## Что предложили
2–3 предложения о новизне.

## Метод
Псевдокод или ключевые формулы.

## Эксперименты
Какие датасеты, метрики, числа.

## Что мы используем у себя
Конкретно: «формула (3) у нас в §VI», «гиперпараметр lambda
из §3.2 берём как 0.3».

## Что критиковать в Related Work
Один абзац с ограничениями метода.
```

Эти выжимки помогают не только в Related Work, но и при письме
методологических разделов: формулы и числа сразу под рукой.

---

## 5. Где ещё искать

- **Google Scholar:** [scholar.google.com](https://scholar.google.com).
- **arXiv (CS.SD):** [arxiv.org/list/cs.SD/recent](https://arxiv.org/list/cs.SD/recent).
- **arXiv (CS.LG):** [arxiv.org/list/cs.LG/recent](https://arxiv.org/list/cs.LG/recent).
- **ISMIR proceedings (открытые):** [ismir.net/proceedings](https://www.ismir.net/proceedings/).
- **Semantic Scholar:** [www.semanticscholar.org](https://www.semanticscholar.org/).
- **Connected Papers:** [www.connectedpapers.com](https://www.connectedpapers.com/) — графы цитирований.
- **GitHub Awesome-MIR:** [github.com/ybayle/awesome-deep-learning-music](https://github.com/ybayle/awesome-deep-learning-music).
