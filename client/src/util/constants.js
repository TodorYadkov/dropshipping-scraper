export const TOKEN_NAME = 'dr0p$h11p1nG';

export const AUTH_FORM_KEYS = {
	email: 'email',
	name: 'name',
	password: 'password',
	extensionName: 'extensionName',
	uploadAvatar: 'uploadAvatar'
};

export const PRODUCT_FORM_KEYS = {
	AMAZON: 'amazonUrl',
	EBAY: 'ebayUrl'
};

export const EXTENSION_FORM_KEYS = {
	EXTENSION_NAME: 'extensionName',
};

export const patternEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;

export const REDUCER_TYPES = {
	IS_SIDE_BAR_OPEN: 'isSideBarOpen',
	PRODUCTS: 'products',
	ADD_PRODUCT: 'addProduct',
	UPDATE_PRODUCT: 'updateProduct',
	DELETE_PRODUCT: 'deleteProduct',
	EXTENSIONS: 'extensions',
	ADD_EXTENSION: 'addExtension',
	UPDATE_EXTENSION: 'updateExtension',
	DELETE_EXTENSION: 'deleteExtension',
	GENERAL_STATISTIC: 'generalStatistic',
	REFRESH_STATE: 'refreshState',
	IS_LOADING_STATE: 'loadingState',
	CLEAR_APP_STATE: 'clearAppState',
};

export const DATA_TYPES = {
	PRODUCT: 'product',
	EXTENSION: 'extension',
	USER: 'user'
};

export const SORTING_KEYS = {
	PRODUCT_NAME_ASC: 'name_asc',
	PRODUCT_NAME_DESC: 'name_desc',
	PRODUCT_AMAZON_PRICE_ASC: 'amazon_price_asc',
	PRODUCT_AMAZON_PRICE_DESC: 'amazon_price_desc',
	PRODUCT_EBAY_PRICE_ASC: 'ebay_price_asc',
	PRODUCT_EBAY_PRICE_DESC: 'ebay_price_desc',
	PRODUCT_PROFIT_ASC: 'profit_asc',
	PRODUCT_PROFIT_DESC: 'profit_desc',
	PRODUCT_AVAILABILITY_ASC: 'availability_asc',
	PRODUCT_AVAILABILITY_DESC: 'availability_desc',
	PRODUCT_ERROR_ASC: 'error_asc',
	PRODUCT_ERROR_DESC: 'error_desc',
	PRODUCT_LAST_UPDATED_ASC: 'last_updated_asc',
	PRODUCT_LAST_UPDATED_DESC: 'last_updated_desc',

	EXTENSION_NAME_ASC: 'extension_name_asc',
	EXTENSION_NAME_DESC: 'extension_name_desc',
	EXTENSION_LOGGED_ASC: 'extension_logged_asc',
	EXTENSION_LOGGED_DESC: 'extension_logged_desc',
	EXTENSION_WORKING_ASC: 'extension_working_asc',
	EXTENSION_WORKING_DESC: 'extension_working_desc',
	EXTENSION_LAST_SEEN_ASC: 'extension_last_seen_asc',
	EXTENSION_LAST_SEEN_DESC: 'extension_last_seen_desc',
	EXTENSION_ERROR_ASC: 'error_asc',
	EXTENSION_ERROR_DESC: 'error_desc',

	USER_NAME_ASC: 'user_name_asc',
	USER_NAME_DESC: 'user_name_desc',
	USER_EMAIL_ASC: 'user_email_asc',
	USER_EMAIL_DESC: 'user_email_desc',
	USER_LOGIN_STATUS_ASC: 'user_login_status_asc',
	USER_LOGIN_STATUS_DESC: 'user_login_status_desc',
	USER_EXTENSIONS_ASC: 'user_extensions_asc',
	USER_EXTENSIONS_DESC: 'user_extensions_desc',
	USER_PRODUCTS_ASC: 'user_products_asc',
	USER_PRODUCTS_DESC: 'user_products_desc',
	USER_ROLE_USER: 'user_role_user',
	USER_ROLE_PREMIUM: 'user_role_premium',
	USER_ROLE_ADMIN: 'user_role_admin',
	USER_ACCOUNT_STATUS_ASC: 'user_account_status_asc',
	USER_ACCOUNT_STATUS_DESC: 'user_account_status_desc',
};

export const USER_ROLES = {
	USER: 'user',
	PREMIUM: 'premium',
	ADMIN: 'admin'
};