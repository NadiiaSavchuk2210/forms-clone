import { ROUTES } from '@/app/providers/router/config/routesConfig';
import { HOME_PAGE_URL } from '@/shared/constants/metadata';
import { useMetaTags } from '@/shared/lib/hooks/useMetaTags';
import { useParams } from 'react-router-dom';

const FormResponses = () => {
  const { id } = useParams<{ id: string }>();

  useMetaTags({
    title: 'Form Responses',
    description: 'View submitted responses and analytics.',
    ogUrl: id ? `${HOME_PAGE_URL}${ROUTES.FORM_RESPONSES(id)}` : undefined,
  });
  return <div>FormResponses</div>;
};

export default FormResponses;
