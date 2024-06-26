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
export const CART_MINUS = `${SHOP_PRODUCTS}/cart-decrease`
export const CART_DEL = `${SHOP_PRODUCTS}/cart-remove`
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
// 公車跟距離
export const BUS_AND_DISTANCE = `${MARKET}/bus-distance`
// 停車場
export const CART_STOPS = `${MARKET}/car-distance`

// =====註冊登入
// 一般登入
export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt`
// 一般註冊
// 一般註冊
export const SIGN_UP_POST = `${API_SERVER}/sign-up/custom-sign`
// google登入註冊
export const GOOGLE_LOGIN_POST = `${API_SERVER}/google-login`

// 首頁的部分
//商店
export const INDEX_INFO_STORE = `${API_SERVER}/index-info/store`
//商品
export const INDEX_INFO_PRODUCT = `${API_SERVER}/index-info/product`
//優惠
export const INDEX_INFO_DISCOUNT = `${API_SERVER}/index-info/discount`

//遊戲頁
export const GAME_DATA_POST = `${API_SERVER}/game-data/gamefile`
