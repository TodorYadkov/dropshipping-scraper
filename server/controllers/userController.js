import { Router } from 'express';
import { userRegister, userLogin, userLogout, getUserById } from '../services/userService.js'
import { validateRegisterSchema, validateLoginSchema } from '../util/validationSchemes.js';
import { isUserGuest, isUserLogged } from '../middlewares/guards.js';
import { preload } from '../middlewares/preloader.js';
const userController = Router();

//  Register
userController.post('/register', isUserGuest, async (req, res, next) => {
    try {
        const userData = req.body;

        await validateRegisterSchema.validateAsync(userData);
        const user = await userRegister(userData);

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

//  Login
userController.post('/login', isUserGuest, async (req, res, next) => {
    try {
        const userData = req.body;

        await validateLoginSchema.validateAsync(userData);

        const user = await userLogin(userData);

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

//  Logout
userController.get('/logout', isUserLogged, async (req, res, next) => {
    try {
        await userLogout(req.userToken);

        res.status(200).json({ message: 'Logout successful.' });
    } catch (err) {
        next(err);
    }
});

//  Profile
userController.get('/profile', isUserLogged, async (req, res, next) => {
    try {
        const user = await getUserById(req.user._id);

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

export { userController };