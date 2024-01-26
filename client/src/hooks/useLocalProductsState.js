import { useEffect, useState } from 'react';

import { calculateProfit, loadCurrencyCourses } from '../util/calculateProfit.js';
import { REDUCER_TYPES } from '../util/constants.js';

import { useAppStateContext } from './useAppStateContext.js';
import { useFilterData } from './useFilterData.js';

export const useLocalProductState = (addAlertMessage) => {
	const [productExchangeCourse, setProductExchangeCourse] = useState({});
	const { appState } = useAppStateContext();

	const [localFilteredState, setLocalProducts] = useFilterData();

	// Set currency to local products
	useEffect(() => {
		if (appState[REDUCER_TYPES.PRODUCTS].length > 0) {
			const cachedCurrencies = async () => {
				const allAvailableCurrenciesOnApi = await loadCurrencyCourses(appState[REDUCER_TYPES.PRODUCTS], productExchangeCourse, setProductExchangeCourse);

				// Calculate profit
				setLocalProductsWithSameCurrencyAndProfit(allAvailableCurrenciesOnApi);
			}

			cachedCurrencies();
		}

	}, [appState[REDUCER_TYPES.PRODUCTS]]);

	// It set the local products with amazon currency;
	async function setLocalProductsWithSameCurrencyAndProfit(allCurrencies) {
		try {
			const productsWithCalculatedCurrencyAndProfit = await calculateProfit(appState[REDUCER_TYPES.PRODUCTS], { ...allCurrencies, ...productExchangeCourse });
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
