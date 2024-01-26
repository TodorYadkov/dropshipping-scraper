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
            // Extract numeric part
            const matches = priceWithCurrency.match(/(\d{1,3}(,\d{3})*(\.\d{1,2})?)/);

            if (matches && matches[1]) {
                // Remove commas from the matched numeric part
                priceAmazon = matches[1].replace(/,/g, '');
            }

            // Extract currency part
            currencyAmazon = priceWithCurrency.replace(matches[0], '').trim();
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
            rating: document.querySelector('#acrPopover > span.a-declarative > a > span')?.textContent ?? '1',
        };

    } else if (isEbayPage) {
        // Scraping from eBay

        const priceElement = document.querySelector('#mainContent > div > div.vim.x-price-section.mar-t-20 > div > div > div.x-price-primary > span');

        let priceEbay = '0.00';
        let currencyEbay = 'USD';
        if (priceElement) {
            const priceWithCurrency = priceElement.textContent;
            // Extract numeric part
            const matches = priceWithCurrency.match(/(\d{1,3}(,\d{3})*(\.\d{1,2})?)/);

            if (matches && matches[1]) {
                // Remove commas from the matched numeric part
                priceEbay = matches[1].replace(/,/g, '');
            }

            // Extract currency part
            currencyEbay = priceWithCurrency.replace(matches[0], '').trim();
            currencyEbay = currencyEbay.includes('US') ? currencyEbay.replace('US', '').trim() : currencyEbay;
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
        const currencyMapping = {
            '$': 'USD',
            '€': 'EUR',
            '£': 'GBP',
            '¥': 'JPY',
            'A$': 'AUD',
            'AU $': 'AUD',
            '$/ea': 'USD',
        };

        return currencyMapping[currencySymbol] || currencySymbol;
    }

} catch (error) {
    chrome.runtime.sendMessage({ message: 'contentError', contentError: error.message });
    console.error(error);
}