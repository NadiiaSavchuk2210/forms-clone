import {
  isCheckboxQuestionType,
  isDateQuestionType,
  isSingleChoiceQuestionType,
  isTextQuestionType,
  normalizeQuestionOptions,
} from '@/entities/form/model';

import type { FormBuilderViewModel } from '../types';

import css from './FormBuilderPreview.module.css';

interface Props {
  questions: FormBuilderViewModel['questions'];
  questionTypeLabels: FormBuilderViewModel['questionTypeLabels'];
}

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
          const normalizedOptions = normalizeQuestionOptions(question.options);

          return (
            <li key={question.id} className={css.previewQuestion}>
              <h3 className={css.previewQuestionTitle}>
                {question.title || 'Untitled question'}
              </h3>

              {isTextQuestionType(question.type) && (
                <div className={css.fakeInput} aria-hidden="true" />
              )}

              {isDateQuestionType(question.type) && (
                <div className={css.fakeDate} aria-hidden="true">
                  Choose a date
                </div>
              )}

              {isSingleChoiceQuestionType(question.type) && (
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

              {isCheckboxQuestionType(question.type) && (
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
