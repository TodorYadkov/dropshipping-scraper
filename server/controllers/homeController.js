const homeController = require('express').Router();

homeController.get('/', (req, res) => {
	res.send('<h1>Hello World !</h1>');
});

module.exports = homeController;
