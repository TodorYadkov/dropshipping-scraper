import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { REDUCER_TYPES } from '../util/constants.js';
import { CLIENT_PATHS } from '../util/paths.js';

import { useAuthContext } from '../hooks/useAuthContext.js';
import { useAppStateContext } from '../hooks/useAppStateContext.js';


export const SideBar = memo(() => {
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
							className={({ isActive }) => setActiveAndInactiveCss(isActive)}
							to={CLIENT_PATHS.DASHBOARD}
							onClick={() => changeSideBarState(false)}
						>
							<svg
								className="w-5 h-5"
								viewBox="0 0 20 20"
								fill="none"
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
							className={({ isActive }) => setActiveAndInactiveCss(isActive)}
							to={CLIENT_PATHS.EXTENSIONS}
							onClick={() => changeSideBarState(false)}
						>
							<svg
								className="w-5 h-5"
								viewBox="-40 0 550 550"
								fill="none"
							>
								<path
									d="M192 104.8c0-9.2-5.8-17.3-13.2-22.8C167.2 73.3 160 61.3 160 48c0-26.5 28.7-48 64-48s64 21.5 64 48c0 13.3-7.2 25.3-18.8 34c-7.4 5.5-13.2 13.6-13.2 22.8c0 12.8 10.4 23.2 23.2 23.2H336c26.5 0 48 21.5 48 48v56.8c0 12.8 10.4 23.2 23.2 23.2c9.2 0 17.3-5.8 22.8-13.2c8.7-11.6 20.7-18.8 34-18.8c26.5 0 48 28.7 48 64s-21.5 64-48 64c-13.3 0-25.3-7.2-34-18.8c-5.5-7.4-13.6-13.2-22.8-13.2c-12.8 0-23.2 10.4-23.2 23.2V464c0 26.5-21.5 48-48 48H279.2c-12.8 0-23.2-10.4-23.2-23.2c0-9.2 5.8-17.3 13.2-22.8c11.6-8.7 18.8-20.7 18.8-34c0-26.5-28.7-48-64-48s-64 21.5-64 48c0 13.3 7.2 25.3 18.8 34c7.4 5.5 13.2 13.6 13.2 22.8c0 12.8-10.4 23.2-23.2 23.2H48c-26.5 0-48-21.5-48-48V343.2C0 330.4 10.4 320 23.2 320c9.2 0 17.3 5.8 22.8 13.2C54.7 344.8 66.7 352 80 352c26.5 0 48-28.7 48-64s-21.5-64-48-64c-13.3 0-25.3 7.2-34 18.8C40.5 250.2 32.4 256 23.2 256C10.4 256 0 245.6 0 232.8V176c0-26.5 21.5-48 48-48H168.8c12.8 0 23.2-10.4 23.2-23.2z"
									fill="currentColor"
								/>
							</svg>

							<span className="mx-4">Extensions</span>
						</NavLink>
					</nav>
				</div>
			</div>
		</>
	);
});

SideBar.displayName = 'SideBar';
