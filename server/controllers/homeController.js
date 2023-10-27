import { Router } from 'express';
const homeController = Router();

homeController.get('/', (req, res) => res.status(200).json({ hello: 'Hello World !' }));

export { homeController };
