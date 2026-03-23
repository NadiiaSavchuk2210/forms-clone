import { useEffect } from 'react';

type MetaParams = {
  title: string;
  description?: string;

  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;

  canonicalUrl?: string;

  twitterCard?: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
};

export const useMetaTags = ({
  title,
  description,

  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType = 'website',

  canonicalUrl,

  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
}: MetaParams) => {
  useEffect(() => {
    document.title = title;

    const setMetaTag = (
      attr: 'name' | 'property',
      key: string,
      content?: string,
    ) => {
      if (!content) return;

      let el = document.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`,
      );

      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }

      el.setAttribute('content', content);
    };

    const setLinkTag = (rel: string, href?: string) => {
      if (!href) return;

      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }

      el.setAttribute('href', href);
    };

    // Basic SEO
    setMetaTag('name', 'description', description);

    // Open Graph
    setMetaTag('property', 'og:title', ogTitle || title);
    setMetaTag('property', 'og:description', ogDescription || description);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:url', ogUrl);
    setMetaTag('property', 'og:type', ogType);

    // Twitter
    setMetaTag('name', 'twitter:card', twitterCard);
    setMetaTag('name', 'twitter:title', twitterTitle || ogTitle || title);
    setMetaTag(
      'name',
      'twitter:description',
      twitterDescription || ogDescription || description,
    );
    setMetaTag('name', 'twitter:image', twitterImage || ogImage);

    // Canonical
    setLinkTag('canonical', canonicalUrl || ogUrl);
  }, [
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    ogType,
    canonicalUrl,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
  ]);
};
