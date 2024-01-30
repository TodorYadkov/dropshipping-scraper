import { getUserById } from '../services/userService.js';

export default () => async (req, res, next) => {
    const user = req.user;

    if (user) {
        try {
            const userFromDb = await getUserById(user._id);
            if (userFromDb.isDisable) {
                throw new Error('Your account has been disabled from admin');
            }
            
        } catch (error) {
            // Add status code and invoke global error handler
            error.statusCode = 403;
            return next(error);
        }
    }

    next();
};