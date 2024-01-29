import { useContext } from 'react';

import { AdminPanelContext } from '../../contexts/AdminPanelContext.jsx';

import { Tooltip } from '../Shared/Tooltip.jsx';

export const DashboardAdminSummary = () => {

    const { adminPanelStatistic } = useContext(AdminPanelContext);

    return (
        <div className="mb-10 cursor-default">
            <div className="flex items-center flex-wrap -mx-6">

                <div className="w-full px-6 sm:w-1/2 xl:w-1/3 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center justify-center px-5 py-6 bg-white rounded-md shadow-sm">
                        <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full relative group">
                            <svg
                                className="w-8 h-8 text-white"
                                viewBox="0 0 448 512"
                                fill="white"
                            >
                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                            </svg>
                            <Tooltip message="Users count" direction="bottom" customTailwindClass="mt-1" />
                        </div>

                        <div className="mx-4">
                            <h4 className="text-2xl font-semibold text-gray-700">
                                {adminPanelStatistic.totalUser}
                            </h4>
                            <p className="text-gray-500">Users</p>
                        </div>

                        <div className="p-3 bg-yellow-600 bg-opacity-75 rounded-full relative group">
                            <svg
                                className="w-8 h-8 text-white"
                                viewBox="0 0 580 512"
                                fill="white"
                            >
                                <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                            </svg>
                            <Tooltip message="Logged users" direction="bottom" customTailwindClass="mt-1" />
                        </div>

                        <div className="mx-4">
                            <h4 className="text-2xl font-semibold text-gray-700">
                                {adminPanelStatistic.totalLogged}
                            </h4>
                            <p className="text-gray-500">Logged</p>
                        </div>
                    </div>
                </div>

                <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center justify-center px-5 py-6 bg-white rounded-md shadow-sm">
                        <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full relative group">
                            <svg
                                className="w-8 h-8 text-white"
                                viewBox="-40 0 550 550"
                                fill="white"
                            >
                                <path d="M192 104.8c0-9.2-5.8-17.3-13.2-22.8C167.2 73.3 160 61.3 160 48c0-26.5 28.7-48 64-48s64 21.5 64 48c0 13.3-7.2 25.3-18.8 34c-7.4 5.5-13.2 13.6-13.2 22.8c0 12.8 10.4 23.2 23.2 23.2H336c26.5 0 48 21.5 48 48v56.8c0 12.8 10.4 23.2 23.2 23.2c9.2 0 17.3-5.8 22.8-13.2c8.7-11.6 20.7-18.8 34-18.8c26.5 0 48 28.7 48 64s-21.5 64-48 64c-13.3 0-25.3-7.2-34-18.8c-5.5-7.4-13.6-13.2-22.8-13.2c-12.8 0-23.2 10.4-23.2 23.2V464c0 26.5-21.5 48-48 48H279.2c-12.8 0-23.2-10.4-23.2-23.2c0-9.2 5.8-17.3 13.2-22.8c11.6-8.7 18.8-20.7 18.8-34c0-26.5-28.7-48-64-48s-64 21.5-64 48c0 13.3 7.2 25.3 18.8 34c7.4 5.5 13.2 13.6 13.2 22.8c0 12.8-10.4 23.2-23.2 23.2H48c-26.5 0-48-21.5-48-48V343.2C0 330.4 10.4 320 23.2 320c9.2 0 17.3 5.8 22.8 13.2C54.7 344.8 66.7 352 80 352c26.5 0 48-28.7 48-64s-21.5-64-48-64c-13.3 0-25.3 7.2-34 18.8C40.5 250.2 32.4 256 23.2 256C10.4 256 0 245.6 0 232.8V176c0-26.5 21.5-48 48-48H168.8c12.8 0 23.2-10.4 23.2-23.2z" />
                            </svg>

                            <Tooltip message="Extensions count" direction="bottom" customTailwindClass="mt-1" />
                        </div>

                        <div className="mx-3">
                            <h4 className="text-2xl font-semibold text-gray-700">
                                {adminPanelStatistic.totalExtension}
                            </h4>
                            <p className="text-gray-500">Extensions</p>
                        </div>

                        <div className="p-3 bg-green-600 bg-opacity-75 rounded-full relative group">
                            <svg
                                className="w-8 h-8 text-white"
                                viewBox="0 0 576 512"
                                fill="white"
                            >
                                <path d="M96 0C78.3 0 64 14.3 64 32v96h64V32c0-17.7-14.3-32-32-32zM288 0c-17.7 0-32 14.3-32 32v96h64V32c0-17.7-14.3-32-32-32zM32 160c-17.7 0-32 14.3-32 32s14.3 32 32 32v32c0 77.4 55 142 128 156.8V480c0 17.7 14.3 32 32 32s32-14.3 32-32V412.8c12.3-2.5 24.1-6.4 35.1-11.5c-2.1-10.8-3.1-21.9-3.1-33.3c0-80.3 53.8-148 127.3-169.2c.5-2.2 .7-4.5 .7-6.8c0-17.7-14.3-32-32-32H32zM576 368a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zm-76.7-43.3c6.2 6.2 6.2 16.4 0 22.6l-72 72c-6.2 6.2-16.4 6.2-22.6 0l-40-40c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L416 385.4l60.7-60.7c6.2-6.2 16.4-6.2 22.6 0z"></path>
                            </svg>
                            <Tooltip message="Worked extensions" direction="bottom" customTailwindClass="mt-1" />
                        </div>

                        <div className="mx-3">
                            <h4 className="text-2xl font-semibold text-gray-700">
                                {adminPanelStatistic.totalExtensionWorked}
                            </h4>
                            <p className="text-gray-500">Worked</p>
                        </div>

                    </div>
                </div>

                <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center justify-center px-5 py-6 bg-white rounded-md shadow-sm">
                        <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full relative group">
                            <svg
                                className="w-8 h-8 text-white"
                                viewBox="0 0 28 28"
                                fill="none"
                            >
                                <path
                                    d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                            </svg>
                            <Tooltip message="All products" direction="bottom" customTailwindClass="mt-1" />
                        </div>

                        <div className="mx-4">
                            <h4 className="text-2xl font-semibold text-gray-700">
                                {adminPanelStatistic.totalProduct}
                            </h4>
                            <p className="text-gray-500">Products</p>
                        </div>

                        <div className="p-3 bg-red-600 bg-opacity-75 rounded-full relative group">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="white"
                                viewBox="0 0 512 512">
                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                            </svg>
                            <Tooltip message="Products with error" direction="bottom" customTailwindClass="mt-1" />
                        </div>

                        <div className="mx-4">
                            <h4 className="text-2xl font-semibold text-gray-700">
                                {adminPanelStatistic.totalProductErrorCount}
                            </h4>
                            <p className="text-gray-500">Errors</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};