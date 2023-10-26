const homeController = require('../controllers/homeController');
const productController = require('../controllers/productController');

module.exports = (app) => {
	app.use('/', homeController);
	app.use('/products', productController);
	app.all('*', (req, res) => res.status(404).json({ message: 'Not Found' }));
};
