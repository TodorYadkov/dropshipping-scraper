const { getSingleProduct, createProduct, updateProduct, deleteProduct, getAllProducts } = require('../services/productService');
const { validateProductSchema } = require('../util/validationProductSchema.js')
const productController = require('express').Router();

// GET
productController.get('/:productId', async (req, res) => {
    try {
        const product = await getSingleProduct(req.params.productId);
        res.status(200).json(product);
    } catch (err) {
        console.log(err.message);
        console.error(err);
        //TODO...
    }
});

// GET ALL
productController.get('/', async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        console.log(err.message);
        console.error(err);
        //TODO...
    }
});

// POST 
// TODO.. user details
productController.post('/', async (req, res) => {
    try {
        await validateProductSchema.validateAsync(req.body);
        const newProduct = await createProduct(req.body);
        res.status(200).json(newProduct);
    } catch (err) {
        console.log(err.message);
        console.error(err);
        //TODO...
    }
});

// PUT
// TODO.. user details
productController.put('/:productId', async (req, res) => {
    try {
        await validateProductSchema.validateAsync(req.body);

        const productId = req.params.productId;
        const editedProduct = await updateProduct(productId, req.body);

        res.status(200).json(editedProduct);
    } catch (err) {
        console.log(err.message);
        console.error(err);
        //TODO...
    }
});

// DELETE
productController.delete('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await deleteProduct(productId);

        res.status(200).json(deletedProduct);
    } catch (err) {
        console.log(err.message);
        console.error(err);
        //TODO...
    }
});

module.exports = productController;