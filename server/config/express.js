import { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from '../middlewares/cors.js';
import userSession from '../middlewares/userSession.js';

export default (app) => {
	app.use(cors());
	app.use(json());
	app.use(urlencoded({ extended: true }));
	app.use(userSession());
	// app.use(cookieParser()); 				//	TODO.. add if needed
};
