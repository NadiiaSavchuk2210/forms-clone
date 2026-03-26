import css from './FormFillerHero.module.css';

interface Props {
  title: string;
  description?: string | null;
  questionsCount: number;
}

const FormFillerHero = ({
  title,
  description,
  questionsCount,
}: Props) => {
  return (
    <section className={css.hero}>
      <div className={css.heroCopy}>
        <span className={css.eyebrow}>FORM RESPONSE</span>
        <h1 className={css.title}>{title}</h1>
        <p className={css.subtitle}>
          {description ||
            'Take a moment to answer each question and submit the form when you are ready.'}
        </p>
      </div>

      <aside className={css.heroNotes}>
        <ul className={css.noteList}>
          <li className={css.noteCard}>
            <span className={css.noteLabel}>Question Set</span>
            <p>{questionsCount} prompts are ready for your response.</p>
          </li>
          <li className={css.noteCard}>
            <span className={css.noteLabel}>Smooth Finish</span>
            <p>Complete the answers, review the flow, and submit in one move.</p>
          </li>
        </ul>
      </aside>
    </section>
  );
};

export default FormFillerHero;
