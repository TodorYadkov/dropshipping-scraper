import { NavLink } from 'react-router-dom';

import { REDUCER_TYPES } from '../util/constants.js';
import { CLIENT_PATHS } from '../util/paths.js';

import { useAuthContext } from '../hooks/useAuthContext.js';
import { useAppStateContext } from '../hooks/useAppStateContext.js';


export const SideBar = () => {
	const { appState, changeSideBarState } = useAppStateContext();
	const { currentUserData } = useAuthContext();

	function setActiveAndInactiveCss(boolean) {
		return [
			'flex items-center px-6 py-2 mt-4 duration-200 border-l-4',
			boolean
				? 'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100'
				: 'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100'
		].join(' ');
	}

	return (
		<>
			<div className="flex">
				{/* <!-- Backdrop --> */}
				{appState[REDUCER_TYPES.IS_SIDE_BAR_OPEN] && (
					<div
						className="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
						onClick={() => changeSideBarState(false)}
					/>
				)}

				{/* <!-- End Backdrop --> */}

				<div
					className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:${appState[REDUCER_TYPES.IS_SIDE_BAR_OPEN]
						? 'translate-x-0 ease-out block'
						: '-translate-x-full ease-in hidden'
						} lg:static lg:inset-0 lg:block`}
				>

					<span className="block ml-6 mr-2 mt-6 text-2xl font-semibold text-white">
						{currentUserData?.userDetails.name ?? 'Amazon Scraper'}
					</span>

					<nav className="mt-10">
						<NavLink
							className={({ isActive }) =>
								setActiveAndInactiveCss(isActive)
							}
							to={CLIENT_PATHS.DASHBOARD}
						>
							<svg
								className="w-5 h-5"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
									fill="currentColor"
								/>
								<path
									d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z"
									fill="currentColor"
								/>
							</svg>

							<span className="mx-4">Dashboard</span>
						</NavLink>

						<NavLink
							className={({ isActive }) =>
								setActiveAndInactiveCss(isActive)
							}
							to="/ui-elements"
						>
							<svg
								className="w-5 h-5"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M5 3C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3H5Z"
									fill="currentColor"
								/>
								<path
									d="M5 11C3.89543 11 3 11.8954 3 13V15C3 16.1046 3.89543 17 5 17H7C8.10457 17 9 16.1046 9 15V13C9 11.8954 8.10457 11 7 11H5Z"
									fill="currentColor"
								/>
								<path
									d="M11 5C11 3.89543 11.8954 3 13 3H15C16.1046 3 17 3.89543 17 5V7C17 8.10457 16.1046 9 15 9H13C11.8954 9 11 8.10457 11 7V5Z"
									fill="currentColor"
								/>
								<path
									d="M11 13C11 11.8954 11.8954 11 13 11H15C16.1046 11 17 11.8954 17 13V15C17 16.1046 16.1046 17 15 17H13C11.8954 17 11 16.1046 11 15V13Z"
									fill="currentColor"
								/>
							</svg>

							<span className="mx-4">UI Elements</span>
						</NavLink>

						{/* <NavLink
							className={({ isActive }) =>
								setActiveAndInactiveCss(isActive)
							}
							to="/tables"
						>
							<svg
								className="w-5 h-5"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M7 3C6.44772 3 6 3.44772 6 4C6 4.55228 6.44772 5 7 5H13C13.5523 5 14 4.55228 14 4C14 3.44772 13.5523 3 13 3H7Z"
									fill="currentColor"
								/>
								<path
									d="M4 7C4 6.44772 4.44772 6 5 6H15C15.5523 6 16 6.44772 16 7C16 7.55228 15.5523 8 15 8H5C4.44772 8 4 7.55228 4 7Z"
									fill="currentColor"
								/>
								<path
									d="M2 11C2 9.89543 2.89543 9 4 9H16C17.1046 9 18 9.89543 18 11V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V11Z"
									fill="currentColor"
								/>
							</svg>

							<span className="mx-4">Tables</span>
						</NavLink> */}

						<NavLink
							className={({ isActive }) =>
								setActiveAndInactiveCss(isActive)
							}
							to="/forms"
						>
							<svg
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
								<path
									fillRule="evenodd"
									d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
									clipRule="evenodd"
								/>
							</svg>

							<span className="mx-4">Forms</span>
						</NavLink>

						<NavLink
							className={({ isActive }) =>
								setActiveAndInactiveCss(isActive)
							}
							to="/cards"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-5 h-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
								<path
									fillRule="evenodd"
									d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
									clipRule="evenodd"
								/>
							</svg>

							<span className="mx-4">Cards</span>
						</NavLink>

						<NavLink
							className={({ isActive }) =>
								setActiveAndInactiveCss(isActive)
							}
							to="/modal"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-5 h-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
								<path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
								<path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
							</svg>

							<span className="mx-4">Modal</span>
						</NavLink>

					</nav>
				</div>
			</div>
		</>
	);
};
