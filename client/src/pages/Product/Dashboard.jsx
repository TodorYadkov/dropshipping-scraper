/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi.js';

import { REDUCER_TYPES } from '../../util/constants.js';
import { memoizedCalculateCurrencyCourses } from '../../util/calculateProfit.js';

import { productService } from '../../services/productService.js';
import { statisticService } from '../../services/statisticService.js';
import { useAppStateContext } from '../../hooks/useAppStateContext.js';
import { useIntervalTimeToReceiveData } from '../../hooks/useIntervalTimeToReceiveData.js';

import { Loader } from '../../components/Loader.jsx';
import { AlertError } from '../../components/Alerts/AlertError.jsx';
import { DashboardSummary } from '../../components/DashboardSummary.jsx';
import { ResponsiveProductsComponent } from '../../components/ResponsiveProductsComponent.jsx';
import { useLocalProductState } from '../../hooks/useLocalProductsState.js';
import { PageTitle } from '../../components/PageTitle.jsx';

export const Dashboard = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [alert, setAlert] = useState('');
	const [productExchangeCourse, setProductExchangeCourse] = useState({});

	// TODO: change interval!!!
	const [_] = useIntervalTimeToReceiveData(fetchProductsHandler, 1);

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

			await memoizedCalculateCurrencyCourses(products, productExchangeCourse, setProductExchangeCourseHandler, addAlertMessage);

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

	return (
		<PageTitle title={'Dashboard'}>
			<div>
				{isLoading
					? <Loader />
					: (
						<>
							<DashboardSummary {...appState[REDUCER_TYPES.GENERAL_STATISTIC]} />

							{alert && <div className="flex justify-center -mt-16 -mb-7"><AlertError message={alert} close={onCloseAlert} /></div>}

							<ResponsiveProductsComponent localFilteredState={localFilteredState} />
						</>
					)
				}
			</div>
		</PageTitle>
	);
};