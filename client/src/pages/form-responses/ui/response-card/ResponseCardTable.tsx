import type { FormResponseCardAnswer } from '../../model';
import css from './ResponseCard.module.css';

interface Props {
  answers: FormResponseCardAnswer[];
  title: string;
}

const ResponseCardTable = ({ answers, title }: Props) => {
  const tableCaption = `${title} answers listed in form question order.`;

  return (
    <div className={css.tableWrapper}>
      <table className={css.answerTable}>
        <caption className="visually-hidden">{tableCaption}</caption>
        <thead>
          <tr>
            <th scope="col">Question</th>
            <th scope="col">Answer</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer) => {
            const { displayValue, questionId, questionTitle, questionTypeLabel } = answer;

            return (
              <tr key={questionId}>
                <th scope="row" className={css.questionTitle}>
                  <span>{questionTitle}</span>
                  <span className={css.questionHint}>{questionTypeLabel}</span>
                </th>
                <td className={css.answerValue} data-label="Answer">
                  {displayValue}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResponseCardTable;
