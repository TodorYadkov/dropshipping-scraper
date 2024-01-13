import { sendData } from './services/dataService.js';
import { login, logout } from './services/authService.js';
import { fetchDataFromServerAndScrape } from './util/fetchDataFromServerAndScrape.js';
import { getData, removeData, setData } from './util/storageActions.js';
import { multiBrowser, timeToFetchProduct, tokenName } from './constants/constants.js'

multiBrowser.runtime.onMessage.addListener(async function (message, sender, sendResponse) {

    try {
        switch (message.message) {

            case 'start':
                await setData({ isScriptRunning: true, activeTabs: [] });
                // Set up the alarm to trigger fetchDataFromServer
                multiBrowser.alarms.create('fetchDataAlarm', { periodInMinutes: timeToFetchProduct });
                break;

            case 'stop':
                // Clear the alarm when the script is stopped
                multiBrowser.alarms.clear('fetchDataAlarm');

                // Change button state
                await setData({ isScriptRunning: false });

                // Close all open tabs
                const { activeTabs } = await getData(['activeTabs']);
                const closeTabPromises = activeTabs.map(tabId => {
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
                });

                // Wait for all tab removal promises to resolve
                await Promise.all(closeTabPromises);

                // Set initial state for active tabs
                await setData({ activeTabs: [] });

                break;

            case 'login':
                try {
                    const loggedUserData = await login(message.userData);
                    await setData({ [tokenName]: loggedUserData });

                    // After successful login send the user information to popup so the html can be updated with user information
                    multiBrowser.runtime.sendMessage({ message: 'successfulLogin', userData: loggedUserData });

                } catch (error) {
                    multiBrowser.runtime.sendMessage({ message: 'errorServerLogin', error: error.message });
                }
                break;

            case 'logout':
                try {
                    multiBrowser.alarms.clear('fetchDataAlarm');
                    await setData({ isScriptRunning: false });

                    await logout();
                    await removeData([tokenName]);

                    multiBrowser.runtime.sendMessage({ message: 'successfulLogout' });

                    // Close all open tabs
                    const { activeTabs } = await getData(['activeTabs']);
                    const closeTabPromises = activeTabs.map(tabId => {
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
                    });

                    // Wait for all tab removal promises to resolve
                    await Promise.all(closeTabPromises);

                    // Set initial state
                    await setData({ activeTabs: [] });
                } catch (error) {
                    await removeData([tokenName]);
                }
                break;
        }

    } catch (error) {
        console.error(error);
        multiBrowser.tabs.remove(sender.tab.id);
    }
});

// Listen for alarms
multiBrowser.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === 'fetchDataAlarm') {
        try {
            // Fetches product URLs from the server, scrapes data from Amazon and eBay, and return updatedProduct.
            const updatedProduct = await fetchDataFromServerAndScrape();

            // Send updated product to the server
            await sendData(updatedProduct);

        } catch (error) {
            multiBrowser.runtime.sendMessage({ message: 'errorServerProduct', error: error.message });
            console.error(error.message);
        }
    }
});

// TODO: maybe send message to popup on storage.locals change

// multiBrowser.storage.onChanged.addListener((changes, namespace) => {
//     for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//         console.log(
//           `Storage key "${key}" in namespace "${namespace}" changed.`,
//           `Old value was "${oldValue}", new value is "${newValue}".`
//         );
//       }
// })