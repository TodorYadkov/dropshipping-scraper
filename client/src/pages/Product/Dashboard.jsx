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
import { useSearchParams } from 'react-router-dom';

export const Dashboard = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [serverError, setServerError] = useState('');

	const [_] = useIntervalTimeToReceiveData(fetchProductsHandler);

	const { getProducts } = useApi(productService);
	const { getGeneralStatistic } = useApi(statisticService);

	const { appState, setProducts, setGeneralStatistic } = useAppStateContext();
	const [localProducts, setLocalProducts] = useState([]);
	const [localFilteredProducts, setLocalFilteredProducts] = useState([]);

	const [searchParams, setSearchParams] = useSearchParams();


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
		setLocalProductsWithSameCurrency();
	}, []);

	// Set currency to local products
	useEffect(() => {
		// Calculate profit
		setLocalProductsWithSameCurrency();
	}, [appState[REDUCER_TYPES.PRODUCTS]]);


	// On search filter filter the products
	useEffect(() => {
		filterProductsHandler();
	}, [searchParams]);


	// Filter the products;
	function filterProductsHandler(products = localProducts) {

		let productsToFilter = [...products];

		searchHandler();
		offsetHandler();

		// Search
		function searchHandler() {
			const search = searchParams.get('search');
			const searchRegexPattern = new RegExp(search, 'i');
			if (search) {
				productsToFilter = productsToFilter.filter(product => searchRegexPattern.test(product.name));
			} else {
				productsToFilter = [...products];
			}
		};

		function offsetHandler() {
			// Offset
			const offset = Number(searchParams.get('offset')) || 5;
			
			if (offset <= localFilteredProducts.length) {
				productsToFilter = productsToFilter.slice(0, offset);
			} else {
				searchHandler();
				productsToFilter = productsToFilter.slice(0, offset);
			}
		}

		setLocalFilteredProducts(productsToFilter);

	}

	// It set the local products with amazon currency;
	function setLocalProductsWithSameCurrency() {
		calculateProfit(appState[REDUCER_TYPES.PRODUCTS])
			.then(result => {
				setLocalProducts(result);
				filterProductsHandler(result)
			})
			.catch(err => {
				setServerError(err.message);
				console.error(err);
			})
	}

	// Fetch products from server
	async function fetchProductsHandler() {
		try {
			const [products, generalStatistic] = await Promise.all([
				getProducts(),
				getGeneralStatistic()
			]);

			// // Calculate profit
			// const productsWithProfit = await calculateProfit(products);

			setProducts(products);
			setGeneralStatistic(generalStatistic);

			return products;

		} catch (error) {
			console.error(error);
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

						<ResponsiveProductsComponent products={localFilteredProducts} />
					</>
				)
			}
		</div>
	);
};
