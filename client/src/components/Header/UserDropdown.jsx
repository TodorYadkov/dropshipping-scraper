import { useState } from 'react';
import { Link } from 'react-router-dom';

import { CLIENT_PATHS } from '../../util/paths.js';

export const UserDropdown = () => {
    const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);

    const toggleAvatarDropdown = () => {
        setAvatarDropdownOpen(!avatarDropdownOpen);
    };

    return (
        <div className="relative">
            <button
                className="relative z-5 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
                onClick={toggleAvatarDropdown}
            >
                        <img
							// className="object-cover w-full h-full"
							className="object-cover w-9/12 h-11/12 ml-1"
							src="https://res.cloudinary.com/framevibe/image/upload/v1705609288/xfq6pgcrwaybffifd3fk.png"
							alt="Your avatar"
						/>
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
                        to={CLIENT_PATHS.PROFILE}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                    >
                        Profile
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
    );
};