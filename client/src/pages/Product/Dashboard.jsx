import { useEffect } from 'react';
import { useApi } from '../../hooks/useApi.js';

import { REDUCER_TYPES, TABLE_BODY_TYPES } from '../../util/constants.js';

import { productService } from '../../services/productService.js';
import { useAppStateContext } from '../../hooks/useAppStateContext.js';

import { Table } from '../../components/Tables/Table.jsx';
import { DashboardSummary } from '../../components/DashboardSummary.jsx';

export const Dashboard = () => {
	const { getProducts } = useApi(productService);
	const { appState, setProducts } = useAppStateContext();

	useEffect(() => {
		(async function () {
			const products = await getProducts();
			setProducts(products);
		})();
	}, []);

	return (
		<div>
			<h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>

			<DashboardSummary />

			{<Table data={appState[REDUCER_TYPES.PRODUCTS]} type={TABLE_BODY_TYPES.PRODUCT} />}
		</div>
	);
};
