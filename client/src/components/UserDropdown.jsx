import { useState } from 'react';
import { Link } from 'react-router-dom';

import { CLIENT_PATHS } from '../util/paths.js';

export const UserDropdown = () => {
    const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);

    const toggleAvatarDropdown = () => {
        setAvatarDropdownOpen(!avatarDropdownOpen);
    };

    return (
        <div className="flex items-center">
            <button className="flex mx-4 text-gray-600 focus:outline-none">
                <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
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
                    onClick={toggleAvatarDropdown}
                >
                    {/* <img
								className="object-cover w-full h-full"
								src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
								alt="Your avatar"
							/> */}
                    <svg
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
                        onClick={toggleAvatarDropdown}
                    />
                )}

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
                            to={CLIENT_PATHS.LOGOUT}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                        >
                            Log out
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};