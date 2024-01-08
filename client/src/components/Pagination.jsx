export const Pagination = () => {
	return (
		<div >
			<div className="flex justify-center px-4 py-4 overflow-x-auto bg-white rounded-b-lg">
				<div className="flex mr-4 rounded-b-lg">
					<a
						href="#"
						className="px-3 py-2 ml-0 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 rounded-l hover:bg-indigo-500 hover:text-white"
					>
						<span>Previous</span>
					</a>
					<a
						href="#"
						className="px-3 py-2 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white"
					>
						<span>1</span>
					</a>
					<a
						href="#"
						className="px-3 py-2 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white"
					>
						<span>2</span>
					</a>
					<a
						href="#"
						className="px-3 py-2 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white"
					>
						<span>3</span>
					</a>
					<a
						href="#"
						className="px-3 py-2 leading-tight text-indigo-700 bg-white border border-gray-200 rounded-r hover:bg-indigo-500 hover:text-white"
					>
						<span>Next</span>
					</a>
				</div>
			</div>
		</div>
	);
};
