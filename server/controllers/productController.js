const { getSingleProduct, createProduct, updateProduct, deleteProduct, getAllProducts } = require('../services/productService.js');
const { validateProductSchema } = require('../util/validationProductSchema.js')
const productController = require('express').Router();

// GET
productController.get('/:productId', async (req, res, next) => {
    try {
        const product = await getSingleProduct(req.params.productId);
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
});

// GET ALL
productController.get('/', async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
});

// POST 
// TODO.. user details
productController.post('/', async (req, res, next) => {
    try {
        await validateProductSchema.validateAsync(req.body);
        const newProduct = await createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        next(err);
    }
});

// PUT
// TODO.. user details
productController.put('/:productId', async (req, res, next) => {
    try {
        await validateProductSchema.validateAsync(req.body);

        const productId = req.params.productId;
        const editedProduct = await updateProduct(productId, req.body);

        res.status(200).json(editedProduct);
    } catch (err) {
        next(err);
    }
});

// DELETE
productController.delete('/:productId', async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await deleteProduct(productId);

        res.status(200).json(deletedProduct);
    } catch (err) {
        next(err);
    }
});

module.exports = productController;