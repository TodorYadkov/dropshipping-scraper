import { Product } from '../models/Product.js';
import { Extension } from '../models/Extension.js';

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
    );

    return extension;
};

// START extension
const startExtension = async (userId, extensionName) => {
    const extension = await Extension.findOneAndUpdate(
        { extensionName, owner: userId },
        { isWork: true },
        { new: true }
    );

    return extension;
};

// STOP working extension
const stopExtension = async (userId, extensionName) => {
    const extension = await Extension.findOneAndUpdate(
        { extensionName, owner: userId },
        { isWork: false },
        { new: true }
    );

    return extension;
};

// STOP working extension
const errorExtension = async (userId, extensionName, error) => {
    const extension = await Extension.findOneAndUpdate(
        { extensionName, owner: userId },
        { error, isWork: false },
        { new: true }
    );

    return extension;
};

export {
    getLatestUpdatedProduct,
    updatedProductFromExtension,
    updatedProductOnError,
    checkExtensionDataInDB,
    startExtension,
    stopExtension,
    errorExtension,
};