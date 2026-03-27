import type { IconType } from 'react-icons';

export type EmptyStateVariant = 'forms' | 'responses' | 'generic';

export type EmptyStateContent = {
  title: string;
  description: string;
  action?: string;
};

export type EmptyStateVariantConfig = {
  eyebrow: string;
  Icon: IconType;
};

export type EmptyStateHeadingLevel = 2 | 3;
