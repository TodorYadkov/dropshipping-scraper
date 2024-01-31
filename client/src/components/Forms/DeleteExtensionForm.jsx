import { useState } from 'react';

import { EXTENSION_FORM_KEYS } from '../../util/constants.js';

import { useApi } from '../../hooks/useApi.js';
import { useAppStateContext } from '../../hooks/useAppStateContext.js';

import { extensionService } from '../../services/extensionService.js';

import { Loader } from '../Shared/Loader.jsx';

export const DeleteExtensionForm = ({ toggleModal, extension }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [isBtnPressed, setIsBtnPressed] = useState(false);

    const { removeExtension, setRefreshState } = useAppStateContext();
    const { deleteExtension } = useApi(extensionService);

    async function deleteHandler() {
        try {
            setIsLoading(true);
            setIsBtnPressed(true);

            await deleteExtension(extension._id);

            removeExtension(extension);
            setRefreshState(true);
            toggleModal();

        } catch (error) {
            setServerError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full overflow-hidden bg-gray-200 border shadow-md">
            <form className="w-full bg-gray-100 py-2">

                <div className="px-5 text-gray-700 mb-1">
                    <label className="text-xs">Extension Name</label>

                    <div className="relative mt-2 rounded-md shadow-sm">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-600">
                            <svg
                                height="20"
                                width="20"
                                viewBox="-40 0 550 550"
                            >
                                <path d="M192 104.8c0-9.2-5.8-17.3-13.2-22.8C167.2 73.3 160 61.3 160 48c0-26.5 28.7-48 64-48s64 21.5 64 48c0 13.3-7.2 25.3-18.8 34c-7.4 5.5-13.2 13.6-13.2 22.8c0 12.8 10.4 23.2 23.2 23.2H336c26.5 0 48 21.5 48 48v56.8c0 12.8 10.4 23.2 23.2 23.2c9.2 0 17.3-5.8 22.8-13.2c8.7-11.6 20.7-18.8 34-18.8c26.5 0 48 28.7 48 64s-21.5 64-48 64c-13.3 0-25.3-7.2-34-18.8c-5.5-7.4-13.6-13.2-22.8-13.2c-12.8 0-23.2 10.4-23.2 23.2V464c0 26.5-21.5 48-48 48H279.2c-12.8 0-23.2-10.4-23.2-23.2c0-9.2 5.8-17.3 13.2-22.8c11.6-8.7 18.8-20.7 18.8-34c0-26.5-28.7-48-64-48s-64 21.5-64 48c0 13.3 7.2 25.3 18.8 34c7.4 5.5 13.2 13.6 13.2 22.8c0 12.8-10.4 23.2-23.2 23.2H48c-26.5 0-48-21.5-48-48V343.2C0 330.4 10.4 320 23.2 320c9.2 0 17.3 5.8 22.8 13.2C54.7 344.8 66.7 352 80 352c26.5 0 48-28.7 48-64s-21.5-64-48-64c-13.3 0-25.3 7.2-34 18.8C40.5 250.2 32.4 256 23.2 256C10.4 256 0 245.6 0 232.8V176c0-26.5 21.5-48 48-48H168.8c12.8 0 23.2-10.4 23.2-23.2z" />
                            </svg>
                        </span>

                        <input
                            type="text"
                            value={extension[EXTENSION_FORM_KEYS.EXTENSION_NAME]}
                            disabled
                            className="w-full px-14 py-2 border-transparent rounded-md appearance-none focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between px-5 py-3">
                    <input
                        type="button"
                        value="Cancel"
                        onClick={toggleModal}
                        className="px-5 py-3 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer focus:outline-none" />

                    {serverError && (
                        <p className="text-center text-red-600">
                            {serverError}
                        </p>
                    )}

                    {isLoading ? (
                        <Loader width={6} height={6} margin="mr-6" />
                    ) :
                        <input
                            type="submit"
                            value="Delete"
                            disabled={isBtnPressed}
                            onClick={deleteHandler}
                            className={`${isBtnPressed ? 'cursor-not-allowed bg-red-300' : 'cursor-pointer bg-red-600 hover:bg-red-400'} px-5 py-3 text-sm text-white rounded-md focus:outline-none`} />
                    }

                </div>
            </form>
        </div>
    );
};