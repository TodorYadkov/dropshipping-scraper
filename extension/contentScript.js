// import { multiBrowser } from './constants/constants.js'
const patternPrice = /(?<currency>[a-zA-Z]+)(?<value>[0-9]+\.?[0-9]+)/g;

try {
    const title = document.querySelector('h1#title span#productTitle').textContent;
    
    const price = document.querySelector('.a-price')
    const priceSymbol = price.querySelector('.a-price-symbol').textContent;
    const priceWhole = price.querySelector('.a-price-whole').textContent;
    const priceDecimal = price.querySelector('.a-price-decimal').textContent;
    const priceFraction = price.querySelector('.a-price-fraction').textContent;

    const currency = priceSymbol;
    const value = priceWhole + priceDecimal + priceFraction;

    const productInfo = {
        title,
        price: {
            currency,
            value
        }
    }


    chrome.runtime.sendMessage({ message: 'doneScraping', product: productInfo });

} catch (err) {
    chrome.runtime.sendMessage({ message: 'contentError', contentError: err.message });
    console.error(err);
    // TODO find why object cannot be send to the background
}

// const xpathExpression = "//*[@id='title']/span[@id='productTitle']";
// const titleElement = document.evaluate(xpathExpression, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
// const title = titleElement.textContent;

// This is the alternative way using Xpath to this const title = document.querySelector('h1#title span#productTitle').textContent