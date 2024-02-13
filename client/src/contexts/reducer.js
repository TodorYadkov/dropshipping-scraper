import { REDUCER_TYPES } from '../util/constants.js';

export const reducer = (state, action) => {
	switch (action.type) {
		case REDUCER_TYPES.IS_SIDE_BAR_OPEN:
			return { ...state, [action.type]: action.value };

		case REDUCER_TYPES.PRODUCTS:
			return { ...state, [action.type]: action.value };

		case REDUCER_TYPES.ADD_PRODUCT:
			return { ...state, [REDUCER_TYPES.PRODUCTS]: [action.value, ...state[REDUCER_TYPES.PRODUCTS]] };

		case REDUCER_TYPES.UPDATE_PRODUCT:
			return { ...state, [REDUCER_TYPES.PRODUCTS]: state[REDUCER_TYPES.PRODUCTS].map(p => p._id === action.value._id ? action.value : p) };

		case REDUCER_TYPES.DELETE_PRODUCT:
			return { ...state, [REDUCER_TYPES.PRODUCTS]: state[REDUCER_TYPES.PRODUCTS].filter(p => p._id !== action.value._id) };

		case REDUCER_TYPES.EXTENSIONS:
			return { ...state, [action.type]: action.value };

		case REDUCER_TYPES.ADD_EXTENSION:
			return { ...state, [REDUCER_TYPES.EXTENSIONS]: [action.value, ...state[REDUCER_TYPES.EXTENSIONS]] };

		case REDUCER_TYPES.UPDATE_EXTENSION:
			return { ...state, [REDUCER_TYPES.EXTENSIONS]: state[REDUCER_TYPES.EXTENSIONS].map(e => e._id === action.value._id ? action.value : e) };

		case REDUCER_TYPES.DELETE_EXTENSION:
			return { ...state, [REDUCER_TYPES.EXTENSIONS]: state[REDUCER_TYPES.EXTENSIONS].filter(e => e._id !== action.value._id) };

		case REDUCER_TYPES.GENERAL_STATISTIC:
			return { ...state, [action.type]: { ...state[action.type], ...action.value } };

		case REDUCER_TYPES.REFRESH_STATE:
			return { ...state, [action.type]: action.value };

		case REDUCER_TYPES.IS_LOADING_STATE:
			return { ...state, [action.type]: action.value };

		case REDUCER_TYPES.CLEAR_APP_STATE:
			return { ...action.value };

		default:
			throw new Error('Unrecognized reducer type');
	}
};