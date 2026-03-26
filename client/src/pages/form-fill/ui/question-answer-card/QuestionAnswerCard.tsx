import { clsx } from 'clsx';
import {
  isDateQuestionType,
  isTextQuestionType,
} from '@/entities/form/model';
import DatePickerField from '@/shared/ui/DatePickerField';
import TextField from '@/shared/ui/TextField';
import {
  getSingleAnswerValue,
  isCheckboxQuestion,
  isSingleChoiceQuestion,
} from './lib';
import QuestionOptionsGroup from './QuestionOptionsGroup';
import type { QuestionAnswerCardProps } from './types';
import css from './QuestionAnswerCard.module.css';

const QuestionAnswerCard = ({
  question,
  index,
  answerValues,
  errorMessage,
  typeHint,
  actions,
}: QuestionAnswerCardProps) => {
  const singleValue = getSingleAnswerValue(answerValues);
  const checkboxQuestion = isCheckboxQuestion(question);
  const singleChoiceQuestion = isSingleChoiceQuestion(question);

  return (
    <article className={css.questionCard}>
      <header className={css.cardHeader}>
        <span className={css.questionBadge}>Question {index + 1}</span>
        <h2 className={css.questionTitle}>{question.title}</h2>
        <p className={css.questionHint}>{typeHint}</p>
      </header>

      {isTextQuestionType(question.type) && (
        <TextField
          label="Your answer"
          value={singleValue}
          error={errorMessage}
          placeholder="Type your answer here"
          fieldClassName={css.field}
          inputClassName={css.textInput}
          onChange={(value) => actions.onTextChange(question.id, value)}
        />
      )}

      {isDateQuestionType(question.type) && (
        <DatePickerField
          label="Pick a date"
          value={singleValue}
          error={errorMessage}
          fieldClassName={css.field}
          inputClassName={clsx(css.textInput, css.dateInput)}
          onChange={(value) => actions.onDateChange(question.id, value)}
        />
      )}

      {(singleChoiceQuestion || checkboxQuestion) && (
        <QuestionOptionsGroup
          question={question}
          answerValues={answerValues}
          errorMessage={errorMessage}
          isCheckboxQuestion={checkboxQuestion}
          actions={actions}
        />
      )}
    </article>
  );
};

export default QuestionAnswerCard;
