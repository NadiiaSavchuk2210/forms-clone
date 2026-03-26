import { ROUTES } from '@/app/providers/router/config/routesConfig';
import { usePageMeta } from '@/shared/lib/hooks/usePageMeta';
import Button from '@/shared/ui/Button';
import { PageLayout } from '@/shared/ui/layout';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import css from './ErrorPage.module.css';

const ErrorPage = () => {
  const error = useRouteError();

  const status = isRouteErrorResponse(error) ? error.status : 500;
  const message =
    isRouteErrorResponse(error) && error.statusText
      ? error.statusText
      : 'Something went wrong while opening this page.';

  usePageMeta({
    title: `${status} Error`,
    description: message,
    path: '/error',
  });

  return (
    <PageLayout className={css.page}>
      <section className={css.hero}>
        <div className={css.heroCopy}>
          <span className={css.eyebrow}>{status} · Error Page</span>
          <h1 className={css.title}>
            Something needs a quick
            <span className={css.accent}> reset.</span>
          </h1>
          <p className={css.description}>
            {message} You can return to the forms overview, start a new form, or
            try this page again in a moment.
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
              <span className={css.noteLabel}>What happened?</span>
              <p>
                The page could not be loaded correctly. This can happen if a
                route is unavailable or something unexpected interrupted the
                request.
              </p>
            </li>
            <li className={css.noteCard}>
              <span className={css.noteLabel}>What next?</span>
              <p>
                Return home to continue browsing forms, or start a fresh form if
                you want to keep moving.
              </p>
            </li>
          </ul>
        </aside>
      </section>
    </PageLayout>
  );
};

export default ErrorPage;
