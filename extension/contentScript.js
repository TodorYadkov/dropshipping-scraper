try {
    const title = document.querySelector('h1#title span#productTitle').textContent;
    chrome.runtime.sendMessage({ message: 'doneScraping', product: title.trim() });

} catch (err) {
    chrome.runtime.sendMessage({ message: 'contentError', contentError: err });
}