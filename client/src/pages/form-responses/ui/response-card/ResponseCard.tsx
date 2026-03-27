import type { FormResponseCard } from '../../model';
import ResponseCardTable from './ResponseCardTable';

import css from './ResponseCard.module.css';

interface Props {
  responseCard: FormResponseCard;
}

const ResponseCard = ({ responseCard }: Props) => {
  const { id, title, answeredCount, totalQuestions, answers } = responseCard;

  return (
    <li className={css.listItem}>
      <details className={css.disclosure}>
        <summary className={css.summary}>
          <article className={css.card}>
            <header className={css.cardHeader}>
              <div>
                <h3 className={css.title}>{title}</h3>
                <p className={css.subtitle}>
                  {answeredCount} of {totalQuestions} questions were answered.
                </p>
              </div>

              <div className={css.headerMeta}>
                <span className={css.badge} title={id}>
                  <span className={css.badgeText}>{id}</span>
                </span>
                <span className={css.expandHint}>Show details</span>
              </div>
            </header>
          </article>
        </summary>

        <div className={css.detailsBody}>
          <ResponseCardTable answers={answers} title={title} />
        </div>
      </details>
    </li>
  );
};

export default ResponseCard;
