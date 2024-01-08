import { SERVER_PATHS } from '../util/paths.js';

export const productService = (api) => {
	const getProducts = async () => api.get(SERVER_PATHS.GET_ALL_PRODUCTS);

	const createProduct = async () => api.post(SERVER_PATHS.POST_PRODUCT);

	return {
		getProducts,
		createProduct
	};
};
