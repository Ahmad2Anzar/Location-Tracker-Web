import { lazy } from 'react';

export const SignUpBody = lazy(() => import('../components/SignUp/SignUpBody'));
export const SignUpHeader = lazy(() => import('../components/SignUp/SignUpHeader'));
export const SignUpFooter = lazy(() => import('../components/SignUp/SignUpFooter'));
export const MainLayout = lazy(() => import('../components/MainLayout/MainLayout'));
export const Navbar = lazy(() => import('../components/Navbar'));
export const OSMMap = lazy(() => import('../components/Map'));
export const StartShiftComponent =lazy(()=>import('../components/MainLayout/StartShiftComponent'))
