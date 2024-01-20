import { SERVER_PATHS } from '../util/paths.js';

export const authService = (api) => {

	const login = async (data) => api.post(SERVER_PATHS.LOGIN, data);

	const register = async (data) => api.post(SERVER_PATHS.REGISTER, data);

	const logout = async () => api.get(SERVER_PATHS.LOGOUT);

	const forgotPassword = async (data) => api.post(SERVER_PATHS.FORGOT_PASSWORD, data);

	const resetPassword = async (data) => api.put(SERVER_PATHS.RESET_PASSWORD, data);

	const profileUpdate = async (data) => api.put(SERVER_PATHS.UPDATE_PROFILE, data);

	return {
		login,
		register,
		logout,
		forgotPassword,
		resetPassword,
		profileUpdate,
	};
};
