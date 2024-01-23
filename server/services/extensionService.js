import { Product } from '../models/Product.js';
import { Extension } from '../models/Extension.js';
import { addTokenToBlackList } from './tokenBlackListService.js';

// EXTENSION REACT request ---------------------

const getAllExtension = (userId) => Extension.find({ owner: userId }).select('-accessToken');

const getOneExtension = async (extensionId) => Extension.findById(extensionId).select('-accessToken');

// LOGOUT extension from React
const logoutExtensionFromReact = async (userId, extensionId) => {
    const extension = await Extension.findById(extensionId);
    if (!extension) {
        throw new Error('The extension does not exist.')
    }

    const extensionLogoutData = {
        userId,
        extensionName: extension.extensionName,
        accessToken: extension.accessToken,
    };

    await addTokenToBlackList(extensionLogoutData);

    extension.isLogin = false;
    extension.isWork = false;
    extension.isWorkBrowser = false;
    extension.accessToken = null;

    await extension.save();

    return extension;
};


// EXTENSION SPECIFIC request ---------------------

// GET ONE(LATEST) product for current user
const getLatestUpdatedProduct = async (userId) => Product.findOne({ owner: userId }).sort({ updatedAt: 1 });

// UPDATE FROM EXTENSION
const updatedProductFromExtension = async (product, productId) => Product.findByIdAndUpdate(productId, product, { runValidators: true, new: true });

// if the product has error update and save error in DB
const updatedProductOnError = async (error, productId) => Product.findByIdAndUpdate(productId, { $set: { error } }, { runValidators: true, new: true });

// CHECK
// If the user remotely starts or stops the extension (changing isWorkBrowser to true is important for the front-end to know it can start or stop the browser remotely)
const checkExtensionDataInDB = async (userId, extensionName) => {
    const extension = await Extension.findOneAndUpdate(
        { extensionName, owner: userId },
        { isWorkBrowser: true },
        { new: true }
    ).select(createExclusionObject());

    return extension;
};

// START extension
const startExtension = async (userId, extensionName) => {
    const extension = await Extension.findOneAndUpdate(
        { extensionName, owner: userId },
        { isWork: true },
        { new: true }
    ).select(createExclusionObject());

    return extension;
};

// STOP working extension
const stopExtension = async (userId, extensionName) => {
    const extension = await Extension.findOneAndUpdate(
        { extensionName, owner: userId },
        { isWork: false },
        { new: true }
    ).select(createExclusionObject());

    return extension;
};

// STOP working extension
const errorExtension = async (userId, extensionName, error) => {
    const extension = await Extension.findOneAndUpdate(
        { extensionName, owner: userId },
        { error, isWork: false },
        { new: true }
    ).select(createExclusionObject());

    return extension;
};

// UTIL FUNCTION  ---------------------

// Exclude properties to return on extension
function createExclusionObject() {
    const excludedFields = ['_id', 'extensionName', 'error', 'owner', 'accessToken', 'isWorkBrowser', 'createdAt', 'updatedAt', '__v'];
    const exclusion = {};
    excludedFields.forEach(field => (exclusion[field] = 0));
    return exclusion;
};


export {
    getAllExtension,
    getOneExtension,
    logoutExtensionFromReact,
    getLatestUpdatedProduct,
    updatedProductFromExtension,
    updatedProductOnError,
    checkExtensionDataInDB,
    startExtension,
    stopExtension,
    errorExtension,
};