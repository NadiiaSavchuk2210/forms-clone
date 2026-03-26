import { ROUTES } from '@/app/providers/router/config/routesConfig';
import Button from '@/shared/ui/Button/Button';
import css from '../Home.module.css';

type Props = {
  formsCount: number;
};

const HomeHeader = ({ formsCount }: Props) => {
  return (
    <section className={css.hero}>
      <div className={css.heroCopy}>
        <span className={css.eyebrow}>FORM STUDIO</span>

        <h1 className={css.title}>
          Gather ideas with <span className={css.accent}>playful forms</span>
        </h1>

        <p className={css.subtitle}>
          Keep your forms tidy, reorder cards on the fly, and jump straight into
          filling or reviewing responses.
        </p>

        <div className={css.heroActions}>
          <Button as="link" href={ROUTES.FORM_BUILDER}>
            Create New Form
          </Button>
          <span className={css.countBadge}>{formsCount} forms in the studio</span>
        </div>
      </div>

      <aside className={css.heroNotes}>
        <ul className={css.noteList}>
          <li className={css.noteCard}>
            <span className={css.noteLabel}>Flexible Flow</span>
            <p>Drag cards around locally to test the order before sharing.</p>
          </li>
          <li className={css.noteCard}>
            <span className={css.noteLabel}>Quick Access</span>
            <p>Open a form or check responses from the same card in one move.</p>
          </li>
        </ul>
      </aside>
    </section>
  );
};

export default HomeHeader;
