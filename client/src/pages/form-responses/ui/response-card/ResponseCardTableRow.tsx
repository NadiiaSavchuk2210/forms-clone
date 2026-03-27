import type { FormResponseCardAnswer } from '../../model';

import css from './ResponseCard.module.css';

interface Props {
  answer: FormResponseCardAnswer;
}

const ResponseCardTableRow = ({ answer }: Props) => {
  const { displayValue, questionTitle, questionTypeLabel } = answer;

  return (
    <tr>
      <th scope="row" className={css.questionTitle}>
        <span>{questionTitle}</span>
        <span className={css.questionHint}>{questionTypeLabel}</span>
      </th>
      <td className={css.answerValue} data-label="Answer">
        {displayValue}
      </td>
    </tr>
  );
};

export default ResponseCardTableRow;
