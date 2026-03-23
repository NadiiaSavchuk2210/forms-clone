import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import MainLayout from '../../../shared/ui/layout/MainLayout/MainLayout';
import publicRoutes from './routes/publicRoutes';
import { ROUTES } from './config/routesConfig';
import ErrorPage from '../../../pages/error/ErrorPage';

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [...publicRoutes],
  },
];

export const router = createBrowserRouter(routes);
