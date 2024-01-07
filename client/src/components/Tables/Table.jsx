import { useMemo } from "react";

import { TABLE_BODY_TYPES } from "../../util/constants.js";
import { TableHeader } from "./TableHeader.jsx";
import { TableBodyProducts } from "./TableBodyProducts.jsx";


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
			<div className="flex flex-col mt-3 sm:flex-row">
				<div className="flex">
					<div className="relative">
						<select className="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500">
							<option>5</option>
							<option>10</option>
							<option>20</option>
						</select>

						<div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
							<svg
								className="w-4 h-4 fill-current"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
							</svg>
						</div>
					</div>

					<div className="relative">
						<select className="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border-t border-b border-r border-gray-400 rounded-r appearance-none sm:rounded-r-none sm:border-r-0 focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
							<option>All</option>
							<option>Active</option>
							<option>Inactive</option>
						</select>

						<div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
							<svg
								className="w-4 h-4 fill-current"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
							</svg>
						</div>
					</div>
				</div>

				<div className="relative block mt-2 sm:mt-0">
					<span className="absolute inset-y-0 left-0 flex items-center pl-2">
						<svg
							viewBox="0 0 24 24"
							className="w-4 h-4 text-gray-500 fill-current"
						>
							<path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z" />
						</svg>
					</span>

					<input
						placeholder="Search"
						className="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none sm:rounded-l-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
					/>
				</div>
			</div>

			<div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
				<div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
					<table className="min-w-full leading-normal">
						{TableVariant.Heading}

						{TableVariant.Body}
					</table>
					<div className="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between">
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
					</div>
				</div>
			</div>
		</div>
	);
};
