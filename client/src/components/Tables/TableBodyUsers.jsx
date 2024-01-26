import { formatDateToTimeAgo } from '../../util/formatDateToTimeAgo.js';

import { Tooltip } from '../Tooltip.jsx';

export const TableBodyUsers = ({ usersData, onModalClick }) => {

    return (
        <tbody>
            {console.log(usersData)}
            {usersData.length > 0 && usersData.map(user => (
                <tr key={user._id} className="bg-white hover:bg-gray-50">

                    <td className="px-5 py-5 text-sm  border-b border-gray-200 w-1/4">

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
                            {user.isLogin ? 'Logged in' : 'Not logged in'}
                            <Tooltip message={'Login Status'} />
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            {user.isWork ? 'Working' : 'Not working'}
                            <Tooltip message={'Extension Status'} />
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            {user.updatedAt !== '1970-01-01T00:00:00.000Z' ? formatDateToTimeAgo(user.updatedAt) : "-"}
                            {user.updatedAt !== '1970-01-01T00:00:00.000Z' && <Tooltip message={'Last Seen'} />}
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <div className="relative group">
                            {user.disable
                                ? <svg
                                    viewBox="0 0 512 512"
                                    className="w-6 h-6 mx-auto fill-green-600 cursor-pointer"
                                    onClick={() => onModalClick('EnableUser', { ...user })}
                                >
                                    <path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z" />
                                </svg>

                                : <svg
                                    viewBox="0 0 512 512"
                                    className="w-6 h-6 mx-auto fill-red-600 cursor-pointer"
                                    onClick={() => onModalClick('DisableUser', { ...user })}
                                >
                                    <path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                                </svg>
                            }

                            <Tooltip message={`${user.disable ? 'Undo' : 'Disable'}`} customTailwindClass="mb-[1px]" />
                        </div>
                    </td>
                </tr>
            ))}
        </tbody >
    );
};