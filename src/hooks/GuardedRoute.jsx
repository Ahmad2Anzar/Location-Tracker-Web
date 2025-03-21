
import { Navigate, useLocation } from 'react-router-dom';

// GuardedRoute component: Protects certain routes from being accessed
// by unauthenticated users.

const GuardedRoute = ({ element, ...rest }) => {
    // Retrieve authentication status from local storage
    const auth = localStorage.getItem('authToken');

    // Get the current location using the useLocation hook
    const location = useLocation();

    // If the user is not authenticated 
    // redirect them to the landing ("/landing") and pass the current location state.
    // The state allows redirecting back to this page after authentication.
    if (!auth) {
        return <Navigate to="auth/login" replace state={{ from: location }} />;
    }

    // If the user is authenticated, render the protected route's element
    return element;
};

export default GuardedRoute;
