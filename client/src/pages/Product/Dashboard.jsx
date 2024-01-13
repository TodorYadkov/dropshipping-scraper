/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi.js';

import { REDUCER_TYPES } from '../../util/constants.js';
import { calculateProfit } from '../../util/calculateProfit.js';

import { productService } from '../../services/productService.js';
import { statisticService } from '../../services/statisticService.js';
import { useAppStateContext } from '../../hooks/useAppStateContext.js';
import { useIntervalTimeToReceiveData } from '../../hooks/useIntervalTimeToReceiveData.js';

import { Loader } from '../../components/Loader.jsx';
import { AlertError } from '../../components/Alerts/AlertError.jsx';
import { DashboardSummary } from '../../components/DashboardSummary.jsx';
import { ResponsiveProductsComponent } from '../../components/ResponsiveProductsComponent.jsx';
import { useLocalProductState } from '../../hooks/useLocalProductsState.js';


export const Dashboard = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [alert, setAlert] = useState('');

	const [_] = useIntervalTimeToReceiveData(fetchProductsHandler);

	const { getProducts } = useApi(productService);
	const { getGeneralStatistic } = useApi(statisticService);

	const { appState, setProducts, setGeneralStatistic } = useAppStateContext();
	const { localFilteredProducts, setLocalProductsWithSameCurrencyAndProfit } = useLocalProductState(addAlertMessage);


	// Initial
	useEffect(() => {
		document.title = 'Dashboard';

		async function initialLoading() {
			setIsLoading(true);

			await fetchProductsHandler();
			setIsLoading(false);
		}

		initialLoading();

		// On load set up currency on local products
		setLocalProductsWithSameCurrencyAndProfit();
	}, []);

	function addAlertMessage(error) {
		setAlert(error);
	}

	function onCloseAlert() {
		setAlert('');
	}


	// Fetch products from server
	async function fetchProductsHandler() {
		try {
			const [products, generalStatistic] = await Promise.all([
				getProducts(),
				getGeneralStatistic()
			]);

			setProducts(products);
			setGeneralStatistic(generalStatistic);

			return products;

		} catch (error) {
			console.error(error);
			addAlertMessage(error.message);
		}
	}



	return (
		<div>
			{/* TODO: Check for better position to display */}
			{alert && <div className="flex justify-center my-2"><AlertError message={alert} close={onCloseAlert} /></div>}

			{isLoading
				? <Loader />
				: (
					<>
						<DashboardSummary {...appState[REDUCER_TYPES.GENERAL_STATISTIC]} />

						<ResponsiveProductsComponent products={localFilteredProducts} />
					</>
				)
			}
		</div>
	);
};
