export const Form2 = () => {
	return (
		<div className="mt-4">
			<div className="p-6 bg-white rounded-md shadow-md">
				<h2 className="text-lg font-semibold text-gray-700 capitalize">
					Account settings
				</h2>

				<form>
					<div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
						<div>
							<label className="text-gray-700" htmlFor="username">
								Username
							</label>
							<input
								id="username"
								name="username"
								className="w-full mt-2 p-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
								type="text"
							/>
						</div>

						<div>
							<label
								className="text-gray-700"
								htmlFor="emailAddress"
							>
								Email Address
							</label>
							<input
								id="email"
								name="email"
								className="w-full mt-2 p-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
								type="email"
							/>
						</div>

						<div>
							<label className="text-gray-700" htmlFor="password">
								Password
							</label>
							<input
								id="password"
								name="password"
								className="w-full mt-2 p-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
								type="password"
							/>
						</div>

						<div>
							<label
								className="text-gray-700"
								htmlFor="passwordConfirmation"
							>
								Password Confirmation
							</label>
							<input
								id="confirm"
								name="confirm"
								className="w-full mt-2 p-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
								type="password"
							/>
						</div>
					</div>

					<div className="flex justify-end mt-4">
						<button className="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
