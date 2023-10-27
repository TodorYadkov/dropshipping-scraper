const preload = (api, id = 'productId') => async (req, res, next) => {
		try {
			const paramsId = req.params[id];
			const currentState = await api(paramsId);

			if (currentState) {
				res.locals.preload = currentState;
				next();
			} else {
				throw new Error(`Entered ID - ${id} is invalid`, 404);
			}
		} catch (error) {
			next(error);
		}
	};

export { preload };
