export const SERVER_PATHS = {
    HOST: 'https://dropshipping-scraper.vercel.app',
    // HOST: 'http://localhost:3000',
    LOGIN: '/users/login',
    REGISTER: '/users/register',
    LOGOUT: '/users/logout',
    UPDATE_PROFILE: '/users/profile',
    FORGOT_PASSWORD: '/users/forgot-password',
    RESET_PASSWORD: '/users/reset-password',
    GET_ALL_PRODUCTS: '/products',
    CREATE_PRODUCT: '/products',
    UPDATE_PRODUCT: (productId) => `/products/${productId}`,
    DELETE_PRODUCT: (productId) => `/products/${productId}`,
    GET_GENERAL_STATISTICS: '/statistics/general',
    GET_EXTENSIONS_STATISTICS: '/statistics/extensions',
};

export const CLIENT_PATHS = {
    LOGIN: '/login',
    REGISTER: '/register',
    LOGOUT: '/logout',
    PROFILE: '/profile',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password/:resetToken',
    DASHBOARD: '/dashboard',
    EXTENSIONS: '/extensions',
};

export const EXTERNAL_API_PATHS = {
    CURRENCY_COURSE: (baseCurrency, targetCurrency) => `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${baseCurrency}/${targetCurrency}.json`,
    CURRENCY_COURSE_TO_AMAZON_CURRENCY: (baseCurrency) => `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${baseCurrency}.json`,
    CURRENCY_COURSE_ALL: 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json',
};