const homeController = require('express').Router();

homeController.get('/', (req, res) => {
	res.status(200).json({ hello: 'Hello World !' });
});

module.exports = homeController;
