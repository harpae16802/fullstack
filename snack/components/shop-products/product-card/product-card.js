import React, { useEffect, useState } from 'react'

// icons
import { FaThumbsUp, FaPlus, FaRegHeart, FaHeart } from 'react-icons/fa'
// fetch 網址
import {
  FAVORITE_PRODUCTS,
  C_FAVORITE_PRODUCTS,
} from '@/components/config/api-path'
// context
import { useCartContext } from '@/contexts/cartContext'
import { useAuth } from '@/contexts/custom-context'
// 樣式
import style from './style.module.scss'

export default function ProductCard({
  product_id,
  imgUrl = '',
  title = '',
  price = '',
  percentage = '',
  pepole = '',
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
    <div className={style.card}>
      <div className={style.imgDiv}>
        <img src={imgUrl} className={style.img} />
        <button className={style.addBtn} onClick={handleAddToCart}>
          <FaPlus />
        </button>
      </div>
      <div className={style.textDiv}>
        <div className={`d-flex align-items-center`}>
          <h5 className={`fw-bold mb-0 ${style.title}`}>{title}</h5>
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

        <div className="d-flex align-items-center">
          <span className={style.price}>${price}</span>
          <span className="d-flex align-items-center">
            <FaThumbsUp className={style.iconThumbsUp} />
            {percentage} ({pepole})
          </span>
        </div>
      </div>
    </div>
  )
}
