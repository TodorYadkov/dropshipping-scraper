import { HOST } from './endPoints.js';
import { tokenName } from '../constants/constants.js';
import { getData, removeData } from '../util/storageActions.js';

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

    const userDetails = await getData([tokenName]);
    if (userDetails['accessToken'] !== undefined) {
        options.headers['X-Authorization'] = userDetails.accessToken;
    }

    const response = await fetch(url, options);
    if (response.ok === false) {
        if (response.status === 403) {
            await removeData([tokenName])
        }

        const error = await response.json();
        throw error;
    }

    return response.json();
}

export const api = {
    get: (endpoint) => httpRequester('GET', endpoint),
    post: (endpoint, data) => httpRequester('POST', endpoint, data),
    put: (endpoint, data) => httpRequester('PUT', endpoint, data),
    delete: (endpoint) => httpRequester('DELETE', endpoint)
};

// https://www.amazon.com/dp/B00NLZUM36