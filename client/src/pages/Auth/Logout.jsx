import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CLIENT_PATHS } from '../../util/paths.js';

import { useApi } from '../../hooks/useApi.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { useAppStateContext } from '../../hooks/useAppStateContext.js';

import { authService } from '../../services/authService.js';

import { Loader } from '../../components/Loader.jsx';
import { PageTitle } from '../../components/PageTitle.jsx';

export const Logout = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [serverError, setServerError] = useState('');

	const { clearUserState } = useAuthContext();
	const { clearAppState } = useAppStateContext();

	const { logout } = useApi(authService);
	const navigate = useNavigate();

	useEffect(() => {
		(async function onLogout() {
			try {
				setIsLoading(true);
				await logout();

				clearAppState();
				clearUserState();

				navigate(CLIENT_PATHS.LOGIN, { replace: true });
			} catch (error) {
				setServerError(error.message);
			} finally {
				setIsLoading(false);
			}
		})()

	}, []);

	return (
		<PageTitle title={'Logout'}>
			<div className="mt-16">
				{isLoading && <Loader />}
				{serverError && (
					<p className="text-center -mb-6 text-red-600">
						{serverError}
					</p>
				)}
			</div>
		</PageTitle>
	);
};
