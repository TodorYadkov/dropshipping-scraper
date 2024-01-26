import { Router } from 'express';

import { extractASIN } from '../util/extractASIN.js';
import { updateProductSchema, validateExtensionSchema } from '../util/validationSchemes.js';
import { isOwner, isUserLogged } from '../middlewares/guards.js';
import { preload } from '../middlewares/preloader.js';
import {
    getLatestUpdatedProduct,
    updatedProductFromExtension,
    updatedProductOnError,
    checkExtensionDataInDB,
    stopExtension,
    errorExtension,
    startExtension,
    logoutExtension,
    getOneExtension,
    getAllExtension,
    createExtension,
    updateExtension,
    deleteExtension,
    resetErrorExtension,
    reactStartExtension,
    reactStopExtension,
} from '../services/extensionService.js';

const extensionController = Router();

// EXTENSION REACT request ---------------------

// Get all extensions 
extensionController.get('/', isUserLogged, async (req, res, next) => {
    try {
        const userId = req.user._id;

        const extension = await getAllExtension(userId);

        res.status(200).json(extension);
    } catch (err) {
        next(err);
    }
});

// POST - create extension
extensionController.post('/', isUserLogged, async (req, res, next) => {
    try {
        const { extensionName } = req.body;
        const userId = req.user._id;

        await validateExtensionSchema.validateAsync({ extensionName });
        const newExtension = await createExtension(extensionName, userId);

        res.status(201).json(newExtension);
    } catch (err) {
        next(err);
    }
});

// PUT - update extension
extensionController.put('/', isUserLogged, preload(getOneExtension, 'extension'), isOwner, async (req, res, next) => {
    try {
        const { _id, extensionName } = req.body;

        await validateExtensionSchema.validateAsync({ extensionName });
        const editedExtension = await updateExtension(extensionName, _id);

        res.status(200).json(editedExtension);
    } catch (err) {
        next(err);
    }
});

// DELETE - delete extension
extensionController.delete('/:extensionId', isUserLogged, preload(getOneExtension, 'extensionId'), isOwner, async (req, res, next) => {
    try {
        const extensionId = req.params.extensionId;

        const deletedExtension = await deleteExtension(extensionId);

        res.status(200).json(deletedExtension);
    } catch (err) {
        next(err);
    }
});

// PUT request to reset error on extension
extensionController.put('/reset-error', isUserLogged, preload(getOneExtension, 'extension'), isOwner, async (req, res, next) => {
    try {
        const { _id } = req.body;

        const extensionWithoutError = await resetErrorExtension(_id);

        res.status(200).json(extensionWithoutError);
    } catch (err) {
        next(err);
    }
});

// PUT request to start extension from React
extensionController.put('/react-start', isUserLogged, preload(getOneExtension, 'extension'), isOwner, async (req, res, next) => {
    try {
        const { _id } = req.body;

        const startedExtension = await reactStartExtension(_id);

        res.status(200).json(startedExtension);
    } catch (err) {
        next(err);
    }
});

// PUT request to stop extension from React
extensionController.put('/react-stop', isUserLogged, preload(getOneExtension, 'extension'), isOwner, async (req, res, next) => {
    try {
        const { _id } = req.body;

        const stoppedExtension = await reactStopExtension(_id);

        res.status(200).json(stoppedExtension);
    } catch (err) {
        next(err);
    }
});

// Logout extension from React
extensionController.put('/logout', isUserLogged, preload(getOneExtension, 'extension'), isOwner, async (req, res, next) => {
    try {
        const { _id } = req.body;
        const userId = req.user._id;

        const updatedExtension = await logoutExtension(userId, _id);

        res.status(200).json(updatedExtension);
    } catch (err) {
        next(err);
    }
});


// EXTENSION SPECIFIC request ---------------------

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

// Check extension status on server
extensionController.get('/status', isUserLogged, async (req, res, next) => {
    try {
        const extensionId = req.user.extensionId;

        const extensionData = await checkExtensionDataInDB(extensionId);

        res.status(200).json(extensionData);
    } catch (err) {
        next(err);
    }
});

// Set extension property isWork to true
extensionController.put('/start', isUserLogged, async (req, res, next) => {
    try {
        const extensionId = req.user.extensionId;

        const extensionData = await startExtension(extensionId);

        res.status(200).json({ message: `Extension ${extensionData.extensionName} is successfully started.` });
    } catch (err) {
        next(err);
    }
});

// Set extension property isWork to false
extensionController.put('/stop', isUserLogged, async (req, res, next) => {
    try {
        const extensionId = req.user.extensionId;

        const extensionData = await stopExtension(extensionId);

        res.status(200).json({ message: `Extension ${extensionData.extensionName} is successfully stopped.` });
    } catch (err) {
        next(err);
    }
});

// Check if the browser is working
extensionController.put('/error', isUserLogged, async (req, res, next) => {
    try {
        const extensionId = req.user.extensionId;
        const { error } = req.body;

        const extensionData = await errorExtension(extensionId, error);

        res.status(200).json({ message: `Extension ${extensionData.extensionName} is reported for current error.` });
    } catch (err) {
        next(err);
    }
});

export { extensionController };