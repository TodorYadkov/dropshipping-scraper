import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { calculateProfit } from "../util/calculateProfit.js";
import { useAppStateContext } from "./useAppStateContext.js";
import { REDUCER_TYPES } from "../util/constants.js";
import { sortingProducts } from "../util/sortingProducts.js";

export const useLocalProductState = (addAlertMessage, exchangeRates) => {
    const { appState } = useAppStateContext();
    const [localProducts, setLocalProducts] = useState([]);
    const [localFilteredState, setLocalFilteredState] = useState({
        products: [],
        totalProductCount: 0
    });
    const [searchParams] = useSearchParams();

    // Set currency to local products
    useEffect(() => {
        // Calculate profit
        setLocalProductsWithSameCurrencyAndProfit();
    }, [appState[REDUCER_TYPES.PRODUCTS]]);

    // On search filter filter the products
    useEffect(() => {
        filterProductsHandler();
        console.log('run');
    }, [searchParams]);

    // It set the local products with amazon currency;
    async function setLocalProductsWithSameCurrencyAndProfit() {
        try {
            const productsWithCalculatedCurrencyAndProfit = await calculateProfit(appState[REDUCER_TYPES.PRODUCTS], exchangeRates);
            setLocalProducts(productsWithCalculatedCurrencyAndProfit);
            filterProductsHandler(productsWithCalculatedCurrencyAndProfit);
        } catch (err) {
            addAlertMessage(err.message);
            console.error(err);
        }
    }

    // Filter the products;
    function filterProductsHandler(products = localProducts) {
        let productsToFilter = [...products];
        let totalProductCount = productsToFilter.length;

        searchHandler(); // Apply search filter
        sortHandler();
        pageHandler();  // Slice the products so it contains only products for that page


        // Search
        function searchHandler() {
            const search = searchParams.get('search');
            const searchRegexPattern = new RegExp(search, 'i');
            if (search) {
                productsToFilter = productsToFilter.filter(product => searchRegexPattern.test(product.name));
            } else {
                productsToFilter = [...products];
            }

            totalProductCount = productsToFilter.length;
        }

        // Slice products for page products 
        function pageHandler() {
            const offset = Number(searchParams.get('offset')) || 5;
            const page = Number(searchParams.get('page')) || 1;

            const startIndex = (page - 1) * offset;
            const endIndex = startIndex + offset;

            productsToFilter = productsToFilter.slice(startIndex, endIndex);
        }

        // Sorting the products
        function sortHandler() {
            const sortBy = searchParams.get('sort') || 'Ascending by Name';
            sortingProducts(sortBy, productsToFilter);
        }
       
        setLocalFilteredState({ totalProductCount, products: productsToFilter });
    }

    return {
        localFilteredState,
        setLocalProductsWithSameCurrencyAndProfit
    }
}

