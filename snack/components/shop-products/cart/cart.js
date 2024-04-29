import React from 'react'
// context
import { useCartContext } from '@/contexts/cartContext'
// api-path
import { IMAGES_PRODUCTS } from '@/components/config/api-path'
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
    <div
      className={`d-flex justify-content-center align-items-center flex-column ${style.cart}`}
    >
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.product_id} className={`d-flex ${style.cartItems}`}>
            <img
              src={`${IMAGES_PRODUCTS}/${item.image_url}`}
              alt={item.title}
              className={style.cartItemImage}
            />
            <div className={`d-flex flex-column ${style.cartItemDetails}`}>
              <div>
                <span className={`fw-bold ${style.productName}`}>
                  {item.product_name}
                </span>
                <span>${item.total_price}</span>
              </div>

              <div
                className={`d-flex align-items-center justify-content-between`}
              >
                <div className={style.quantity}>
                  <button
                    onClick={() => handleIncreaseQuantity(item.product_id)}
                  >
                    <FaPlus />
                  </button>
                  <input
                    type="text"
                    min="1"
                    value={item.quantity}
                    style={{ border: 'none', outline: 'none' }}
                    readOnly
                  />
                  <button
                    onClick={() => handleDecreaseQuantity(item.product_id)}
                  >
                    <FaMinus />
                  </button>
                </div>
                <FaTrashAlt
                  onClick={() => handleDel(item.product_id)}
                  className={style.removeItem}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div
          className={`d-flex flex-column align-items-center ${style.noItems}`}
        >
          <FaShoppingCart className={`${style.icon}`} />
          <h4 className={`fw-bold`}>購物車目前空空</h4>
          <div className={`w-100 d-flex justify-content-between`}>
            <p>總計</p>
            <p>$0</p>
          </div>
          <button className="btn disabled">去購物車結帳</button>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="w-100 d-flex justify-content-between">
          <p>總計</p>
          <p>${total}</p>
        </div>
      )}
    </div>
  )
}