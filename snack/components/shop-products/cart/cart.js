import React from 'react'
// context
import { useCartContext } from '@/contexts/cartContext'
// icons
import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa'
// 樣式
import style from './style.module.scss'

export default function Cart() {
  const { cartItems, total } = useCartContext()

  return (
    <div
      className={`d-flex justify-content-center align-items-center flex-column sticky-top ${style.cart}`}
    >
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.product_id} className="d-flex">
            <img
              src={item.imgUrl}
              alt={item.title}
              className={style.cartItemImage}
            />
            <div className={`d-flex ${style.cartItemDetails}`}>
              <h5>{item.title}</h5>
              <p>价格: ${item.total_price.toFixed(2)}</p>
              <p>数量: {item.quantity}</p>
              <FaTrashAlt
                onClick={() => removeFromCart(item.product_id)}
                className={style.removeItem}
              />
            </div>
          </div>
        ))
      ) : (
        <>
          <FaShoppingCart className={`${style.icon}`} />
          <h4 className="fw-bold">購物車目前空空</h4>
          <div className="d-flex">
            <p>總計</p>
            <p>$0</p>
          </div>
        </>
      )}
      {cartItems.length > 0 && (
        <div className="d-flex">
          <p>總計</p>
          <p>${total.toFixed(2)}</p>
        </div>
      )}
    </div>
  )
}
