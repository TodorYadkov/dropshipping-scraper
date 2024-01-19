import { AUTH_FORM_KEYS, patternEmail } from '../../util/constants.js';

export const validationUserInput = (inputName, inputValue) => {
	if (inputName === AUTH_FORM_KEYS.name) {
		if (inputValue === '') {
			return { [inputName]: 'Name is required' };
		}

		if (inputValue.length > 50) {
			return { [inputName]: 'Name must be less than 50 characters' };
		}

		return { [inputName]: '' };
	}

	if (inputName === AUTH_FORM_KEYS.email) {
		if (inputValue === '') {
			return { [inputName]: 'Email is required' };
		}

		if (inputValue.match(patternEmail) === null) {
			return { [inputName]: 'Email is invalid' };
		}

		return { [inputName]: '' };
	}

	if (inputName === AUTH_FORM_KEYS.password) {
		if (inputValue === '') {
			return { [inputName]: 'Password is required' };
		}

		if (inputValue.length < 8) {
			return { [inputName]: 'Password must be at least 8 characters' };
		}

		if (inputValue.length > 20) {
			return { [inputName]: 'Password must be less than 20 characters' };
		}

		return { [inputName]: '' };
	}

	if (inputName === AUTH_FORM_KEYS.extensionName) {
		if (inputValue === '') {
			return { [inputName]: 'Extension name is required' };
		}

		if (inputValue.length < 5) {
			return { [inputName]: 'Extension name must be at least 5 characters' };
		}

		if (inputValue.length > 100) {
			return { [inputName]: 'Extension name must be less than 100 characters' };
		}

		return { [inputName]: '' };
	}

	if (inputName == AUTH_FORM_KEYS.uploadAvatar) {
		//It's a optional property
		return { [inputName]: '' };
	}
};
