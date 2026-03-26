import { clsx } from 'clsx';
import Button from '@/shared/ui/Button';
import type { SuccessLinks, SuccessState } from '../types';
import type { ValidationError } from '@/shared/lib/validation';
import css from './FormBuilderFeedback.module.css';

interface Props {
  validationErrors: ValidationError[];
  errorMessage: string | null;
  successState: SuccessState;
  successLinks: SuccessLinks;
}

const FormBuilderFeedback = ({
  validationErrors,
  errorMessage,
  successState,
  successLinks,
}: Props) => {
  return (
    <>
      {validationErrors.length > 0 && (
        <section className={clsx(css.feedbackCard, css.errorCard)} role="alert" aria-live="assertive">
          <h2 className={css.feedbackTitle}>Check these bits first</h2>
          <ul className={css.errorList}>
            {validationErrors.map((error) => (
              <li key={`${error.field}-${error.message}`}>{error.message}</li>
            ))}
          </ul>
        </section>
      )}

      {errorMessage && (
        <section className={clsx(css.feedbackCard, css.errorCard)} role="alert" aria-live="assertive">
          <h2 className={css.feedbackTitle}>Save failed</h2>
          <p className={css.feedbackText}>{errorMessage}</p>
        </section>
      )}

      {successState && successLinks && (
        <section className={clsx(css.feedbackCard, css.successCard)} role="status" aria-live="polite">
          <h2 className={css.feedbackTitle}>Form saved</h2>
          <p className={css.feedbackText}>
            <strong>{successState.title}</strong> is now ready to share.
          </p>
          <div className={css.linkRow}>
            <Button as="link" href={successLinks.fill}>
              Open form
            </Button>
            <Button as="link" href={successLinks.responses} variant="outline">
              View responses
            </Button>
          </div>
        </section>
      )}
    </>
  );
};

export default FormBuilderFeedback;
