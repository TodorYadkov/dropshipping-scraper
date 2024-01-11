try {
    const name = document.querySelector('h1#title span#productTitle').textContent;

    const description = document.querySelector('#feature-bullets > ul').textContent;

    // const priceElement = document.querySelector('#corePrice_feature_div > div > div > span.a-price.aok-align-center > span.a-offscreen');
    const priceElement = document.querySelector('#corePrice_feature_div span.a-offscreen') ?? document.querySelector('#price_inside_buybox');

    let priceAmazon = '0.00';
    let currencyAmazon = 'NO';
    if (priceElement) {
        const priceWithCurrency = priceElement.textContent;
        const positionOfFirstNumber = Array.from(priceWithCurrency).findIndex(char => /\d/.test(char));

        priceAmazon = priceWithCurrency.substring(positionOfFirstNumber);
        currencyAmazon = priceWithCurrency.substring(0, positionOfFirstNumber);
    }

    let availability = document.querySelector('#availability > span')?.textContent;
    if (availability === undefined || availability.trim() === '') {
        availability = 'Not available';
    }

    const imageURL = document.querySelector('.imgTagWrapper img').src;

    const rating = document.querySelector('#acrPopover > span.a-declarative > a > span').textContent;

    const productInfoRaw = {
        name,
        description,
        priceAmazon,
        currencyAmazon,
        imageURL,
        availability,
        rating,
        error: null,
    }

    const productInfoTrimmed = Object.fromEntries(Object.entries(productInfoRaw).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]));

    chrome.runtime.sendMessage({ message: 'doneScraping', product: productInfoTrimmed });

} catch (err) {
    chrome.runtime.sendMessage({ message: 'contentError', contentError: err.message });
    console.error(err);
}