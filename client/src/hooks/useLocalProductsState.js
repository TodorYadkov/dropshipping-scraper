import { useEffect } from 'react';

import { calculateProfit } from '../util/calculateProfit.js';
import { REDUCER_TYPES } from '../util/constants.js';

import { useAppStateContext } from './useAppStateContext.js';
import { useFilterData } from './useFilterData.js';

export const useLocalProductState = (addAlertMessage, exchangeRates) => {
	const { appState } = useAppStateContext();

	const [localFilteredState, setLocalProducts] = useFilterData();

	// Set currency to local products
	useEffect(() => {
		// Calculate profit
		setLocalProductsWithSameCurrencyAndProfit();
	}, [appState[REDUCER_TYPES.PRODUCTS]]);


	// It set the local products with amazon currency;
	async function setLocalProductsWithSameCurrencyAndProfit() {
		try {
			const productsWithCalculatedCurrencyAndProfit = await calculateProfit(appState[REDUCER_TYPES.PRODUCTS], exchangeRates);
			setLocalProducts(productsWithCalculatedCurrencyAndProfit);
		} catch (err) {
			addAlertMessage(err.message);
			console.error(err);
		}
	}

	return {
		localFilteredState,
		setLocalProductsWithSameCurrencyAndProfit
	};
}
