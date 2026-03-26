import Button from '@/shared/ui/Button';
import { PageLayout } from '@/shared/ui/layout';
import { usePageMeta } from '@/shared/lib/hooks/usePageMeta';
import { ROUTES } from '@/app/providers/router/config/routesConfig';
import css from './NotFound.module.css';

const NotFound = () => {
  usePageMeta({
    title: '404 Page Not Found',
    description: 'The page you are looking for does not exist.',
    path: '/404',
  });

  return (
    <PageLayout className={css.page}>
      <section className={css.hero}>
        <div className={css.heroCopy}>
          <span className={css.eyebrow}>404 · Lost Page</span>
          <h1 className={css.title}>
            This page took a different
            <span className={css.accent}> route.</span>
          </h1>
          <p className={css.description}>
            The link may be out of date, the page may have moved, or the address
            may be slightly off. You can head back home and keep exploring from
            there.
          </p>

          <div className={css.actions}>
            <Button as="link" href={ROUTES.HOME}>
              Back Home
            </Button>
            <Button as="link" href={ROUTES.FORM_BUILDER} variant="outline">
              Create Form
            </Button>
          </div>
        </div>

        <aside>
          <ul className={css.noteList}>
            <li className={css.noteCard}>
              <span className={css.noteLabel}>Quick Tip</span>
              <p>Check the URL for typos or return to the homepage.</p>
            </li>
            <li className={css.noteCard}>
              <span className={css.noteLabel}>Need a reset?</span>
              <p>Start a fresh form or browse the forms you already created.</p>
            </li>
          </ul>
        </aside>
      </section>
    </PageLayout>
  );
};

export default NotFound;
