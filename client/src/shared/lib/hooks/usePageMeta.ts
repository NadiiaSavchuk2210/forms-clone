import { useMemo } from 'react';
import { OG_IMAGE, SITE_NAME } from '@/shared/constants/metadata';
import { useMetaTags } from './useMetaTags';

type PageMetaParams = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
};

const getBaseUrl = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.location.origin;
};

const buildUrl = (baseUrl: string, path?: string): string | undefined => {
  if (!baseUrl) {
    return undefined;
  }

  if (!path || path === '/') {
    return `${baseUrl}/`;
  }

  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

export const usePageMeta = ({
  title,
  description,
  path = '/',
  image = `/${OG_IMAGE}`,
  type = 'website',
}: PageMetaParams) => {
  const baseUrl = getBaseUrl();

  const absoluteUrl = useMemo(() => buildUrl(baseUrl, path), [baseUrl, path]);
  const absoluteImage = useMemo(() => {
    if (!baseUrl) {
      return undefined;
    }

    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }

    return `${baseUrl}${image.startsWith('/') ? image : `/${image}`}`;
  }, [baseUrl, image]);

  useMetaTags({
    title: `${title} | ${SITE_NAME}`,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: absoluteImage,
    ogUrl: absoluteUrl,
    ogType: type,
    canonicalUrl: absoluteUrl,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: absoluteImage,
  });
};
