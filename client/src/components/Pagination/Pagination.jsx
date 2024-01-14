import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const Pagination = ({ filteredProductsCount }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentPage, setCurrentPage] = useState(() => Number(searchParams.get('page')) || 1);
	const [totalPageCount, setTotalPageCount] = useState(calculateNumberOfPages);

	useEffect(() => {
		setSearchParams((params) => {
			const paramsObject = Object.fromEntries(params.entries());
			return { ...paramsObject, page: currentPage }
		})
	}, [currentPage]);

	useEffect(() => {
		const pages = calculateNumberOfPages();
		setTotalPageCount(pages);
	}, [filteredProductsCount]);

	function setFirstPage() {
		setCurrentPage(1);
	}

	function previousPage() {
		setCurrentPage((page) => Math.max(page - 1, 1));
	}

	function nextPage() {
		setCurrentPage(page => Math.min(page + 1, totalPageCount));
	}

	function setLastPage() {
		setCurrentPage(totalPageCount);
	}

	function calculateNumberOfPages() {
		const offset = Number(searchParams.get('offset'));
		let pages = Math.max(Math.floor(filteredProductsCount / offset), 1); // In case of 0 set it to 1

		if (filteredProductsCount % offset != 0) pages++;

		return pages;
	}

	return (
		<div >
			<div className="flex justify-center px-4 py-4 overflow-x-auto bg-white rounded-b-lg">
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
						<span>{currentPage - 1}</span>
					</p>
					<p
						className="px-3 py-2 leading-tight bg-indigo-500 text-white border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white cursor-pointer"
					>
						<span>{currentPage}</span>
					</p>
					<p
						onClick={nextPage}
						className="px-3 py-2 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white cursor-pointer"
					>
						<span>{currentPage + 1}</span>
					</p>
					<p
						onClick={setLastPage}
						className="px-3 py-2 leading-tight text-indigo-700 bg-white border border-gray-200 rounded-r hover:bg-indigo-500 hover:text-white cursor-pointer"
					>
						<span>{'>>'}</span>
					</p>
				</div>
			</div>
		</div>
	);
};
