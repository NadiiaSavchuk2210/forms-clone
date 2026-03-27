import { MdOutlineAnalytics, MdOutlineAssignment } from 'react-icons/md';

import type {
  EmptyStateContent,
  EmptyStateVariant,
  EmptyStateVariantConfig,
} from './types';

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

export const EMPTY_STATE_VARIANT_CONFIG: Record<
  EmptyStateVariant,
  EmptyStateVariantConfig
> = {
  forms: {
    eyebrow: 'Ready to begin',
    Icon: MdOutlineAssignment,
  },
  responses: {
    eyebrow: 'Quiet inbox',
    Icon: MdOutlineAnalytics,
  },
  generic: {
    eyebrow: 'Coming soon',
    Icon: MdOutlineAssignment,
  },
} as const;
