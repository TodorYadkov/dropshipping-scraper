import { login } from './services/authService.js';
import { sendData } from './services/dataService.js';
import { fetchDataFromServer } from './util/fetchDataFromServer.js';
import { multiBrowser } from './constants/constants.js'

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
            // const  = await login(message.userData);
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


// 1. Login

// {
//     email: 'pesho@abv.bg',
//     password: '123456',
//     extensionName: 'browser 1',
//     isExtention: true
// }

// 1.1 Server response

// {
//     email: 'pesho@abv.bg',
//     extensionName: 'browser 1',
//     accessToken: '283ehfuihwf3uiheuhfe'
// }