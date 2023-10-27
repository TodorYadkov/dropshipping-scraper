const preload =
	(api, id = 'productId') =>
	async (req, res, next) => {
		try {
			const paramsId = req.params[id];
			const currentProduct = await api(paramsId);
			if (currentProduct) {
				res.locals.preload = currentProduct;
				next();
			} else {
				throw new Error(`Entered ID - ${id} is invalid`, 404);
			}
		} catch (error) {
			next(error);
		}
	};

export { preload };
