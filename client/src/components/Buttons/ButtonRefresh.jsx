import { useState } from "react";

import { Loader } from "../Shared/Loader.jsx";

export const ButtonRefresh = ({ onRefresh }) => {
	const [isLoading, setIsLoading] = useState(false);

	const onRefreshClickHandler = async () => {
		setIsLoading(true);
		await onRefresh();
		setIsLoading(false);
	};

	return (
		<>
			{isLoading
				? (<Loader width={6} height={6} margin="mx-[2.65rem] my-2" />)
				: (
					<button
						className="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
						onClick={onRefreshClickHandler}
					>
						<svg
							className="w-5 h-5 mx-1"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="mx-1">Refresh</span>
					</button>
				)}
		</>
	);
};
