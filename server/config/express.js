const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('../middlewares/cors.js');

module.exports = (app) => {
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser());

	// TODO Create these two middlewares 
	// app.use(session());
	// app.use(trimBody());
};
