import { login, logout } from './services/authService.js';
import { sendData } from './services/dataService.js';
import { fetchDataFromServer } from './util/fetchDataFromServer.js';
import { multiBrowser, tokenName } from './constants/constants.js'
import { removeData, setData } from './util/storageActions.js';

let productFromServer = {};

multiBrowser.runtime.onMessage.addListener(async function (message, sender, sendResponse) {

    try {
        switch (message.message) {

            case 'start':
                await setData({ isScriptRunning: true });
                // Set up the alarm to trigger fetchDataFromServer
                const time = Number(Math.random().toFixed(1));
                multiBrowser.alarms.create('fetchDataAlarm', { periodInMinutes: time <= 0.5 ? time + 0.2 : time }); // TODO: Math.random() + Add this later !!!
                break;

            case 'doneScraping':
                const updatedProduct = { ...productFromServer, ...message.product };
                await sendData(updatedProduct);

                multiBrowser.tabs.remove(sender.tab.id);
                break;

            case 'stop':
                // Clear the alarm when the script is stopped
                multiBrowser.alarms.clear('fetchDataAlarm');

                await setData({ isScriptRunning: false });
                break;

            case 'login':
                try {
                    const loggedUserData = await login(message.userData);
                    await setData({ [tokenName]: loggedUserData });
                    // After successful login send the user information to popup so the html can be updated with user information
                    // sendResponse({ message: 'loginSuccessful', user: loggedUserData });
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
                    // Can made this with sendResponse?
                    multiBrowser.runtime.sendMessage({ message: 'successfulLogout' });
                } catch (error) {
                    await removeData([tokenName]);
                }

                break;

            case 'contentError':
                const productWithErrorMessage = { ...productFromServer, error: message.contentError };
                await sendData(productWithErrorMessage);

                multiBrowser.tabs.remove(sender.tab.id);
                break;
        }

    } catch (err) {
        multiBrowser.tabs.remove(sender.tab.id);
        console.error(err);
    }
});

// Listen for the alarm and trigger fetchDataFromServer
multiBrowser.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === 'fetchDataAlarm') {
        productFromServer = await fetchDataFromServer();
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

// On change this is the changes object that we receiving

// {
//     "extensionName": {
//         "newValue": "browser 2",
//         "oldValue": "browser 1"
//     }
// }





// 1. Login

// {
//     email: 'pesho@abv.bg',
//     password: '123456',
//     extensionName: 'browser 1',
//     isExtension: true
// }

// 1.1 Server response

// {
//     email: 'pesho@abv.bg',
//     extensionName: 'browser 1',
//     accessToken: '283ehfuihwf3uiheuhfe'
// }