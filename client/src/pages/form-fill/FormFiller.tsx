import { useParams } from 'react-router-dom';

import { ROUTES } from '@/app/providers/router/config/routesConfig';
import { getErrorMessage } from '@/shared/lib/error-handler';
import { usePageMeta } from '@/shared/lib/hooks/usePageMeta';
import Breadcrumbs from '@/shared/ui/Breadcrumbs';
import Button from '@/shared/ui/Button';
import ContentLoader from '@/shared/ui/ContentLoader';
import EmptyState from '@/shared/ui/EmptyState';
import { PageLayout } from '@/shared/ui/layout';

import { useFormFiller } from './model';
import {
  FormFillerFeedback,
  FormFillerHero,
  FormFillerSubmitPanel,
  QuestionAnswerCard,
} from './ui';

import css from './FormFiller.module.css';

const FormFiller = () => {
  const { id } = useParams<{ id: string }>();
  const {
    actions,
    form,
    isError,
    isLoading,
    isSubmitting,
    questionsModel,
    refetch,
    successState,
    validationErrors,
    submitErrorMessage,
    loadError,
  } = useFormFiller(id);
  const formTitle = form?.title ?? 'Fill Form';
  const formDescription =
    form?.description ??
    'Answer each question and submit the form when you are ready.';

  usePageMeta({
    title: formTitle,
    description: formDescription,
    path: id ? ROUTES.FORM_FILL(id) : ROUTES.FORM_FILL_PATTERN,
  });

  if (!id) {
    return (
      <PageLayout className={css.fillerPage}>
        <section className={css.emptyStatePanel}>
          <EmptyState
            title="Form link is missing"
            description="The form could not be opened because no form id was provided."
            headingLevel={2}
          />
        </section>
      </PageLayout>
    );
  }

  if (isLoading) {
    return (
      <PageLayout className={css.fillerPage}>
        <FormFillerHero
          title="Loading form"
          description="Preparing the question flow for you now."
          questionsCount={0}
        />
        <section className={css.questionsPanel}>
          <ContentLoader label="Loading form..." />
        </section>
      </PageLayout>
    );
  }

  if (isError) {
    return (
      <PageLayout className={css.fillerPage}>
        <FormFillerHero
          title="Form unavailable"
          description="Something interrupted the loading flow for this form."
          questionsCount={0}
        />
        <section className={css.errorShell}>
          <h2 className={css.errorTitle}>Failed to load form</h2>
          <p className={css.errorText}>{getErrorMessage(loadError)}</p>
          <Button onClick={() => refetch()}>Try again</Button>
        </section>
      </PageLayout>
    );
  }

  if (!form) {
    return (
      <PageLayout className={css.fillerPage}>
        <FormFillerHero
          title="Form not found"
          description="This form may have been removed or the link is no longer valid."
          questionsCount={0}
        />
        <section className={css.emptyStatePanel}>
          <EmptyState
            title="Form not found"
            description="The requested form could not be found."
            headingLevel={2}
          />
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout className={css.fillerPage}>
      <Breadcrumbs
        items={[
          { label: 'Forms', href: ROUTES.HOME },
          { label: 'Fill form' },
        ]}
      />

      <FormFillerHero
        title={form.title}
        description={form.description}
        questionsCount={form.questions.length}
      />

      <section className={css.fillerGrid}>
        <section className={css.questionsPanel}>
          <header className={css.questionsHeader}>
            <h2 className={css.sectionTitle}>Answer the form</h2>
            <p className={css.sectionText}>
              Work through each prompt and submit the completed form once every
              answer is ready.
            </p>
          </header>

          <div className={css.questionStack}>
            {questionsModel.questions.map((question, index) => (
              <QuestionAnswerCard
                key={question.id}
                question={question}
                index={index}
                answerValues={questionsModel.answersByQuestionId[question.id] ?? []}
                errorMessage={questionsModel.getQuestionError(question.id)}
                typeHint={questionsModel.getQuestionTypeHint(question.type)}
                actions={actions.fields}
              />
            ))}
          </div>
        </section>

        <aside className={css.sidebar}>
          <FormFillerSubmitPanel
            isSubmitting={isSubmitting}
            onSubmit={actions.submit.onSubmit}
            onReset={actions.submit.onReset}
          />

          <FormFillerFeedback
            validationErrors={validationErrors}
            errorMessage={submitErrorMessage}
            successState={successState}
          />
        </aside>
      </section>
    </PageLayout>
  );
};

export default FormFiller;
