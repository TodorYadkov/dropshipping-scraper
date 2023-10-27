import { getCurrentTab } from "./util.js";

const sendToBackgroundButton = document.getElementById('sendToBackground');
const sendToContentButton = document.getElementById('sendToContent');

sendToBackgroundButton.addEventListener('click', () => {
    sendMessageToBackground({ message: 'Hello from popup to background!' });
});

sendToContentButton.addEventListener('click', () => {
    sendMessageToContent({ message: 'Hello from popup to content!' });
});

async function sendMessageToBackground(message) {
    const response = await chrome.runtime.sendMessage(message);
}

async function sendMessageToContent(message) {
    // const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    // const tabId = tabs[0].id;
    const tabId = await getCurrentTab();

    const response = await chrome.tabs.sendMessage(tabId, message);
}


