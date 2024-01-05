import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppStateContext } from '../hooks/useAppStateContext.js';

export const Header = () => {
	const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);

	const { changeSideBarState } = useAppStateContext();

	return (
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

				<div className="flex items-center mx-4 lg:mx-0 cursor-default">
					<svg
						className="w-12 h-12"
						viewBox="0 0 512 512"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
							fill="#4C51BF"
							stroke="#4C51BF"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
							fill="white"
						/>
					</svg>

					<span className="mx-2 text-2xl font-semibold text-gray-900">
						Amazon Scraper
					</span>
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
						{/* <img
								className="object-cover w-full h-full"
								src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
								alt="Your avatar"
							/> */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="16"
							width="14"
							viewBox="0 0 448 512"
							className="object-cover w-9/12 h-11/12 ml-1"
						>
							<path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
						</svg>
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
							<Link
								to="#"
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
							>
								Profile
							</Link>
							<Link
								to="#"
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
							>
								Products
							</Link>
							<Link
								to="/logout"
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
							>
								Log out
							</Link>
						</div>
					)}
					{/* </transition> */}
				</div>
			</div>
		</header>
	);
};
