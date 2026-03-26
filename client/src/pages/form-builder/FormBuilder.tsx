import { ROUTES } from '@/app/providers/router/config/routesConfig';
import { usePageMeta } from '@/shared/lib/hooks/usePageMeta';
import Breadcrumbs from '@/shared/ui/Breadcrumbs';
import { Container } from '@/shared/ui/layout';
import { useFormBuilder } from './model';
import {
  FormBuilderFeedback,
  FormBuilderHero,
  FormBuilderPreview,
  FormBuilderQuestionActions,
  FormBuilderQuestions,
  FormBuilderSavePanel,
  FormBuilderSetup,
} from './ui';
import css from './FormBuilder.module.css';

const FormBuilder = () => {
  const builder = useFormBuilder();

  usePageMeta({
    title: 'Create Form',
    description:
      'Build a lightweight form with text, multiple choice, checkbox, and date questions.',
    path: ROUTES.FORM_BUILDER,
  });

  return (
    <main className={css.builderPage}>
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Forms', href: ROUTES.HOME },
            { label: 'Create form' },
          ]}
        />

        <FormBuilderHero />

        <section className={css.builderGrid}>
          <div className={css.panel}>
            <FormBuilderSetup
              title={builder.title}
              description={builder.description}
              titleError={builder.formTitleError}
              descriptionError={builder.formDescriptionError}
              onTitleChange={builder.actions.setup.onTitleChange}
              onDescriptionChange={builder.actions.setup.onDescriptionChange}
            />

            <FormBuilderQuestionActions
              questionTypeOptions={builder.questionTypeOptions}
              errorMessage={builder.questionsError}
              onAddQuestion={builder.actions.questionSection.onAddQuestion}
            />

            <FormBuilderQuestions
              model={builder.questionsModel}
              actions={builder.actions.questionCards}
            />
          </div>

          <aside className={css.sidebar}>
            <FormBuilderPreview
              questions={builder.questions}
              questionTypeLabels={builder.questionTypeLabels}
            />

            <FormBuilderSavePanel
              isSaving={builder.isSaving}
              onSubmit={builder.actions.save.onSubmit}
              onReset={builder.actions.save.onReset}
            />

            <FormBuilderFeedback
              validationErrors={builder.validationErrors}
              errorMessage={builder.errorMessage}
              successState={builder.successState}
              successLinks={builder.successLinks}
            />
          </aside>
        </section>
      </Container>
    </main>
  );
};

export default FormBuilder;
