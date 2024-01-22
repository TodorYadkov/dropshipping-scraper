/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SORTING_KEYS } from '../../util/constants.js';

export const DropdownSorts = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState(() => searchParams.get('sort') || '');

    useEffect(() => {
        setSearchParams((params) => {
            const paramsObject = Object.fromEntries(params.entries());
            if (sort === '') {
                const { sort, ...paramsWithoutSortProperty } = paramsObject;
                return { ...paramsWithoutSortProperty }
            } else {
                return 'sort' in paramsObject === false ? { page: 1, offset: 10, sort: sort } : { ...paramsObject, sort: sort }
            }
        });
    }, [sort]);

    const handleSelectChange = (e) => {
        setSort(e.target.value);
    };

    return (
        <div className="relative">
            <select
                className="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white appearance-none border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                value={sort}
                onChange={handleSelectChange}
            >
                <option value={''}>Select</option>
                <option value={[SORTING_KEYS.PRODUCT_NAME_ASC]}>Name &#x1F805;</option>
                <option value={[SORTING_KEYS.PRODUCT_NAME_DESC]}>Name &#x1F807;</option>
                <option value={[SORTING_KEYS.PRODUCT_AMAZON_PRICE_ASC]}>Amazon price &#x1F805;</option>
                <option value={[SORTING_KEYS.PRODUCT_AMAZON_PRICE_DESC]}>Amazon price &#x1F807;</option>
                <option value={[SORTING_KEYS.PRODUCT_EBAY_PRICE_ASC]}>Ebay price &#x1F805;</option>
                <option value={[SORTING_KEYS.PRODUCT_EBAY_PRICE_DESC]}>Ebay price &#x1F807;</option>
                <option value={[SORTING_KEYS.PRODUCT_PROFIT_ASC]}>Profit &#x1F805;</option>
                <option value={[SORTING_KEYS.PRODUCT_PROFIT_DESC]}>Profit &#x1F807;</option>
                <option value={[SORTING_KEYS.PRODUCT_LAST_UPDATED_ASC]}>Last Updated &#x1F805;</option>
                <option value={[SORTING_KEYS.PRODUCT_LAST_UPDATED_DESC]}>Last Updated &#x1F807;</option>
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
    );
};