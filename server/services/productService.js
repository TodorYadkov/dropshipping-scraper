import { Product } from '../models/Product.js';
import { ExtensionStatus } from '../models/ExtensionStatus.js';

// Front-end requests
// GET ALL
const getAllProducts = async (userId) => Product.find({ owner: userId }).sort({ createdAt: -1 });

// GET ONE
const getSingleProduct = async (productId) => Product.findById(productId);

// CREATE 
const createProduct = async (product, userId) => Product.create({ ...product, owner: userId });

// UPDATE
const updateProduct = async (product, productId) => Product.findByIdAndUpdate(productId, product, { runValidators: true, new: true });

// DELETE 
const deleteProduct = async (productId) => Product.findByIdAndDelete(productId, { returnDocument: true });


// Extension requests
// GET ONE(LATEST) product for current user
const getLatestUpdatedProduct = async (userId, extensionName) => {
    const product = await Product.findOne({ owner: userId }).sort({ updatedAt: 1 });
    const updatedExtensionStatus = await ExtensionStatus.findOneAndUpdate(
        { userId, extensionName },
        { isWork: true },
        { new: true }
    );

    return product;
};

// UPDATE
const updatedProductFromExtension = async (product, productId) => Product.findByIdAndUpdate(productId, product, { runValidators: true, new: true });

const updatedProductOnError = async (error, productId) => Product.findByIdAndUpdate(productId, { $set: { error } }, { runValidators: true, new: true });

export {
    getSingleProduct,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getLatestUpdatedProduct,
    updatedProductFromExtension,
    updatedProductOnError,
};