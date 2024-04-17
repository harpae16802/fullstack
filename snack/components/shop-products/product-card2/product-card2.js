import React, { useState } from 'react'
// icons
import { FaThumbsUp, FaPlus, FaRegHeart, FaHeart } from 'react-icons/fa'
// fetch 網址
import { FAVORITE_PRODUCTS } from '@/components/config/api-path'
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
    <div className={`p-0 d-flex ${style.productCard2}`}>
      <div
        className={`d-flex flex-column justify-content-center ${style.text}`}
      >
        <div className={`d-flex align-items-center ${style.title}`}>
          <h5 className="mb-0">{title}</h5>
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
      <button className={style.addBtn}>
        <FaPlus />
      </button>
    </div>
  )
}
