import css from './FormBuilderHero.module.css';

const FormBuilderHero = () => {
  return (
    <section className={css.hero}>
      <header className={css.heroCopy}>
        <span className={css.eyebrow}>Build your next form</span>
        <h1 className={css.title}>
          Make it <span className={css.accent}>loud</span>, clear, and easy to
          answer.
        </h1>
        <p className={css.subtitle}>
          Create your form, add different question types, organize the flow,
          and prepare everything for a smooth response experience.
        </p>
      </header>

      <aside className={css.heroNotes}>
        <ul className={css.noteList}>
          <li className={css.noteCard}>
            <span className={css.noteLabel}>Question types</span>
            <p>Text, multiple choice, checkboxes, and date are ready.</p>
          </li>
          <li className={css.noteCard}>
            <span className={css.noteLabel}>Live draft</span>
            <p>Your changes stay in place while you build and refine the form.</p>
          </li>
        </ul>
      </aside>
    </section>
  );
};

export default FormBuilderHero;
