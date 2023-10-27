import { Product } from '../models/Product.js';

// GET ONE
const getSingleProduct = (productId) => Product.findById(productId);

// GET ALL
const getAllProducts = (userId) => Product.find({ owner: userId });

// CREATE 
const createProduct = (product, userId) => Product.create({...product, owner: userId});

// UPDATE
const updateProduct = (productId, product) => Product.findByIdAndUpdate(productId, product, { runValidators: true, new: true });

// DELETE 
const deleteProduct = (productId) => Product.findByIdAndDelete(productId, { returnDocument: true });

export {
    getSingleProduct,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};