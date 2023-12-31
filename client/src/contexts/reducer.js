import { REDUCER_TYPES } from '../util/constants.js';

export const reducer = (state, action) => {
	switch (action.type) {
		case REDUCER_TYPES.IS_SIDE_BAR_OPEN:
			return { ...state, [action.type]: action.value };
		case REDUCER_TYPES.PRODUCTS:
			return { ...state, [action.type]: action.value };
		default:
			throw new Error('Unrecognized reducer type');
	}
};
