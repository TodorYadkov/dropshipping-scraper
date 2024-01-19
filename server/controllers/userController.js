import { Router } from 'express';

import { userRegister, userLogin, userLogout, getUserById, createResetLink } from '../services/userService.js'
import { validateRegisterSchema, validateLoginSchema, validateResetPasswordSchema } from '../util/validationSchemes.js';
import { isUserGuest, isUserLogged } from '../middlewares/guards.js';

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
        const userData = { ...req.user, accessToken: req.userToken };

        await userLogout(userData);

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

// Forgot password
userController.post('/forgot-password', isUserGuest, async (req, res, next) => {
    try {
        const userData = req.body;
        const origin = req.get('Origin');
        
        const resetLink = await createResetLink({ ...userData, resetAddress: origin });

        res.status(200).json(resetLink);
    } catch (error) {
        next(error);
    }
});

// Reset password
userController.post('/reset-password', isUserGuest, async (req, res, next) => {
    try {
        const userData = req.body;

        await validateResetPasswordSchema.validateAsync(userData);
        const resetLink = await (userData);

        res.status(200).json(resetLink);
    } catch (error) {
        next(error);
    }
});

export { userController };