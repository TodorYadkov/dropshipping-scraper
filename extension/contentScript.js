// import { multiBrowser } from './constants/constants.js'
const patternPrice = /(?<currency>[a-zA-Z]+)(?<value>[0-9]+\.?[0-9]+)/g;

try {
    const image = document.querySelector('.imgTagWrapper img').src;

    const title = document.querySelector('h1#title span#productTitle').textContent;

    const priceWithCurrency = document.querySelector('.a-offscreen').textContent;
    const positionOfFirstNumber = Array.from(priceWithCurrency).findIndex(char => /\d/.test(char));
    const currency = priceWithCurrency.substring(0, positionOfFirstNumber);
    const price = priceWithCurrency.substring(positionOfFirstNumber);

    const rating = document.querySelector('#acrPopover > span.a-declarative > a > span').textContent;

    const description = document.querySelector('#feature-bullets > ul').textContent;

    const productInfoRaw = {
        image,
        title,
        currency,
        price,
        rating,
        description
    }

    const productInfo = Object.fromEntries(Object.entries(productInfoRaw).map(([k, v]) => [k, v.trim()]));

    chrome.runtime.sendMessage({ message: 'doneScraping', product: productInfo });

} catch (err) {
    chrome.runtime.sendMessage({ message: 'contentError', contentError: err.message });
    console.error(err);
}

// const xpathExpression = "//*[@id='title']/span[@id='productTitle']";
// const titleElement = document.evaluate(xpathExpression, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
// const title = titleElement.textContent;

// This is the alternative way using Xpath to this const title = document.querySelector('h1#title span#productTitle').textContent