import { lazy } from 'react';

export const Home = lazy(() => import('../../../../pages/home/Home'));
export const FormBuilder = lazy(
  () => import('../../../../pages/form-builder/FormBuilder'),
);
export const FormFiller = lazy(
  () => import('../../../../pages/form-fill/FormFiller'),
);
export const FormResponses = lazy(
  () => import('../../../../pages/form-responses/FormResponses'),
);
export const NotFound = lazy(
  () => import('../../../../pages/not-found/NotFound'),
);
