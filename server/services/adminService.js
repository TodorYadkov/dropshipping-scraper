import mongoose from 'mongoose';

import { User } from '../models/User.js';

const updateUserRole = async (userId, role) => User.findByIdAndUpdate(userId, { role }, { runValidators: true, new: true }).select('-password -avatarId -isExtension -createdAt -updatedAt -__v');

const updateUserStatusToBeDisabled = async (userId) => User.findByIdAndUpdate(userId, { disable: true, isLogin: false }, { runValidators: true, new: true }).select('-password -avatarId -isExtension -createdAt -updatedAt -__v');

const updateUserStatusToBeEnabled = async (userId) => User.findByIdAndUpdate(userId, { disable: false }, { runValidators: true, new: true }).select('-password -avatarId -isExtension -createdAt -updatedAt -__v');

// Get all user without the user which made request
const getAllUsersDetails = async (userId) => User.aggregate([
    {
        $match: {
            _id: { $ne: mongoose.Types.ObjectId.createFromHexString(userId) } // Exclude the current user
        }
    },
    {
        $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: 'owner',
            as: 'products'
        }
    },
    {
        $lookup: {
            from: 'extensions',
            localField: '_id',
            foreignField: 'owner',
            as: 'extensions'
        }
    },
    {
        $addFields: {
            productCount: { $size: '$products' },
            extensionCount: { $size: '$extensions' },
            extensionsWithIsWorkBrowser: { $size: { $filter: { input: '$extensions', as: 'e', cond: { $eq: ['$$e.isWorkBrowser', true] } } } },
            productsWithErrorCount: { $size: { $filter: { input: '$products', as: 'prod', cond: { $ne: ['$$prod.error', null] } } } }
        }
    },
    {
        $project: {
            _id: 1,
            name: 1,
            email: 1,
            avatarURL: 1,
            role: 1,
            productCount: 1,
            extensionCount: 1,
            extensionsWithIsWorkBrowser: 1,
            productsWithErrorCount: 1,
            disable: 1,
            isLogin: 1,
        }
    }
]);

// Get admin statistic
const adminUserStatistics = async (userId) => {
    const pipeline = [
        {
            $match: {
                _id: { $ne: mongoose.Types.ObjectId.createFromHexString(userId) }
            }
        },
        {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: 'owner',
                as: 'products'
            }
        },
        {
            $lookup: {
                from: 'extensions',
                localField: '_id',
                foreignField: 'owner',
                as: 'extensions'
            }
        },
        {
            $group: {
                _id: null,
                totalUser: { $sum: 1 },
                totalLogged: { $sum: { $cond: [{ $eq: ['$isLogin', true] }, 1, 0] } },
                totalExtension: { $sum: { $size: '$extensions' } },
                totalExtensionWorked: { $sum: { $size: { $filter: { input: '$extensions', as: 'e', cond: '$$e.isWorkBrowser' } } } },
                totalProduct: { $sum: { $size: '$products' } },
                totalProductErrorCount: { $sum: { $size: { $filter: { input: '$products', as: 'p', cond: { $ne: ['$$p.error', null] } } } } },
            }
        },
        {
            $project: {
                _id: 0,
                totalUser: 1,
                totalLogged: 1,
                totalExtension: 1,
                totalExtensionWorked: 1,
                totalProduct: 1,
                totalProductErrorCount: 1,
            }
        },
    ];

    const result = await User.aggregate(pipeline);

    return result.length > 0 ? result[0] : {
        totalUser: 0,
        totalLogged: 0,
        totalExtension: 0,
        totalExtensionWorked: 0,
        totalProduct: 0,
        totalProductErrorCount: 0,
    };
};

export {
    updateUserRole,
    updateUserStatusToBeDisabled,
    updateUserStatusToBeEnabled,
    getAllUsersDetails,
    adminUserStatistics,
}