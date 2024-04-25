// 內建
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
  const { addToCart } = useCartContext()

  const [isFavorite, setIsFavorite] = useState(false) // 最愛

  // 添加到购物车的事件处理器
  const handleAddToCart = () => {
    // 创建一个代表商品的对象
    const product = {
      product_id,
      imgUrl,
      title,
      price: parseFloat(price),
      percentage,
      pepole,
    }
    addToCart(product) // 调用addToCart函数更新购物车
  }

  // 加入收藏 - 商品
  const toggleFavoriteProducts = async () => {
    try {
      const r = await fetch(`${FAVORITE_PRODUCTS}/${product_id}`)
      const data = await r.json()
      if (data.success) {
        setIsFavorite(data.action === 'add')
      }
    } catch (error) {
      console.error('加入最愛 錯誤:', error)
    }
  }

  useEffect(() => {
    // 检查收藏状态
    const checkFavoriteStatus = async () => {
      const r = await fetch(`${C_FAVORITE_PRODUCTS}/${product_id}`)
      const data = await r.json()
      if (data.isFavorite !== undefined) {
        setIsFavorite(data.isFavorite)
      }
    }

    checkFavoriteStatus()
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
