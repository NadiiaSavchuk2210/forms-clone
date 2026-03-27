import type { FormResponsesQuestionAnalyticsRow } from '../../model';
import FormResponsesOverviewAnswerItem from './FormResponsesOverviewAnswerItem';

import css from './FormResponsesOverview.module.css';

interface Props {
  row: FormResponsesQuestionAnalyticsRow;
}

const FormResponsesOverviewTableRow = ({ row }: Props) => {
  const { answeredCount, answers, questionId, questionTitle, questionTypeLabel } = row;

  return (
    <tr>
      <th scope="row" className={css.questionTitle} data-label="Question">
        <span>{questionTitle}</span>
        <span className={css.questionHint}>{questionTypeLabel}</span>
      </th>
      <td className={css.numericValue} data-label="Answered">
        {answeredCount}
      </td>
      <td className={css.answerCell} data-label="Recent answers">
        {answers.length > 0 ? (
          <ul className={css.answerList}>
            {answers.map((answer, answerIndex) => (
              <FormResponsesOverviewAnswerItem
                key={`${questionId}-${answer.value}`}
                answer={answer}
                answerIndex={answerIndex}
                questionId={questionId}
              />
            ))}
          </ul>
        ) : (
          <span className={css.emptyAnswer}>No answers yet</span>
        )}
      </td>
    </tr>
  );
};

export default FormResponsesOverviewTableRow;
