import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext.js';
import { CLIENT_PATHS } from '../util/paths.js';

export const RouteGuardAuthenticated = ({ children }) => {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to={CLIENT_PATHS.LOGIN} replace />;
    }

    return children ? children : <Outlet />;
};