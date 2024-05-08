import React, { useState, useEffect } from 'react'
import { FiHeart } from 'react-icons/fi'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import styles from '@/styles/Product.module.css' // 確保引入了正確的樣式文件
import Image from 'next/image'
import {
  FAVORITE_PRODUCTS,
  C_FAVORITE_PRODUCTS,
} from '@/components/config/api-path'

export default function ProductItem({
  product_id,
  imageUrl = '',
  productName = '',
  score = '',
}) {
  const [isFavorite, setIsFavorite] = useState(false) // 最愛
  console.log(product_id)
  // 加入收藏 - 商品

  // 使用 

  const toggleFavoriteProducts = async () => {
   
    try {
      const url = `http://127.0.0.1:3002/productPageRouter/favoriteAddProduct`;  
      const custom_id = JSON.parse(
        localStorage.getItem('Nightmarket-auth')
      ).custom_id; 
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ custom_id: custom_id, product_id: product_id })
      })
      const data = await response.json()
      if (data.status=="Success") {
        setIsFavorite(()=>!isFavorite)
      }
    } catch (error) {
      console.error('加入最愛 錯誤:', error)
    }
  }

  return (
    <div className={styles.recommendProductContainer}>
      
      <Image
        src={imageUrl}
        width={358}
        height={238}
        className={styles.recommendImage}
        alt={imageUrl}
      />

      <div className={styles.recommendInfo}>
        <p className={styles.recommendName} style={{ whiteSpace: 'nowrap' }}>
          {productName}
        </p>

        {isFavorite ? (
          <FaHeart
            className={styles.RecommendCollectIcon}
            onClick={toggleFavoriteProducts}
          />
        ) : (
          <FaRegHeart
            className={styles.RecommendCollectIcon}
            onClick={toggleFavoriteProducts}
          />
        )}

        <div className={styles.productScore}>{score}</div>
      </div>
    </div>
  )
}
