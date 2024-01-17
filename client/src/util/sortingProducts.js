export const sortingProducts = (sortBy, products) => {
    switch (sortBy) {
        case 'Ascending by Name':
            const test = products.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'Descending by Name':
            products.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'Ascending by Amazon price':
            products.sort((a, b) => a.priceAmazon - b.priceAmazon);
            break;
        case 'Descending by Amazon price':
            products.sort((a, b) => b.priceAmazon - a.priceAmazon);
            break;
        case 'Ascending by Profit':
            products.sort((a, b) => a.profit - b.profit);
            break;
        case 'Descending by Profit':
            products.sort((a, b) => b.profit - a.profit);
            break;
        case 'Ascending by Last Updated':
            products.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            break;
        case 'Descending by Last Updated':
            products.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
            break;
    }
}
