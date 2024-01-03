import jwt from 'jsonwebtoken';

export default () => (req, res, next) => {
	const userToken = req.headers['x-authorization'];

	if (userToken) {
		try {
			const decodedToken = jwt.verify(
				userToken,
				process.env.JWT_SECRET,
				(err, decodedToken) => {
					if (err) {
						throw new Error('The token is invalid. Please sign in again.');
					}

					return decodedToken;
				}
			);

			req.user = decodedToken;
			req.userToken = userToken;
		} catch (error) {
			// Add status code and invoke global error handler
			error.statusCode = 403;
			return next(error);
		}
	}

	next();
};
