import { clsx } from 'clsx';
import css from './QuestionAnswerCard.module.css';
import type { QuestionOptionsGroupProps } from './types';

const QuestionOptionsGroup = ({
  question,
  answerValues,
  errorMessage,
  isCheckboxQuestion,
  actions,
}: QuestionOptionsGroupProps) => (
  <fieldset className={css.optionList}>
    <legend className={css.legend}>Choose your answer</legend>

    {question.options.map((option) => {
      const isSelected = answerValues.includes(option);

      return (
        <label key={option} className={css.optionCard}>
          <input
            className={css.optionInput}
            type={isCheckboxQuestion ? 'checkbox' : 'radio'}
            name={question.id}
            value={option}
            checked={isSelected}
            onChange={() =>
              isCheckboxQuestion
                ? actions.onCheckboxToggle(question.id, option)
                : actions.onSingleChoiceChange(question.id, option)
            }
          />
          <span
            className={clsx(
              isCheckboxQuestion ? css.checkboxControl : css.radioControl,
            )}
            aria-hidden="true"
          />
          <span className={css.optionLabel}>{option}</span>
        </label>
      );
    })}

    {errorMessage && <p className={css.errorText}>{errorMessage}</p>}
  </fieldset>
);

export default QuestionOptionsGroup;
