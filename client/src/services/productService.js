import { SERVER_PATHS } from '../util/paths.js';

export const productService = (api) => {
	const getProducts = async () => api.get(SERVER_PATHS.GET_ALL_PRODUCTS);

	const createProduct = async (data) => api.post(SERVER_PATHS.CREATE_PRODUCT, data);

	const updateProduct = async (data, productId) => api.put(SERVER_PATHS.UPDATE_PRODUCT(productId), data);

	const deleteProduct = async (productId) => api.delete(SERVER_PATHS.DELETE_PRODUCT(productId));

	return {
		getProducts,
		createProduct,
		updateProduct,
		deleteProduct,
	};
};
