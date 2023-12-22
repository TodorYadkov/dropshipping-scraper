import { Router } from 'express';
import { extractASIN } from '../util/extractASIN.js';
import { preload } from '../middlewares/preloader.js';
import { isOwner, isUserLogged } from '../middlewares/guards.js';
import { updateProductSchema, validateProductSchema } from '../util/validationSchemes.js';
import {
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getLatestUpdatedProduct,
    updatedProductFromExtension,
    updatedProductOnError
} from '../services/productService.js';

const productController = Router();

// Front - End requests
// GET
productController.get('/:productId', isUserLogged, preload(getSingleProduct), isOwner, async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await getSingleProduct(productId);

        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
});

// GET ALL
productController.get('/', isUserLogged, async (req, res, next) => {
    try {
        const userId = req.user._id;
        const products = await getAllProducts(userId);

        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
});

// POST 
productController.post('/', isUserLogged, async (req, res, next) => {
    try {
        const product = req.body;
        const userId = req.user._id;

        product.amazonUrl = extractASIN(product.amazonUrl);

        await validateProductSchema.validateAsync(product);
        const newProduct = await createProduct(product, userId);

        res.status(201).json(newProduct);
    } catch (err) {
        next(err);
    }
});

// PUT
productController.put('/:productId', isUserLogged, preload(getSingleProduct), isOwner, async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = req.body;

        await updateProductSchema.validateAsync(product);
        const editedProduct = await updateProduct(product, productId);

        res.status(200).json(editedProduct);
    } catch (err) {
        next(err);
    }
});

// DELETE
productController.delete('/:productId', isUserLogged, preload(getSingleProduct), isOwner, async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await deleteProduct(productId);

        res.status(200).json(deletedProduct);
    } catch (err) {
        next(err);
    }
});


// Extension - requests
// GET - latest updated product
productController.get('/extension/get-one', isUserLogged, async (req, res, next) => {
    try {
        const userId = req.user._id;
        const latestUpdatedProduct = await getLatestUpdatedProduct(userId);

        res.status(200).json(latestUpdatedProduct ?? {});
    } catch (err) {
        next(err);
    }
});

// PUT - update product fom extension
productController.put('/extension/put-one', isUserLogged, async (req, res, next) => {
    try {
        const product = req.body;
        const productId = req.body._id;

        product.amazonUrl = extractASIN(product.amazonUrl);
        await updateProductSchema.validateAsync(product);
        
        product.error = null;
        const updatedProduct = await updatedProductFromExtension(product, productId);

        res.status(200).json(updatedProduct);
    } catch (err) {
        if (err.isJoi) {
            // Joi library validation error
            const productId = req.body._id;
            const errorMessage = err.details.map(error => error.message).join(', ');
            await updatedProductOnError(errorMessage, productId)
        }

        next(err);
    }
});

export { productController };