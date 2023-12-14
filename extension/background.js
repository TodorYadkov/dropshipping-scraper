import { sendData } from './services/dataService.js';
import { fetchDataFromServer } from './util/fetchDataFromServer.js';

try {
    let intervalId;                                         //  It's used to clear the setInterval
    let test = 0
 
    chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {

        switch(request.message) {
           
            case 'closeTab':                                             //  if message match: close the sender tab
                chrome.tabs.remove(sender.tab.id); 
                break;
            case 'start':                                               //  if message match: start the opening tabs
                chrome.storage.session.set({ isScriptRunning: true });
                intervalId = setInterval(fetchDataFromServer, Math.random() * 10000 + 5000);
                break;
            case 'stop':                                                //  if message match: stop the opening of tabs
                chrome.storage.session.set({ isScriptRunning: false })
                clearInterval(intervalId);    
                break; 
            case 'contentError':                                        //  in case of error close the sender tab
                console.log(request.contentError);                      //  TODO.. log or show error to the user
                chrome.tabs.remove(sender.tab.id);
                break;
            case 'doneScraping':
                console.log(request);
                console.log(sender);
                console.log(test++);
                sendData({ title: request.product});
                chrome.tabs.remove(sender.tab.id);
                break;
        }

    });

} catch(err) {
    console.log(err);
}