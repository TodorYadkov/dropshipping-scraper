import { useContext, useState } from 'react';
import { StateContext } from '../contexts/StateContext.jsx';

export const Header = () => {
	const { changeSideBarState } = useContext(StateContext);
	const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);

	return (
		<>
			<header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
				<div className="flex items-center">
					<button
						className="text-gray-500 focus:outline-none lg:hidden"
						onClick={() => changeSideBarState(true)}
					>
						<svg
							className="w-6 h-6"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4 6H20M4 12H20M4 18H11"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>

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
							className="w-32 pl-10 pr-4 py-2 text-indigo-600 border border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
							type="text"
							placeholder="Search"
						/>
					</div>
				</div>

				<div className="flex items-center">
					<button className="flex mx-4 text-gray-600 focus:outline-none">
						<svg
							className="w-6 h-6"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>

					<div className="relative">
						<button
							className="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
							onClick={() =>
								setAvatarDropdownOpen((state) => !state)
							}
						>
							<img
								className="object-cover w-full h-full"
								src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
								alt="Your avatar"
							/>
						</button>

						{avatarDropdownOpen && (
							<div
								className="fixed inset-0 z-10 w-full h-full"
								onClick={() =>
									setAvatarDropdownOpen((state) => !state)
								}
							/>
						)}

						{/* <transition
                            enter-active-className="transition duration-150 ease-out transform"
                            enter-from-className="scale-95 opacity-0"
                            enter-to-className="scale-100 opacity-100"
                            leave-active-className="transition duration-150 ease-in transform"
                            leave-from-className="scale-100 opacity-100"
                            leave-to-className="scale-95 opacity-0"
                        > */}
						{avatarDropdownOpen && (
							<div className="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
								<a
									href="#"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
								>
									Profile
								</a>
								<a
									href="#"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
								>
									Products
								</a>
								<a
									href="/"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
								>
									Log out
								</a>
							</div>
						)}
						{/* </transition> */}
					</div>
				</div>
			</header>
		</>
	);
};
