import {
  HOME_PAGE_URL,
  OG_IMAGE,
  SITE_NAME,
} from '@/shared/constants/metadata';
import { useMetaTags } from '@/shared/lib/hooks/useMetaTags';

const NotFound = () => {
  useMetaTags({
    title: `404 | Page Not Found - ${SITE_NAME}`,
    description: 'The page you are looking for does not exist.',
    ogTitle: `404 | Page Not Found`,
    ogDescription: 'This page could not be found.',
    ogImage: `${HOME_PAGE_URL}/${OG_IMAGE}`,
    ogUrl: `${HOME_PAGE_URL}/404`,
  });

  return <div>404 - Page Not Found</div>;
};

export default NotFound;
