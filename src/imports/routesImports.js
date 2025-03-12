import { lazy } from 'react';

export const MainLayoutRoutes = lazy(() => import('../routes/MainLayoutRoutes'));
export const LandingRoutes = lazy(() => import('../routes/LandingRoutes'));
export const UnhandledRoutes = lazy(() => import('../routes/UnhandledRoutes'));
export const AuthenticationRoutes = lazy(() => import('../routes/AuthenticationRoutes'));
export const DashboardRoutes = lazy(() => import('../routes/DashboardRoutes.jsx'));

