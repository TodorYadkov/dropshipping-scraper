import { SERVER_PATHS } from '../util/paths.js';

export const statisticService = (api) => {

	const getGeneralStatistic = async () => api.get(SERVER_PATHS.GET_GENERAL_STATISTICS);

	const getExtensionsStatistic = async () => api.get(SERVER_PATHS.GET_EXTENSIONS_STATISTICS);

	return {
		getGeneralStatistic,
		getExtensionsStatistic,
	};
};
