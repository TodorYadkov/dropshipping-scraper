try {
    const title = document.querySelector('h1#title span#productTitle').textContent;
    chrome.runtime.sendMessage({ message: 'doneScraping', product: title.trim() });

} catch (err) {
    chrome.runtime.sendMessage({ message: 'contentError', contentError: err });
}

// const xpathExpression = "//*[@id='title']/span[@id='productTitle']";
// const titleElement = document.evaluate(xpathExpression, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
// const title = titleElement.textContent;

// This is the alternative way using Xpath to this const title = document.querySelector('h1#title span#productTitle').textContent