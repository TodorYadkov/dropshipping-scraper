import { Router } from 'express';
import { getSingleProduct, createProduct, updateProduct, deleteProduct, getAllProducts } from '../services/productService.js';
import { validateProductSchema } from '../util/validationSchemes.js';
import { preload } from '../middlewares/preloader.js';
import { isOwner } from '../middlewares/guards.js';
const productController = Router();


// Run preload every time before isOwner guard !!!


// GET
productController.get('/:productId', preload(getSingleProduct), isOwner, async (req, res, next) => {
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
        const products = await getAllProducts(req.user._id);

        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
});

// POST 
productController.post('/', async (req, res, next) => {
    try {
        await validateProductSchema.validateAsync(req.body);
        const newProduct = await createProduct(req.body, req.user._id);

        res.status(201).json(newProduct);
    } catch (err) {
        next(err);
    }
});

// PUT
productController.put('/:productId', preload(getSingleProduct), isOwner, async (req, res, next) => {
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
productController.delete('/:productId', preload(getSingleProduct), isOwner, async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await deleteProduct(productId);

        res.status(200).json(deletedProduct);
    } catch (err) {
        next(err);
    }
});

export { productController };