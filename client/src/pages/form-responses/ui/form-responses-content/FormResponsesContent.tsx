import { ROUTES } from '@/app/providers/router/config/routesConfig';
import Button from '@/shared/ui/Button';
import Breadcrumbs from '@/shared/ui/Breadcrumbs';
import EmptyState from '@/shared/ui/EmptyState';
import type {
  FormResponseCard,
  FormResponsesForm,
  FormResponsesSummaryModel,
} from '../../model';
import FormResponsesHero from '../form-responses-hero/FormResponsesHero';
import FormResponsesOverview from '../form-responses-overview/FormResponsesOverview';
import FormResponsesSummary from '../form-responses-summary/FormResponsesSummary';
import ResponseCardList from '../response-card/ResponseCardList';
import css from '../../FormResponses.module.css';

interface Props {
  form: FormResponsesForm;
  responseCards: FormResponseCard[];
  responsesCount: number;
  summary: FormResponsesSummaryModel;
}

const FormResponsesContent = ({
  form,
  responseCards,
  responsesCount,
  summary,
}: Props) => {
  const openFormHref = ROUTES.FORM_FILL(form.id);
  const hasResponses = responseCards.length > 0;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Forms', href: ROUTES.HOME },
          { label: 'Responses' },
        ]}
      />

      <FormResponsesHero
        title={form.title}
        description={form.description}
        responsesCount={responsesCount}
        questionsCount={form.questions.length}
      />

      <section className={css.responsesGrid}>
        <div className={css.contentStack}>
          {hasResponses && <FormResponsesOverview summary={summary} />}

          <section className={css.panel}>
            <header className={css.sectionHeader}>
              <h2 className={css.sectionTitle}>Detailed responses</h2>
              <p className={css.sectionText}>
                Open any response card to inspect the answers in question order.
              </p>
            </header>

            {hasResponses ? (
              <ResponseCardList responseCards={responseCards} />
            ) : (
              <div className={css.emptyStatePanel}>
                <EmptyState variant="responses" headingLevel={3} />
                <div className={css.emptyActions}>
                  <Button as="link" href={openFormHref}>
                    Open form
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>

        <aside className={css.sidebar}>
          <FormResponsesSummary summary={summary} openFormHref={openFormHref} />
        </aside>
      </section>

      <div className={css.mobileSummary}>
        <FormResponsesSummary summary={summary} openFormHref={openFormHref} compact />
      </div>
    </>
  );
};

export default FormResponsesContent;
