import { SERVER_PATHS } from '../util/paths.js';

export const productService = (api) => {
	const getProducts = async () => api.get(SERVER_PATHS.GET_ALL_PRODUCTS);

	return {
		getProducts
	};
};
