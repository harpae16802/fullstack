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
  const { cartItems, total, addToCart, removeFromCart } = useCartContext()

  // 处理增加商品数量
  const handleIncreaseQuantity = (product_id) => {
    addToCart({ product_id })
  }

  // 处理减少商品数量
  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      removeFromCart(item.product_id, -1)
    } else {
      handleRemoveProduct(item.product_id)
    }
  }

  // 处理直接移除商品
  const handleRemoveProduct = (product_id) => {
    removeFromCart(product_id, -999) // 传递一个足够大的负数来触发删除操作
  }

  return (
    <div
      className={`d-flex justify-content-center align-items-center flex-column sticky-top ${style.cart}`}
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
                  <button onClick={() => handleDecreaseQuantity(item)}>
                    <FaMinus />
                  </button>
                </div>
                <FaTrashAlt onClick={() => {}} className={style.removeItem} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          <FaShoppingCart className={`${style.icon}`} />
          <h4 className="fw-bold">購物車目前空空</h4>
          <div className={`d-flex`}>
            <p>總計</p>
            <p>$0</p>
          </div>
        </>
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
