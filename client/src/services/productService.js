import { SERVER_PATHS } from '../util/paths.js';

export const productService = (api) => {
	const getProducts = async () => api.get(SERVER_PATHS.GET_ALL_PRODUCTS);

	const createProduct = async (data) => api.post(SERVER_PATHS.CREATE_PRODUCT, data);

	return {
		getProducts,
		createProduct
	};
};
