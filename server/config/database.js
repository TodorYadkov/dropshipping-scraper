const mongoose = require('mongoose');

// Configure dotenv library
require('dotenv').config();

// Get environment variable for connection string
const CONNECTION_STRING = process.env.CONNECTION_STRING;

module.exports = async (app) => {
	try {
		await mongoose.connect(CONNECTION_STRING);
		console.log('Database successfully connected');
	} catch (error) {
		console.error('Error initializing database');
		console.error(error.message);
		process.exit(1);
	}
};
