import ContentLoader from '@/shared/ui/ContentLoader';
import { PageLayout } from '@/shared/ui/layout';

import FormResponsesHero from '../form-responses-hero/FormResponsesHero';

import css from '../../FormResponses.module.css';

const FormResponsesLoadingState = () => (
  <PageLayout className={css.responsesPage}>
    <FormResponsesHero
      title="Loading responses"
      description="Pulling together the question map and the latest submissions."
      responsesCount={0}
      questionsCount={0}
    />

    <div className={css.responsesGrid}>
      <section className={css.panel} aria-labelledby="form-responses-loading-title">
        <h2 id="form-responses-loading-title" className="visually-hidden">
          Loading responses
        </h2>
        <ContentLoader label="Loading responses..." />
      </section>
    </div>
  </PageLayout>
);

export default FormResponsesLoadingState;
