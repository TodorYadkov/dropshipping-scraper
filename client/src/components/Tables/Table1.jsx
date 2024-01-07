export const Table1 = () => {
	return (
		<div>
			<h3 className="text-3xl font-medium text-gray-700">Tables</h3>

			<div className="mt-4">
				<h4 className="text-gray-600">Simple Table</h4>

				<div className="mt-6">
					<div className="my-6 overflow-hidden bg-white rounded-md shadow">
						<table className="w-full text-left border-collapse">
							<thead className="border-b">
								<tr>
									<th className="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800">
										City
									</th>
									<th className="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800">
										Total orders
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className="hover:bg-gray-200">
									<td className="px-6 py-4 text-lg text-gray-700 border-b">
										{'City'}
									</td>
									<td className="px-6 py-4 text-gray-500 border-b">
										{'Total orders'}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
