import { EmptyStateContent, EmptyStateVariant } from './types';

export const EMPTY_STATE_CONTENT: Record<EmptyStateVariant, EmptyStateContent> =
  {
    forms: {
      title: 'No forms yet',
      description: 'Create your first form to start collecting responses.',
      action: 'Create form',
    },
    responses: {
      title: 'No responses yet',
      description: 'Responses will appear here once users submit the form.',
      action: undefined,
    },
    generic: {
      title: 'Nothing here yet',
      description: 'There is no data to display.',
      action: undefined,
    },
  } as const;
