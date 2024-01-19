import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AUTH_FORM_KEYS } from '../../util/constants.js';
import { CLIENT_PATHS } from '../../util/paths.js';

import { useForm } from '../../hooks/useForm.js';
import { useApi } from '../../hooks/useApi.js';

import { authService } from '../../services/authService.js';

import { validationUserInput } from './validationUserInput.js';

import { Input } from '../../components/Input.jsx';
import { Loader } from '../../components/Loader.jsx';
import { PageTitle } from '../../components/PageTitle.jsx';
import { AlertSuccess } from '../../components/Alerts/AlertSuccess.jsx';

export const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [isShownSuccessMessage, setIsShownSuccessMessage] = useState(false);

    const { forgotPassword } = useApi(authService);

    const { values, formErrors, isInvalidForm, onChange, onSubmit, onBlur, formReset } = useForm(
        onSubmitResetForm,
        {
            [AUTH_FORM_KEYS.email]: '',
        },
        validationUserInput
    );

    async function onSubmitResetForm(formData) {
        try {
            setIsLoading(true);

            await forgotPassword(formData);

            formReset();
            setIsShownSuccessMessage(true);
        } catch (error) {
            setServerError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const onCloseAlertSuccess = () => {
        setIsShownSuccessMessage(false);
    };

    return (
        <PageTitle title={'Forgot Password'}>
            <div className="flex flex-col items-center justify-center gap-6 mt-36">
                {isShownSuccessMessage && (
                    <div className="-mb-2 -mt-24">
                        <AlertSuccess message='Your password reset link has been successfully sent to your email.' close={onCloseAlertSuccess} />
                    </div>
                )}

                <div className="flex items-center justify-center bg-gray-200 cursor-default w-11/12">
                    <div className="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
                        <div className="flex items-center justify-center">
                            <svg
                                className="w-10 h-10"
                                viewBox="0 0 512 512"
                                fill="none"
                            >
                                <path
                                    d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
                                    fill="#4C51BF"
                                    stroke="#4C51BF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
                                    fill="white"
                                />
                            </svg>
                            <span className="text-2xl font-semibold text-gray-700">
                                Forgot Password
                            </span>
                        </div>

                        {serverError && (
                            <p className="text-center -mb-6 text-red-600">
                                {serverError}
                            </p>
                        )}

                        <form className="mt-4" onSubmit={onSubmit}>
                            <Input
                                text="Email"
                                type="email"
                                name={AUTH_FORM_KEYS.email}
                                value={values[AUTH_FORM_KEYS.email]}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={formErrors[AUTH_FORM_KEYS.email]}
                                placeholder="Please enter your email"
                            />

                            <div className="mt-6">
                                {isLoading ? (
                                    <Loader width={6} height={6} />
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isInvalidForm}
                                        className={`${isInvalidForm ? 'cursor-not-allowed bg-indigo-200' : 'cursor-pointer bg-indigo-600 hover:bg-indigo-400'} w-full px-4 py-2 text-sm text-center text-white rounded-md focus:outline-none`}
                                    >
                                        Reset Password
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="flex items-center justify-center gap-3 mt-3">
                            <Link
                                to={CLIENT_PATHS.LOGIN}
                                className="text-sm text-indigo-700 hover:text-indigo-300"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PageTitle>
    );
};
