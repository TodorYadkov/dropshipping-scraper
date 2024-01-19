import { useState } from "react";

import { Input } from "../../components/Input.jsx";
import { Loader } from "../../components/Loader.jsx";
import { PageTitle } from "../../components/PageTitle.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { useApi } from "../../hooks/useApi.js";
import { authService } from "../../services/authService.js";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm.js";
import { AUTH_FORM_KEYS } from "../../util/constants.js";
import { validationUserInput } from "./validationUserInput.js";
import { CLIENT_PATHS } from "../../util/paths.js";
import { ImageInput } from "../../components/ImageInput.jsx";

export const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [serverError, setServerError] = useState('');

    const { currentUserData, setUserState } = useAuthContext();
    const { register } = useApi(authService);
    const navigate = useNavigate();

    const { values, formErrors, isInvalidForm, onChange, onSubmit, onBlur } = useForm(
        onUpdate,
        {
            [AUTH_FORM_KEYS.name]: currentUserData.userDetails[AUTH_FORM_KEYS.name],
            [AUTH_FORM_KEYS.email]: currentUserData.userDetails[AUTH_FORM_KEYS.email],
            [AUTH_FORM_KEYS.imageUrl]: currentUserData.userDetails[AUTH_FORM_KEYS.imageUrl] || ' ',
        },
        validationUserInput
    );

    // console.log(currentUserData.userDetails);

    async function onUpdate(formData) {

        try {
            if (formData[AUTH_FORM_KEYS.imageUrl] === '') {
                formData[AUTH_FORM_KEYS.imageUrl] = null;
            }

            console.log(formData);
            setIsLoading(true);
            const userInfo = await register(formData);

            setUserState(userInfo);
            navigate(CLIENT_PATHS.DASHBOARD, { replace: true });
        } catch (error) {
            setServerError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    function changeStateToEditable(e) {
        e.preventDefault();
        setIsEditable(true);
    }

    return (
        <PageTitle title={'Profile'}>
            <div className="flex-col items-center justify-center w-3/5 mt-8 p-6 mx-auto bg-white rounded-lg overflow-hidden shadow-md cursor-default">
                <h1 className="text-2xl font-semibold text-center mb-4 text-gray-700">Profile Details</h1>
                <div className="flex justify-evenly">


                    <div>
                        <div className="w-full max-w-sm p-6 bg-white rounded-md">
                            <div className="flex items-center justify-center">

                            </div>

                            {serverError && (
                                <p className="text-center -mt-6 text-red-600">
                                    {serverError}
                                </p>
                            )}

                            <form className="mt-4" onSubmit={onSubmit}>

                                <ImageInput
                                    type="file"
                                    name={AUTH_FORM_KEYS.imageUrl}
                                    value={values[AUTH_FORM_KEYS.imageUrl]}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    error={formErrors[AUTH_FORM_KEYS.imageUrl]}
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

                                <div className="mt-6">
                                    {isLoading ? (
                                        <Loader width={6} height={6} />
                                    ) : (
                                        <input
                                            type={isEditable ? "submit" : "button"}
                                            onClick={isEditable ? undefined : changeStateToEditable}
                                            disabled={isEditable ? isInvalidForm : false}
                                            value={isEditable ? 'Update' : 'Change Profile'}
                                            className={`${isEditable ? isInvalidForm ? 'cursor-not-allowed bg-indigo-200' : 'cursor-pointer bg-indigo-600 hover:bg-indigo-400' : 'cursor-pointer bg-indigo-600 hover:bg-indigo-400'} 
                                            w-full px-4 py-2 text-sm text-center text-white rounded-md focus:outline-none`}
                                        />
                                    )}
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </PageTitle>
    );
};