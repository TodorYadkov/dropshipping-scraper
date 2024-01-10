import { useEffect, useState } from 'react';

import { REDUCER_TYPES, TABLE_BODY_TYPES } from '../util/constants.js';

import { useAppStateContext } from '../hooks/useAppStateContext.js';

import { CardProducts } from './CardProducts.jsx';
import { Table } from './Tables/Table.jsx';

export const ResponsiveProductsComponent = () => {
	const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1360);

	const { appState } = useAppStateContext();

	useEffect(() => {
		const handleResize = () => {
			setIsDesktop(window.innerWidth >= 1360);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div>
			{isDesktop ? (
				<Table
					data={appState[REDUCER_TYPES.PRODUCTS]}
					typeBody={TABLE_BODY_TYPES.PRODUCT}
				/>
			) : (
				<CardProducts data={appState[REDUCER_TYPES.PRODUCTS]} />
			)}
		</div>
	);
};
