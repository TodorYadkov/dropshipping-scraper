import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const Pagination = ({ localFilteredState }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentPage, setCurrentPage] = useState(() => Math.abs(Number(searchParams.get('page'))) || 1);
	const [currentOffset, setCurrentOffset] = useState(searchParams.get('offset'));
	const [currentSearch, setCurrentSearch] = useState(searchParams.get('search'));
	const [totalPageCount, setTotalPageCount] = useState(calculateNumberOfPages);
	const [visiblePages, setVisiblePages] = useState(getVisiblePageNumbers);

	useEffect(() => {
		setSearchParams((params) => {
			const paramsObject = Object.fromEntries(params.entries());

			return 'offset' in paramsObject === false ? { page: currentPage, offset: 10 } : { ...paramsObject, page: currentPage }
		})
	}, [currentPage]);

	useEffect(() => {
		const pages = calculateNumberOfPages();
		setTotalPageCount(pages);

	}, [localFilteredState]);

	useEffect(() => {
		const offsetParam = searchParams.get('offset');
		const searchParam = searchParams.get('search');

		const hasSearchParamsChanged = searchParam !== null && searchParam !== currentSearch;
		const hasOffsetParamsChanged = offsetParam !== null && offsetParam !== currentOffset;

		if (hasSearchParamsChanged
			|| hasOffsetParamsChanged
			|| currentPage > totalPageCount
			|| currentPage <= 0) {
			setCurrentPage(1);
		}

		setTotalPageCount(calculateNumberOfPages());
		setVisiblePages(getVisiblePageNumbers(1));
		setCurrentOffset(offsetParam);
		setCurrentSearch(searchParam);

	}, [searchParams.get('offset'), searchParams.get('search')]);

	const setFirstPage = () => {
		setCurrentPage(1);

		setVisiblePages(getVisiblePageNumbers(1));
	}

	const previousPage = () => {
		setCurrentPage((page) => Math.max(page - 1, 1));

		setVisiblePages(getVisiblePageNumbers(currentPage - 1));
	}

	const nextPage = () => {
		setCurrentPage(page => Math.min(page + 1, totalPageCount));

		setVisiblePages(getVisiblePageNumbers(currentPage + 1));
	}

	const setLastPage = () => {
		setCurrentPage(totalPageCount);

		setVisiblePages(getVisiblePageNumbers(totalPageCount));
	}

	const goToPage = (targetPage) => {
		setCurrentPage(targetPage);

		setVisiblePages(getVisiblePageNumbers(targetPage));
	}

	function calculateNumberOfPages() {
		const offset = Number(searchParams.get('offset')) || 10;
		const productCount = localFilteredState.totalDataCount;
		const pages = Math.max(Math.ceil(productCount / offset), 1); // In case of 0 set it to 1
		return pages;
	}

	function getVisiblePageNumbers(currentPage = 1) {
		let visiblePages = [];

		// Calculate additional visible pages
		const maxVisiblePages = 5;
		const totalPages = calculateNumberOfPages();

		// Calculate the starting point for visible pages
		let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);

		// Ensure that we have enough pages after the current page
		if (startPage + maxVisiblePages > totalPages) {
			startPage = Math.max(totalPages - maxVisiblePages + 1, 1);
		}

		// Add pages to the visiblePages array
		for (let i = startPage; i < startPage + maxVisiblePages && i <= totalPages; i++) {
			visiblePages.push(i);
		}

		return visiblePages;
	}

	return (
		<div className="flex justify-center mx-auto px-4 py-4 overflow-x-auto bg-white rounded-b-lg w-full max-w-sm lg:max-w-full lg:flex">
			<div className="flex mr-4 rounded-b-lg">
				<p
					onClick={setFirstPage}
					className="px-3 py-2 ml-0 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 rounded-l hover:bg-indigo-500 hover:text-white cursor-pointer"
				>
					<span>{'<<'}</span>
				</p>
				<p
					onClick={previousPage}
					className="px-3 py-2 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white cursor-pointer"
				>
					<span>{'<'}</span>
				</p>

				{visiblePages.length >= 1 &&
					visiblePages.map((pageNumber, index) => (
						<p
							key={index}
							className={`px-3 py-2 leading-tight ${pageNumber === currentPage
								? 'bg-indigo-500 text-white hover:bg-indigo-500 hover:text-white'
								: 'text-indigo-700 bg-white '
								} border border-r-0 border-gray-200 cursor-pointer`}
							onClick={() => goToPage(pageNumber)}
						>
							<span>{pageNumber}</span>
						</p>
					))}

				<p
					onClick={nextPage}
					className="px-3 py-2 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white cursor-pointer"
				>
					<span>{'>'}</span>
				</p>
				<p
					onClick={setLastPage}
					className="px-3 py-2 leading-tight text-indigo-700 bg-white border border-gray-200 rounded-r hover:bg-indigo-500 hover:text-white cursor-pointer"
				>
					<span>{'>>'}</span>
				</p>
			</div>
		</div>
	);
};