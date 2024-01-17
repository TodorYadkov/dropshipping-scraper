import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const SearchInput = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [search, setSearch] = useState(() => searchParams.get('search') || '' );

	useEffect(() => {
		setSearchParams((params) => {
			const paramsObject = Object.fromEntries(params.entries());
			if (search === '') {
				const { search, ...paramsWithoutSearchProperty } = paramsObject;
				return { ...paramsWithoutSearchProperty };
			} else {
				return { ...paramsObject, search: search };
			}
		});
	}, [search]);

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};

	return (
		<div className="relative mx-4 lg:mx-0">
			<span className="absolute inset-y-0 left-0 flex items-center pl-3">
				<svg
					className="w-5 h-5 text-gray-500"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</span>

			<input
				className="w-full sm:w-64 pl-10 pr-4 py-2 text-gray-700 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
				type="text"
				placeholder="Search"
				value={search}
				onInput={handleSearchChange}
			/>
		</div>
	);
};
