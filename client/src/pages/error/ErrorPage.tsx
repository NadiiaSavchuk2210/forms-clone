import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { usePageMeta } from '@/shared/lib/hooks/usePageMeta';

const ErrorPage = () => {
  const error = useRouteError();

  const status = isRouteErrorResponse(error) ? error.status : 500;

  const message = isRouteErrorResponse(error)
    ? error.statusText
    : 'Something went wrong';

  usePageMeta({
    title: `${status} Error`,
    description: message,
    path: '/error',
  });

  return (
    <div>
      <h1>{status}</h1>
      <p>{message}</p>
    </div>
  );
};

export default ErrorPage;
