export const Form1 = () => {
	return (
		<div className="mt-4">
			<div className="w-full max-w-sm overflow-hidden bg-white border rounded-md shadow-md">
				<form>
					<div className="flex items-center justify-between px-5 py-3 text-gray-700 border-b">
						<h3 className="text-sm">Add Category</h3>
						<button>
							<svg
								className="w-4 h-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					<div className="px-5 py-6 text-gray-700 bg-gray-200 border-b">
						<label className="text-xs">Name</label>

						<div className="relative mt-2 rounded-md shadow-sm">
							<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
								<svg
									className="w-6 h-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
									/>
								</svg>
							</span>

							<input
								type="text"
								className="w-full px-12 py-2 border-transparent rounded-md appearance-none focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
							/>
						</div>
					</div>

					<div className="flex items-center justify-between px-5 py-3">
						<button className="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none">
							Cancel
						</button>
						<button className="px-3 py-1 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none">
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
