import React, { createContext, useState, useContext, useEffect } from 'react'
// api-path
import { CART_ADD, CART, CART_EDIT } from '@/components/config/api-path'

const CartContext = createContext()
export const useCartContext = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)

  // 添加商品到购物车
  // const addToCart = async (productToAdd) => {
  //   // 先在本地状态中更新，以便用户界面快速响应
  //   setCartItems((prevItems) => {
  //     const existingItem = prevItems.find(
  //       (item) => item.product_id === productToAdd.product_id
  //     )
  //     if (existingItem) {
  //       return prevItems.map((item) =>
  //         item.product_id === productToAdd.product_id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       )
  //     }
  //     return [...prevItems, { ...productToAdd, quantity: 1 }]
  //   })

  //   // 同时发送更新到服务器
  //   try {
  //     const response = await fetch(CART_ADD, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         product_id: productToAdd.product_id,
  //         quantity: 1, // 或者使用逻辑确定是否增加或设置具体数量
  //       }),
  //     })

  //     const data = await response.json()
  //     if (!response.ok) {
  //       throw new Error(data.message || 'Could not add item to cart')
  //     }

  //     // 使用服务器返回的最新购物车数据来更新状态
  //     if (data.cartInfo) {
  //       // 直接使用后端返回的购物车信息，因为它已经包含了 image_url
  //       setCartItems(
  //         data.cartInfo.map((item) => ({
  //           ...item,
  //           // imgUrl: item.image_url, // 注意这里的键名需要和您的前端代码一致
  //         }))
  //       )
  //     }
  //     setTotal(data.totalAmount)
  //   } catch (error) {
  //     console.error('Failed to update cart:', error)
  //   }
  // }
  const addToCart = async (productId) => {
    try {
      const response = await fetch(CART_ADD, {
        method: 'POST',
        headers: {
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
  // const removeFromCart = async (product_id, change) => {
  //   try {
  //     const response = await fetch(CART_EDIT, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ product_id, change }),
  //     })

  //     const data = await response.json()
  //     if (!response.ok) {
  //       throw new Error(data.error || 'Could not update the cart')
  //     }

  //     if (data.cartInfo && data.cartInfo.length > 0) {
  //       const updatedCartItems = data.cartInfo[0]
  //       setCartItems((currentItems) => {
  //         return updatedCartItems.map((updatedItem) => {
  //           const currentItem = currentItems.find(
  //             (item) => item.product_id === updatedItem.product_id
  //           )
  //           return {
  //             ...currentItem,
  //             ...updatedItem,
  //             imgUrl:
  //               currentItem?.imgUrl ||
  //               updatedItem.image_url ||
  //               'default-image-path.jpg',
  //           }
  //         })
  //       })
  //       setTotal(data.totalAmount)
  //     } else {
  //       setCartItems((currentItems) =>
  //         currentItems.filter((item) => item.product_id !== product_id)
  //       )
  //     }
  //   } catch (error) {
  //     console.error('Failed to update cart:', error)
  //   }
  // }
  const removeFromCart = async () => {}

  // 加載購物車數據
  const loadCartData = async () => {
    try {
      const response = await fetch(CART, {
        method: 'GET',
        headers: {
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
    loadCartData()
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
