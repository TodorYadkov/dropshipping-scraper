import { homeController } from '../controllers/homeController.js';
import { productController } from '../controllers/productController.js';
import { userController } from '../controllers/userController.js';
import { isUserLogged } from '../middlewares/guards.js';
import logRequests from '../middlewares/displayRequest.js';

export default (app) => {
	app.use(logRequests()); // Logging every request
	app.use('/', homeController);
	app.use('/products', isUserLogged, productController);
	app.use('/users', userController);
	app.all('*', (req, res, next) => {
		try {
			throw new Error(`No content - path ${req.path} of method ${req.method} not found`);
		} catch (error) {
			error.statusCode = 404;
			next(error);
		}
	});
};
