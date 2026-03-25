import { useParams } from 'react-router-dom';
import { ROUTES } from '@/app/providers/router/config/routesConfig';
import { usePageMeta } from '@/shared/lib/hooks/usePageMeta';

const FormResponses = () => {
  const { id } = useParams<{ id: string }>();

  usePageMeta({
    title: id ? `Form ${id} Responses` : 'Form Responses',
    description:
      'The responses page layout is prepared and detailed response rendering will be added in the next pull request.',
    path: id ? ROUTES.FORM_RESPONSES(id) : ROUTES.FORM_RESPONSES_PATTERN,
  });

  return (
    <main className="container">
      <section>
        <h1>Form Responses</h1>
      </section>
    </main>
  );
};

export default FormResponses;
