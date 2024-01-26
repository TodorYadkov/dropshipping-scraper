import { User } from "../models/User.js";

const getAllUsers = async () => User.find().select('-password');

export {
    getAllUsers,
}