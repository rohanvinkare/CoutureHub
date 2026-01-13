export const INVENTORY_CONFIG = {
    ITEMS_PER_PAGE: 20,
    LOW_STOCK_THRESHOLD: 10,
    OUT_OF_STOCK: 0,
    MAX_SEARCH_DELAY: 500, // ms
    API_TIMEOUT: 10000, // ms
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes (if used)
    // Stock Statuses
    STOCK_STATUS: {
        OUT_OF_STOCK: 'out_of_stock',
        LOW_STOCK: 'low_stock',
        IN_STOCK: 'in_stock'
    }
}
