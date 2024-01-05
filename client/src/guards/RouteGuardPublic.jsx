import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext.js';

export const RouteGuardPublic = ({ children }) => {
    const { isAuthenticated } = useAuthContext();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children ? children : <Outlet />;
}; 