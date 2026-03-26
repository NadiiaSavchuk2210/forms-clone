import { clsx } from 'clsx';
import type { ValidationError } from '@/shared/lib/validation';
import type { SubmitSuccessState } from '../../model';
import css from './FormFillerFeedback.module.css';

interface Props {
  validationErrors: ValidationError[];
  errorMessage: string | null;
  successState: SubmitSuccessState;
}

const FormFillerFeedback = ({
  validationErrors,
  errorMessage,
  successState,
}: Props) => {
  return (
    <>
      {validationErrors.length > 0 && (
        <section
          className={clsx(css.feedbackCard, css.errorCard)}
          role="alert"
          aria-live="assertive"
        >
          <h2 className={css.feedbackTitle}>Please review these answers</h2>
          <ul className={css.errorList}>
            {validationErrors.map((error) => (
              <li key={`${error.field}-${error.message}`}>{error.message}</li>
            ))}
          </ul>
        </section>
      )}

      {errorMessage && (
        <section
          className={clsx(css.feedbackCard, css.errorCard)}
          role="alert"
          aria-live="assertive"
        >
          <h2 className={css.feedbackTitle}>Submission failed</h2>
          <p className={css.feedbackText}>{errorMessage}</p>
        </section>
      )}

      {successState && (
        <section
          className={clsx(css.feedbackCard, css.successCard)}
          role="status"
          aria-live="polite"
        >
          <h2 className={css.feedbackTitle}>Response sent</h2>
          <p className={css.feedbackText}>
            Your answers for <strong>{successState.formTitle}</strong> were
            submitted successfully.
          </p>
        </section>
      )}
    </>
  );
};

export default FormFillerFeedback;
