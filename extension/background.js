import { sendData, statusExtension } from './services/dataService.js';

import { fetchDataFromServerAndScrape } from './util/fetchDataFromServerAndScrape.js';
import { closeAllOpenTabs } from './util/autoCloseTabs.js';
import { userLogin, userLogout } from './util/userControl.js';
import { reactExtensionControl } from './util/reactExtensionControl.js';
import { startExtension, stopExtension } from './util/extensionControl.js';

import { multiBrowser } from './constants/constants.js';

multiBrowser.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    try {
        switch (message.message) {
            case 'start': await startExtension(); break;

            case 'stop': await stopExtension(); break;

            case 'login': await userLogin(message.userData); break;

            case 'logout': await userLogout(true); break;
        }

    } catch (error) {
        console.error(error);
        multiBrowser.tabs.remove(sender.tab.id);
    }
});

// Listen for alarms
multiBrowser.alarms.onAlarm.addListener(async (alarm) => {
    try {
        if (alarm.name === 'fetchDataAlarm') {
            // Fetches product URLs from the server, scrapes data from Amazon and eBay, and return updatedProduct.
            const updatedProduct = await fetchDataFromServerAndScrape();

            // Send updated product to the server
            await sendData(updatedProduct);
        }

    } catch (error) {
        multiBrowser.runtime.sendMessage({ message: 'errorServer', error: error.message });
        console.error(error.message);
    } finally {
        await closeAllOpenTabs();
    }
});

multiBrowser.alarms.onAlarm.addListener(async (alarm) => {
    try {
        if (alarm.name === 'extensionStatusAlarm') {
            // Fetch extension data from server
            const extensionStatus = await statusExtension();

            // Start stop extension from React
            await reactExtensionControl(extensionStatus);
        }

    } catch (error) {
        multiBrowser.runtime.sendMessage({ message: 'errorServer', error: error.message });
        console.error(error.message);
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