export const PRODUCT_STATUS = {
    IN_STOCK: 'in_stock',
    OUT_OF_STOCK: 'out_of_stock',
    LOW_STOCK: 'low_stock'
};

export const PRODUCT_CATEGORIES = {
    NIKE: 'nike',
    ADIDAS: 'adidas',
    PUMA: 'puma',
    NEW_BALANCE: 'new_balance',
    REEBOK: 'reebok'
  };
  

export const SORT_OPTIONS = {
    PRICE_LOW_TO_HIGH: 'new_price',
    PRICE_HIGH_TO_LOW: '-new_price',
    NEWEST: '-createdAt',
    OLDEST: 'createdAt'
};

export const DEFAULT_SORT = SORT_OPTIONS.NEWEST;

export const STOCK_THRESHOLDS = {
    LOW_STOCK_LIMIT: 5 // Products with 5 or fewer items are considered "low stock"
};
