import { lazy } from 'react';

export const Dashboard = lazy(() => import('../screens/Dashboard'));
export const SignUpScreen = lazy(() => import('../screens/authentication/SignUpScreen.jsx'));
export const Login = lazy(() => import('../screens/authentication/Login.jsx'));
export const Landing = lazy(() => import('../screens/Landing.jsx'));
export const MainLayoutScreen = lazy(() => import('../screens/MainLayoutScreen.jsx'));
export const Unhandled = lazy(() => import('../screens/Unhandled'));
export const ForgetPassowrdScreen = lazy(()=> import ('../screens/authentication/ForgetPassword.jsx'))