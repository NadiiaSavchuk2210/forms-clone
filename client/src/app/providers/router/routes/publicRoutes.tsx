import type { RouteObject } from 'react-router-dom';
import { Suspense } from 'react';
import { ROUTES } from '../config/routesConfig';
import {
  Home,
  FormBuilder,
  FormFiller,
  FormResponses,
  NotFound,
} from './lazyComponents';
import Loader from '../../../../shared/ui/Loader/Loader';

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
