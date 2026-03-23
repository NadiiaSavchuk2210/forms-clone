import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { useMetaTags } from '@/shared/lib/hooks/useMetaTags';
import {
  HOME_PAGE_URL,
  OG_IMAGE,
  SITE_NAME,
} from '@/shared/constants/metadata';

const ErrorPage = () => {
  const error = useRouteError();

  const status = isRouteErrorResponse(error) ? error.status : 500;

  const message = isRouteErrorResponse(error)
    ? error.statusText
    : 'Something went wrong';

  useMetaTags({
    title: `${status} | Error - ${SITE_NAME}`,
    description: message,
    ogTitle: `${status} | Application Error`,
    ogDescription: message,
    ogImage: `${HOME_PAGE_URL}/${OG_IMAGE}`,
    ogUrl: `${HOME_PAGE_URL}/error`,
  });

  return (
    <div>
      <h1>{status}</h1>
      <p>{message}</p>
    </div>
  );
};

export default ErrorPage;
