import { useMemo } from 'react';

import { DATA_TYPES } from '../../util/constants.js';

import { TableHeader } from './TableHeader.jsx';
import { TableBodyProducts } from './TableBodyProducts.jsx';
import { TableExtensionsData } from './TableExtensionsData.jsx';
import { TableBodyUsers } from './TableBodyUsers.jsx';

export const Table = ({ typeBody, data, onModalClick }) => {

	const TableVariant = useMemo(() => {
		let Body = null;
		let Heading = null;

		switch (typeBody) {
			case DATA_TYPES.PRODUCT:
				{
					const headings = ['Product', 'Price Amazon', 'Price eBay', 'Profit', 'Availability', 'Rating', 'Last Updated', 'Error', 'Actions'];
					Body = <TableBodyProducts products={data} onModalClick={onModalClick} />;
					Heading = <TableHeader headings={headings} />;
				}
				break;

			case DATA_TYPES.EXTENSION:
				{
					const headings = ['Extension', 'Logged', 'Working', 'Last Seen', 'Error', 'Controls', 'Actions'];
					Body = <TableExtensionsData extensionsData={data} onModalClick={onModalClick} />;
					Heading = <TableHeader headings={headings} />;
				}
				break;

			case DATA_TYPES.USER:
				{
					const headings = ['User', 'Email', 'Login Status', 'Extensions', 'Products', 'Role', 'Status', 'Actions'];
					Body = <TableBodyUsers usersData={data} onModalClick={onModalClick} />;
					Heading = <TableHeader headings={headings} />;
				}
				break;
		}

		return { Body, Heading };

	}, [typeBody, data, onModalClick]);

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
