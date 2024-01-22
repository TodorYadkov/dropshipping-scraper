import { SERVER_PATHS } from '../util/paths.js';

export const extensionService = (api) => {

	const createProduct = async (data) => api.post(SERVER_PATHS.CREATE_PRODUCT, data); // TODO

	return { createProduct };
};
