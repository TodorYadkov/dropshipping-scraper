import { Router } from 'express';
import { userRegister, userLogin, userLogout, getUserById } from '../services/userService.js'
import { validateRegisterSchema, validateLoginSchema } from '../util/validationSchemes.js';
import { isUserGuest, isUserLogged } from '../middlewares/guards.js';
import { preload } from '../middlewares/preloader.js';
const userController = Router();

//  Register
userController.post('/register', isUserGuest, async (req, res, next) => {
    try {
        await validateRegisterSchema.validateAsync(req.body);
        const user = await userRegister(req.body);

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

//  Login
userController.post('/login', isUserGuest, async (req, res, next) => {
    try {
        await validateLoginSchema.validateAsync(req.body);
        const user = await userLogin(req.body);

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