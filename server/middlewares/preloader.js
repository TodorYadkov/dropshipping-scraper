const preload = (api, option) => async (req, res, next) => {
	try {
		let params;
		let errorMessage;
		if (option === 'extension') {
			params = [req.body._id];
			errorMessage = 'The extension you are looking for does not exist!';

		} else if (option === 'extensionId') {
			params = [req.params.extensionId];
			errorMessage = 'The extension you are looking for does not exist!';

		} else if (option === 'product') {
			params = [req.params.productId];
			errorMessage = 'The product you are looking for does not exist!';
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
