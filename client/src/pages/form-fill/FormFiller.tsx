import { ROUTES } from '@/app/providers/router/config/routesConfig';
import { HOME_PAGE_URL } from '@/shared/constants/metadata';
import { useMetaTags } from '@/shared/lib/hooks/useMetaTags';
import { useParams } from 'react-router-dom';

const FormFiller = () => {
  const { id } = useParams<{ id: string }>();

  useMetaTags({
    title: 'Fill Form',
    description: 'Submit your responses to the form.',
    ogUrl: id ? `${HOME_PAGE_URL}${ROUTES.FORM_FILL(id)}` : undefined,
  });

  return <div>FormFiller {id}</div>;
};

export default FormFiller;
