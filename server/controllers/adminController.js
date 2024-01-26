import { Router } from 'express';
import { getAllUsers } from '../services/adminService.js';

const adminController = Router();

// Get all users
adminController.get('/', async (req, res, next) => {
    const allUsers = await getAllUsers();

    res.status(200).json(allUsers);
})

export { adminController };