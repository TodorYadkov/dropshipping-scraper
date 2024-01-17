import { ExtensionStatus } from '../models/ExtensionStatus.js';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';

const getGeneralStatistic = async (userId) => {
	const [userDetails, extensionStatusResults, userProducts] = await Promise.allSettled([
		User.findById(userId),
		ExtensionStatus.find({ userId }),
		Product.find({ owner: userId })
	]);

	const userExtensions = extensionStatusResults.status === 'fulfilled' ? extensionStatusResults.value : [];

	const generalStatistic = {
		extensionsCount: userDetails.extensionsName.length,
		extensionsIsWork: userExtensions.filter((e) => e.isWork).length,
		extensionsIsLogin: userExtensions.filter((e) => e.isLogin).length,
		extensionsNotWorked: userDetails.extensionsName.length - userExtensions.filter((e) => e.isWork).length,
		productsCount: userProducts.length,
		productsErrorCount: userProducts.filter((p) => p.error !== null).length
	};

	return generalStatistic;
};

export { getGeneralStatistic };
