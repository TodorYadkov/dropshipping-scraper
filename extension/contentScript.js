try {
    // Get the current URL from the browser
    const currentUrl = window.location.href.toLowerCase();

    // Check if the URL includes "amazon"
    const isAmazonPage = currentUrl.includes('amazon');

    // Check if the URL includes "ebay"
    const isEbayPage = currentUrl.includes('ebay');

    let productInfoRaw = {};

    if (isAmazonPage) {
        // Scraping from Amazon

        // const priceElement = document.querySelector('#corePrice_feature_div > div > div > span.a-price.aok-align-center > span.a-offscreen');
        const priceElement = document.querySelector('#corePrice_feature_div span.a-offscreen') ?? document.querySelector('#price_inside_buybox');

        let priceAmazon = '0.00';
        let currencyAmazon = 'USD';
        if (priceElement) {
            const priceWithCurrency = priceElement.textContent;
            const positionOfFirstNumber = Array.from(priceWithCurrency).findIndex(char => /\d/.test(char));

            priceAmazon = priceWithCurrency.substring(positionOfFirstNumber).split(',').join('');
            currencyAmazon = priceWithCurrency.substring(0, positionOfFirstNumber);
            currencyAmazon = getCurrencyCode(currencyAmazon);
        }

        let availability = document.querySelector('#availability > span')?.textContent;
        if (availability === undefined || availability.trim() === '') {
            availability = 'Not available';
        }

        productInfoRaw = {
            availability,
            priceAmazon,
            currencyAmazon,
            name: document.querySelector('h1#title span#productTitle')?.textContent ?? 'We couldn\'t find name property',
            description: document.querySelector('#feature-bullets > ul')?.textContent ?? 'We couldn\'t find description property',
            imageURL: document.querySelector('.imgTagWrapper img')?.src ?? 'We couldn\'t find image url',
            rating: document.querySelector('#acrPopover > span.a-declarative > a > span')?.textContent ?? 'We couldn\'t find rating property',
        };

    } else if (isEbayPage) {
        // Scraping from eBay

        const priceElement = document.querySelector('#mainContent > div > div.vim.x-price-section.mar-t-20 > div > div > div.x-price-primary > span');

        let priceEbay = '0.00';
        let currencyEbay = 'USD';
        if (priceElement) {
            const priceWithCurrency = priceElement.textContent;
            const positionOfFirstNumber = Array.from(priceWithCurrency).findIndex(char => /\d/.test(char));

            priceEbay = priceWithCurrency.substring(positionOfFirstNumber).split(',').join('');
            currencyEbay = priceWithCurrency.substring(0, positionOfFirstNumber);
            currencyEbay = currencyEbay.includes('US') ? currencyEbay.split('US ')[1] : currencyEbay;
            currencyEbay = getCurrencyCode(currencyEbay);
        }


        productInfoRaw = {
            priceEbay,
            currencyEbay,
        };
    }

    const productInfoTrimmed = Object.fromEntries(Object.entries(productInfoRaw).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]));

    chrome.runtime.sendMessage({ message: 'doneScraping', product: productInfoTrimmed });

    function getCurrencyCode(currencySymbol) {
        switch (currencySymbol) {
            case '$':
                return 'USD';
            case '€':
                return 'EUR';
            case '£':
                return 'GBP';
            case '¥':
                return 'JPY';
            case 'A$':
                return 'AUD';
            default:
                return currencySymbol;
        }
    }

} catch (error) {
    chrome.runtime.sendMessage({ message: 'contentError', contentError: error.message });
    console.error(error);
}