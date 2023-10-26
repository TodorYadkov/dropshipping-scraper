const { Product } = require('../models/Product.js');

// GET ONE
const getSingleProduct = (productId) => Product.findById(productId);

// GET ALL
const getAllProducts = () => Product.find();

// CREATE 
const createProduct = (product) => Product.create(product);

// UPDATE
const updateProduct = (productId, product) => Product.findByIdAndUpdate(productId, product, { runValidators: true, new: true });

// DELETE 
const deleteProduct = (productId) => Product.findByIdAndDelete(productId, { returnDocument: true });

module.exports = {
    getSingleProduct,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};