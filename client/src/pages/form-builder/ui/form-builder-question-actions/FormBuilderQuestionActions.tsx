import Button from '@/shared/ui/Button';
import type { QuestionTypeOption } from '../types';
import css from './FormBuilderQuestionActions.module.css';

type Props = {
  questionTypeOptions: readonly QuestionTypeOption[];
  errorMessage: string | null;
  onAddQuestion: (type: QuestionTypeOption['value']) => void;
};

const FormBuilderQuestionActions = ({
  questionTypeOptions,
  errorMessage,
  onAddQuestion,
}: Props) => {
  const createAddQuestionHandler = (type: QuestionTypeOption['value']) => () => {
    onAddQuestion(type);
  };

  return (
    <section className={css.actionsCard} aria-labelledby="form-builder-add-question">
      <header>
        <h3 className={css.sectionTitle}>Add a question</h3>
        <p className={css.sectionText}>
          Choose a format and keep building. Choice-based questions can manage
          options right away.
        </p>
      </header>

      <ul className={css.addButtons}>
        {questionTypeOptions.map((option) => (
          <li key={option.value}>
            <Button
              variant="outline"
              onClick={createAddQuestionHandler(option.value)}
            >
              {option.label}
            </Button>
          </li>
        ))}
      </ul>

      {errorMessage && (
        <p className={css.errorText} role="alert">
          {errorMessage}
        </p>
      )}
    </section>
  );
};

export default FormBuilderQuestionActions;
