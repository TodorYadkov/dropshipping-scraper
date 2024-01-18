/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { REDUCER_TYPES } from '../../util/constants.js';
import { loadCurrencyCourses } from '../../util/calculateProfit.js';

import { useApi } from '../../hooks/useApi.js';
import { useLocalProductState } from '../../hooks/useLocalProductsState.js';
import { useAppStateContext } from '../../hooks/useAppStateContext.js';
import { useIntervalTimeToReceiveData } from '../../hooks/useIntervalTimeToReceiveData.js';

import { productService } from '../../services/productService.js';
import { statisticService } from '../../services/statisticService.js';

import { Loader } from '../../components/Loader.jsx';
import { PageTitle } from '../../components/PageTitle.jsx';
import { AlertError } from '../../components/Alerts/AlertError.jsx';
import { DashboardSummary } from '../../components/DashboardSummary.jsx';
import { ResponsiveProductsComponent } from '../../components/ResponsiveProductsComponent.jsx';

export const Dashboard = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [alert, setAlert] = useState('');
	const [productExchangeCourse, setProductExchangeCourse] = useState({});

	const [_] = useIntervalTimeToReceiveData(fetchProductsHandler);

	const { getProducts } = useApi(productService);
	const { getGeneralStatistic } = useApi(statisticService);

	const { appState, setProducts, setGeneralStatistic } = useAppStateContext();
	const { localFilteredState, setLocalProductsWithSameCurrencyAndProfit } = useLocalProductState(addAlertMessage, productExchangeCourse);

	// Initial
	useEffect(() => {
		async function initialLoading() {
			setIsLoading(true);

			await fetchProductsHandler();
			setIsLoading(false);
		}

		initialLoading();

		// On load set up currency on local products
		setLocalProductsWithSameCurrencyAndProfit();
	}, []);

	// Fetch products from server
	async function fetchProductsHandler() {
		try {
			const [products, generalStatistic] = await Promise.all([
				getProducts(),
				getGeneralStatistic()
			]);

			await loadCurrencyCourses(products, productExchangeCourse, setProductExchangeCourseHandler);

			setProducts(products);
			setGeneralStatistic(generalStatistic);

			return products;

		} catch (error) {
			console.error(error);
			addAlertMessage(error.message);
		}
	}

	function addAlertMessage(error) {
		setAlert(error);
	}

	function onCloseAlert() {
		setAlert('');
	}

	function setProductExchangeCourseHandler(coursesData) {
		setProductExchangeCourse(coursesData);
	}

	async function onRefreshClick() {
		return fetchProductsHandler();
	}

	return (
		<PageTitle title={'Dashboard'}>
			<div className='relative'>
				{isLoading
					? <Loader />
					: (
						<>
							<DashboardSummary {...appState[REDUCER_TYPES.GENERAL_STATISTIC]} />

							{alert && (
								<div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5">
									<AlertError message={alert} close={onCloseAlert} />
								</div>
							)}

							<ResponsiveProductsComponent localFilteredState={localFilteredState} onRefresh={onRefreshClick} />
						</>
					)
				}
			</div>
		</PageTitle>
	);
};