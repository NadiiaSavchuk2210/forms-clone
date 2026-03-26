import EmptyState from '@/shared/ui/EmptyState';
import { PageLayout } from '@/shared/ui/layout';
import css from '../../FormResponses.module.css';

const FormResponsesMissingIdState = () => (
  <PageLayout className={css.responsesPage}>
    <div className={css.emptyStatePanel}>
      <EmptyState
        title="Form link is missing"
        description="The responses page could not be opened because no form id was provided."
        headingLevel={2}
      />
    </div>
  </PageLayout>
);

export default FormResponsesMissingIdState;
