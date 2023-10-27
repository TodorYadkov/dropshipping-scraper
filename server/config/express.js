import { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from '../middlewares/cors.js';

export default (app) => {
	app.use(cors());
	app.use(json());
	app.use(urlencoded({ extended: true }));
	app.use(cookieParser());

	// TODO Create these two middlewares 
	// app.use(session());
	// app.use(trimBody());
};
