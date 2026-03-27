import type { FormResponsesQuestionAnalyticsRow } from '../../model';
import FormResponsesOverviewTableRow from './FormResponsesOverviewTableRow';

import css from './FormResponsesOverview.module.css';

interface Props {
  questionAnalytics: FormResponsesQuestionAnalyticsRow[];
}

const FormResponsesOverviewTable = ({ questionAnalytics }: Props) => (
  <div className={css.tableWrapper}>
    <div className={css.tableScroller}>
      <table className={css.table}>
        <caption className="visually-hidden">
          Question analytics with answered counts and recent matching responses.
        </caption>
        <thead>
          <tr>
            <th scope="col">Question</th>
            <th scope="col">Answered</th>
            <th scope="col">Recent answers</th>
          </tr>
        </thead>
        <tbody>
          {questionAnalytics.map((row) => (
            <FormResponsesOverviewTableRow key={row.questionId} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default FormResponsesOverviewTable;
