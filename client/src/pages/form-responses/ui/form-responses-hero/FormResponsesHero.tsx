import css from './FormResponsesHero.module.css';

interface Props {
  title: string;
  description?: string | null;
  responsesCount: number;
  questionsCount: number;
}

const FormResponsesHero = ({
  title,
  description,
  responsesCount,
  questionsCount,
}: Props) => {
  const heroStats = [
    { label: 'Responses', value: responsesCount },
    { label: 'Questions', value: questionsCount },
  ];
  const heroNotes = [
    {
      description:
        'Use the overview first to spot repeated answers and compare response volume.',
      label: 'Scan patterns',
    },
    {
      description:
        'Expand any response card to inspect answers in the same order as the form.',
      label: 'Open details',
    },
  ];

  return (
    <section className={css.hero}>
      <div className={css.heroCopy}>
        <span className={css.eyebrow}>Response review</span>
        <h1 className={css.title}>{title}</h1>
        <p className={css.subtitle}>
          {description ||
            'Review each submission in question order and compare how people answered the form.'}
        </p>

        <div className={css.heroStats}>
          {heroStats.map((stat) => (
            <article key={stat.label} className={css.statPill}>
              <span className={css.statLabel}>{stat.label}</span>
              <strong className={css.statValue}>{stat.value}</strong>
            </article>
          ))}
        </div>
      </div>

      <aside className={css.heroNotes} aria-label="Response review guidance">
        <ul className={css.noteList}>
          {heroNotes.map((note) => (
            <li key={note.label} className={css.noteCard}>
              <span className={css.noteLabel}>{note.label}</span>
              <p>{note.description}</p>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
};

export default FormResponsesHero;
