import { SERVER_PATHS } from '../util/paths.js';

export const statisticService = (api) => {
	const getGeneralStatistic = async () => api.get(SERVER_PATHS.GET_GENERAL_STATISTICS);

	return {
		getGeneralStatistic,
	};
};