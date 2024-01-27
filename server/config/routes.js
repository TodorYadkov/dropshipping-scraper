import logRequests from '../middlewares/displayRequest.js';
import { productController } from '../controllers/productController.js';
import { userController } from '../controllers/userController.js';
import { statisticController } from '../controllers/statisticController.js';
import { extensionController } from '../controllers/extensionController.js';
import { adminController } from '../controllers/adminController.js';

export default (app) => {
	app.use(logRequests()); // Logging every request
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
