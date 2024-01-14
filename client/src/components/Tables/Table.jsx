import { useMemo } from "react";

import { TABLE_BODY_TYPES } from "../../util/constants.js";
import { TableHeader } from "./TableHeader.jsx";
import { TableBodyProducts } from "./TableBodyProducts.jsx";
import { TableOptions } from "./TableOptions.jsx";
import { Pagination } from "../Pagination/Pagination.jsx";


export const Table = ({ typeBody, data, filteredProductsCount }) => {

	const TableVariant = useMemo(() => {
		let Body, Heading;

		switch (typeBody) {
			case TABLE_BODY_TYPES.PRODUCT:
				{
					const headings = ['Product', 'Price Amazon', 'Price eBay', 'Profit', 'Availability', 'Rating', 'Last Updated', 'Error', 'Actions'];
					Body = <TableBodyProducts products={data} />;
					Heading = <TableHeader headings={headings} />;
				}
				break;
			case TABLE_BODY_TYPES.USER:
				break;
			case TABLE_BODY_TYPES.EXTENSION:

				break;
		}

		return { Body, Heading };

	}, [typeBody, data, filteredProductsCount]);



	return (
		<div className="mt-8">

			<TableOptions />

			<div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
				<div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
					<table className="min-w-full leading-normal">
						{TableVariant.Heading}

						{TableVariant.Body}
					</table>

					<Pagination filteredProductsCount={filteredProductsCount} />

				</div>
			</div>
		</div>
	);
};
