import { verifyJwtToken } from '../util/verifyJwtToken.js';

export default () => (req, res, next) => {
	const userToken = req.headers['x-authorization'];

	if (userToken) {
		try {
			const decodedToken = verifyJwtToken(userToken);

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