import { Router } from 'express';

import { getAllUsersDetails } from '../services/adminService.js';
import { getUserById } from '../services/userService.js';
import { isUserLogged, isUserRole } from '../middlewares/guards.js';
import { preload } from '../middlewares/preloader.js';

import { USER_ROLES } from '../environments/userRoles.js';
import { PRELOAD_OPTIONS } from '../environments/preloadOptions.js';

const adminController = Router();

// Get all users
adminController.get('/', isUserLogged, preload(getUserById, PRELOAD_OPTIONS.ROLE), isUserRole(USER_ROLES.ADMIN), async (req, res, next) => {
    try {
        const allUsers = await getAllUsersDetails();

        res.status(200).json(allUsers);
    } catch (err) {
        next(err);
    }
})

export { adminController };