import { Router } from 'express';
import { upload } from '../config/multer.js'

import { userRegister, userLogin, userLogout, getUserById, createResetLink, updateUser, resetUserPassword } from '../services/userService.js'
import { validateRegisterSchema, validateLoginSchema, validateResetPasswordSchema, validateUpdateProfileSchema } from '../util/validationSchemes.js';
import { isUserGuest, isUserLogged } from '../middlewares/guards.js';
import { imageUpload } from '../util/imageUpload.js';
import { imageDelete } from '../util/imageDelete.js.js';

const userController = Router();

//  Register
userController.post('/register', isUserGuest, async (req, res, next) => {
    try {
        const userData = req.body;

        await validateRegisterSchema.validateAsync(userData);
        const user = await userRegister(userData);

        res.status(201).json(user);
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

        const logoutMsg = await userLogout(userData);

        res.status(200).json(logoutMsg);
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

// Update Profile
userController.put('/profile', isUserLogged, upload.single('uploadAvatar'), async (req, res, next) => {
    try {
        const userId = req.user._id;

        // Getting the file  
        const file = req.file;

        // Getting the data and file using multer
        const userData = { name: req.body.name, email: req.body.email };

        // Validating the fields
        await validateUpdateProfileSchema.validateAsync({ ...userData, uploadAvatar: file });

        // If we have file add it to the user data object
        if (file) {
            const result = await imageUpload(file);

            userData.avatarURL = result.secure_url;
            userData.avatarId = result.public_id;

            // If there is old avatar delete it 
            const user = await getUserById(userId);

            // Deleting the old avatar
            if (user.avatarURL && user.avatarId) {
                await imageDelete(user.avatarId);
            }
        }

        const updatedUserData = await updateUser(userId, userData);

        res.status(200).json(updatedUserData);
    } catch (err) {
        next(err);
    }
});

// Forgot password
userController.post('/forgot-password', isUserGuest, async (req, res, next) => {
    try {
        const userData = req.body;
        const origin = req.get('origin');

        await createResetLink({ ...userData, origin });

        res.status(200).json({ message: 'Your reset token is send successfully!' });
    } catch (error) {
        next(error);
    }
});

// Reset password
userController.put('/reset-password', isUserGuest, async (req, res, next) => {
    try {
        const userData = req.body;

        await validateResetPasswordSchema.validateAsync(userData);
        const user = await resetUserPassword(userData);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

export { userController };