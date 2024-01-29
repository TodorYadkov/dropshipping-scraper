import { useContext, useState } from 'react';

import { useApi } from '../../hooks/useApi.js';

import { adminService } from '../../services/adminService.js';

import { AdminPanelContext } from '../../contexts/AdminPanelContext.jsx';

import { Loader } from '../Shared/Loader.jsx';

export const AlertDisableUser = ({ toggleModal, userDetails }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [isBtnPressed, setIsBtnPressed] = useState(false);

    const { updateUserData } = useContext(AdminPanelContext);
    const { updateUserStatusToBeDisabled } = useApi(adminService);

    const disableUserHandler = async () => {
        try {
            setIsLoading(true);
            setIsBtnPressed(true);
            const dataForServer = { _id: userDetails._id };

            const disabledUserData = await updateUserStatusToBeDisabled(dataForServer);

            updateUserData({ ...userDetails, ...disabledUserData });
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
                <p className="text-center py-4 text-lg">Are you sure you want to disable <span className="font-bold">{userDetails.name}</span>?</p>
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
                            value="Disable"
                            disabled={isBtnPressed}
                            onClick={disableUserHandler}
                            className={`${isBtnPressed ? 'cursor-not-allowed bg-indigo-300' : 'cursor-pointer bg-indigo-600 hover:bg-indigo-400'} px-5 py-3 text-sm text-white rounded-md focus:outline-none`} />
                    }

                </div>
            </div>
        </div>
    );
};
