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

  // 添加商品到购物车
  const addToCart = async (productId) => {
    try {
      if (!auth.token) {
        const willLogIn = confirm('請先登入會員')
        if (willLogIn) {
          window.location.href = '/login/login-custom'
        }
        return
      }

      const response = await fetch(CART_ADD, {
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
    if (auth.token) {
      loadCartData()
    }
    // loadCartData()
  }, [auth.token])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        total,
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
