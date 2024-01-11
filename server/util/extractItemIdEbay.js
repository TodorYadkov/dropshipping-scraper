export function extractItemIdEbay(url) {
    if (!url) {
        return url;
    }

    const itemIDRegex = /^\d{12}$/; // eBay item ID pattern: 12 digits
    const urlRegex = /\/itm\/(\d{12})/; // eBay URL pattern: /itm/{itemID}/

    if (itemIDRegex.test(url)) {
        // If the input is an item ID, return it directly
        return `https://www.ebay.com/itm/${url}`;
    }
    // If the input is a URL, extract the Item from the URL and return the unified URL
    const match = url.match(urlRegex);

    return match ? `https://www.ebay.com/itm/${match[1]}` : url;
}
