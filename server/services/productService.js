import { Product } from '../models/Product.js';

// Front-end requests
// GET ALL
const getAllProducts = (userId) => Product.find({ owner: userId });

// GET ONE
const getSingleProduct = (productId) => Product.findById(productId);

// CREATE 
const createProduct = (product, userId) => Product.create({ ...product, owner: userId });

// UPDATE
const updateProduct = (product, productId) => Product.findByIdAndUpdate(productId, product, { runValidators: true, new: true });

// DELETE 
const deleteProduct = (productId) => Product.findByIdAndDelete(productId, { returnDocument: true });


// Extension requests
// GET ONE(LATEST) product for current user
const getLatestUpdatedProduct = (userId) => Product.findOne({ owner: userId }).sort({ updatedAt: 1 });

// UPDATE
const updatedProductFromExtension = (product, productId) => Product.findByIdAndUpdate(productId, product, { runValidators: true, new: true });

const updatedProductOnError = (error, productId) => Product.findByIdAndUpdate(productId, { $set: { error } }, { runValidators: true, new: true });

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