import express from 'express';
import dotenv from 'dotenv';

import databaseConfig from './config/database.js';
import expressConfig from './config/express.js';
import routesConfig from './config/routes.js';
import globalErrorHandling from './util/globalErrorHandler.js';

const PORT = process.env.PORT;
dotenv.config();

async function start() {
	const app = express();

	await databaseConfig();
	expressConfig(app);
	routesConfig(app);
	app.use(globalErrorHandling);

	app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}...`));
}

start();