import { createContext, useReducer } from 'react';

import { reducer } from './reducer.js';
import { REDUCER_TYPES } from '../util/constants.js';

const initialState = {
	[REDUCER_TYPES.IS_SIDE_BAR_OPEN]: false,
	[REDUCER_TYPES.PRODUCTS]: []
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

	const values = {
		appState,
		changeSideBarState,
		setProducts
	};

	return (
		<AppStateContext.Provider value={values}>
			{children}
		</AppStateContext.Provider>
	);
};
