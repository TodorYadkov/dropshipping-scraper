export function extractASIN(url) {
    const asinRegex = /^[A-Z0-9]+$/; // ASIN pattern: only letters and numbers
    const urlRegex = /\/dp\/([A-Z0-9]+)/; // URL pattern: /dp/{ASIN}/

    if (asinRegex.test(url)) {
        // If the input is an ASIN, return it directly
        return `https://www.amazon.com/dp/${url}`;

    }
    // If the input is a URL, extract the ASIN from the URL and return the unified URL
    const match = url.match(urlRegex);
    return match ? `https://www.amazon.com/dp/${match[1]}` : url;
};