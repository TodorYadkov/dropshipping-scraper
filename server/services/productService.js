import { Product } from '../models/Product.js';

// Front-end requests
// GET ALL
const getAllProducts = async (userId) => Product.find({ owner: userId }).sort({ createdAt: -1 });

// GET ONE
const getSingleProduct = async (productId) => Product.findById(productId);

// CREATE 
const createProduct = async (product, userId) => Product.create({ ...product, owner: userId });

// UPDATE
const updateProduct = async (product, productId) => {
    await Product.updateOne({ _id: productId }, product, { runValidators: true });
    const updatedProduct = await Product.findById(productId);

    return updatedProduct;
};

// DELETE 
const deleteProduct = async (productId) => Product.findByIdAndDelete(productId, { returnDocument: true });

export {
    getSingleProduct,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};