const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT;

const databaseConfig = require('./config/database.js');
const expressConfig = require('./config/express.js');
const routesConfig = require('./config/routes.js');

async function start() {
	const app = express();

	await databaseConfig();
	expressConfig(app);
	routesConfig(app);

	app.listen(PORT, () =>
		console.log(`Server is listening on port: ${PORT}...`)
	);
}

start();
