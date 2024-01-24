import { formatDateToTimeAgo } from '../../util/formatDateToTimeAgo.js';

import { Tooltip } from '../Tooltip.jsx';

export const TableExtensionsData = ({ extensionsData, onModalClick }) => {
    // TODO
    return (
        <tbody>

            {extensionsData.length === 0 && (
                <tr className="text-center bg-white">
                    <td colSpan={9} className="gap-2 py-5 text-lg border-b border-gray-200">
                        <svg className="inline-block w-8 h-8 text-gray-900" viewBox="0 0 28 28" fill="none">
                            <path d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
                            <path d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z" stroke="currentColor" strokeWidth="2"></path>
                            <text x="50%" y="65%" textAnchor="middle" alignmentBaseline="middle" fontSize="12" fill="#fff" fontWeight="bold">x</text>
                        </svg>

                        <p className="inline-block align-middle ml-1 text-2xl font-semibold text-gray-900">No extension added yet!
                            <span className="cursor-pointer hover:text-indigo-600" onClick={() => onModalClick('AddProductModal')}> Add from here.</span>
                        </p>
                    </td>
                </tr>
            )}

            {extensionsData.length > 0 && extensionsData.map(extension => (
                <tr key={extension._id} className="bg-white hover:bg-gray-50">

                    <td className="px-5 py-5 text-sm  border-b border-gray-200 w-2/12">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            {extension.extensionName}
                            <Tooltip message={'Extension Name'} />
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            {extension.isLogin ? 'Logged in' : 'Not logged in'}
                            <Tooltip message={'Extension Status'} />
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            {extension.isWork ? 'Working' : 'Not working'}
                            <Tooltip message={'Extension Status'} />
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap text-center relative group">
                            {extension.updatedAt !== '1970-01-01T00:00:00.000Z' ? formatDateToTimeAgo(extension.updatedAt) : "-"}
                            {extension.updatedAt !== '1970-01-01T00:00:00.000Z' && <Tooltip message={'Last Seen'} />}
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <p className="text-gray-900 whitespace-wrap flex items-center justify-center relative group">
                            {extension.error
                                ? (
                                    <>
                                        <svg
                                            className="fill-red-600 group-hover:text-gray-900"
                                            height="24"
                                            width="24"
                                            viewBox="0 0 512 512">
                                            <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                                        </svg>
                                        <Tooltip message={extension.error} direction="left" customTailwindClass="mb-1" />
                                    </>
                                ) : (
                                    '-'
                                )}
                        </p>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <div className="flex justify-center gap-2">
                            <div className="relative group">
                                <svg
                                    className="w-8 h-8"
                                    viewBox="0 0 576 512"
                                    fill="green"
                                >
                                    <path d="M96 0C78.3 0 64 14.3 64 32v96h64V32c0-17.7-14.3-32-32-32zM288 0c-17.7 0-32 14.3-32 32v96h64V32c0-17.7-14.3-32-32-32zM32 160c-17.7 0-32 14.3-32 32s14.3 32 32 32v32c0 77.4 55 142 128 156.8V480c0 17.7 14.3 32 32 32s32-14.3 32-32V412.8c12.3-2.5 24.1-6.4 35.1-11.5c-2.1-10.8-3.1-21.9-3.1-33.3c0-80.3 53.8-148 127.3-169.2c.5-2.2 .7-4.5 .7-6.8c0-17.7-14.3-32-32-32H32zM576 368a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zm-76.7-43.3c6.2 6.2 6.2 16.4 0 22.6l-72 72c-6.2 6.2-16.4 6.2-22.6 0l-40-40c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L416 385.4l60.7-60.7c6.2-6.2 16.4-6.2 22.6 0z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                                <Tooltip message="Start" />
                            </div>

                            <div className="relative group">
                                <svg
                                    className="block w-6 h-6 fill-red-600 cursor-pointer p-1 hover:opacity-70"
                                    viewBox="0 0 448 512"
                                    onClick={() => onModalClick('DeleteProductModal', { ...extension })}
                                >
                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                </svg>
                                <Tooltip message="Logout" />
                            </div>
                        </div>
                    </td>

                    <td className="px-5 py-5 text-sm border-b border-gray-200 w-1/12">
                        <div className="flex justify-center gap-2">
                            <div className="relative group">
                                <svg
                                    className="block w-6 h-6 fill-indigo-600 cursor-pointer p-1 hover:opacity-70"
                                    viewBox="0 0 512 512"
                                    onClick={() => onModalClick('EditProductModal', { ...extension })}
                                >
                                    <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                                </svg>
                                <Tooltip message="Edit" />
                            </div>

                            <div className="relative group">
                                <svg
                                    className="block w-6 h-6 fill-red-600 cursor-pointer p-1 hover:opacity-70"
                                    viewBox="0 0 448 512"
                                    onClick={() => onModalClick('DeleteProductModal', { ...extension })}
                                >
                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                </svg>
                                <Tooltip message="Delete" />
                            </div>
                        </div>
                    </td>

                </tr>
            ))
            }

        </tbody >
    );
};