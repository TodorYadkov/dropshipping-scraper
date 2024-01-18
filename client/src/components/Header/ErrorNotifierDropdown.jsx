import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAppStateContext } from "../../hooks/useAppStateContext.js";

import { Tooltip } from "../Tooltip.jsx";

export const ErrorNotifierDropdown = () => {
    const [errorDropdownOpen, setErrorDropdownOpen] = useState(false);
    const [productsWithErrors, setProductWithErrors] = useState([]);
    const [countErrors, setCountErrors] = useState(0);

    const { appState } = useAppStateContext();

    useEffect(() => {

        if (appState?.products.some(p => p.error)) {
            const productErrors = appState.products.filter(p => p.error);
            setProductWithErrors(productErrors);
            setCountErrors(productErrors.length);

        } else {
            setProductWithErrors([]);
            setCountErrors(0);
        }

    }, [appState.products]);

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

                    {productsWithErrors.map(p => (
                        <div key={p._id} className="py-1 px-2 text-xs text-gray-700 hover:bg-indigo-600 hover:text-white relative group">
                            <Link to={p.amazonUrl} target="blank" rel="noopener noreferrer">
                                <p title="Link Amazon" className="truncate w-11/12">Product: {p.name}
                                    <svg
                                        className="absolute top-1 right-2 w-3 h-3 fill-white"
                                        viewBox="0 0 512 512">
                                        <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                                    </svg>
                                </p>
                            </Link>

                            <p className="truncate w-full">Error: {p.error}</p>
                            <Tooltip message={p.error} direction="bottom-left" customTailwindClass="whitespace-pre-wrap w-full h-auto" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};