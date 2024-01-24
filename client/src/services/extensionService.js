import { SERVER_PATHS } from '../util/paths.js';

export const extensionService = (api) => {

	// const TODO = async (data) => api.post(SERVER_PATHS.CREATE_PRODUCT, data); // TODO

	const getAllExtensions = async () => api.get(SERVER_PATHS.GET_ALL_EXTENSIONS);

	return {
		getAllExtensions,
	};
};
