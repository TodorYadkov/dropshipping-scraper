const mockData = [
    'https://www.amazon.com/AMD-Ryzen-7800X3D-16-Thread-Processor/dp/B0BTZB7F88/ref=sr_1_30?qid=1698443786&s=electronics&sr=1-30',
    'https://www.amazon.com/Raycon-Bluetooth-Wireless-Earbuds-Charging/dp/B09HFCY5MP/ref=sr_1_31_sspa?qid=1698443986&s=electronics&sr=1-31-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9idGZfYnJvd3Nl&psc=1',
    'https://www.amazon.com/Logitech-Wireless-Computer-Unifying-Receiver/dp/B087Z5WDJ2/ref=sr_1_22?qid=1698443986&s=electronics&sr=1-22'
];

let intervalId;                                         //  It's used to clear the setInterval
let linkNumber = 0;                                     //  It's used to track the mock data

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.message == 'closeTab') {                //  if message match: close the sender tab
        chrome.tabs.remove(sender.tab.id);

    } else if (request.message == 'start') {            //  if message match: start the opening tabs
        chrome.storage.session.set({ isScriptRunning: true })
        intervalId = setInterval(() => {
            linkNumber >= 3 ? linkNumber = 0 : null;
            chrome.tabs.create({ url: mockData[linkNumber] });
            linkNumber++;
        }, 10000)

    } else if (request.message == 'stop') {             //  if message match: stop the opening of tabs
        chrome.storage.session.set({ isScriptRunning: false })
        clearInterval(intervalId);

    } else if (request.message == 'contentError') {     //  in case of error close the sender tab
        console.log(request.contentError);              //  TODO.. log or show error to the user
        chrome.tabs.remove(sender.tab.id);
    }

});