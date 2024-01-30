export default (tokenBlackList) => (req, res, next) => {
    const userToken = req.headers['x-authorization'];

    if (userToken) {
        try {
            if (tokenBlackList.has(userToken)) {
                throw new Error('The token has already been used. Please sign in again');
            }
        } catch (error) {
            // Add status code and invoke global error handler
            error.statusCode = 401;
            return next(error);
        }
    }

    next();
};