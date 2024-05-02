import React from 'react'
// context
import { useCartContext } from '@/contexts/cartContext'
// api-path
import { IMAGES_PRODUCTS, API_SERVER } from '@/components/config/api-path'
// icons
import { FaShoppingCart, FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa'
// 樣式
import style from './style.module.scss'

export default function Cart() {
  const { cartItems, total, addToCart, removeFromCart, delFromCart } =
    useCartContext()

  // 增加數量
  const handleIncreaseQuantity = (productId) => {
    // 调用 addToCart 方法并传入商品ID
    addToCart(productId)
  }

  // 減少數量
  const handleDecreaseQuantity = (productId) => {
    removeFromCart(productId)
  }

  // 減少數量
  const handleDel = (productId) => {
    delFromCart(productId)
  }

  return (
    <div className={`${style.container}`}>
      {cartItems.length > 0 ? (
        <div>
          <div className={`${style.cartItems}`}>
            {cartItems.map((item) => (
              <div key={item.product_id} className={`d-flex ${style.product}`}>
                <img
                  src={`${API_SERVER}/${item.image_url}`}
                  alt={item.title}
                  className={style.cartItemImage}
                />
                <div
                  className={`d-flex flex-column justify-content-between ${style.cartItemDetails}`}
                >
                  <div>
                    <span className={`fw-bold ${style.productName}`}>
                      {item.product_name}
                    </span>
                    <span>${item.total_price}</span>
                  </div>
                  <div
                    className={`d-flex align-items-center justify-content-between`}
                  >
                    <div className={`${style.quantity}`}>
                      <button
                        onClick={() => handleDecreaseQuantity(item.product_id)}
                      >
                        <FaMinus />
                      </button>
                      <input
                        type="text"
                        min="1"
                        value={item.quantity}
                        style={{ border: 'none', outline: 'none' }}
                        readOnly
                      />
                      <button
                        onClick={() => handleIncreaseQuantity(item.product_id)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <FaTrashAlt
                      onClick={() => handleDel(item.product_id)}
                      className={style.removeItem}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`${style.summaryandbutton}`}>
            {cartItems.length > 0 && (
              <div className={`${style.summary}`}>
                <p>總計</p>
                <p>${total}</p>
              </div>
            )}
            <button className="btn btn-light">去購物車結帳</button>
          </div>
        </div>
      ) : (
        <div>
          <div className={`${style.iconandtext}`}>
            <FaShoppingCart className={`${style.icon}`} />
            <h4>購物車目前空空</h4>
          </div>
          <div className={`${style.summaryandbutton}`}>
            <div className={`${style.summary}`}>
              <p>總計</p>
              <p>$0</p>
            </div>
            <button className="btn disabled">去購物車結帳</button>
          </div>
        </div>
      )}
    </div>
  )
}
