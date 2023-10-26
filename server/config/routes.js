const homeController = require('../controllers/homeController');
const productController = require('../controllers/productController');


module.exports = (app) => {
	
	app.use('/', homeController);
	app.use('/products', productController);
	app.all('*', (req, res, next) => {
        try {
            throw new Error(`No content - path ${req.path} of method ${req.method} not found`);
        } catch (error) {
            error.statusCode = 404;
            next(error);
        }
    });
};
