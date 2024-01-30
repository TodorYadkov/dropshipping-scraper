import { json, urlencoded } from 'express';

import { checkWorkingExtension, stopCheckWorkingExtension } from '../util/checkWorkingExtension.js';

import cors from '../middlewares/cors.js';
import tokenBlackListMiddleware from '../middlewares/tokenBlackListMiddleware.js';
import userSession from '../middlewares/userSession.js';
import checkUserIsDisabled from '../middlewares/checkUserIsDisabled.js';

import { stopBlackListInterval, tokenBlackListConfig } from './tokenBlackListConfig.js';

export default async (app) => {
	const tokenBlackList = await tokenBlackListConfig();

	app.use(cors());
	app.use(json());
	app.use(urlencoded({ extended: true }));
	app.use(tokenBlackListMiddleware(tokenBlackList));
	app.use(userSession());
	app.use(checkUserIsDisabled());

	// Run the scheduled task
	checkWorkingExtension();

	// Handle shutdown to stop the checkWorkingExtension
	process.on('SIGINT', () => {
		stopCheckWorkingExtension();
		stopBlackListInterval();
		process.exit();
	});
};