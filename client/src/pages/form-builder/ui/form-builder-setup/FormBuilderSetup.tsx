import TextField from '@/shared/ui/TextField';
import css from './FormBuilderSetup.module.css';

type Props = {
  title: string;
  description: string;
  titleError: string | null;
  descriptionError: string | null;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
};

const FormBuilderSetup = ({
  title,
  description,
  titleError,
  descriptionError,
  onTitleChange,
  onDescriptionChange,
}: Props) => {
  return (
    <>
      <div className={css.sectionHeader}>
        <div>
          <h2 className={css.sectionTitle}>Form setup</h2>
          <p className={css.sectionText}>
            Start with the core details, then stack your questions in the order
            people should see them.
          </p>
        </div>
      </div>

      <div className={css.fieldGrid}>
        <TextField
          label="Form title"
          value={title}
          error={titleError}
          placeholder="Customer feedback blitz"
          inputClassName={css.titleInput}
          onChange={onTitleChange}
        />

        <TextField
          as="textarea"
          label="Description"
          value={description}
          error={descriptionError}
          placeholder="Tell people what this form is about and how long it takes."
          inputClassName={css.descriptionTextarea}
          onChange={onDescriptionChange}
        />
      </div>
    </>
  );
};

export default FormBuilderSetup;
