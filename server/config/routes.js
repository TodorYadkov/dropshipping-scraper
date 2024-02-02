import logRequests from '../middlewares/displayRequest.js';

import { productController } from '../controllers/productController.js';
import { extensionController } from '../controllers/extensionController.js';
import { userController } from '../controllers/userController.js';
import { adminController } from '../controllers/adminController.js';
import { statisticController } from '../controllers/statisticController.js';

export default (app) => {
	app.use(logRequests());
	
	app.use('/products', productController);
	app.use('/extensions', extensionController);
	app.use('/users', userController);
	app.use('/admin', adminController);
	app.use('/statistics', statisticController);

	app.all('*', (req, res, next) => {
		try {
			throw new Error(`No content - path ${req.path} of method ${req.method} not found`);
		} catch (error) {
			error.statusCode = 404;
			next(error);
		}
	});
};