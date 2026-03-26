import { useParams } from 'react-router-dom';
import { ROUTES } from '@/app/providers/router/config/routesConfig';
import { usePageMeta } from '@/shared/lib/hooks/usePageMeta';
import { PageLayout } from '@/shared/ui/layout';

const FormResponses = () => {
  const { id } = useParams<{ id: string }>();

  usePageMeta({
    title: id ? `Form ${id} Responses` : 'Form Responses',
    description:
      'The responses page layout is prepared and detailed response rendering will be added in the next pull request.',
    path: id ? ROUTES.FORM_RESPONSES(id) : ROUTES.FORM_RESPONSES_PATTERN,
  });

  return (
    <PageLayout>
      <section>
        <h1>Form Responses</h1>
      </section>
    </PageLayout>
  );
};

export default FormResponses;
