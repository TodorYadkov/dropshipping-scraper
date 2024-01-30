export function extractItemIdEbay(url) {
    if (!url) {
        return url;
    }

    const itemIDRegex = /^\d{12}$/;      // eBay item ID pattern: 12 digits
    const urlRegex = /\/itm\/(\d{12})/;  // eBay URL pattern: /itm/{itemID}/

    if (itemIDRegex.test(url)) {
        // If the input is an item ID, return it directly
        return `https://www.ebay.com/itm/${url}`;
    }

    // If the input is a URL, extract the item ID from the URL
    const match = url.match(urlRegex);
    if (match) {
        // Extract the domain from the URL
        const domainMatch = url.match(/^(https?:\/\/)?([^\/]+)\//);
        if (domainMatch) {
            // Construct a new URL with the original domain and modified path
            return `https://${domainMatch[2]}/itm/${match[1]}`;
        }
    }

    // If the input doesn't match either pattern, return the original URL
    return url;
}