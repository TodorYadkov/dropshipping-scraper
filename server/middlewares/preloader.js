import { PRELOAD_OPTIONS } from "../environments/preloadOptions.js";

const preload = (api, option) => async (req, res, next) => {
	try {
		let params;
		let errorMessage;

		if (option === PRELOAD_OPTIONS.EXTENSION) {
			params = [req.body._id];
			errorMessage = 'The extension you are looking for does not exist!';

		} else if (option === PRELOAD_OPTIONS.EXTENSION_ID) {
			params = [req.params.extensionId];
			errorMessage = 'The extension you are looking for does not exist!';

		} else if (option === PRELOAD_OPTIONS.PRODUCT) {
			params = [req.params.productId];
			errorMessage = 'The product you are looking for does not exist!';

		} else if (option === PRELOAD_OPTIONS.ROLE) {
			params = [req.user._id];
			errorMessage = 'The user does not exist!';
		}

		const currentState = await api(...params);

		if (currentState) {
			res.locals.preload = currentState;
			next();
		} else {
			throw new Error(errorMessage);
		}

	} catch (error) {
		next(error);
	}
};

export { preload };
