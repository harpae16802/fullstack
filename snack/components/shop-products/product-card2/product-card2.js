import React, { useEffect, useState } from 'react'
// icons
import { FaThumbsUp, FaPlus, FaRegHeart, FaHeart } from 'react-icons/fa'
// fetch 網址
import {
  FAVORITE_PRODUCTS,
  C_FAVORITE_PRODUCTS,
} from '@/components/config/api-path'
// context
import { useAuth } from '@/contexts/custom-context'
import { useCartContext } from '@/contexts/cartContext'
// 樣式
import style from './style.module.scss'

export default function ProductCard2({
  product_id,
  title = '',
  price = '',
  percentage = '',
  pepole = '',
  imgUrl = '',
  introduce = '',
}) {
  const { auth, getAuthHeader } = useAuth()
  const { addToCart } = useCartContext()
  const [isFavorite, setIsFavorite] = useState(false) // 最愛

  // 加入收藏 - 商品
  const toggleFavoriteProducts = async () => {
    try {
      if (!auth.token) {
        const willLogIn = confirm('請先登入會員')
        if (willLogIn) {
          window.location.href = '/login/login-custom'
        }
        return
      }

      const r = await fetch(`${FAVORITE_PRODUCTS}/${product_id}`, {
        headers: { ...getAuthHeader() },
      })
      const data = await r.json()
      if (data.success) {
        setIsFavorite(data.action === 'add')
      }
    } catch (error) {
      console.error('加入最愛 錯誤:', error)
    }
  }
  // 检查收藏状态
  const checkFavoriteStatus = async () => {
    try {
      if (!auth.token) {
        // 如果未登录，暂不做任何操作
        console.log('用户未登录，暂不检查收藏状态')
        return
      }

      const r = await fetch(`${C_FAVORITE_PRODUCTS}/${product_id}`, {
        headers: { ...getAuthHeader() },
      })
      if (!r.ok) throw new Error('网络回应错误')
      const data = await r.json()
      if (data.isFavorite !== undefined) {
        setIsFavorite(data.isFavorite)
      }
    } catch (error) {
      console.error('检查收藏状态时出错:', error)
    }
  }
  // 加入購物車
  const handleAddToCart = () => {
    addToCart(product_id)
  }

  useEffect(() => {
    if (auth.token) {
      checkFavoriteStatus()
    }
  }, [product_id])

  return (
    <div className={`p-0 d-flex ${style.productCard2}`}>
      <div
        className={`d-flex flex-column justify-content-center ${style.text}`}
      >
        <div className={`d-flex align-items-center ${style.titleDiv}`}>
          <h5 className={`mb-0 ${style.title}`}>{title}</h5>
          {isFavorite ? (
            <FaHeart
              className={`${style.icon}`}
              onClick={toggleFavoriteProducts}
            />
          ) : (
            <FaRegHeart
              className={`${style.icon}`}
              onClick={toggleFavoriteProducts}
            />
          )}
        </div>
        <div className={`d-flex align-items-center`}>
          <span className={style.price}>${price}</span>
          <FaThumbsUp className={style.icon} />
          <span>{percentage}</span>
          <span>({pepole})</span>
        </div>
        <p className={`mb-0 ${style.p}`}>{introduce}</p>
      </div>
      <img src={imgUrl} alt={title} className={style.img} />
      <button className={style.addBtn} onClick={handleAddToCart}>
        <FaPlus />
      </button>
    </div>
  )
}
