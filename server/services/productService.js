import { Product } from '../models/Product.js';

// Front-end requests
// GET ONE
const getSingleProduct = (productId) => Product.findById(productId);

// GET ALL
const getAllProducts = (userId) => Product.find({ owner: userId });

// CREATE 
const createProduct = (product, userId) => Product.create({ ...product, owner: userId });

// UPDATE
const updateProduct = (product, productId) => Product.findByIdAndUpdate(productId, product, { runValidators: true, new: true });

// DELETE 
const deleteProduct = (productId) => Product.findByIdAndDelete(productId, { returnDocument: true });


// Extension requests
// GET ONE product for current user
const getLatestUpdatedProduct = (userId) => Product.findOne({ owner: userId }).sort({ updatedAt: 1 });

// UPDATE
const updatedProductFromExtension = (product, productId) => Product.findByIdAndUpdate(productId, product, { runValidators: true, new: true });

export {
    getSingleProduct,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getLatestUpdatedProduct,
    updatedProductFromExtension,
};