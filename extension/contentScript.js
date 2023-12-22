// import { multiBrowser } from './constants/constants.js'
const patternPrice = /(?<currency>[a-zA-Z]+)(?<value>[0-9]+\.?[0-9]+)/g;

try {
    const name = document.querySelector('h1#title span#productTitle').textContent;

    const description = document.querySelector('#feature-bullets > ul').textContent;

    // const priceElement = document.querySelector('#corePrice_feature_div > div > div > span.a-price.aok-align-center > span.a-offscreen');
    const priceElement = document.querySelector('#corePrice_feature_div span.a-offscreen') ?? document.querySelector('#price_inside_buybox');

    let price = '0.00';
    let currency = 'NO';
    let availability = false;
    if (priceElement) {
        const priceWithCurrency = priceElement.textContent;
        const positionOfFirstNumber = Array.from(priceWithCurrency).findIndex(char => /\d/.test(char));

        price = priceWithCurrency.substring(positionOfFirstNumber);
        currency = priceWithCurrency.substring(0, positionOfFirstNumber);
        availability = true;
    }

    const imageURL = document.querySelector('.imgTagWrapper img').src;

    const rating = document.querySelector('#acrPopover > span.a-declarative > a > span').textContent;

    const productInfoRaw = {
        name,
        description,
        price,
        currency,
        imageURL,
        availability,
        rating,
    }

    const productInfoTrimmed = Object.fromEntries(Object.entries(productInfoRaw).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]));

    chrome.runtime.sendMessage({ message: 'doneScraping', product: productInfoTrimmed });

} catch (err) {
    chrome.runtime.sendMessage({ message: 'contentError', contentError: err.message });
    console.error(err);
}

// const xpathExpression = "//*[@id='title']/span[@id='productTitle']";
// const titleElement = document.evaluate(xpathExpression, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
// const title = titleElement.textContent;

// This is the alternative way using Xpath to this const title = document.querySelector('h1#title span#productTitle').textContent