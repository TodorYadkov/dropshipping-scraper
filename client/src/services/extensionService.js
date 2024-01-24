import { SERVER_PATHS } from '../util/paths.js';

export const extensionService = (api) => {
	const getExtensions = async () => api.get(SERVER_PATHS.GET_EXTENSIONS);

	const createExtension = async (data) => api.post(SERVER_PATHS.CREATE_EXTENSION, data);

	const updateExtension = async (data) => api.put(SERVER_PATHS.UPDATE_EXTENSION, data);

	const deleteExtension = async (extensionId) => api.delete(SERVER_PATHS.DELETE_EXTENSION(extensionId));

	return {
		getExtensions,
		createExtension,
		updateExtension,
		deleteExtension,
	};
};