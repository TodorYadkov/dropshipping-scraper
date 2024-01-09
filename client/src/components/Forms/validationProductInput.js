import { PRODUCT_FORM_KEYS } from "../../util/constants.js";

export const validationProductInput = (inputName, inputValue) => {
    switch (inputName) {
        case PRODUCT_FORM_KEYS.AMAZON:
            if (inputValue === '') {
                return { [inputName]: 'Amazon Url is required' };
            }
        case PRODUCT_FORM_KEYS.EBAY:
            if (inputValue === '') {
                return { [inputName]: 'Ebay Url is required' };
            }
        default:
            return { [inputName]: '' };
    }
}