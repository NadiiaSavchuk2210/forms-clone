import type { FormResponsesSummaryModel } from '../../model';
import FormResponsesOverviewTable from './FormResponsesOverviewTable';

import css from './FormResponsesOverview.module.css';

interface Props {
  summary: FormResponsesSummaryModel;
}

const FormResponsesOverview = ({ summary }: Props) => {
  const { questionAnalytics } = summary;
  const titleId = 'form-responses-overview-title';
  const descriptionId = 'form-responses-overview-description';

  return (
    <section
      className={css.overviewCard}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <header className={css.overviewHeader}>
        <span className={css.eyebrow}>Quick overview</span>
        <h2 id={titleId} className={css.title}>
          Question analytics
        </h2>
        <p id={descriptionId} className={css.text}>
          Review coverage by question and skim the most recent answers in one pass.
        </p>
      </header>

      <FormResponsesOverviewTable questionAnalytics={questionAnalytics} />
    </section>
  );
};

export default FormResponsesOverview;
