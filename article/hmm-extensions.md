# Современные расширения HMM

Базовая HMM из Rabiner 1989 — это «вид сверху». За последние 20 лет
появилось много вариантов, которые решают её слабые места. Этот
документ — краткий путеводитель: что есть, для чего нужно, какие
ссылки и какие готовые реализации.

Используется в **§VI Background** статьи (краткое упоминание) и в
**Приложении А** (математика).

---

## 1. Что плохо у классической HMM

1. **Геометрическое распределение длительности.**
   $P(d) = p_{\text{stay}}^{d-1}(1-p_{\text{stay}})$ — даёт
   максимум при $d=1$ и слишком тяжёлый хвост. Для нот с разной
   длительностью (восьмая vs цельная) это плохо.
2. **Ручные переходные вероятности.** $p_{\text{stay}}$,
   $p_{\text{advance}}$, $p_{\text{skip}}$ подбираются под
   конкретный жанр; нет адаптации к стилю исполнителя.
3. **Гауссова эмиссия.** Для аудио многомодальная и плохо
   моделируется одной нормалью — нужны нейросетевые модели.
4. **Стационарность.** Параметры одинаковы для всей партитуры;
   на самом деле в каденции и в тутти статистика разная.

Каждое расширение ниже закрывает одну или несколько из этих проблем.

---

## 2. HSMM — Hidden Semi-Markov Models

**Идея:** явно моделировать длительность пребывания в состоянии
произвольным распределением $D_i(d)$, не геометрическим.

**Модель:** $\lambda = (A, B, \pi, D)$, где
$D_i(d) = P(d_i = d)$ — распределение длительности
$i$-го состояния. Часто берут гамма- или log-normal.

**Алгоритмы:** Forward-Backward модифицируются —
$\alpha_t(j, d)$ становится двумерным
($d$ — длительность). Сложность $O(N D_{\max} T)$, где
$D_{\max}$ — максимальная длительность в тиках.

**Когда применять у нас:**

- На основном HMM-трекере для нот разной длительности;
- Особенно полезно для duration-аугментированной модели §VI.

**Литература:**

