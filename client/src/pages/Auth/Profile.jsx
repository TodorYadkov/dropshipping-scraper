import { useState } from 'react';

import { AUTH_FORM_KEYS } from '../../util/constants.js';

import { useApi } from '../../hooks/useApi.js';
import { useForm } from '../../hooks/useForm.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';

import { authService } from '../../services/authService.js';

import { validationUserInput } from './validationUserInput.js';

import { Loader } from '../../components/Shared/Loader.jsx';
import { PageTitle } from '../../components/Shared/PageTitle.jsx';
import { Input } from '../../components/Shared/Input.jsx';
import { ImageInput } from '../../components/Shared/ImageInput.jsx';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [isEditable, setIsEditable] = useState(false);

    const { currentUserData, setUserState } = useAuthContext();
    const { profileUpdate } = useApi(authService);

    const { values, formErrors, isInvalidForm, onChange, onSubmit, onBlur, formReset, resetError } = useForm(
        onUpdate,
        {
            [AUTH_FORM_KEYS.name]: currentUserData.userDetails[AUTH_FORM_KEYS.name],
            [AUTH_FORM_KEYS.email]: currentUserData.userDetails[AUTH_FORM_KEYS.email],
            [AUTH_FORM_KEYS.uploadAvatar]: currentUserData.userDetails.avatarURL || ' ',
        },
        validationUserInput
    );

    async function onUpdate(formData) {
        try {
            setIsLoading(true);

            if (formData[AUTH_FORM_KEYS.uploadAvatar] === '') {
                formData[AUTH_FORM_KEYS.uploadAvatar] = null;
            }

            const dataForServer = new FormData();
            dataForServer.append([AUTH_FORM_KEYS.name], formData[AUTH_FORM_KEYS.name]);
            dataForServer.append([AUTH_FORM_KEYS.email], formData[AUTH_FORM_KEYS.email]);
            dataForServer.append([AUTH_FORM_KEYS.uploadAvatar], formData[AUTH_FORM_KEYS.uploadAvatar]);

            const userInfo = await profileUpdate(dataForServer);

            setUserState(userInfo);
        } catch (error) {
            setServerError(error.message);
        } finally {
            setIsLoading(false);
            setIsEditable(false);
        }
    }

    function changeStateToEditableHandler(e) {
        e.preventDefault();
        setIsEditable(true);
    }

    function cancelEditHandler() {
        formReset();
        resetError();
        setIsEditable(false);
    }

    return (
        <PageTitle title={'Profile'}>
            <div className="flex-col items-center justify-center w-11/12 sm:w-3/5 mt-8 p-6 mx-auto bg-white rounded-lg overflow-hidden shadow-md cursor-default">
                <h1 className="text-2xl font-semibold text-center mb-4 text-gray-700">Profile Details</h1>
                <div className="flex justify-evenly">

                    <div className="w-full max-w-sm p-6 bg-white rounded-md">
                        <div className="flex items-center justify-center">

                        </div>

                        {serverError && (
                            <p className="text-center -mt-6 text-red-600">
                                {serverError}
                            </p>
                        )}

                        <form className="mt-4" onSubmit={onSubmit} encType="multipart/form-data">
                            <ImageInput
                                type="file"
                                name={AUTH_FORM_KEYS.uploadAvatar}
                                value={values[AUTH_FORM_KEYS.uploadAvatar]}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={formErrors[AUTH_FORM_KEYS.uploadAvatar]}
                                isEditable={isEditable}
                            />

                            <Input
                                text="Name"
                                type="text"
                                name={AUTH_FORM_KEYS.name}
                                value={values[AUTH_FORM_KEYS.name]}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={formErrors[AUTH_FORM_KEYS.name]}
                                isEditable={isEditable}
                            />

                            <Input
                                text="Email"
                                type="email"
                                name={AUTH_FORM_KEYS.email}
                                value={values[AUTH_FORM_KEYS.email]}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={formErrors[AUTH_FORM_KEYS.email]}
                                isEditable={isEditable}
                            />

                            <div className="flex justify-between gap-2 mt-6">
                                {isEditable && (
                                    <input
                                        type="button"
                                        onClick={cancelEditHandler}
                                        value="Cancel"
                                        className="basis-1/2 px-4 py-2 text-sm text-center text-white rounded-md focus:outline-none cursor-pointer bg-indigo-600 hover:opacity-70" />
                                )}

                                {isLoading ? (
                                    <Loader width={6} height={6} margin="my-1 justify-self-center basis-1/2" />
                                ) : (
                                    <input
                                        type={isEditable ? "submit" : "button"}
                                        onClick={isEditable ? undefined : changeStateToEditableHandler}
                                        disabled={isEditable ? isInvalidForm : false}
                                        value={isEditable ? 'Update' : 'Change Profile'}
                                        className={`px-4 py-2 text-sm text-center text-white rounded-md focus:outline-none 
                                        ${isEditable ? 'basis-1/2' : 'w-full'}
                                        ${isEditable
                                                ? isInvalidForm
                                                    ? 'cursor-not-allowed bg-indigo-200'
                                                    : 'cursor-pointer bg-indigo-600 hover:opacity-70'
                                                : 'cursor-pointer bg-indigo-600 hover:opacity-70'} 
                                            `}
                                    />
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PageTitle>
    );
};

export default Profile;