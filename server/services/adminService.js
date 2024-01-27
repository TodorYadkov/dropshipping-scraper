import { User } from "../models/User.js";

const getAllUsersDetails = async () => User.aggregate([
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
            extensionCount: { $size: '$extensions' }
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
            disable: { $ifNull: ['$disable', false] },
            isLogin: { $ifNull: ['$disable', false] }
        }
    }
]);

export {
    getAllUsersDetails,
}