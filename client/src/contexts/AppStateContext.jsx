import { createContext, useReducer } from 'react';

import { REDUCER_TYPES } from '../util/constants.js';
import { reducer } from './reducer.js';

const initialState = {
	[REDUCER_TYPES.IS_SIDE_BAR_OPEN]: false,
	[REDUCER_TYPES.PRODUCTS]: [],
	[REDUCER_TYPES.GENERAL_STATISTIC]: {},
};

export const AppStateContext = createContext();
AppStateContext.displayName = 'AppStateContext';

export const AppStateProvider = ({ children }) => {
	const [appState, dispatch] = useReducer(reducer, initialState);

	function changeSideBarState(value) {
		dispatch({ type: REDUCER_TYPES.IS_SIDE_BAR_OPEN, value });
	}

	function setProducts(value) {
		dispatch({ type: REDUCER_TYPES.PRODUCTS, value });
	}

	function addProduct(product) {
		dispatch({ type: REDUCER_TYPES.ADD_PRODUCT, value: product });
	}

	function editProduct(product) {
		dispatch({ type: REDUCER_TYPES.UPDATE_PRODUCT, value: product });
	}

	function removeProduct(product) {
		dispatch({ type: REDUCER_TYPES.DELETE_PRODUCT, value: product });
	}

	function setGeneralStatistic(statisticData) {
		dispatch({ type: REDUCER_TYPES.GENERAL_STATISTIC, value: statisticData });
	}

	const values = {
		appState,
		changeSideBarState,
		setProducts,
		addProduct,
		editProduct,
		removeProduct,
		setGeneralStatistic,
	};

	return (
		<AppStateContext.Provider value={values}>
			{children}
		</AppStateContext.Provider>
	);
};
