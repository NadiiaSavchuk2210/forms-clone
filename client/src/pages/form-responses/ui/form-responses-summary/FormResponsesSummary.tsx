import Button from '@/shared/ui/Button';
import type { FormResponsesSummaryModel } from '../../model';
import css from './FormResponsesSummary.module.css';

interface Props {
  summary: FormResponsesSummaryModel;
  openFormHref: string;
  compact?: boolean;
}

const FormResponsesSummary = ({ summary, openFormHref, compact = false }: Props) => {
  const {
    averageAnswersPerResponse,
    collectedAnswersCount,
    questionsCount,
    responsesCount,
  } = summary;
  const titleId = 'form-responses-summary-title';
  const compactMetrics = [
    { label: 'Responses', value: responsesCount },
    { label: 'Questions', value: questionsCount },
    { label: 'Average', value: averageAnswersPerResponse },
  ];
  const detailedMetrics = [
    { label: 'Responses', value: responsesCount },
    { label: 'Questions', value: questionsCount },
    { label: 'Collected answers', value: collectedAnswersCount },
    { label: 'Average per response', value: averageAnswersPerResponse },
  ];

  if (compact) {
    return (
      <section className={css.compactBar} aria-label="Response snapshot">
        <div className={css.compactMetrics}>
          {compactMetrics.map((metric) => (
            <article key={metric.label} className={css.compactMetric}>
              <span className={css.compactLabel}>{metric.label}</span>
              <strong className={css.compactValue}>{metric.value}</strong>
            </article>
          ))}
        </div>

        <div className={css.compactActions}>
          <Button as="link" href={openFormHref}>
            Open form
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className={css.summaryCard} aria-labelledby={titleId}>
      <header className={css.summaryHeader}>
        <h2 id={titleId} className={css.title}>
          Response snapshot
        </h2>
        <p className={css.text}>
          A quick read on how much has been submitted and how the answers map
          back to the form.
        </p>
      </header>

      <div className={css.metrics}>
        {detailedMetrics.map((metric) => (
          <article key={metric.label} className={css.metricCard}>
            <span className={css.metricLabel}>{metric.label}</span>
            <strong className={css.metricValue}>{metric.value}</strong>
          </article>
        ))}
      </div>

      <div className={css.actions}>
        <Button as="link" href={openFormHref}>
          Open form
        </Button>
      </div>
    </section>
  );
};

export default FormResponsesSummary;
