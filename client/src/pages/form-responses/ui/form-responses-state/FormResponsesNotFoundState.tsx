import EmptyState from '@/shared/ui/EmptyState';
import { PageLayout } from '@/shared/ui/layout';
import FormResponsesHero from '../form-responses-hero/FormResponsesHero';
import css from '../../FormResponses.module.css';

const FormResponsesNotFoundState = () => (
  <PageLayout className={css.responsesPage}>
    <FormResponsesHero
      title="Form not found"
      description="This form may have been removed or the link is no longer valid."
      responsesCount={0}
      questionsCount={0}
    />

    <div className={css.emptyStatePanel}>
      <EmptyState
        title="Form not found"
        description="The requested form could not be found."
        headingLevel={2}
      />
    </div>
  </PageLayout>
);

export default FormResponsesNotFoundState;
