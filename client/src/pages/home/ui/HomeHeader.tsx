import { ROUTES } from '@/app/providers/router/config/routesConfig';
import Button from '@/shared/ui/Button/Button';

import { HOME_HERO_COPY, HOME_HERO_NOTES } from '../constants';

import css from '../Home.module.css';

interface Props {
  formsCount: number;
}

const HomeHeader = ({ formsCount }: Props) => {
  return (
    <section className={css.hero}>
      <div className={css.heroCopy}>
        <span className={css.eyebrow}>{HOME_HERO_COPY.eyebrow}</span>

        <h1 className={css.title}>
          {HOME_HERO_COPY.title}{' '}
          <span className={css.accent}>{HOME_HERO_COPY.accent}</span>
        </h1>

        <p className={css.subtitle}>{HOME_HERO_COPY.subtitle}</p>

        <div className={css.heroActions}>
          <Button as="link" href={ROUTES.FORM_BUILDER}>
            Create New Form
          </Button>
          <span className={css.countBadge}>
            {formsCount} {HOME_HERO_COPY.countLabel}
          </span>
        </div>
      </div>

      <aside className={css.heroNotes}>
        <ul className={css.noteList}>
          {HOME_HERO_NOTES.map((note) => (
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

export default HomeHeader;
