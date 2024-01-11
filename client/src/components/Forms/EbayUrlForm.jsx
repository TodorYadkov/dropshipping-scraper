import { useState } from "react";

import { useForm } from "../../hooks/useForm.js";
import { validationProductInput } from "./validationProductInput.js";
import { PRODUCT_FORM_KEYS } from "../../util/constants.js";
import { useApi } from "../../hooks/useApi.js";
import { productService } from "../../services/productService.js";
import { useAppStateContext } from "../../hooks/useAppStateContext.js";
import { Loader } from "../Loader.jsx";


export const EbayUrlForm = ({ toggleModal }) => {

    const { values, formErrors, isInvalidForm, onChange, onSubmit, onBlur } = useForm(
        submitFunction,
        {
            [PRODUCT_FORM_KEYS.EBAY]: ''
        },
        validationProductInput
    );

    const [isLoading, setIsLoading] = useState(false);
    const { createProduct } = useApi(productService);
    const { addProduct } = useAppStateContext();
    const [serverError, setServerError] = useState('');

    async function submitFunction(formData) {
        try {
            setIsLoading(true);
            // TODO first change the database model to handle ebayUrl;
            // const product = await createProduct(formData);
            // addProduct(product);
            // toggleModal();
        } catch (err) {
            setServerError(err.message);
        } finally {
            setIsLoading(true);
        }
    }

    return (
        <div className="w-full overflow-hidden bg-gray-200 border shadow-md">
            <form onSubmit={onSubmit} className="w-full bg-gray-100 py-2">

                <div className="px-5 pb-6 text-gray-700">
                    <label className="text-xs">Ebay URL</label>

                    <div className="relative mt-2 rounded-md shadow-sm">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                            <svg
                                height="34"
                                width="34"
                                viewBox="0 0 640 512">
                                <path d="M606 189.5l-54.8 109.9-54.9-109.9h-37.5l10.9 20.6c-11.5-19-35.9-26-63.3-26-31.8 0-67.9 8.7-71.5 43.1h33.7c1.4-13.8 15.7-21.8 35-21.8 26 0 41 9.6 41 33v3.4c-12.7 0-28 .1-41.7 .4-42.4 .9-69.6 10-76.7 34.4 1-5.2 1.5-10.6 1.5-16.2 0-52.1-39.7-76.2-75.4-76.2-21.3 0-43 5.5-58.7 24.2v-80.6h-32.1v169.5c0 10.3-.6 22.9-1.1 33.1h31.5c.7-6.3 1.1-12.9 1.1-19.5 13.6 16.6 35.4 24.9 58.7 24.9 36.9 0 64.9-21.9 73.3-54.2-.5 2.8-.7 5.8-.7 9 0 24.1 21.1 45 60.6 45 26.6 0 45.8-5.7 61.9-25.5 0 6.6 .3 13.3 1.1 20.2h29.8c-.7-8.2-1-17.5-1-26.8v-65.6c0-9.3-1.7-17.2-4.8-23.8l61.5 116.1-28.5 54.1h35.9L640 189.5zM243.7 313.8c-29.6 0-50.2-21.5-50.2-53.8 0-32.4 20.6-53.8 50.2-53.8 29.8 0 50.2 21.4 50.2 53.8 0 32.3-20.4 53.8-50.2 53.8zm200.9-47.3c0 30-17.9 48.4-51.6 48.4-25.1 0-35-13.4-35-25.8 0-19.1 18.1-24.4 47.2-25.3 13.1-.5 27.6-.6 39.4-.6zm-411.9 1.6h128.8v-8.5c0-51.7-33.1-75.4-78.4-75.4-56.8 0-83 30.8-83 77.6 0 42.5 25.3 74 82.5 74 31.4 0 68-11.7 74.4-46.1h-33.1c-12 35.8-87.7 36.7-91.2-21.6zm95-21.4H33.3c6.9-56.6 92.1-54.7 94.4 0z" />
                            </svg>
                        </span>

                        {/* Error Message */}
                        {(formErrors[PRODUCT_FORM_KEYS.EBAY].isTouched && !!formErrors[PRODUCT_FORM_KEYS.EBAY].message)
                            && <p className="absolute right-0 bottom-full text-red-500 pb-1">{formErrors[PRODUCT_FORM_KEYS.EBAY].message}</p>}

                        <input
                            type="text"
                            name={PRODUCT_FORM_KEYS.EBAY}
                            value={values[PRODUCT_FORM_KEYS.EBAY]}
                            onChange={onChange}
                            onBlur={onBlur}
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
                            value="Add"
                            disabled={isInvalidForm}
                            className={`${isInvalidForm ? 'cursor-not-allowed bg-indigo-300' : 'cursor-pointer bg-indigo-600 hover:bg-indigo-400'} px-5 py-3 text-sm text-white rounded-md focus:outline-none`} />
                    }

                </div>
            </form>
        </div>
    );
};
