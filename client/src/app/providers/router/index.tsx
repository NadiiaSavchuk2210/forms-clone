import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import { MainLayout } from '@/shared/ui/layout';

import ErrorPage from '../../../pages/error/ErrorPage';
import { ROUTES } from './config/routesConfig';
import publicRoutes from './routes/publicRoutes';

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [...publicRoutes],
  },
];

export const router = createBrowserRouter(routes);
