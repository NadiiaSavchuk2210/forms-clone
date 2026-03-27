import type { FormResponseCardAnswer } from '../../model';
import ResponseCardTableRow from './ResponseCardTableRow';

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
          {answers.map((answer) => (
            <ResponseCardTableRow key={answer.questionId} answer={answer} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponseCardTable;
