import { DropdownRoleSelector } from '../DropdownRoleSelector.jsx';
import { Tooltip } from '../Tooltip.jsx';

export const TableBodyUsers = ({ usersData, onModalClick }) => {

    return (
        <tbody>
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
                            {user.email}
                            <Tooltip message={'Email'} />
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            <span
                                className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${user.isLogin ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                            >
                                {user.isLogin ? 'Logged In' : 'Not Logged In'}
                            </span>
                            <Tooltip message={'Login Status'} />
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            {user.extensionCount || 0}
                            <Tooltip message={'Count Extensions'} />
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            {user.productCount || 0}
                            <Tooltip message={'Count Products'} />
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-2/12">
                        <DropdownRoleSelector role={user.role} userId={user._id} />
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
                                    onClick={() => onModalClick('DisableUser', { ...user })}
                                >
                                    <path d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z" />
                                </svg>

                                : <svg
                                    viewBox="0 0 576 512"
                                    className="w-6 h-6 mx-auto fill-red-600 cursor-pointer"
                                    onClick={() => onModalClick('EnableUser', { ...user })}
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