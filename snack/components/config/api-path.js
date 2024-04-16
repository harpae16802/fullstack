export const API_SERVER = 'http://localhost:3002'

// === map，取得 market-data
export const MARKET_DATA = `${API_SERVER}/market-data`

// === shop-products
// 取得 seller
export const SELLER_DATA = `${API_SERVER}/shop-products/seller`
// 取得 products-data
export const PRODUCTS_DATA = `${API_SERVER}/shop-products/products`
// 加入或移除最愛
export const FAVORITE_STORE = `${API_SERVER}/shop-products/toggle-like-shop`
export const FAVORITE_PRODUCTS = `${API_SERVER}/shop-products/toggle-like-products`
