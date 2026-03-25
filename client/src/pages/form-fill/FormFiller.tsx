import { useParams } from 'react-router-dom';
import { ROUTES } from '@/app/providers/router/config/routesConfig';
import { usePageMeta } from '@/shared/lib/hooks/usePageMeta';

const FormFiller = () => {
  const { id } = useParams<{ id: string }>();

  usePageMeta({
    title: id ? `Fill Form ${id}` : 'Fill Form',
    description:
      'The form filling page shell is ready and the interactive submission flow will be added in the next pull request.',
    path: id ? ROUTES.FORM_FILL(id) : ROUTES.FORM_FILL_PATTERN,
  });

  return (
    <main className="container">
      <section>
        <h1>Fill Form</h1>
      </section>
    </main>
  );
};

export default FormFiller;
