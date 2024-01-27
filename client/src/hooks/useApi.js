import { api } from '../api/http-requester.js';
import { useAppStateContext } from './useAppStateContext.js';
import { useAuthContext } from './useAuthContext.js';

export const useApi = (service) => {
	const { clearAppState } = useAppStateContext();
	const { clearUserState, accessToken } = useAuthContext();

	const decoratedApi = api(clearUserState, clearAppState, accessToken);

	const { ...apiServices } = service(decoratedApi);
	return apiServices;
};
