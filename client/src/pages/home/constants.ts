export const FORMS_PER_PAGE = 6;
export const FORMS_POLLING_INTERVAL = 15000;

export const HOME_HERO_COPY = {
  eyebrow: 'FORM STUDIO',
  title: 'Gather ideas with',
  accent: 'playful forms',
  subtitle:
    'Keep your forms tidy, reorder cards on the fly, and jump straight into filling or reviewing responses.',
  countLabel: 'forms in the studio',
} as const;

export const HOME_HERO_NOTES = [
  {
    label: 'Flexible Flow',
    description: 'Drag cards around locally to test the order before sharing.',
  },
  {
    label: 'Quick Access',
    description: 'Open a form or check responses from the same card in one move.',
  },
] as const;
