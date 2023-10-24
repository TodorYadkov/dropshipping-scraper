const homeController = require('../controllers/homeController');

module.exports = (app) => {
	app.use('/', homeController);
};
