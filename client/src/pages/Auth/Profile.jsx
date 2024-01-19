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

export const Profile = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState('');

    const { setUserState } = useAuthContext();
    const { register } = useApi(authService);
    const navigate = useNavigate();

    const { values, formErrors, isInvalidForm, onChange, onSubmit, onBlur } = useForm(
        onRegister,
        {
            [AUTH_FORM_KEYS.name]: '',
            [AUTH_FORM_KEYS.email]: '',
            [AUTH_FORM_KEYS.password]: '',
            [AUTH_FORM_KEYS.extensionName]: ''
        },
        validationUserInput
    );

    async function onRegister(formData) {
        try {
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

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    return (
        <PageTitle title={'Profile'}>
            <div className="flex-col items-center justify-center w-11/12 mt-8 p-6 mx-auto bg-white rounded-lg overflow-hidden shadow-md cursor-default">
                <h1 className="text-2xl font-semibold text-center mb-4 text-gray-700">Profile Details</h1>
                <div className="flex justify-evenly">

                    <div className="flex-col items-center justify-center">
                        <div className="w-36 h-w-36 overflow-hidden rounded-full shadow p-5 mb-2 mx-auto">
                            <img src="https://res.cloudinary.com/framevibe/image/upload/v1705613842/nl9lfvifhh4kb718wbnf.png" alt="User Image" />
                            {/* <svg viewBox="0 0 448 512">
                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                            </svg> */}
                        </div>
                        <div className="text-center">
                            <p className="text-gray-600">Role: User</p>
                            <p className="text-gray-600">Joined: 12.01.2024</p>
                            <p className="text-gray-600">Updated: 12.01.2025</p>
                        </div>
                    </div>

                    <div>
                        <div className="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
                            <div className="flex items-center justify-center">

                            </div>

                            {serverError && (
                                <p className="text-center -mb-6 text-red-600">
                                    {serverError}
                                </p>
                            )}

                            <form className="mt-4" onSubmit={onSubmit}>
                                <Input
                                    text="Name"
                                    type="text"
                                    name={AUTH_FORM_KEYS.name}
                                    value={values[AUTH_FORM_KEYS.name]}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    error={formErrors[AUTH_FORM_KEYS.name]}
                                />

                                <Input
                                    text="Email"
                                    type="email"
                                    name={AUTH_FORM_KEYS.email}
                                    value={values[AUTH_FORM_KEYS.email]}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    error={formErrors[AUTH_FORM_KEYS.email]}
                                />

                                <Input
                                    text="Extension name"
                                    type="text"
                                    name={AUTH_FORM_KEYS.extensionName}
                                    value={values[AUTH_FORM_KEYS.extensionName]}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    error={formErrors[AUTH_FORM_KEYS.extensionName]}
                                />

                                <div className="relative">
                                    <Input
                                        text="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        name={AUTH_FORM_KEYS.password}
                                        value={values[AUTH_FORM_KEYS.password]}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        error={formErrors[AUTH_FORM_KEYS.password]}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute top-8 right-0"
                                    >
                                        {showPassword ? (
                                            <svg
                                                className="pr-3"
                                                fill="#4f46e5"
                                                height="1.1em"
                                                viewBox="0 0 640 512"
                                            >
                                                <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="pr-3"
                                                fill="#4f46e5ad"
                                                height="1.1em"
                                                viewBox="0 0 576 512"
                                            >
                                                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                <div className="mt-6">
                                    {isLoading ? (
                                        <Loader width={6} height={6} />
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={isInvalidForm}
                                            className={`${isInvalidForm ? 'cursor-not-allowed bg-indigo-200' : 'cursor-pointer bg-indigo-600 hover:bg-indigo-400'} w-full px-4 py-2 text-sm text-center text-white rounded-md focus:outline-none`}
                                        >
                                            Sign up
                                        </button>
                                    )}
                                </div>
                            </form>

                            <div className="flex items-center justify-center gap-3 mt-3">
                                <p className="text-sm">Already have an account ?</p>
                                <Link
                                    to={CLIENT_PATHS.LOGIN}
                                    className="text-sm text-indigo-700 hover:text-indigo-300"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </PageTitle>
    );
};