import { EXTENSION_FORM_KEYS } from "../../util/constants.js";

export const validationExtensionInput = (inputName, inputValue) => {
    if (inputName === EXTENSION_FORM_KEYS.EXTENSION_NAME) {

        if (inputValue === '') {
            return { [inputName]: 'Extension name is required' };
        }

        if (inputValue.length > 100) {
            return { [inputName]: 'Extension name must be less than 100 characters' };
        }

        return { [inputName]: '' };
    }
}