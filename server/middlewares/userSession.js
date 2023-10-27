import jwt from 'jsonwebtoken';
import { tokenBlackList } from '../util/tokenBlackList.js';

export default () => (req, res, next) => {
	const userToken = req.headers['x-authorization'];

	if (userToken) {
		try {
			if (tokenBlackList.has(userToken)) {
				throw new Error('The token has already been used. Please sign in again.');
			}

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
			error.statusCode = 401;
			return next(error);
		}
	}

	next();
};
