// 內建
import React, { useState } from 'react'
// icons
import { FaThumbsUp, FaPlus, FaRegHeart, FaHeart } from 'react-icons/fa'
// fetch 網址
import { FAVORITE_PRODUCTS } from '@/components/config/api-path'
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
  const [isFavorite, setIsFavorite] = useState(false) // 最愛

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

  return (
    <div className={style.card}>
      <div className={style.imgDiv}>
        <img src={imgUrl} className={style.img} />
        <button className={style.addBtn}>
          <FaPlus />
        </button>
      </div>
      <div className={style.textDiv}>
        <div className={`d-flex align-items-center`}>
          <h5 className={`fw-bold mb-0`}>{title}</h5>
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
