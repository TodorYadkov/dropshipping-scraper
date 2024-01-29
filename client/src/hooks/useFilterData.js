import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { sortingData } from "../util/sortingData.js";

export const useFilterData = () => {
    const [localData, setLocalData] = useState([]);
    const [localFilteredState, setLocalFilteredState] = useState({
        data: [],
        totalDataCount: 0
    });

    const [searchParams] = useSearchParams();

    // On search filter filter the products
    useEffect(() => {
        filterData();
    }, [searchParams]);

    // Filter the products;
    function filterData(data = localData) {
        let dataToFilter = [...data];
        let totalDataCount = dataToFilter.length;

        searchHandler(); // Apply search filter
        sortHandler();
        pageHandler();  // Slice the products so it contains only products for that page

        // Search
        function searchHandler() {
            const search = searchParams.get('search');
            const searchRegexPattern = new RegExp(search, 'i');
            if (search) {
                dataToFilter = dataToFilter.filter(d => searchRegexPattern.test(d.name || d.extensionName));
                totalDataCount = dataToFilter.length;
            } else {
                dataToFilter = [...data];
            }
        }

        // Slice products for page products
        function pageHandler() {
            const offset = Number(searchParams.get('offset')) || 10;
            const page = Number(searchParams.get('page')) || 1;

            const startIndex = (page - 1) * offset;
            const endIndex = startIndex + offset;

            dataToFilter = dataToFilter.slice(startIndex, endIndex);
        }

        // Sorting the products
        function sortHandler() {
            const sortBy = searchParams.get('sort');
            sortBy && sortingData(sortBy, dataToFilter);
        }

        setLocalFilteredState({ totalDataCount, data: dataToFilter });
    }

    const setLocalDataHandler = (data = []) => {
        setLocalData(data);
        filterData(data);
    };

    const updateLocalDataHandler = (newData = {}) => {
        const updateState = ({ ...localFilteredState, data: localFilteredState.data.map(x => x._id === newData._id ? newData : x) });
        setLocalData(updateState.data);
        filterData(updateState.data);
    }

    return [localFilteredState, setLocalDataHandler, updateLocalDataHandler];
};