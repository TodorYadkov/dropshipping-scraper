import { Router } from 'express';
import { userRegister, userLogin, userLogout} from '../services/userService'
import { validateRegisterSchema, validateLoginSchema } from '../util/validationSchemes';
const userController = Router();

//  Register
userController.post('/register', async (req, res, next) => {
    try {
        await validateRegisterSchema.validateAsync(req.body);
        const user = await userRegister(req.body);

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

//  Login
userController.post('/login', async (req, res, next) => {
    try {
        await validateLoginSchema.validateAsync(req.body);
        const user = await userLogin(req.body);

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

//  Logout
userController.post('/logout', async (req, res, next) => {
    try {
        const user = await userLogout(req.userToken);

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

export { userController };