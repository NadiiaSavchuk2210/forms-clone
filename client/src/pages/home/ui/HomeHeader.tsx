import { ROUTES } from '@/app/providers/router/config/routesConfig';
import Button from '@/shared/ui/Button/Button';
import css from '../Home.module.css';

const HomeHeader = () => {
  return (
    <section className={css.pageHeader}>
      <h1 className={css.title}>Forms</h1>
      <p className={css.subtitle}>
        Drag cards to reorder them locally, then open a form or review its
        responses.
      </p>
      <div>
        <Button as="link" href={ROUTES.FORM_BUILDER}>
          Create New Form
        </Button>
      </div>
    </section>
  );
};

export default HomeHeader;
