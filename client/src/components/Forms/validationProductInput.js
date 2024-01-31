import { PRODUCT_FORM_KEYS } from '../../util/constants.js';

export const validationProductInput = (inputName, inputValue) => {
    if (inputName === PRODUCT_FORM_KEYS.AMAZON) {
        const amazonUrlRegex = /^https?:\/\/(www\.)?amazon\..*$/;
        const asinRegex = /^[A-Z0-9]{10}$/;

        if (inputValue === '') {
            return { [inputName]: 'Amazon URL or ASIN is required' };
        }

        if (inputValue.length >= 11 && inputValue.includes('amazon') === false) {
            return { [inputName]: 'URL is not from Amazon' };
        }

        if (inputValue.length <= 10 && asinRegex.test(inputValue) === false) {
            return { [inputName]: 'Invalid Amazon ASIN' };
        }

        if ((amazonUrlRegex.test(inputValue) === false) && !asinRegex.test(inputValue)) {
            return { [inputName]: 'URL must start with https://www.' };
        }

        return { [inputName]: '' };
    }

    if (inputName === PRODUCT_FORM_KEYS.EBAY) {
        const ebayUrlRegex = /^https?:\/\/(www\.)?ebay\..*$/;
        const itemIDRegex = /^\d{12}$/;

        if (inputValue === '') {
            return { [inputName]: '' };
        }

        if (inputValue.length >= 13 && inputValue.includes('ebay') === false) {
            return { [inputName]: 'URL is not from eBay' };
        }

        if (inputValue.length <= 12 && itemIDRegex.test(inputValue) === false) {
            return { [inputName]: 'Invalid eBay item' };
        }

        if ((ebayUrlRegex.test(inputValue) === false) && !itemIDRegex.test(inputValue)) {
            return { [inputName]: 'URL must start with https://www.' };
        }

        return { [inputName]: '' };
    }
};