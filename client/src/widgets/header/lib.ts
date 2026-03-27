import { MdAdd, MdArrowBack, MdOpenInNew } from 'react-icons/md';
import { matchPath } from 'react-router-dom';

import { ROUTES } from '@/app/providers/router/config/routesConfig';

import type { HeaderAction } from './types';

const BACK_TO_FORMS_ACTION: HeaderAction = {
  href: ROUTES.HOME,
  label: 'Back to forms',
  icon: MdArrowBack,
  variant: 'outline',
};

export const getHeaderAction = (pathname: string): HeaderAction => {
  const fillMatch = matchPath(ROUTES.FORM_FILL_PATTERN, pathname);
  const responsesMatch = matchPath(ROUTES.FORM_RESPONSES_PATTERN, pathname);

  if (pathname === ROUTES.HOME) {
    return {
      href: ROUTES.FORM_BUILDER,
      label: 'Start a new form',
      icon: MdAdd,
      variant: 'primary',
    };
  }

  if (pathname === ROUTES.FORM_BUILDER || Boolean(fillMatch)) {
    return BACK_TO_FORMS_ACTION;
  }

  if (responsesMatch?.params.id) {
    return {
      href: ROUTES.FORM_FILL(responsesMatch.params.id),
      label: 'Open form',
      icon: MdOpenInNew,
      variant: 'outline',
    };
  }

  return BACK_TO_FORMS_ACTION;
};
