import { clsx } from 'clsx';
import Button from '@/shared/ui/Button';
import css from './FormBuilderSavePanel.module.css';

interface Props {
  isSaving: boolean;
  onSubmit: () => void;
  onReset: () => void;
}

const FormBuilderSavePanel = ({
  isSaving,
  onSubmit,
  onReset,
}: Props) => {
  return (
    <section className={clsx(css.actionsCard, css.saveCard)} aria-labelledby="form-builder-save-title">
      <h2 className={css.sectionTitle}>Save form</h2>
      <p className={css.sectionText}>
        When everything looks right, save the form and get it ready to share.
      </p>

      <div className={css.actionRow}>
        <Button type="button" onClick={onSubmit} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save form'}
        </Button>
        <Button variant="outline" onClick={onReset} disabled={isSaving}>
          Reset draft
        </Button>
      </div>
    </section>
  );
};

export default FormBuilderSavePanel;
