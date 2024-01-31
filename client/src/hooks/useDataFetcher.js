import { useEffect, useState } from 'react';

import { REDUCER_TYPES } from '../util/constants.js';

import { productService } from '../services/productService.js';
import { extensionService } from '../services/extensionService.js';
import { statisticService } from '../services/statisticService.js';

import { useApi } from './useApi.js';
import { useAppStateContext } from './useAppStateContext.js';

export const useDataFetcher = () => {
    const [alert, setAlert] = useState('');

    const { appState, setIsLoadingState, setRefreshState, setGeneralStatistic, setProducts, setExtensions } = useAppStateContext();

    const { getProducts } = useApi(productService);
    const { getExtensions } = useApi(extensionService);
    const { getGeneralStatistic } = useApi(statisticService);

    useEffect(() => {
        (async function () {
            try {
                if (appState[REDUCER_TYPES.REFRESH_STATE]) {
                    const [products, extensions, generalStatistic] = await Promise.allSettled([
                        getProducts(),
                        getExtensions(),
                        getGeneralStatistic()
                    ]);

                    if (products.status === 'fulfilled') {
                        setProducts(products.value);
                    } else {
                        setAlert(`Error fetching products: ${products.reason.message}`);
                    }

                    if (extensions.status === 'fulfilled') {
                        setExtensions(extensions.value);
                    } else {
                        setAlert(`Error fetching extensions: ${extensions.reason.message}`);
                    }

                    if (generalStatistic.status === 'fulfilled') {
                        setGeneralStatistic(generalStatistic.value);
                    } else {
                        setAlert(`Error fetching general statistics: ${generalStatistic.reason.message}`);
                    }

                    setRefreshState(false);
                    setIsLoadingState(false);
                }

            } catch (error) {
                console.error(error);
                setAlert(`An unexpected error occurred: ${error.message}`);
            }
        })();

    }, [appState[REDUCER_TYPES.REFRESH_STATE]]);

    const clearErrorHandler = () => {
        setAlert('');
    };

    return [alert, clearErrorHandler];
};