import { Navigate, Route, Routes } from 'react-router-dom';

import { CLIENT_PATHS } from './util/paths.js';

import { AuthProvider } from './contexts/AuthContext.jsx';
import { AppStateProvider } from './contexts/AppStateContext.jsx';

import { RouteGuardPublic } from './guards/RouteGuardPublic.jsx';
import { RouteGuardAuthenticated } from './guards/RouteGuardAuthenticated.jsx';

import { Layout } from './components/Layout.jsx';
import { AlertSuccess } from './components/Alerts/AlertSuccess.jsx';

import { Login } from './pages/Auth/Login.jsx';
import { Register } from './pages/Auth/Register.jsx';
import { Logout } from './pages/Auth/Logout.jsx';
import { Profile } from './pages/Auth/Profile.jsx';
import { Dashboard } from './pages/Product/Dashboard.jsx';
import { NotFound404 } from './pages/NotFound404.jsx';

export const App = () => {

	return (
		<AuthProvider>
			<AppStateProvider>
				<Layout>
					<Routes>

						{/* Public routes */}
						<Route element={<RouteGuardPublic />}>
							<Route path={CLIENT_PATHS.LOGIN} element={<Login />} />
							<Route path={CLIENT_PATHS.REGISTER} element={<Register />} />
						</Route>

						{/* Private routes */}
						<Route element={<RouteGuardAuthenticated />}>
							<Route path='/' element={<Navigate to={CLIENT_PATHS.DASHBOARD} />} />
							<Route path={CLIENT_PATHS.DASHBOARD} element={<Dashboard />} />
							<Route path={CLIENT_PATHS.EXTENSIONS} element={<AlertSuccess />} />
							<Route path={CLIENT_PATHS.LOGOUT} element={<Logout />} />
							<Route path={CLIENT_PATHS.PROFILE} element={<Profile />} />
						</Route>

						<Route path='*' element={<NotFound404 />} />
					</Routes>

				</Layout>
			</AppStateProvider>
		</AuthProvider>
	);
}
