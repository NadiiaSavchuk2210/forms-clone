import { Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

import Loader from '@/shared/ui/Loader/Loader';

import { ROUTES } from '../config/routesConfig';
import {
  FormBuilder,
  FormFiller,
  FormResponses,
  Home,
  NotFound,
} from './lazyComponents';

const publicRoutes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: (
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: ROUTES.FORM_BUILDER,
    element: (
      <Suspense fallback={<Loader />}>
        <FormBuilder />
      </Suspense>
    ),
  },
  {
    path: ROUTES.FORM_FILL_PATTERN,
    element: (
      <Suspense fallback={<Loader />}>
        <FormFiller />
      </Suspense>
    ),
  },
  {
    path: ROUTES.FORM_RESPONSES_PATTERN,
    element: (
      <Suspense fallback={<Loader />}>
        <FormResponses />
      </Suspense>
    ),
  },
  {
    path: ROUTES.NOT_FOUND,
    element: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    ),
  },
];

export default publicRoutes;
