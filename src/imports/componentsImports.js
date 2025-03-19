import { lazy } from 'react';

export const SignUpBody = lazy(() => import('../components/SignUp/SignUpBody'));
export const SignUpHeader = lazy(() => import('../components/SignUp/SignUpHeader'));
export const SignUpFooter = lazy(() => import('../components/SignUp/SignUpFooter'));
export const MainLayout = lazy(() => import('../components/MainLayout/MainLayout'));
export const Navbar = lazy(() => import('../components/Navbar'));
export const OSMMap = lazy(() => import('../components/Map'));
export const StartShiftComponent =lazy(()=>import('../components/MainLayout/StartShiftComponent'))
export const FeedbackForm = lazy(()=>import('../components/FeedBackForm'))
export const PlannedRoutes = lazy(()=>import('../components/PlannedRoute/PlannedROutes'));
export const AddRoute = lazy(()=>import('../components/PlannedRoute/AddRoute'))
export const CameraCapture= lazy(()=>import('../components/camera'))
export const ReachedMilestoneComponent = lazy(()=>import('../components/PlannedRoute/ReachedMilestone'))