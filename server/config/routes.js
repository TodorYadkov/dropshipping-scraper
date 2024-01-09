import { homeController } from '../controllers/homeController.js';
import { productController } from '../controllers/productController.js';
import { statisticController } from '../controllers/statisticController.js';
import { userController } from '../controllers/userController.js';
import logRequests from '../middlewares/displayRequest.js';

export default (app) => {
	app.use(logRequests()); // Logging every request
	app.use('/', homeController);
	app.use('/products', productController);
	app.use('/users', userController);
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
