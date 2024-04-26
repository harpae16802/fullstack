export const API_SERVER = 'http://localhost:3002'

// === img
export const IMAGES_PRODUCTS = `${API_SERVER}/images/products`
export const IMAGES_NIGHT = `${API_SERVER}/images/night`
export const IMAGES_SELLER = `${API_SERVER}/images/seller`

// === map
export const MARKET_MAP = `${API_SERVER}/market-map`
// 取得 market-data
export const MARKET_DATA = `${MARKET_MAP}/market-data`
// 地圖搜尋
export const MARKET_MAP_SEARCH = `${MARKET_MAP}/search`

// === shop-products 店家商品
export const SHOP_PRODUCTS = `${API_SERVER}/shop-products`
// 取得 seller
export const SELLER_DATA = `${SHOP_PRODUCTS}/seller`
// 取得 products-data
export const PRODUCTS_DATA = `${SHOP_PRODUCTS}/products`
// 加入或移除收藏
export const FAVORITE_STORE = `${SHOP_PRODUCTS}/toggle-like-shop`
export const FAVORITE_PRODUCTS = `${SHOP_PRODUCTS}/toggle-like-products`
// 檢查收藏
export const C_FAVORITE_STORE = `${SHOP_PRODUCTS}/check-like-shop`
export const C_FAVORITE_PRODUCTS = `${SHOP_PRODUCTS}/check-like-products`
// 取得評論
export const COMMENT_DATA = `${SHOP_PRODUCTS}/comment`
// 購物車
export const CART_ADD = `${SHOP_PRODUCTS}/cart-increase`
export const CART_EDIT = `${SHOP_PRODUCTS}/cart-edit`
// 獲取購物車數據
export const CART = `${SHOP_PRODUCTS}/cart`

// === market
export const MARKET = `${API_SERVER}/market`
// 搜尋
export const MARKET_SEARCH = `${MARKET}/search`
// 搜尋
export const MARKET_SELLER = `${MARKET}/seller`
// 分類篩選
export const CATEGORY = `${MARKET}/category`
// 取得評論
export const STORE_RATINGS = `${MARKET}/store-ratings`

// 登入
// ===
export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt`

// 註冊
export const SIGN_UP_POST = `${API_SERVER}/sign-up/custom-sign`
