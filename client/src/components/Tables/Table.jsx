import { useMemo } from "react";

import { TABLE_BODY_TYPES } from "../../util/constants.js";
import { TableHeader } from "./TableHeader.jsx";
import { TableBodyProducts } from "./TableBodyProducts.jsx";
import { TableSearch } from "./TableSearch.jsx";
import { Pagination } from "../Pagination.jsx";


export const Table = ({ type, data }) => {

	const TableVariant = useMemo(() => {
		let Body, Heading;

		switch (type) {
			case TABLE_BODY_TYPES.PRODUCT:
				{
					const headings = ['Product', 'Price', 'Availability', 'Rating', 'Last Updated'];
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

	}, [type, data]);



	return (
		<div className="mt-8">

			<TableSearch />

			<div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
				<div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
					<table className="min-w-full leading-normal">
						{TableVariant.Heading}

						{TableVariant.Body}
					</table>
					<Pagination />
					{/* <div className="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between">
						<span className="text-xs text-gray-900 xs:text-sm">
							Showing 1 to 4 of 50 Entries
						</span>

						<div className="inline-flex mt-2 xs:mt-0">
							<button className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400">
								Prev
							</button>
							<button className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400">
								Next
							</button>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
};
