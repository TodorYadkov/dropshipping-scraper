import { ExtensionStatus } from "../models/ExtensionStatus.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";

const getGeneralStatistic = async (userId) => {
    const [userDetails, userExtensions, userProducts] = await Promise.all([
        User.findById(userId),
        ExtensionStatus.find({ userId }),
        Product.find({ owner: userId })
    ]);

    const generalStatistic = {
        extensionsCount: userDetails.extensionsName.length,
        extensionsIsWork: userExtensions.filter(e => e.isWork).length,
        extensionsIsLogin: userExtensions.filter(e => e.isLogin).length,
        extensionsNotWorked: userDetails.extensionsName.length - userExtensions.filter(e => e.isWork).length,
        productsCount: userProducts.length,
        productsErrorCount: userProducts.filter(p => p.error !== null).length,
    };

    return generalStatistic;
};

export {
    getGeneralStatistic
};
