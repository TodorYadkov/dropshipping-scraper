import { SERVER_PATHS } from '../util/paths.js';

async function httpRequester(method, endpoint, clearUserState, accessToken, data) {
	const url = SERVER_PATHS.HOST + endpoint;
	const options = {
		method,
		headers: {}
	};

	if (data) {
		options.headers['Content-Type'] = 'application/json';
		options.body = JSON.stringify(data);
	}

	if (accessToken) {
		options.headers['X-Authorization'] = accessToken;
	}

	try {
		const response = await fetch(url, options);
		if (response.ok === false) {
			if (response.status === 403) {
				clearUserState();
			}

			const error = await response.json();
			throw error;
		}

		return response.json();
	} catch (error) {
		throw error.message;
	}
}

export const api = (clearUserState, accessToken) => ({
	get: (endpoint) => httpRequester('GET', endpoint, clearUserState, accessToken),
	post: (endpoint, data) => httpRequester('POST', endpoint, clearUserState, accessToken, data),
	put: (endpoint, data) => httpRequester('PUT', endpoint, clearUserState, accessToken, data),
	delete: (endpoint) => httpRequester('DELETE', endpoint, clearUserState, accessToken)
});
