import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DropdownRoleSelector } from '../Shared/DropdownRoleSelector.jsx';
import { Tooltip } from '../Shared/Tooltip.jsx';

export const TableBodyUsers = ({ usersData, onModalClick }) => {
    const [isVisible, setIsVisible] = useState(false);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsVisible(true);
        }, 500);

        return () => clearTimeout(timeoutId);

    }, []);

    return (
        <tbody>
            {(isVisible && usersData.length === 0 && searchParams.get('search') === null) && (
                <tr className="text-center bg-white">
                    <td colSpan={8} className="gap-2 py-5 text-lg border-b border-gray-200">
                        <svg className="inline-block w-7 h-7 text-gray-900" viewBox="0 0 640 512" >
                            <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM471 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                        </svg>

                        <p className="inline-block align-middle ml-2 text-2xl font-semibold text-gray-900">No registered users yet!</p>
                    </td>
                </tr>
            )}

            {(isVisible && usersData.length === 0 && searchParams.get('search') !== null) && (
                <tr className="text-center bg-white">
                    <td colSpan={8} className="gap-2 py-5 text-lg border-b border-gray-200">
                        <svg className="inline-block w-7 h-7 text-gray-900" viewBox="0 0 640 512">
                            <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM471 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                        </svg>

                        <p className="inline-block align-middle ml-2 text-2xl font-semibold text-gray-900">No found users</p>
                    </td>
                </tr>
            )}

            {usersData.length > 0 && usersData.map(user => (
                <tr key={user._id} className="bg-white hover:bg-gray-50">

                    <td className="px-5 py-5 text-sm  border-b border-gray-200 w-2/12">

                        <div className="flex items-center hover:opacity-80">
                            <div className="flex-shrink-0 w-10 h-10">
                                <img
                                    className="w-full h-full"
                                    src={user.avatarURL ? user.avatarURL : "https://res.cloudinary.com/framevibe/image/upload/v1705609288/xfq6pgcrwaybffifd3fk.png"}
                                    alt={user.name}
                                />
                            </div>

                            <div className="ml-3 relative group">
                                <p className="text-gray-900">
                                    {user.name}
                                </p>
                                <Tooltip message={'Username'} />
                            </div>
                        </div>
                    </td>

                    <td className="px-5 py-5 text-sm  border-b border-gray-200 w-2/12">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            <a
                                href={`mailto:${user.email}`}
                                target="blank"
                                rel="noopener noreferrer"
                                className="hover:text-indigo-600"
                            >
                                {user.email}
                            </a>
                            <Tooltip message={'Email'} />
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 text-center relative group">
                            <span
                                className={`whitespace-nowrap inline-flex px-3 py-1 text-xs font-semibold leading-5 rounded-full ${user.isLogin ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                            >
                                {user.isLogin ? 'Logged In' : 'Not Logged In'}
                            </span>
                            <Tooltip message={'Login Status'} />
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <div className="flex justify-center items-center gap-5">
                            <p className="text-center relative group px-3 py-1 font-semibold leading-5 rounded-full bg-gray-100 text-gray-900">
                                {user.extensionCount}
                                <Tooltip message={'All Extensions'} />
                            </p>
                            <p className={`text-center relative group px-3 py-1 font-semibold leading-5 rounded-full ${user.extensionsWithIsWorkBrowser === 0 ? 'bg-gray-100 text-gray-900' : 'bg-green-300 text-green-900'}`}>
                                {user.extensionsWithIsWorkBrowser}
                                <Tooltip message={'Active Extensions'} />
                            </p>
                        </div>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <div className="flex justify-center items-center gap-5">
                            <p className="text-center relative group px-3 py-1 font-semibold leading-5 rounded-full bg-gray-100 text-gray-900">
                                {user.productCount}
                                <Tooltip message={'All Products'} />
                            </p>
                            <p className={`text-center relative group px-3 py-1 font-semibold leading-5 rounded-full ${user.productsWithErrorCount === 0 ? 'bg-gray-100 text-gray-900' : 'bg-red-100 text-red-800'}`}>
                                {user.productsWithErrorCount}
                                <Tooltip message={'Products with error'} />
                            </p>
                        </div>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-2/12">
                        <div className="relative group">
                            <DropdownRoleSelector role={user.role} userDetails={user} />
                            <Tooltip message={'Change user role'} />
                        </div>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-[3%]">
                        <div className="relative group">
                            {user.disable
                                ? <svg
                                    viewBox="0 0 512 512"
                                    className="w-6 h-6 mx-auto fill-red-600"
                                >
                                    <path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                                </svg>

                                : <svg
                                    viewBox="0 0 512 512"
                                    className="w-6 h-6 mx-auto fill-green-600"
                                >
                                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                                </svg>

                            }

                            <Tooltip message={`${user.disable ? 'Account Status Banned' : 'Account Status Ok'}`} customTailwindClass="mb-[1px]" />
                        </div>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-[3%]">
                        <div className="relative group">
                            {user.disable

                                ? <svg
                                    viewBox="0 0 448 512"
                                    className="w-6 h-6 mx-auto fill-green-600 cursor-pointer"
                                    onClick={() => onModalClick('EnableUserModal', { ...user })}
                                >
                                    <path d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z" />
                                </svg>

                                : <svg
                                    viewBox="0 0 576 512"
                                    className="w-6 h-6 mx-auto fill-red-600 cursor-pointer"
                                    onClick={() => onModalClick('DisableUserModal', { ...user })}
                                >
                                    <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />

                                </svg>
                            }

                            <Tooltip message={`${user.disable ? 'Unlock Account' : 'Lock Account'}`} customTailwindClass="mb-[1px]" />
                        </div>
                    </td>
                </tr>
            ))}
        </tbody >
    );
};