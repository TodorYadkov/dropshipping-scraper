import { login } from './services/authService.js';
import { sendData } from './services/dataService.js';
import { fetchDataFromServer } from './util/fetchDataFromServer.js';
import { multiBrowser } from './constants/constants.js'
import { setData } from './util/storageActions.js';

multiBrowser.runtime.onMessage.addListener(async function (message, sender, sendResponse) {

    switch (message.message) {

        case 'start':
            multiBrowser.storage.local.set({ isScriptRunning: true });
            // Set up the alarm to trigger fetchDataFromServer
            multiBrowser.alarms.create('fetchDataAlarm', { periodInMinutes: 0.2 }); // Math.random() + Add this later !!!
            break;
        case 'doneScraping':
            sendData({ title: message.product });
            multiBrowser.tabs.remove(sender.tab.id);
            break;
        case 'stop':
            multiBrowser.storage.local.set({ isScriptRunning: false });
            // Clear the alarm when the script is stopped
            multiBrowser.alarms.clear('fetchDataAlarm');
            break;
        case 'login':
            const loggedUserData = await login(message.userData);
            await setData(loggedUserData);
            // After successful login send the user information to popup so the html can be updated with user information
            sendResponse({ message: 'loginSuccessful', user: loggedUserData });
            break;
        case 'contentError':
            console.log(message);
            multiBrowser.tabs.remove(sender.tab.id);
            break;
    }

});

// Listen for the alarm and trigger fetchDataFromServer
multiBrowser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'fetchDataAlarm') {
        fetchDataFromServer();
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