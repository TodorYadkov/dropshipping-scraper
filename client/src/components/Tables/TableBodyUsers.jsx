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

                    {/* <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap flex items-center justify-center relative group">
                            {user.error
                                ? (
                                    <>
                                        <svg
                                            className="fill-red-600 group-hover:text-gray-900"
                                            height="24"
                                            width="24"
                                            viewBox="0 0 512 512"
                                            onClick={() => onModalClick('ResetErrorExtensionModal', { ...user })}
                                        >
                                            <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                                        </svg>
                                        <Tooltip message={user.error} direction="left" customTailwindClass="mb-1" />
                                    </>
                                ) : (
                                    '-'
                                )}
                        </p>
                    </td> */}

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <div className="relative group">

                            <svg
                                viewBox="0 0 512 512"
                                className={`w-6 h-6 mx-auto ${user.isWork ? 'fill-green-600' : 'fill-red-600'} ${user.isWorkBrowser ? 'cursor-pointer' : 'cursor-not-allowed opacity-20'}`}
                                onClick={
                                    user.isWorkBrowser
                                        ? (
                                            user.isWork
                                                ? () => onModalClick('StopExtensionModal', { ...user })
                                                : () => onModalClick('StartExtensionModal', { ...user })
                                        ) : undefined
                                }
                            >
                                <path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                            </svg>

                            <Tooltip message={`${user.disable ? 'Undo' : 'Disable'}`} customTailwindClass="mb-[1px]" />
                        </div>
                    </td>
                </tr>
            ))}
        </tbody >
    );
};