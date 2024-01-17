import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext.jsx';
import { AppStateProvider } from './contexts/AppStateContext.jsx';

import { Login } from './pages/Auth/Login.jsx';
import { Register } from './pages/Auth/Register.jsx';
import { Logout } from './pages/Auth/Logout.jsx';
import { Dashboard } from './pages/Product/Dashboard.jsx';

import { Card } from './components/Card.jsx';
import { Modal } from './components/Modal/Modal.jsx';
import { Layout } from './components/Layout.jsx';
import { AlertSuccess } from './components/Alerts/AlertSuccess.jsx';
import { Form1 } from './components/Forms/Form1.jsx';

import { RouteGuardPublic } from './guards/RouteGuardPublic.jsx';
import { RouteGuardAuthenticated } from './guards/RouteGuardAuthenticated.jsx';

import { CLIENT_PATHS } from './util/paths.js';

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
							<Route path='/ui-elements' element={<AlertSuccess />} />
							<Route path='/forms' element={<Form1 />} />
							<Route path='/cards' element={<Card />} />
							<Route path='/modal' element={<Modal />} />
							<Route path='/blank' element={<h2>Blank Page</h2>} />
							<Route path={CLIENT_PATHS.LOGOUT} element={<Logout />} />
						</Route>

					</Routes>
				</Layout>
			</AppStateProvider>
		</AuthProvider>
	);
}
