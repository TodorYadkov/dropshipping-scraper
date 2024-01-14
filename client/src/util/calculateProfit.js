/* eslint-disable no-prototype-builtins */
import { EXTERNAL_API_PATHS } from "./paths.js";

const calculateProfitForProduct = (product, currentExchangeRate) => {
    if (product.priceAmazon === null || product.priceEbay === null) {
        return null;
    }

    if (product.currencyAmazon === product.currencyEbay) {
        return (parseFloat(product.priceEbay) - parseFloat(product.priceAmazon)).toFixed(2);
    }

    const exchangeRate = currentExchangeRate[product.currencyAmazon.toLocaleLowerCase()];
    const priceInBaseCurrency = exchangeRate * product.priceEbay;

    product.priceEbayOriginal = product.priceEbay;
    product.currencyEbayOriginal = product.currencyEbay;

    product.priceEbay = priceInBaseCurrency;
    product.currencyEbay = product.currencyAmazon;

    const profitInBaseCurrency = priceInBaseCurrency - product.priceAmazon;

    return parseFloat(profitInBaseCurrency.toFixed(2));
}

export const calculateProfit = async (products, exchangeRates) => {
    if (products.length === 0) {
        return products;
    }

    const productsWithProfit = products.map(product => {
        const ebayCurrencyExchangeRate = exchangeRates[product?.currencyEbay?.toLocaleLowerCase()];
        if (!ebayCurrencyExchangeRate) {
            return { ...product, profit: null };
        }

        const currentExchangeRate = ebayCurrencyExchangeRate[product.currencyEbay.toLocaleLowerCase()];
        const profit = calculateProfitForProduct(product, currentExchangeRate);
        return { ...product, profit };
    });

    return productsWithProfit;
}

// Memoized function for currencyCourses calculation
export const memoizedCalculateCurrencyCourses = async (
    products,
    productExchangeCourse,
    setProductExchangeCourseHandler,
    addAlertMessage
) => {
    try {
        // Determine main currencies from products
        const mainCurrencies = new Set(
            products.map((p) => p.currencyEbay ? p.currencyEbay.toLocaleLowerCase() : 'usd')
        );

        // Initialize an object to store all available currencies
        let allAvailableCurrencies = {};

        // Fetch all available currencies if not already in the state
        if (!productExchangeCourse['allAvailableCurrencies']) {
            const response = await fetch(EXTERNAL_API_PATHS.CURRENCY_COURSE_ALL);
            allAvailableCurrencies = await response.json();

            // Update the productExchangeCourse state with all available currencies
            setProductExchangeCourseHandler({ ...productExchangeCourse, allAvailableCurrencies });
        }

        // Check and fetch currency courses for main currencies not in the state
        const newCurrencyCourses = {};

        for (const currency of mainCurrencies) {
            if (!(currency in productExchangeCourse)) {
                const currencyExists = allAvailableCurrencies[currency] ||
                    (productExchangeCourse['allAvailableCurrencies'] && productExchangeCourse['allAvailableCurrencies'][currency]);

                if (currencyExists) {
                    // Fetch and state currency course if not available
                    const response = await fetch(EXTERNAL_API_PATHS.CURRENCY_COURSE_TO_AMAZON_CURRENCY(currency));
                    const currentExchangeRates = await response.json();

                    // Cache the result
                    newCurrencyCourses[currency] = currentExchangeRates;

                    // Update the productExchangeCourse state with the new state values
                    setProductExchangeCourseHandler({ ...productExchangeCourse, ...newCurrencyCourses });
                }
            }
        }

    } catch (error) {
        console.error(error);
        addAlertMessage(error.message);
    }
};


