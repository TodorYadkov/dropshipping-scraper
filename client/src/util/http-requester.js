import { HOST, USER_DATA } from './constants.js';

async function httpRequester(method, endpoint, data) {
	const url = HOST + endpoint;
	const options = {
		method,
		headers: {}
	};

	if (data) {
		options.headers['Content-Type'] = 'application/json';
		options.body = JSON.stringify(data);
	}

	const userData = localStorage.getItem(USER_DATA);
	if (userData) {
		options.headers['X-Authorization'] = userData.accessToken;
	}

	try {
		const response = await fetch(url, options);
		if (response.ok === false) {
			if (response.status === 403) {
				localStorage.removeItem(USER_DATA);
			}

			const error = await response.json();
			throw error;
		}

		return response.json();
	} catch (error) {
		throw error.message;
	}
}

export const api = {
	get: (endpoint) => httpRequester('GET', endpoint),
	post: (endpoint, data) => httpRequester('POST', endpoint, data),
	put: (endpoint, data) => httpRequester('PUT', endpoint, data),
	delete: (endpoint) => httpRequester('DELETE', endpoint)
};
