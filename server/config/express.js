import { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from '../middlewares/cors.js';
import userSession from '../middlewares/userSession.js';
import tokenBlackListConfig from './tokenBlackListConfig.js';
import tokenBlackListMiddleware from '../middlewares/tokenBlackListMiddleware.js';

export default async (app) => {
	const tokenBlackList = await tokenBlackListConfig();

	app.use(cors());
	app.use(json());
	app.use(urlencoded({ extended: true }));
	app.use(tokenBlackListMiddleware(tokenBlackList));
	app.use(userSession());
	// app.use(cookieParser()); 				//	TODO.. add if needed
};
