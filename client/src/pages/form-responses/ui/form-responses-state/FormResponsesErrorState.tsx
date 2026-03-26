import { ROUTES } from '@/app/providers/router/config/routesConfig';
import { getErrorMessage } from '@/shared/lib/error-handler';
import Button from '@/shared/ui/Button';
import { PageLayout } from '@/shared/ui/layout';
import FormResponsesHero from '../form-responses-hero/FormResponsesHero';
import css from '../../FormResponses.module.css';

interface Props {
  loadError: unknown;
  onRetry: () => void;
}

const FormResponsesErrorState = ({ loadError, onRetry }: Props) => (
  <PageLayout className={css.responsesPage}>
    <FormResponsesHero
      title="Responses unavailable"
      description="Something interrupted the response loading flow for this form."
      responsesCount={0}
      questionsCount={0}
    />

    <section className={css.errorShell}>
      <span className={css.errorEyebrow}>Response flow interrupted</span>
      <h2 className={css.errorTitle}>Failed to load responses</h2>
      <p className={css.errorText}>{getErrorMessage(loadError)}</p>
      <div className={css.errorActions}>
        <Button onClick={onRetry}>Try again</Button>
        <Button as="link" href={ROUTES.HOME} variant="outline">
          Back to forms
        </Button>
      </div>
    </section>
  </PageLayout>
);

export default FormResponsesErrorState;
