import { useMemo } from 'react';

import { TABLE_BODY_TYPES } from '../../util/constants.js';

import { TableHeader } from './TableHeader.jsx';
import { TableBodyProducts } from './TableBodyProducts.jsx';

export const Table = ({ typeBody, data, onModalClick }) => {

	const TableVariant = useMemo(() => {
		let Body, Heading;

		switch (typeBody) {
			case TABLE_BODY_TYPES.PRODUCT:
				{
					const headings = ['Product', 'Price Amazon', 'Price eBay', 'Profit', 'Availability', 'Rating', 'Last Updated', 'Error', 'Actions'];
					Body = <TableBodyProducts products={data} onModalClick={onModalClick} />;
					Heading = <TableHeader headings={headings} />;
				}
				break;
			case TABLE_BODY_TYPES.USER:
				break;
			case TABLE_BODY_TYPES.EXTENSION:
				break;
		}

		return { Body, Heading };

	}, [typeBody, data]);

	return (
		<div className="-mb-2">
			<div className="px-4 pt-4 overflow-x-auto sm:-mx-8 sm:px-8">
				<div className="inline-block min-w-full overflow-hidden rounded-lg rounded-b-none">
					<table className="min-w-full leading-normal">
						{TableVariant.Heading}
						{TableVariant.Body}
					</table>
				</div>
			</div>
		</div>
	);
};
