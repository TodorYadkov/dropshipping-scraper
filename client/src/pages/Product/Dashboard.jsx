/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi.js';

import { REDUCER_TYPES } from '../../util/constants.js';

import { productService } from '../../services/productService.js';
import { statisticService } from '../../services/statisticService.js';
import { useAppStateContext } from '../../hooks/useAppStateContext.js';
import { useIntervalTimeToReceiveData } from '../../hooks/useIntervalTimeToReceiveData.js';

import { Loader } from '../../components/Loader.jsx';
import { AlertError } from '../../components/Alerts/AlertError.jsx';
import { DashboardSummary } from '../../components/DashboardSummary.jsx';
import { ResponsiveProductsComponent } from '../../components/ResponsiveProductsComponent.jsx';

export const Dashboard = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [serverError, setServerError] = useState('');

	const [_] = useIntervalTimeToReceiveData(fetchProductsHandler);

	const { getProducts } = useApi(productService);
	const { getGeneralStatistic } = useApi(statisticService);

	const { appState, setProducts, setGeneralStatistic } = useAppStateContext();

	useEffect(() => {
		document.title = 'Dashboard';

		async function initialLoading() {
			setIsLoading(true);

			await fetchProductsHandler();
			setIsLoading(false);
		}

		initialLoading();

	}, []);

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
			setServerError(error.message);
		}
	}

	function onCloseAlert() {
		setServerError('');
	}

	return (
		<div>
			{/* TODO: Check for better position to display */}
			{serverError && <div className="flex justify-center my-2"><AlertError message={serverError} close={onCloseAlert} /></div>}

			{isLoading
				? <Loader />
				: (
					<>
						<DashboardSummary {...appState[REDUCER_TYPES.GENERAL_STATISTIC]} />

						<ResponsiveProductsComponent />
					</>
				)
			}
		</div>
	);
};
