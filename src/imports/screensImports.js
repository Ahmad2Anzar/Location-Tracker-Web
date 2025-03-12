import { lazy } from 'react';

export const Dashboard = lazy(() => import('../screens/Dashboard'));
export const SignUpScreen = lazy(() => import('../screens/authentication/SignUpScreen.jsx'));
export const Login = lazy(() => import('../screens/authentication/Login.jsx'));
export const Landing = lazy(() => import('../screens/Landing.jsx'));
export const MainLayout = lazy(() => import('../screens/MainLayout.jsx'));
export const Unhandled = lazy(() => import('../screens/Unhandled'));
