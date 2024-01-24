import { SORTING_KEYS } from "./constants.js";

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
    };

    data.sort(sortFunctions[sortBy] || ((a, b) => a - b));
}