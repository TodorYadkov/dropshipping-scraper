import { Navigate, Outlet } from 'react-router-dom';

import { CLIENT_PATHS } from '../util/paths.js';

import { useAuthContext } from '../hooks/useAuthContext.js';

export const RouteGuardAdmin = ({ children }) => {
    const { isAdmin } = useAuthContext();

    if (!isAdmin) {
        return <Navigate to={CLIENT_PATHS.LOGIN} replace />;
    }

    return children ? children : <Outlet />;
};