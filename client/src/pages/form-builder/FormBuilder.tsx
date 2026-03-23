import { ROUTES } from '@/app/providers/router/config/routesConfig';
import { HOME_PAGE_URL } from '@/shared/constants/metadata';
import { useMetaTags } from '@/shared/lib/hooks/useMetaTags';

const FormBuilder = () => {
  useMetaTags({
    title: 'Create Form | Google Forms Lite',
    description: 'Build your custom form with multiple question types.',
    ogUrl: `${HOME_PAGE_URL}${ROUTES.FORM_BUILDER}`,
  });

  return <div>FormBuilder</div>;
};

export default FormBuilder;
