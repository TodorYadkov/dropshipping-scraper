import { json, urlencoded } from 'express';

import cors from '../middlewares/cors.js';
import userSession from '../middlewares/userSession.js';
import tokenBlackListMiddleware from '../middlewares/tokenBlackListMiddleware.js';
import { stopBlackListInterval, tokenBlackListConfig } from './tokenBlackListConfig.js';
import { checkWorkingExtension, stopCheckWorkingExtension } from '../util/checkWorkingExtension.js';

export default async (app) => {
	const tokenBlackList = await tokenBlackListConfig();

	app.use(cors());
	app.use(json());
	app.use(urlencoded({ extended: true }));
	app.use(tokenBlackListMiddleware(tokenBlackList));
	app.use(userSession());

	// Run the scheduled task
	checkWorkingExtension();

	// Handle shutdown to stop the checkWorkingExtension
	process.on('SIGINT', () => {
		stopCheckWorkingExtension();
		stopBlackListInterval();
		process.exit();
	});
};
