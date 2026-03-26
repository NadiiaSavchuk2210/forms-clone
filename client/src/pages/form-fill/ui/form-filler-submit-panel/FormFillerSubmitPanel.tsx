import { clsx } from 'clsx';
import Button from '@/shared/ui/Button';
import css from './FormFillerSubmitPanel.module.css';

interface Props {
  isSubmitting: boolean;
  onSubmit: () => void;
  onReset: () => void;
}

const FormFillerSubmitPanel = ({
  isSubmitting,
  onSubmit,
  onReset,
}: Props) => {
  return (
    <section className={clsx(css.actionsCard, css.submitCard)}>
      <h2 className={css.sectionTitle}>Submit answers</h2>
      <p className={css.sectionText}>
        Review the form, complete each required answer, and submit when you are
        ready.
      </p>

      <div className={css.actionRow}>
        <Button type="button" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit form'}
        </Button>
        <Button variant="outline" onClick={onReset} disabled={isSubmitting}>
          Reset answers
        </Button>
      </div>
    </section>
  );
};

export default FormFillerSubmitPanel;
