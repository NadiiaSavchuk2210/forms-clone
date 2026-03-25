import { QuestionType } from '@/shared/api/generated';
import type { FormBuilderViewModel } from '../types';
import css from './FormBuilderPreview.module.css';

type Props = {
  questions: FormBuilderViewModel['questions'];
  questionTypeLabels: FormBuilderViewModel['questionTypeLabels'];
};

const FormBuilderPreview = ({
  questions,
  questionTypeLabels,
}: Props) => {
  return (
    <section className={css.previewCard} aria-labelledby="form-builder-preview-title">
      <header className={css.sectionHeader}>
        <div>
          <h2 className={css.sectionTitle}>Quick preview</h2>
          <p className={css.sectionText}>
            A fast read on what respondents will see.
          </p>
        </div>
      </header>

      <ol className={css.previewStack}>
        {questions.map((question) => {
          const normalizedOptions = question.options
            .map((option) => option.trim())
            .filter(Boolean);

          return (
            <li key={question.id} className={css.previewQuestion}>
              <h3 className={css.previewQuestionTitle}>
                {question.title || 'Untitled question'}
              </h3>

              {question.type === QuestionType.Text && (
                <div className={css.fakeInput} aria-hidden="true" />
              )}

              {question.type === QuestionType.Date && (
                <div className={css.fakeDate} aria-hidden="true">
                  Choose a date
                </div>
              )}

              {question.type === QuestionType.MultipleChoice && (
                <div className={css.choiceList}>
                  {(normalizedOptions.length > 0
                    ? normalizedOptions
                    : ['Option 1', 'Option 2']
                  ).map((option) => (
                    <div key={option} className={css.choiceItem}>
                      <span className={css.radio} aria-hidden="true" />
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              )}

              {question.type === QuestionType.Checkbox && (
                <div className={css.choiceList}>
                  {(normalizedOptions.length > 0
                    ? normalizedOptions
                    : ['Option 1', 'Option 2']
                  ).map((option) => (
                    <div key={option} className={css.choiceItem}>
                      <span className={css.checkbox} aria-hidden="true" />
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              )}

              <p className={css.previewHint}>
                {questionTypeLabels[question.type]}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default FormBuilderPreview;
