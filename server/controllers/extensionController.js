import { Router } from 'express';

import { extractASIN } from '../util/extractASIN.js';
import { updateProductSchema } from '../util/validationSchemes.js';
import { isUserLogged } from '../middlewares/guards.js';
import {
    getLatestUpdatedProduct,
    updatedProductFromExtension,
    updatedProductOnError,
    checkExtensionDataInDB,
    stopExtension,
    errorExtension,
    startExtension
} from '../services/extensionService.js';

const extensionController = Router();

// GET - latest updated product
extensionController.get('/get-one', isUserLogged, async (req, res, next) => {
    try {
        const userId = req.user._id;

        const latestUpdatedProduct = await getLatestUpdatedProduct(userId);

        res.status(200).json(latestUpdatedProduct ?? {});
    } catch (err) {
        next(err);
    }
});

// PUT - update product fom extension
extensionController.put('/put-one', isUserLogged, async (req, res, next) => {
    try {
        const product = req.body;
        const productId = req.body._id;

        product.amazonUrl = extractASIN(product.amazonUrl); // Only for validation purpose
        await updateProductSchema.validateAsync(product);

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

// Check if the browser is working
extensionController.get('/status', isUserLogged, async (req, res, next) => {
    try {
        const userId = req.user._id;
        const extensionName = req.user.extensionName;
        const extensionData = await checkExtensionDataInDB(userId, extensionName);

        res.status(200).json(extensionData);
    } catch (err) {
        next(err);
    }
});

// Set extension property isWork to true
extensionController.put('/start', isUserLogged, async (req, res, next) => {
    try {
        const userId = req.user._id;
        const extensionName = req.user.extensionName;

        const extensionData = await startExtension(userId, extensionName);

        res.status(200).json({ message: `Extension ${extensionName} is successfully stopped.` });
    } catch (err) {
        next(err);
    }
});

// Set extension property isWork to false
extensionController.put('/stop', isUserLogged, async (req, res, next) => {
    try {
        const userId = req.user._id;
        const extensionName = req.user.extensionName;

        const extensionData = await stopExtension(userId, extensionName);

        res.status(200).json({ message: `Extension ${extensionName} is successfully stopped.` });
    } catch (err) {
        next(err);
    }
});

// Check if the browser is working
extensionController.put('/error', isUserLogged, async (req, res, next) => {
    try {
        const userId = req.user._id;
        const extensionName = req.user.extensionName;
        const { error } = req.body;

        const extensionData = await errorExtension(userId, extensionName, error);

        res.status(200).json({ message: `Extension ${extensionName} is reported for current error.` });
    } catch (err) {
        next(err);
    }
});

export { extensionController };