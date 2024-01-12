export const SERVER_PATHS = {
    HOST: 'https://dropshipping-scraper.vercel.app',
    // HOST: 'http://localhost:3000',
    LOGIN: '/users/login',
    REGISTER: '/users/register',
    LOGOUT: '/users/logout',
    GET_ALL_PRODUCTS: '/products',
    CREATE_PRODUCT: '/products',
    GET_GENERAL_STATISTICS: '/statistics/general',
};

export const CLIENT_PATHS = {
    DASHBOARD: '/dashboard',
    LOGIN: '/login',
    REGISTER: '/register',
    LOGOUT: '/logout',
};

export const EXTERNAL_API_PATHS = {
    CURRENCY_COURSE: (baseCurrency, targetCurrency) => `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${baseCurrency}/${targetCurrency}.json`,
};