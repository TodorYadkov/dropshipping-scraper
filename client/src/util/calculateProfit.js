import { EXTERNAL_API_PATHS } from "./paths.js";

const calculateProfitForProduct = async (product) => {
    if (product.priceAmazon === null || product.priceEbay === null) {
        return null;
    }

    if (product.currencyAmazon === product.currencyEbay) {
        return (parseFloat(product.priceEbay) - parseFloat(product.priceAmazon)).toFixed(2);
    }

    try {
        const baseCurrency = product.currencyAmazon === '$' ? 'usd' : product.currencyAmazon.toLocaleLowerCase();
        const targetCurrency = product.currencyEbay === '$' ? 'usd' : product.currencyEbay.toLocaleLowerCase();

        const response = await fetch(EXTERNAL_API_PATHS.CURRENCY_COURSE(targetCurrency, baseCurrency));
        const course = await response.json();

        const exchangeRate = course[baseCurrency];
        const priceInBaseCurrency = exchangeRate * product.priceEbay;

        product.priceEbayOriginal = product.priceEbay;
        product.currencyEbayOriginal = product.currencyEbay;

        product.priceEbay = priceInBaseCurrency;
        product.currencyEbay = product.currencyAmazon;

        const profitInBaseCurrency = priceInBaseCurrency - product.priceAmazon;
        return parseFloat(profitInBaseCurrency.toFixed(2));
        
    } catch (error) {
        return null;
    }
}

export const calculateProfit = async (products) => {
    if (products.length === 0) {
        return products;
    }

    const productsWithProfit = await Promise.all(products.map(async (product) => {
        const profit = await calculateProfitForProduct(product);
        return { ...product, profit };
    }));

    return productsWithProfit;
}