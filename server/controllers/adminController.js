import { Router } from 'express';

import { preload } from '../middlewares/preloader.js';
import { isUserLogged, isUserRole } from '../middlewares/guards.js';

import { USER_ROLES } from '../environments/userRoles.js';
import { PRELOAD_OPTIONS } from '../environments/preloadOptions.js';

import { getUserById } from '../services/userService.js';
import {
    getAllUsersDetails,
    adminUserStatistics,
    updateUserRole,
    updateUserStatusToBeDisabled,
    updateUserStatusToBeEnabled
} from '../services/adminService.js';

const adminController = Router();

// Get all users
adminController.get('/', isUserLogged, preload(getUserById, PRELOAD_OPTIONS.ROLE), isUserRole(USER_ROLES.ADMIN), async (req, res, next) => {
    try {
        const userId = req.user._id;

        const allUsers = await getAllUsersDetails(userId);

        res.status(200).json(allUsers);
    } catch (error) {
        next(error);
    }
});

// Update user role from admin
adminController.put('/role', isUserLogged, preload(getUserById, PRELOAD_OPTIONS.ROLE), isUserRole(USER_ROLES.ADMIN), async (req, res, next) => {
    try {
        const userId = req.body._id;
        const role = req.body.role;

        const updatedUser = await updateUserRole(userId, role);

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

// Update user status to be disable (banned)
adminController.put('/disable', isUserLogged, preload(getUserById, PRELOAD_OPTIONS.ROLE), isUserRole(USER_ROLES.ADMIN), async (req, res, next) => {
    try {
        const userId = req.body._id;

        const disabledUser = await updateUserStatusToBeDisabled(userId);

        res.status(200).json(disabledUser);
    } catch (error) {
        next(error);
    }
});

// Update user status to be enabled (working)
adminController.put('/enable', isUserLogged, preload(getUserById, PRELOAD_OPTIONS.ROLE), isUserRole(USER_ROLES.ADMIN), async (req, res, next) => {
    try {
        const userId = req.body._id;

        const enabledUser = await updateUserStatusToBeEnabled(userId);

        res.status(200).json(enabledUser);
    } catch (error) {
        next(error);
    }
});

// Get statistics data only for admin panel
adminController.get('/statistic', isUserLogged, preload(getUserById, PRELOAD_OPTIONS.ROLE), isUserRole(USER_ROLES.ADMIN), async (req, res, next) => {
    try {
        const userId = req.user._id;

        const adminStatistics = await adminUserStatistics(userId);

        res.status(200).json(adminStatistics);
    } catch (error) {
        next(error);
    }
});

export { adminController };