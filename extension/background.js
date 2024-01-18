import { sendData } from './services/dataService.js';
import { login, logout } from './services/authService.js';
import { fetchDataFromServerAndScrape } from './util/fetchDataFromServerAndScrape.js';
import { getData, removeData, setData } from './util/storageActions.js';
import { multiBrowser, timeToFetchProduct, tokenName } from './constants/constants.js';
import { closeAllOpenTabs } from './util/autoCloseTabs.js';

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

                await closeAllOpenTabs();
                break;

            case 'login':
                try {
                    const loggedUserData = await login(message.userData);
                    await setData({ [tokenName]: loggedUserData });

                    // After successful login send the user information to popup so the HTML can be updated with user information
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

                    await closeAllOpenTabs();
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
        } finally {
            await closeAllOpenTabs();
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