import { SORTING_KEYS } from "./constants.js";

export const sortingData = (sortBy, products) => {
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
        [SORTING_KEYS.PRODUCT_LAST_UPDATED_DESC]: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
    };

    products.sort(sortFunctions[sortBy] || ((a, b) => a - b));
}