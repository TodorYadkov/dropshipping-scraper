import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const baseValue = 'last_updated_desc';

export const DropdownSorts = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState(() => {
        const sortParams = searchParams.get('sort');
        return sortParams ? sortParams : baseValue;
    });

    useEffect(() => {
        setSearchParams((params) => {
            const paramsObject = Object.fromEntries(params.entries());

            return 'sort' in paramsObject === false ? { page: 1, offset: 5, sort: baseValue } : { ...paramsObject, sort: sort }
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
                <option value={'name_asc'}>Name &#x1F805; </option>
                <option value={'name_desc'}>Name &#x1F807;</option>
                <option value={'amazon_price_asc'}>Amazon price &#x1F805;</option>
                <option value={'amazon_price_desc'}>Amazon price &#x1F807;</option>
                <option value={'ebay_price_asc'}>Ebay price &#x1F805;</option>
                <option value={'ebay_price_desc'}>Ebay price &#x1F807;</option>
                <option value={'profit_asc'}>Profit &#x1F805;</option>
                <option value={'profit_desc'}>Profit &#x1F807;</option>
                <option value={'last_updated_asc'}>Last Updated &#x1F805;</option>
                <option value={'last_updated_desc'}>Last Updated &#x1F807;</option>
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