- Yu, S.-Z. (2010). *Hidden Semi-Markov Models.* Artificial
  Intelligence, 174(2), 215–243.
  [DOI](https://doi.org/10.1016/j.artint.2009.11.011).
- Murphy, K. P. (2002). *Hidden Semi-Markov Models.* Технический
  отчёт UCB. [PDF](https://www.cs.ubc.ca/~murphyk/Papers/segment.pdf).

**Готовый код:**

- [github.com/poolio/unsupervised_detection](https://github.com/poolio/unsupervised_detection) — есть HSMM-модуль.
- Свой код напишется за день: модификация Forward по аналогии с
  Murphy.

---

## 3. Hierarchical HMM

**Идея:** состояния могут быть «составными» — каждое
high-level состояние раскрывается в свою маленькую HMM. Подходит
для иерархии «фраза → такт → нота».

**Литература:**

- Fine, S., Singer, Y., & Tishby, N. (1998). *The Hierarchical
  Hidden Markov Model: Analysis and Applications.* Machine
  Learning, 32, 41–62.
- Cont, A. (2010) — статья [7] в `docs/literature.md` —
  применяет иерархическую HMM именно к score-following.

**Когда применять у нас:**

- Если хотим поддерживать форму ABA / повторы / DC al fine —
  верхний уровень переключает между крупными секциями партитуры.
- Для §VI можно ограничиться упоминанием как future work; реализация
  — за рамками текущего проекта.

---

## 4. CRF — Conditional Random Fields

**Идея:** дискриминативная альтернатива HMM. Не моделирует
$P(o|s)$, а сразу $P(s|o)$. Лучше работает, когда наблюдения
многомерны и сложны.

**Модель:**
$$
P(s_{1:T} | o_{1:T}) \propto \exp\left(\sum_t \Phi(s_t, s_{t-1}, o_{1:T})\right).
$$

**Литература:**

- Sutton, C., & McCallum, A. (2012). *An Introduction to
  Conditional Random Fields.* Foundations and Trends in
  Machine Learning, 4(4), 267–373.
  [PDF](https://homepages.inf.ed.ac.uk/csutton/publications/crftutv2.pdf).
- Joder, C., Essid, S., & Richard, G. (2013). *Learning Optimal
  Features for Polyphonic Audio-to-Score Alignment.* IEEE TASLP.
  [DOI](https://doi.org/10.1109/TASL.2013.2244084).

**Когда применять у нас:**

- Если CNN-эмиссия даёт уже структурированный выход и хотим
  end-to-end обучение → CRF поверх CNN.
- В первой версии не нужно; на ISMIR-версии стоит обсудить как
  расширение.

---

## 5. Neural HMM (deep learning + HMM)

**Идея:** оставить структуру HMM (transitions + emissions), но
параметризовать всё глубокой сетью. Получается interpretable
neural model: всё ещё можно делать Forward, но эмиссии и
переходы — нейросетевые.

**Литература:**

- Wu, M., et al. (2020). *Hidden Markov Model with Neural Networks
  for ASR.*
- Tran, K., Bisk, Y., et al. (2016). *Unsupervised Neural Hidden
  Markov Models.* EMNLP.
  [arXiv 1609.09007](https://arxiv.org/abs/1609.09007).
- Chiu, J., Rush, A. (2020). *Scaling Hidden Markov Language
  Models.* EMNLP.
  [arXiv 2011.04640](https://arxiv.org/abs/2011.04640).

**Когда применять у нас:**

- Это естественное направление для следующей версии: эмиссия
  $b_i(o) = \sigma(W \phi(o))$ с обучаемыми $W$, $\phi$.
- В нашей текущей статье CNN-эмиссия + классический Forward
  — это ровно частный случай Neural HMM. Стоит указать в
  Background как мотивацию.

---

## 6. Switching State-Space Models (SSM)

**Идея:** есть несколько HMM-моделей (например, разный темп), и
дискретный «переключатель», который выбирает активную в данный
момент.

**Литература:**

- Raphael, C. (2010). *Music Plus One and Machine Learning.*
  ICML — [11] в `docs/literature.md`. Использует именно
  switching SSM для аккомпанемента.
- Murphy, K. (1998). *Switching Kalman Filters.* DAI Technical
  Report. [PDF](https://www.cs.ubc.ca/~murphyk/Papers/skf.pdf).

**Когда применять у нас:**

- Альтернатива нашему RL-модулю: вместо одной политики иметь
  набор HMM с разными $A$ и переключаться. Менее гибко, но
  проще оценивать.
- В статье упомянуть как baseline для сравнения с RL-подходом
  (можно сделать ablation).

---

## 7. Bayesian HMM

**Идея:** ставить априорные распределения на $A$, $B$, $\pi$ и
делать байесовский вывод. Полезно при малом обучении.

**Литература:**

- Beal, M. J., Ghahramani, Z., & Rasmussen, C. (2002). *The
  Infinite Hidden Markov Model.* NIPS.
  [PDF](http://mlg.eng.cam.ac.uk/zoubin/papers/ihmm.pdf).
- Teh, Y. W., et al. (2006). *Hierarchical Dirichlet Processes.*
  JASA. — основа для непараметрических HMM.

**Когда применять у нас:**

- Если будем переносить трекер на новый репертуар с малым
  обучением — байесовский подход даст устойчивые оценки.
- Не для текущей статьи; в Conclusion как future work.

---

## 8. Transformer-based alignment

**Идея:** заменить HMM трансформером, обученным выдавать
позицию в партитуре по локальному окну аудио.

**Литература:**

- Brazier, A., & Widmer, G. (2020). *Towards Reliable Real-Time
  Score Following.* ISMIR LBD.
  [arXiv 2009.07383](https://arxiv.org/abs/2009.07383).
- Maezawa, A. (2019). — статья [16] в `docs/literature.md`.

**Когда применять у нас:**

- Это конкурент классического HMM, на который стоит ссылаться
  в Related Work как state-of-the-art с указанием их
  ограничения (latency 20–50 мс, нужны большие данные).
- Воспроизводить не обязательно, но можно реализовать
  трансформер-baseline для ablation.

---

## 9. Сводная таблица

| Расширение                    | Что улучшает              | Сложность реализации | Используем мы? |
|-------------------------------|----------------------------|------------------------|----------------|
| HSMM (явная длительность)     | модель длительности нот    | низкая                 | да, в §VI      |
| Hierarchical HMM              | структура формы / повторы  | средняя                | future work    |
| CRF                           | дискриминативное обучение  | средняя                | future work    |
| Neural HMM                    | гибкая эмиссия / переходы  | средняя                | частично (CNN-эмиссия) |
| Switching SSM                 | сегменты с разной статистикой | средняя             | как baseline для RL |
| Bayesian HMM                  | малое обучение, устойчивость | высокая             | future work    |
| Transformer alignment         | end-to-end SOTA            | высокая                | как сравнение в RW |

---

## 10. Что писать в статье (§VI и Related Work)

В §VI Background:

- Дать каноническую HMM (как сейчас).
- Упомянуть HSMM как «duration-augmented HMM», который мы
  фактически используем.
- Кратко указать, что CNN-эмиссия — это частный случай Neural
  HMM.

В §V Related Work:

- Switching SSM (Raphael) — отдельный абзац как альтернатива
  нашему RL-подходу.
- Hierarchical HMM (Cont, Antescofo) — упомянуть как
  state-of-the-art классической постановки.
- Transformer alignment (Brazier, Maezawa) — как новейшие
  end-to-end методы; их ограничение по latency мотивирует наш
  гибридный подход.

В §X Conclusion / Future work:

- Bayesian HMM для адаптации к новому репертуару.
- Полная Hierarchical HMM для поддержки повторов и DC al fine.
- End-to-end CRF поверх CNN-эмиссии.
