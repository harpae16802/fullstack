export const API_SERVER = 'http://localhost:3002'

// === map，取得 market-data
export const MARKET_DATA = `${API_SERVER}/market-data`

// === shop-products
export const SHOP_PRODUCTS = `${API_SERVER}/shop-products`
// 取得 seller
export const SELLER_DATA = `${SHOP_PRODUCTS}/seller`
// 取得 products-data
export const PRODUCTS_DATA = `${SHOP_PRODUCTS}/products`
// 加入或移除最愛
export const FAVORITE_STORE = `${SHOP_PRODUCTS}/toggle-like-shop`
export const FAVORITE_PRODUCTS = `${SHOP_PRODUCTS}/toggle-like-products`
// 取得評論
export const COMMENT_DATA = `${SHOP_PRODUCTS}/comment`

// === market
export const MARKET = `${API_SERVER}/market`
// 搜尋
export const MARKET_SEARCH = `${MARKET}/search`
// 搜尋
export const MARKET_SELLER = `${MARKET}/seller`

export const JWT_LOGIN_POST = `${API_SERVER}/custom-auth/login-jwt`
