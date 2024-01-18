export const sortingProducts = (sortBy, products) => {
    const sortFunctions = {
        'name_asc': (a, b) => a.name.localeCompare(b.name),
        'name_desc': (a, b) => b.name.localeCompare(a.name),
        'amazon_price_asc': (a, b) => a.priceAmazon - b.priceAmazon,
        'amazon_price_desc': (a, b) => b.priceAmazon - a.priceAmazon,
        'ebay_price_asc': (a, b) => a.priceEbay - b.priceEbay,
        'ebay_price_desc': (a, b) => b.priceEbay - a.priceEbay,
        'profit_asc': (a, b) => a.profit - b.profit,
        'profit_desc': (a, b) => b.profit - a.profit,
        'last_updated_asc': (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
        'last_updated_desc': (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
    };

    products.sort(sortFunctions[sortBy] || ((a, b) => a - b));
}
