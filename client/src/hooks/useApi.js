import { api } from '../api/http-requester.js';
import { useAuthContext } from './useAuthContext.js';

export const useApi = (service) => {
	const { clearUserState, accessToken } = useAuthContext();
	const decoratedApi = api(clearUserState, accessToken);

	const { ...apiServices } = service(decoratedApi);
	return apiServices;
};
