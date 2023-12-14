try {
    const title = document.getElementById('productTitle').textContent;
    chrome.runtime.sendMessage({ message: 'doneScraping', product: title.trim() });
} catch (err) {
    chrome.runtime.sendMessage({ message: 'contentError', contentError: err });
}


 // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //     if (request.action === 'receiveDataFromServer') {
    //       const dataFromServer = request.data;

    //       // Now you can use dataFromServer to enhance your Amazon scraping logic
    //       console.log('Data from server:', dataFromServer);

    //       // Example: Scraping logic to extract data from Amazon page for one product
    //       const products = dataFromServer;

    //       // Notify the background script to start scraping
    //       chrome.runtime.sendMessage({ action: 'startScraping', products: products });
    //     }
    //   });