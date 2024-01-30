import { Navigate, Outlet } from 'react-router-dom';

import { CLIENT_PATHS } from '../util/paths.js';

import { useAuthContext } from '../hooks/useAuthContext.js';

export const RouteGuardPublic = ({ children }) => {
    const { isAuthenticated } = useAuthContext();

    if (isAuthenticated) {
        return <Navigate to={CLIENT_PATHS.DASHBOARD} replace />;
    }

    return children ? children : <Outlet />;
}; 