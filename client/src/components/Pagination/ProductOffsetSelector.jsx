import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const baseValue = 5;

export const ProductOffsetSelector = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [offset, setOffset] = useState(() => {
        const offsetParam = searchParams.get('offset');
        if (offsetParam) return Number(offsetParam);

        return baseValue;
    })

    useEffect(() => {
        setSearchParams((params) => {
            const paramsObject = Object.fromEntries(params.entries());
            return { ...paramsObject, offset: offset }
        });
    }, [offset]);

    const handleSelectChange = (e) => {
        const newOffset = Number(e.target.value);
        setOffset(newOffset);
    };

    return (
        <div className="relative">
            <select
                className="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white rounded-md appearance-none border-gray-200 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                value={offset}
                onChange={handleSelectChange}
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>

            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
            </div>
        </div>
    );
};