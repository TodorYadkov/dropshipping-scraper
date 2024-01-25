import { memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAppStateContext } from "../../hooks/useAppStateContext.js";
import { useApi } from "../../hooks/useApi.js";
import { useModal } from "../../hooks/useModal.js";

import { extensionService } from "../../services/extensionService.js";
import { productService } from "../../services/productService.js";

import { Tooltip } from "../Tooltip.jsx";
import { ResetErrorExtensionModal } from "../Modal/ResetErrorExtensionModal.jsx";
import { REDUCER_TYPES } from "../../util/constants.js";

export const NotifierDropdown = memo(() => {
    const [errorDropdownOpen, setErrorDropdownOpen] = useState(false);
    const [errors, setErrors] = useState({ productErrors: [], extensionErrors: [] });
    const [countErrors, setCountErrors] = useState(0);
    const [allData, setAllData] = useState({ products: [], extensions: [] });

    const [isShownResetModal, toggleResetModal] = useModal();

    const { appState } = useAppStateContext();
    const { getProducts } = useApi(productService);
    const { getExtensions } = useApi(extensionService);

    const requestHandler = useCallback(async () => {
        try {
            const [products, extensions] = await Promise.all([
                getProducts(),
                getExtensions()
            ]);

            setAllData({ products, extensions });
        } catch (error) {
            console.error(error);
        }
        
    }, []);

    useEffect(() => {
        (async function () {
            await requestHandler();
        })()

    }, [appState[REDUCER_TYPES.EXTENSIONS], appState[REDUCER_TYPES.PRODUCTS]]);

    useEffect(() => {
        const productErrors = allData?.products?.filter(p => p?.error) || [];
        const extensionErrors = allData?.extensions?.filter(e => e?.error) || [];

        const allErrors = [...productErrors, ...extensionErrors];

        setErrors({ productErrors, extensionErrors });
        setCountErrors(allErrors.length);

    }, [allData.extensions, allData.products]);



    // Show different error
    const errorHandler = useCallback(() => {
        const jsxErrors = [];

        // Errors product
        if (errors?.productErrors?.length > 0) {
            jsxErrors.push(
                ...errors.productErrors.map(p => (
                    <div key={p._id} className="py-1 px-2 text-xs text-gray-700 hover:bg-indigo-600 hover:text-white relative group">
                        <p className="truncate w-11/12"><span className="font-bold">Product: </span>{p.name}
                            <Link to={p.amazonUrl} target="blank" rel="noopener noreferrer">
                                <svg
                                    className="absolute top-1 right-2 w-3 h-3 fill-white"
                                    viewBox="0 0 512 512"
                                >
                                    <title>Link Amazon</title>
                                    <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                                </svg>
                            </Link>
                        </p>

                        <p className="truncate w-full">Error: {p.error}</p>
                        <Tooltip message={p.error} direction="bottom-left" customTailwindClass="whitespace-pre-wrap w-full h-auto" />
                    </div >
                ))
            );
        }

        // Errors extension
        if (errors?.extensionErrors?.length > 0) {
            jsxErrors.push(
                ...errors.extensionErrors.map(e => (
                    <div key={e._id}>
                        <div className="py-1 px-2 text-xs text-gray-700 hover:bg-indigo-600 hover:text-white relative group">
                            <p className="truncate w-11/12"><span className="font-bold">Extension: </span>{e.extensionName}
                                <svg
                                    className="absolute top-1 right-2 w-3 h-3 fill-white cursor-pointer"
                                    viewBox="0 0 384 512"
                                    onClick={toggleResetModal}
                                >
                                    <title>Remove error</title>
                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                </svg>
                            </p>

                            <p className="truncate w-full">Error: {e.error}</p>
                            <Tooltip message={e.error} direction="bottom-left" customTailwindClass="whitespace-pre-wrap w-full h-auto" />
                        </div>
                        {isShownResetModal && <ResetErrorExtensionModal toggleModal={toggleResetModal} extension={e} />}
                    </div>
                ))
            );
        }

        return jsxErrors;

    }, [errors.extensionErrors, errors.productErrors, isShownResetModal, toggleResetModal]);

    const toggleErrorDropdown = () => {
        setErrorDropdownOpen(!errorDropdownOpen);
    };

    return (
        <div className="relative cursor-default">
            <button className="relative group z-5 flex mx-4 text-gray-600 focus:outline-none" onClick={toggleErrorDropdown}>
                <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                {countErrors !== 0 && (
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center">
                        <span className={`${countErrors < 10 ? 'text-xs' : 'text-[10px]'} overflow-hidden`}>{countErrors}</span>
                    </div>
                )}

                {countErrors !== 0 ? <Tooltip message={`You have ${countErrors} error${countErrors > 1 ? 's' : ''}`} direction="bottom-left" /> : <Tooltip message="No errors" direction="bottom-left" />}
            </button>

            {errorDropdownOpen && (
                <div
                    className="fixed inset-0 z-10 w-full h-full"
                    onClick={toggleErrorDropdown}
                />
            )}

            {errorDropdownOpen && (
                <div className="absolute right-4 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">

                    {countErrors === 0 && <p className="block px-4 py-2 text-sm text-center text-gray-700">No errors found!</p>}

                    {countErrors !== 0 && errorHandler()}
                </div>
            )}
        </div>
    );
});

NotifierDropdown.displayName = 'NotifierDropdown';