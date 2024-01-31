import { useState } from 'react';

import { useApi } from '../../hooks/useApi.js';
import { useAppStateContext } from '../../hooks/useAppStateContext.js';

import { extensionService } from '../../services/extensionService.js';

import { Loader } from '../Shared/Loader.jsx';

export const AlertStopExtension = ({ toggleModal, extension }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [isBtnPressed, setIsBtnPressed] = useState(false);

    const { editExtension, setRefreshState } = useAppStateContext();
    const { stopExtension } = useApi(extensionService);

    const stopExtensionHandler = async () => {
        try {
            setIsLoading(true);
            setIsBtnPressed(true);
            const dataForServer = { _id: extension._id };

            const updatedExtension = await stopExtension(dataForServer);
            editExtension(updatedExtension);
            setRefreshState(true);
            toggleModal();

        } catch (error) {
            setServerError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full overflow-hidden bg-gray-200 border shadow-md">
            <div className="w-full bg-gray-100 py-2">
                <p className="text-center py-4 text-lg">Are you sure you want to stop {extension.extensionName}?</p>
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
                            type="button"
                            value="Stop"
                            disabled={isBtnPressed}
                            onClick={stopExtensionHandler}
                            className={`${isBtnPressed ? 'cursor-not-allowed bg-indigo-300' : 'cursor-pointer bg-indigo-600 hover:bg-indigo-400'} px-5 py-3 text-sm text-white rounded-md focus:outline-none`} />
                    }

                </div>
            </div>
        </div>
    );
};