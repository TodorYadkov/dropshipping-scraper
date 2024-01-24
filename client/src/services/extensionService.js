import { SERVER_PATHS } from '../util/paths.js';

export const extensionService = (api) => {
	const getExtensions = async () => api.get(SERVER_PATHS.GET_EXTENSIONS);

	const createExtension = async (data) => api.post(SERVER_PATHS.CREATE_EXTENSION, data);

	const updateExtension = async (data) => api.put(SERVER_PATHS.UPDATE_EXTENSION, data);

	const deleteExtension = async (extensionId) => api.delete(SERVER_PATHS.DELETE_EXTENSION(extensionId));

	const resetErrorExtension = async (data) => api.put(SERVER_PATHS.RESET_ERROR_EXTENSION, data);

	const startExtension = async (data) => api.put(SERVER_PATHS.REACT_START_EXTENSION, data);

	const stopExtension = async (data) => api.put(SERVER_PATHS.REACT_STOP_EXTENSION, data);

	const logoutExtension = async (data) => api.put(SERVER_PATHS.LOGOUT_EXTENSION, data);

	return {
		getExtensions,
		createExtension,
		updateExtension,
		deleteExtension,
		resetErrorExtension,
		startExtension,
		stopExtension,
		logoutExtension,
	};
};