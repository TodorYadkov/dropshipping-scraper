export function extractASIN(url) {
    if (!url) {
        return url;
    }

    const asinRegex = /^[A-Z0-9]+$/; // ASIN pattern: only letters and numbers
    const urlRegex = /\/dp\/([A-Z0-9]+)/; // URL pattern: /dp/{ASIN}/

    if (asinRegex.test(url)) {
        // If the input is an ASIN, return it directly
        return `https://www.amazon.com/dp/${url}`;
    }

    // If the input is a URL, extract the ASIN from the URL
    const match = url.match(urlRegex);
    if (match) {
        // Extract the domain from the URL
        const domainMatch = url.match(/^(https?:\/\/)?([^\/]+)\//);
        if (domainMatch) {
            // Construct a new URL with the original domain and modified path
            return `https://${domainMatch[2]}/dp/${match[1]}`;
        }
    }

    // If the input doesn't match either pattern, return the original URL
    return url;
};