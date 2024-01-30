import { SORTING_KEYS, USER_ROLES } from './constants.js';

export const sortingData = (sortBy, data) => {
    const sortFunctions = {
        [SORTING_KEYS.PRODUCT_NAME_ASC]: (a, b) => a.name.localeCompare(b.name),
        [SORTING_KEYS.PRODUCT_NAME_DESC]: (a, b) => b.name.localeCompare(a.name),
        [SORTING_KEYS.PRODUCT_AMAZON_PRICE_ASC]: (a, b) => a.priceAmazon - b.priceAmazon,
        [SORTING_KEYS.PRODUCT_AMAZON_PRICE_DESC]: (a, b) => b.priceAmazon - a.priceAmazon,
        [SORTING_KEYS.PRODUCT_EBAY_PRICE_ASC]: (a, b) => a.priceEbay - b.priceEbay,
        [SORTING_KEYS.PRODUCT_EBAY_PRICE_DESC]: (a, b) => b.priceEbay - a.priceEbay,
        [SORTING_KEYS.PRODUCT_PROFIT_ASC]: (a, b) => a.profit - b.profit,
        [SORTING_KEYS.PRODUCT_PROFIT_DESC]: (a, b) => b.profit - a.profit,
        [SORTING_KEYS.PRODUCT_AVAILABILITY_ASC]: (a, b) => (a.availability === 'Out of Stock' || a.availability === 'Not available') ? -1 : (b.availability === 'Out of Stock' || b.availability === 'Not available') ? 1 : 0,
        [SORTING_KEYS.PRODUCT_AVAILABILITY_DESC]: (a, b) => (a.availability === 'Out of Stock' || a.availability === 'Not available') ? 1 : (b.availability === 'Out of Stock' || b.availability === 'Not available') ? -1 : 0,
        [SORTING_KEYS.PRODUCT_ERROR_ASC]: (a, b) => (a.error === null) ? -1 : (b.error === null) ? 1 : 0,
        [SORTING_KEYS.PRODUCT_ERROR_DESC]: (a, b) => (a.error === null) ? 1 : (b.error === null) ? -1 : 0,
        [SORTING_KEYS.PRODUCT_LAST_UPDATED_ASC]: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
        [SORTING_KEYS.PRODUCT_LAST_UPDATED_DESC]: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),

        [SORTING_KEYS.EXTENSION_NAME_ASC]: (a, b) => a.extensionName.localeCompare(b.extensionName),
        [SORTING_KEYS.EXTENSION_NAME_DESC]: (a, b) => b.extensionName.localeCompare(a.extensionName),
        [SORTING_KEYS.EXTENSION_LOGGED_ASC]: (a, b) => b.isLogin - a.isLogin,
        [SORTING_KEYS.EXTENSION_LOGGED_DESC]: (a, b) => a.isLogin - b.isLogin,
        [SORTING_KEYS.EXTENSION_WORKING_ASC]: (a, b) => b.isWork - a.isWork,
        [SORTING_KEYS.EXTENSION_WORKING_DESC]: (a, b) => a.isWork - b.isWork,
        [SORTING_KEYS.EXTENSION_LAST_SEEN_ASC]: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
        [SORTING_KEYS.EXTENSION_LAST_SEEN_DESC]: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
        [SORTING_KEYS.EXTENSION_ERROR_ASC]: (a, b) => (a.error === null) ? -1 : (b.error === null) ? 1 : 0,
        [SORTING_KEYS.EXTENSION_ERROR_DESC]: (a, b) => (a.error === null) ? 1 : (b.error === null) ? -1 : 0,

        [SORTING_KEYS.USER_NAME_ASC]: (a, b) => a.name.localeCompare(b.name),
        [SORTING_KEYS.USER_NAME_DESC]: (a, b) => b.name.localeCompare(a.name),
        [SORTING_KEYS.USER_EMAIL_ASC]: (a, b) => a.email.localeCompare(b.email),
        [SORTING_KEYS.USER_EMAIL_DESC]: (a, b) => b.email.localeCompare(a.email),
        [SORTING_KEYS.USER_LOGIN_STATUS_ASC]: (a, b) => b.isLogin - a.isLogin,
        [SORTING_KEYS.USER_LOGIN_STATUS_DESC]: (a, b) => a.isLogin - b.isLogin,
        [SORTING_KEYS.USER_EXTENSIONS_ASC]: (a, b) => a.extensionCount - b.extensionCount,
        [SORTING_KEYS.USER_EXTENSIONS_DESC]: (a, b) => b.extensionCount - a.extensionCount,
        [SORTING_KEYS.USER_PRODUCTS_ASC]: (a, b) => a.productCount - b.productCount,
        [SORTING_KEYS.USER_PRODUCTS_DESC]: (a, b) => b.productCount - a.productCount,
        [SORTING_KEYS.USER_ROLE_USER]: customRoleSort(USER_ROLES.USER),
        [SORTING_KEYS.USER_ROLE_PREMIUM]: customRoleSort(USER_ROLES.PREMIUM),
        [SORTING_KEYS.USER_ROLE_ADMIN]: customRoleSort(USER_ROLES.ADMIN),
        [SORTING_KEYS.USER_ACCOUNT_STATUS_ASC]: (a, b) => b.isDisable - a.isDisable,
        [SORTING_KEYS.USER_ACCOUNT_STATUS_DESC]: (a, b) => a.isDisable - b.isDisable,
    };

    data.sort(sortFunctions[sortBy] || ((a, b) => a - b));
}

function customRoleSort(selectedRole) {
    return (a, b) => {

        if (a.role === selectedRole && b.role === selectedRole) {
            return 0;
        } else if (a.role === selectedRole) {
            return -1;
        } else if (b.role === selectedRole) {
            return 1;
        } else {
            // Sort non-selected roles alphabetically
            return a.role.localeCompare(b.role);
        }
    };
}