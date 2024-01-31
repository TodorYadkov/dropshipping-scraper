import { useContext, useState } from 'react';

import { AdminPanelContext } from '../../contexts/AdminPanelContext.jsx';

import { USER_ROLES } from '../../util/constants.js';

import { AlertError } from '../Alerts/AlertError.jsx';

export const DropdownRoleSelector = ({ role, userDetails }) => {
    const [serverErrorMessage, setServerErrorMessage] = useState('');

    const { updateUserData, updateUserRole } = useContext(AdminPanelContext);

    const handleSelectChangeHandler = async (e) => {
        try {
            const dataForServer = { _id: userDetails._id, role: e.target.value };

            const updatedUser = await updateUserRole(dataForServer);

            updateUserData({ ...userDetails, ...updatedUser });
        } catch (error) {
            setServerErrorMessage(error.message);
            console.error(error);
        }
    };

    const removeServerErrorMessageHandler = () => {
        setServerErrorMessage('');
    };

    return (
        <>
            <div className="relative">
                <select
                    className="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white appearance-none border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    value={role}
                    onChange={handleSelectChangeHandler}
                >
                    {Object.values(USER_ROLES).map((name, index) => (<option key={index} value={name}>{name}</option>))}

                </select>

                <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                    <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>

            {serverErrorMessage && (
                <div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <AlertError message={serverErrorMessage} close={removeServerErrorMessageHandler} />
                </div>
            )}
        </>
    );
};