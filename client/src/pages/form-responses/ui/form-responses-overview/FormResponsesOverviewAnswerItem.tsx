import type { FormResponsesQuestionAnalyticsAnswer } from '../../model';

import css from './FormResponsesOverview.module.css';

interface Props {
  answer: FormResponsesQuestionAnalyticsAnswer;
  answerIndex: number;
  questionId: string;
}

const FormResponsesOverviewAnswerItem = ({
  answer,
  answerIndex,
  questionId,
}: Props) => {
  const { responseIds, responseTitles, value } = answer;
  const responsesLabel =
    responseTitles.length === 1
      ? 'Seen in 1 response'
      : `Seen in ${responseTitles.length} responses`;
  const matchedResponsesLabel = responseTitles.join(', ');
  const tooltipId = `${questionId}-answer-${answerIndex}-tooltip`;

  return (
    <li className={css.answerItem}>
      <button
        type="button"
        className={css.answerTrigger}
        aria-label={`${value}. ${responsesLabel}. Matched responses: ${matchedResponsesLabel}`}
        aria-describedby={tooltipId}
      >
        <span className={css.answerValue}>{value}</span>
        <span className={css.answerMeta}>{responsesLabel}</span>
        <span id={tooltipId} role="tooltip" className={css.tooltip}>
          <span className={css.tooltipTitle}>Matched responses</span>
          <span className={css.tooltipList}>
            {responseTitles.map((responseTitle, index) => {
              const responseId = responseIds[index];

              return (
                <span
                  key={`${responseTitle}-${responseId}`}
                  className={css.tooltipItem}
                >
                  <span className={css.tooltipResponseTitle}>{responseTitle}</span>
                  <span className={css.tooltipResponseId}>{responseId}</span>
                </span>
              );
            })}
          </span>
        </span>
      </button>
    </li>
  );
};

export default FormResponsesOverviewAnswerItem;
