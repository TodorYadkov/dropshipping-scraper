export const TOKEN_NAME = 'dr0p$h11p1nG';

export const AUTH_FORM_KEYS = {
	email: 'email',
	name: 'name',
	password: 'password',
	extensionName: 'extensionName'
};

export const PRODUCT_FORM_KEYS = {
	AMAZON: 'amazonUrl',
	EBAY: 'ebayUrl'
};

// eslint-disable-next-line no-control-regex
export const patternEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;

export const REDUCER_TYPES = {
	IS_SIDE_BAR_OPEN: 'isSideBarOpen',
	PRODUCTS: 'products',
	ADD_PRODUCT: 'addProduct',
	UPDATE_PRODUCT: 'updateProduct',
	DELETE_PRODUCT: 'deleteProduct',
	GENERAL_STATISTIC: 'generalStatistic',
};

export const TABLE_BODY_TYPES = {
	PRODUCT: 'product',
	EXTENSION: 'extension',
	USER: 'user'
};
