import { ROUTES } from '@/app/providers/router/config/routesConfig';
import { usePageMeta } from '@/shared/lib/hooks/usePageMeta';

const FormBuilder = () => {
  usePageMeta({
    title: 'Create Form',
    description:
      'The form builder page structure is prepared and will be completed in the next pull request.',
    path: ROUTES.FORM_BUILDER,
  });

  return (
    <main className="container">
      <section>
        <h1>Create Form</h1>
      </section>
    </main>
  );
};

export default FormBuilder;
