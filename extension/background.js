import { sendData } from './services/dataService.js';
import { fetchDataFromServer } from './util/fetchDataFromServer.js';

// let intervalId; // It's used to clear the setInterval

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {

    switch (message.message) {

        case 'start':
            chrome.storage.session.set({ isScriptRunning: true });
            // Set up the alarm to trigger fetchDataFromServer
            chrome.alarms.create('fetchDataAlarm', { periodInMinutes: 0.2 }); // Math.random() +
            break;
        case 'doneScraping':
            sendData({ title: message.product });
            chrome.tabs.remove(sender.tab.id);
            break;
        case 'stop':
            chrome.storage.session.set({ isScriptRunning: false });
            // Clear the alarm when the script is stopped
            chrome.alarms.clear('fetchDataAlarm');
            break;
        case 'closeTab':
            chrome.tabs.remove(sender.tab.id);
            break;
        case 'contentError':
            console.log(message.contentError);
            chrome.tabs.remove(sender.tab.id);
            break;
    }

});

// Listen for the alarm and trigger fetchDataFromServer
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'fetchDataAlarm') {
        fetchDataFromServer();
    }
});
