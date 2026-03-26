import { EmptyStateContent, EmptyStateVariant } from './types';

export const EMPTY_STATE_CONTENT: Record<EmptyStateVariant, EmptyStateContent> =
  {
    forms: {
      title: 'No forms yet',
      description:
        'Start with a fresh form and shape the first response flow for your collection.',
      action: 'Create form',
    },
    responses: {
      title: 'No responses yet',
      description:
        'Responses will appear here once people begin sending answers through the form.',
      action: undefined,
    },
    generic: {
      title: 'Nothing here yet',
      description: 'There is no content to show in this section yet.',
      action: undefined,
    },
  } as const;
