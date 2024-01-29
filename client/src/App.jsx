import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { CLIENT_PATHS } from './util/paths.js';

import { AuthProvider } from './contexts/AuthContext.jsx';
import { AppStateProvider } from './contexts/AppStateContext.jsx';

import { RouteGuardAuthenticated } from './guards/RouteGuardAuthenticated.jsx';
import { RouteGuardPublic } from './guards/RouteGuardPublic.jsx';
import { RouteGuardAdmin } from './guards/RouterGuardAdmin.jsx';

import { Loader } from './components/Shared/Loader.jsx';
import { Layout } from './components/Layout/Layout.jsx';


import { Login } from './pages/Auth/Login.jsx';
import { Logout } from './pages/Auth/Logout.jsx';
import { Register } from './pages/Auth/Register.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Extensions } from './pages/Extensions.jsx';


const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword.jsx'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword.jsx'));
const NotFound404 = lazy(() => import('./pages/NotFound404.jsx'));
const AdminPanel = lazy(() => import('./pages/AdminPanel.jsx'));
const Profile = lazy(() => import('./pages/Auth/Profile.jsx'));

export const App = () => {

	return (
		<AuthProvider>
			<AppStateProvider>
				<Layout>

					<Suspense fallback={<Loader />}>
						<Routes>

							{/* Public routes */}
							<Route element={<RouteGuardPublic />}>
								<Route path={CLIENT_PATHS.LOGIN} element={<Login />} />
								<Route path={CLIENT_PATHS.REGISTER} element={<Register />} />
								<Route path={CLIENT_PATHS.FORGOT_PASSWORD} element={<ForgotPassword />} />
								<Route path={CLIENT_PATHS.RESET_PASSWORD} element={<ResetPassword />} />
							</Route>

							{/* Private routes */}
							<Route element={<RouteGuardAuthenticated />}>
								<Route path='/' element={<Navigate to={CLIENT_PATHS.DASHBOARD} />} />
								<Route path={CLIENT_PATHS.DASHBOARD} element={<Dashboard />} />
								<Route path={CLIENT_PATHS.LOGOUT} element={<Logout />} />
								<Route path={CLIENT_PATHS.PROFILE} element={<Profile />} />
								<Route path={CLIENT_PATHS.EXTENSIONS} element={<Extensions />} />
							</Route>

							<Route element={<RouteGuardAdmin />}>
								<Route path={CLIENT_PATHS.ADMIN} element={<AdminPanel />} />
							</Route>

							<Route path='*' element={<NotFound404 />} />
						</Routes>
					</Suspense >

				</Layout>
			</AppStateProvider>
		</AuthProvider>
	);
};
