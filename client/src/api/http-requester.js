import { SERVER_PATHS } from '../util/paths.js';

async function httpRequester(method, endpoint, clearUserState, clearAppState, accessToken, data) {
	const url = SERVER_PATHS.HOST + endpoint;
	const options = {
		method,
		headers: {}
	};

	if (data instanceof FormData) {
		options.body = data;
	} else if (data != undefined) {
		options.headers['Content-Type'] = 'application/json';
		options.body = JSON.stringify(data);
	}

	if (accessToken) {
		options.headers['X-Authorization'] = accessToken;
	}

	const response = await fetch(url, options);
	if (response.ok === false) {
		if (response.status === 403) {
			clearUserState();
			clearAppState();
		}

		const error = await response.json();
		throw error;
	}

	return response.json();

}

export const api = (clearUserState, clearAppState, accessToken) => ({
	get: (endpoint) => httpRequester('GET', endpoint, clearUserState, clearAppState, accessToken),
	post: (endpoint, data) => httpRequester('POST', endpoint, clearUserState, clearAppState, accessToken, data),
	put: (endpoint, data) => httpRequester('PUT', endpoint, clearUserState, clearAppState, accessToken, data),
	delete: (endpoint) => httpRequester('DELETE', endpoint, clearUserState, clearAppState, accessToken),
});