import { usePageMeta } from '@/shared/lib/hooks/usePageMeta';

const NotFound = () => {
  usePageMeta({
    title: '404 Page Not Found',
    description: 'The page you are looking for does not exist.',
    path: '/404',
  });

  return <div>404 - Page Not Found</div>;
};

export default NotFound;
