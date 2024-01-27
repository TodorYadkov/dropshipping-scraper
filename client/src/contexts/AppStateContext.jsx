import { createContext, useReducer } from 'react';

import { REDUCER_TYPES } from '../util/constants.js';
import { reducer } from './reducer.js';

const initialState = {
	[REDUCER_TYPES.IS_SIDE_BAR_OPEN]: false,
	[REDUCER_TYPES.REFRESH_STATE]: false,
	[REDUCER_TYPES.IS_LOADING_STATE]: false,
	[REDUCER_TYPES.PRODUCTS]: [],
	[REDUCER_TYPES.EXTENSIONS]: [],
	[REDUCER_TYPES.GENERAL_STATISTIC]: {},
};

export const AppStateContext = createContext();
AppStateContext.displayName = 'AppStateContext';

export const AppStateProvider = ({ children }) => {
	const [appState, dispatch] = useReducer(reducer, initialState);

	// Sidebar
	const changeSideBarState = (boolean) => dispatch({ type: REDUCER_TYPES.IS_SIDE_BAR_OPEN, value: boolean });

	// Products
	const setProducts = (value) => dispatch({ type: REDUCER_TYPES.PRODUCTS, value });

	const addProduct = (product) => dispatch({ type: REDUCER_TYPES.ADD_PRODUCT, value: product });

	const editProduct = (product) => dispatch({ type: REDUCER_TYPES.UPDATE_PRODUCT, value: product });

	const removeProduct = (product) => dispatch({ type: REDUCER_TYPES.DELETE_PRODUCT, value: product });

	// Extension
	const setExtensions = (value) => dispatch({ type: REDUCER_TYPES.EXTENSIONS, value });

	const addExtension = (extension) => dispatch({ type: REDUCER_TYPES.ADD_EXTENSION, value: extension });

	const editExtension = (extension) => dispatch({ type: REDUCER_TYPES.UPDATE_EXTENSION, value: extension });

	const removeExtension = (extension) => dispatch({ type: REDUCER_TYPES.DELETE_EXTENSION, value: extension });

	// Statistic
	const setGeneralStatistic = (statisticData) => dispatch({ type: REDUCER_TYPES.GENERAL_STATISTIC, value: statisticData });

	// Refresh state
	const setRefreshState = (boolean) => dispatch({ type: REDUCER_TYPES.REFRESH_STATE, value: boolean });

	const setIsLoadingState = (boolean) => dispatch({ type: REDUCER_TYPES.IS_LOADING_STATE, value: boolean });

	const clearAppState = () => dispatch({ type: REDUCER_TYPES.CLEAR_APP_STATE, value: initialState });

	const values = {
		appState,
		changeSideBarState,
		setProducts,
		addProduct,
		editProduct,
		removeProduct,
		setExtensions,
		addExtension,
		editExtension,
		removeExtension,
		setGeneralStatistic,
		setRefreshState,
		setIsLoadingState,
		clearAppState
	};

	return (
		<AppStateContext.Provider value={values}>
			{children}
		</AppStateContext.Provider>
	);
};
