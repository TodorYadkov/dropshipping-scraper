import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { calculateProfit } from "../util/calculateProfit.js";
import { useAppStateContext } from "./useAppStateContext.js";
import { REDUCER_TYPES } from "../util/constants.js";

export const useLocalProductState = (addAlertMessage) => {
    const { appState } = useAppStateContext();
    const [localProducts, setLocalProducts] = useState([]);
    const [localFilteredProducts, setLocalFilteredProducts] = useState([]);
    const [searchParams] = useSearchParams();

    // Set currency to local products
    useEffect(() => {
        // Calculate profit
        setLocalProductsWithSameCurrencyAndProfit();
    }, [appState[REDUCER_TYPES.PRODUCTS]]);

    // On search filter filter the products
    useEffect(() => {
        filterProductsHandler();
    }, [searchParams]);

    // It set the local products with amazon currency;
    async function setLocalProductsWithSameCurrencyAndProfit() {
        try {
            const productsWithCalculatedCurrencyAndProfit = await calculateProfit(appState[REDUCER_TYPES.PRODUCTS]);
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

        searchHandler();
        offsetHandler();

        // Search
        function searchHandler() {
            const search = searchParams.get('search');
            const searchRegexPattern = new RegExp(search, 'i');
            if (search) {
                productsToFilter = productsToFilter.filter(product => searchRegexPattern.test(product.name));
            } else {
                productsToFilter = [...products];
            }
        }

        function offsetHandler() {
            // Offset
            const offset = Number(searchParams.get('offset')) || 5;

            if (offset <= localFilteredProducts.length) {
                productsToFilter = productsToFilter.slice(0, offset);
            } else {
                searchHandler();
                productsToFilter = productsToFilter.slice(0, offset);
            }
        }

        setLocalFilteredProducts(productsToFilter);

    }



    return {
        localFilteredProducts,
        setLocalProductsWithSameCurrencyAndProfit
    }
}

