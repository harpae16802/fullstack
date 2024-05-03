import React, { createContext, useState, useContext, useEffect } from 'react'
// api-path
import {
  CART_ADD,
  CART,
  CART_MINUS,
  CART_DEL,
} from '@/components/config/api-path'
// context
import { useAuth } from '@/contexts/custom-context'

const CartContext = createContext()
export const useCartContext = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const { auth, getAuthHeader } = useAuth()
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  const [totalItems, setTotalItems] = useState(0) // 小購物車用的總數

  // 添加商品到购物车
  const addToCart = async (productId, quantity) => {
    try {
      if (!auth.token) {
        const willLogIn = confirm('請先登入會員')
        if (willLogIn) {
          window.location.href = '/login/login-custom'
        }
        return
      }

      // 检查商品数量是否大于0
      if (quantity <= 0) {
        alert('請選擇至少一個商品數量')
        return // 如果数量不大于0，则不进行添加操作
      }

      const response = await fetch(CART_ADD, {
        method: 'POST',
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ product_id: productId }),
        body: JSON.stringify({ product_id: productId, quantity: quantity }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add item to cart')
      }

      // 更新购物车数据
      setCartItems(data.cartInfo[0])
      setTotal(data.totalAmount)
    } catch (error) {
      console.error('Failed to add item to cart:', error)
    }
  }

  // 移除购物车商品的数量或完全移除商品
  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(CART_MINUS, {
        method: 'POST',
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: productId }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add item to cart')
      }

      // 更新购物车数据
      setCartItems(data.cartInfo[0])
      setTotal(data.totalAmount)
    } catch (error) {
      console.error('Failed to add item to cart:', error)
    }
  }

  // 直接移除购物车商品
  const delFromCart = async (productId) => {
    try {
      const response = await fetch(CART_DEL, {
        method: 'POST',
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: productId }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add item to cart')
      }

      // 更新购物车数据
      setCartItems(data.cartInfo[0])
      setTotal(data.totalAmount)
    } catch (error) {
      console.error('Failed to add item to cart:', error)
    }
  }

  // 加載購物車數據
  const loadCartData = async () => {
    try {
      const response = await fetch(CART, {
        method: 'GET',
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Could not fetch cart data')
      }

      setCartItems(data.items) // 假設後端返回了購物車項目的數組
      setTotal(data.totalAmount) // 假設後端返回了總金額
    } catch (error) {
      console.error('Failed to load cart data:', error)
    }
  }

  useEffect(() => {
    // 計算所有商品的總數量
    const newItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    setTotalItems(newItemCount)
  }, [cartItems])

  useEffect(() => {
    if (auth.token) {
      loadCartData()
    }
    // loadCartData()
  }, [auth.token])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        totalItems,
        setCartItems,
        setTotal,
        addToCart,
        removeFromCart,
        delFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
