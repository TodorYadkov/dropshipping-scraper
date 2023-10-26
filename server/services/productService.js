const { Product } = require('../models/Product.js');

// GET
const getSingleProduct = (productId) => Product.findById(productId);




