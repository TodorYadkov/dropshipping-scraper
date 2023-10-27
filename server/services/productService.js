import { Product } from '../models/Product.js';

// GET ONE
const getSingleProduct = (productId) => Product.findById(productId);

// GET ALL
const getAllProducts = () => Product.find();
// TODO Add userId as parameter

// CREATE 
const createProduct = (product) => Product.create(product);
// TODO Add userId as parameter

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