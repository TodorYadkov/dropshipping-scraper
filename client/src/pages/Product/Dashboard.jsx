import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi.js';

import { REDUCER_TYPES, TABLE_BODY_TYPES } from '../../util/constants.js';

import { useModal } from '../../hooks/useModal.js';
import { productService } from '../../services/productService.js';
import { statisticService } from '../../services/statisticService.js';
import { useAppStateContext } from '../../hooks/useAppStateContext.js';
import { useIntervalTimeToReceiveData } from '../../hooks/useIntervalTimeToReceiveData.js';

import { Loader } from '../../components/Loader.jsx';
import { Table } from '../../components/Tables/Table.jsx';
import { AlertError } from '../../components/Alerts/AlertError.jsx';
import { DashboardSummary } from '../../components/DashboardSummary.jsx';
import { ButtonPrimary } from '../../components/Buttons/ButtonPrimary.jsx';
import { AddProductModal } from '../../components/Modal/AddProductModal.jsx';

export const Dashboard = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [serverError, setServerError] = useState('');

	const [productModal, toggleProductModal] = useModal();
	const [_] = useIntervalTimeToReceiveData(fetchProductsHandler);

	const { getProducts } = useApi(productService);
	const { getGeneralStatistic } = useApi(statisticService);

	const { appState, setProducts, setGeneralStatistic } = useAppStateContext();

	useEffect(() => {
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
			// TODO: How to make request to get statistic from the server on each request and to follow state on extension or on mount
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

						<ButtonPrimary title="Add Product" toggle={toggleProductModal} />
						{productModal && <AddProductModal toggleModal={toggleProductModal} />}

						{<Table data={appState[REDUCER_TYPES.PRODUCTS]} type={TABLE_BODY_TYPES.PRODUCT} />}
					</>
				)
			}
		</div>
	);
};
