import { multiBrowser } from '../constants/constants.js';

import { getData, setData } from './storageActions.js';

export const closeAllOpenTabs = async () => {
    // Close all open tabs
    const { activeTabs } = await getData(['activeTabs']);

    await Promise.all(activeTabs.map(tabId => {
        return new Promise(async (resolve) => {
            try {
                // Check if the tab still exists
                const tabExists = await multiBrowser.tabs.get(tabId);
                if (tabExists) {
                    // If the tab exists, remove it
                    await multiBrowser.tabs.remove(tabId);
                }
            } catch (error) {
                console.error(`Error checking or closing tab ${tabId}: ${error}`);
            } finally {
                resolve();
            }
        });
    }));

    // Set initial state
    await setData({ activeTabs: [] });
};