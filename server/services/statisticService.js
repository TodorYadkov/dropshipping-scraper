import mongoose from 'mongoose';

import { User } from '../models/User.js';

const getGeneralStatistic = async (userId) => {

	const aggregationPipeline = [
		{
			$match: {
				$or: [
					{ _id: mongoose.Types.ObjectId.createFromHexString(userId) },
					{ owner: mongoose.Types.ObjectId.createFromHexString(userId) },
				],
			},
		},
		{
			$lookup: {
				from: 'extensionstatuses',
				localField: '_id',
				foreignField: 'userId',
				as: 'extensionStatus',
			},
		},
		{
			$lookup: {
				from: 'products',
				localField: '_id',
				foreignField: 'owner',
				as: 'userProducts',
			},
		},
		{
			$group: {
				_id: null,
				userDetails: { $first: '$$ROOT' },
				extensionStatus: { $push: '$extensionStatus' },
				extensionsCount: { $sum: { $cond: [{ $isArray: '$extensionStatus' }, { $size: '$extensionStatus' }, 0] } },
				extensionsIsWork: { $sum: { $size: { $filter: { input: '$extensionStatus', as: 'e', cond: '$$e.isWork' } } } },
				extensionsIsLogin: { $sum: { $size: { $filter: { input: '$extensionStatus', as: 'e', cond: '$$e.isLogin' } } } },
				extensionsNotWorked: { $sum: { $cond: [{ $isArray: '$extensionStatus' }, { $size: { $filter: { input: '$extensionStatus', as: 'e', cond: { $eq: ['$$e.isWork', false] } } } }, 0] } },
				productsCount: { $sum: { $cond: [{ $isArray: '$userProducts' }, { $size: '$userProducts' }, 0] } },
				productsErrorCount: { $sum: { $size: { $filter: { input: '$userProducts', as: 'p', cond: { $ne: ['$$p.error', null] } } } } },
			},
		},
		{
			$addFields: {
				extensionsCount: '$userDetails.extensionsName',
			},
		},
		{
			$project: {
				_id: 0,
				userDetails: 1,
				extensionsCount: { $size: '$extensionsCount' },
				extensionsIsWork: 1,
				extensionsIsLogin: 1,
				extensionsNotWorked: 1,
				productsCount: 1,
				productsErrorCount: 1,
			},
		},
	];

	const [result] = await User.aggregate(aggregationPipeline);

	if (!result) {
		return {};
	}

	const {
		userDetails,
		extensionsCount,
		extensionsIsWork,
		extensionsIsLogin,
		extensionsNotWorked,
		productsCount,
		productsErrorCount,
	} = result;

	const generalStatistic = {
		extensionsCount,
		extensionsIsWork,
		extensionsIsLogin,
		extensionsNotWorked,
		productsCount,
		productsErrorCount,
	};

	return generalStatistic;
};

export { getGeneralStatistic };
