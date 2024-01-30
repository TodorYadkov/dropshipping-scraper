import { multiBrowser } from '../constants/constants.js';

// TODO Choose between local and session storage

export const setData = (data) => {
	return new Promise((resolve) => {
		multiBrowser.storage.local.set(data, () => resolve());
	});
};

export const getData = (keys) => {
	return new Promise((resolve) => {
		multiBrowser.storage.local.get(keys, (result) => resolve(result));
	});
};

export const removeData = (keys) => {
	return new Promise((resolve) => {
		multiBrowser.storage.local.remove(keys, () => resolve());
	});
};