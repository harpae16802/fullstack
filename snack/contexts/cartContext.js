import React, { createContext, useState, useContext, useEffect } from 'react'
// api-path
import { CART_ADD, CART } from '@/components/config/api-path'

const CartContext = createContext()
export const useCartContext = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)

  // 添加商品到购物车
  const addToCart = async (productToAdd) => {
    // 先在本地状态中更新，以便用户界面快速响应
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product_id === productToAdd.product_id
      )
      if (existingItem) {
        return prevItems.map((item) =>
          item.product_id === productToAdd.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...productToAdd, quantity: 1 }]
    })

    // 同时发送更新到服务器
    try {
      const response = await fetch(CART_ADD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productToAdd.product_id,
          quantity: 1, // 或者使用逻辑确定是否增加或设置具体数量
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Could not add item to cart')
      }

      // 可选：如果服务器返回最新的购物车数据，也可以在这里更新
      setTotal(data.totalAmount) // 假设后端返回了新的总金额
    } catch (error) {
      console.error('Failed to update cart:', error)
    }
  }

  // 移除购物车商品
  const removeFromCart = (product) => {}

  // 载入购物车数据
  useEffect(() => {
    fetch(CART) // 假设您有一个API端点返回所有购物车项目
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data.cartInfo || [])
        setTotal(data.totalAmount || 0)
      })
      .catch((error) => console.error('Failed to load cart items', error))
  }, [])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        total,
        setTotal,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
