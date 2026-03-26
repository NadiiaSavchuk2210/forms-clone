export type EmptyStateVariant = 'forms' | 'responses' | 'generic';

export type EmptyStateContent = {
  title: string;
  description: string;
  action?: string;
};

export type EmptyStateHeadingLevel = 2 | 3;
