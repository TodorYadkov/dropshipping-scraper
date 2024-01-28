import { Router } from 'express';

import { extractASIN } from '../util/extractASIN.js';
import { extractItemIdEbay } from '../util/extractItemIdEbay.js';
import { updateProductSchema, validateProductSchema } from '../util/validationSchemes.js';
import { preload } from '../middlewares/preloader.js';
import { PRELOAD_OPTIONS } from '../environments/preloadOptions.js';
import { isOwner, isUserLogged } from '../middlewares/guards.js';
import {
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts
} from '../services/productService.js';

const productController = Router();

// Front - End requests
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

// GET
productController.get('/:productId', isUserLogged, preload(getSingleProduct, PRELOAD_OPTIONS.PRODUCT), isOwner, async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await getSingleProduct(productId);

        res.status(200).json(product);
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
        product.ebayUrl = extractItemIdEbay(product.ebayUrl);

        await validateProductSchema.validateAsync(product);
        const newProduct = await createProduct(product, userId);

        res.status(201).json(newProduct);
    } catch (err) {
        next(err);
    }
});

// PUT
productController.put('/:productId', isUserLogged, preload(getSingleProduct, PRELOAD_OPTIONS.PRODUCT), isOwner, async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = req.body;

        product.amazonUrl = extractASIN(product.amazonUrl);
        product.ebayUrl = extractItemIdEbay(product.ebayUrl);

        await updateProductSchema.validateAsync(product);
        const editedProduct = await updateProduct(product, productId);

        res.status(200).json(editedProduct);
    } catch (err) {
        next(err);
    }
});

// DELETE
productController.delete('/:productId', isUserLogged, preload(getSingleProduct, PRELOAD_OPTIONS.PRODUCT), isOwner, async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await deleteProduct(productId);

        res.status(200).json(deletedProduct);
    } catch (err) {
        next(err);
    }
});

export { productController };