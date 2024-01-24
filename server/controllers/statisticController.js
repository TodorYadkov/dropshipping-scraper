import { Router } from 'express';

import { isUserLogged } from '../middlewares/guards.js';
import { getGeneralStatistic } from '../services/statisticService.js';

const statisticController = Router();

statisticController.get('/general', isUserLogged, async (req, res, next) => {
    try {
        const userId = req.user._id;

        const generalStatistic = await getGeneralStatistic(userId);

        res.status(200).json(generalStatistic);
    } catch (err) {
        next(err);
    }
});

export { statisticController };