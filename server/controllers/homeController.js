const homeController = require('express').Router();

homeController.get('/', (req, res) => {
	res.send('<h1>Hello World !</h1>');
});

homeController.get('/json', (req, res) => {
	res.status(200).json({ hello: 'Hello World !' });
});

module.exports = homeController;
