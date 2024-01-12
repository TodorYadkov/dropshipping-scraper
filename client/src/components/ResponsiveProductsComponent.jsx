import { useEffect, useState } from 'react';

import { TABLE_BODY_TYPES } from '../util/constants.js';

import { CardProducts } from './CardProducts.jsx';
import { Table } from './Tables/Table.jsx';

export const ResponsiveProductsComponent = ({ products }) => {
	const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1360);

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
					data={products}
					typeBody={TABLE_BODY_TYPES.PRODUCT}
				/>
			) : (
				<CardProducts data={products} />
			)}
		</div>
	);
};
