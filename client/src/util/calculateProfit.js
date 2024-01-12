export const calculateProfit = (currencyAmazon, currencyEbay, priceAmazon, priceEbay) => {

    if (currencyAmazon === currencyEbay) return Number(priceEbay).toFixed(2) - Number(priceAmazon).toFixed(2);

    // https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/usd.json
}   