const { Product } = require('../models/Product.js');

// GET ONE
const getSingleProduct = (productId) => Product.findById(productId);

// GET ALL
const getAllProduct = () => Product.find();