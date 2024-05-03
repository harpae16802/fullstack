import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaRegHeart,FaHeart } from 'react-icons/fa';
import styles from '@/styles/Product.module.css';
import ProductDetailCard from '@/components/Product/productDetail';
// fetch 網址
import {
  FAVORITE_PRODUCTS,
  C_FAVORITE_PRODUCTS,
} from '@/components/config/api-path'


export default function PopularProduct(props) {
  console.log('props',props.product_id)
  const product_id = props.product_id


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

    <div className={styles.popularProduct}>

      <div className={styles.popularInfo}>
          {/* 火焰icon */}
        <Image src="/images/fire.png" width={45} height={55} className={styles.popularIcon} alt='火焰icon' />

        <div className={styles.bestSellerText}>本週熱銷</div>

        <div className={styles.bestSellerText}>{props.saleRanking}</div>
      </div>
      
      <Image src={props.imageUrl} width={345} height={275} className={styles.popularImage} alt={props.product} />

      <p className={styles.bestSeller}  style={{marginTop: '10px' }}>{props.market}</p>

      <p  className={styles.bestSeller} style={{marginTop: '-18px' }}>{props.seller} </p>

      <p  className={styles.bestProduct} style={{marginTop: '-18px' }}>{props.product} </p>

      {/* <div className={styles.bestProduct}>{props.product}
      <FaRegHeart  className={styles.collectIcon}  onClick={toggleFavoriteProducts}/></div> */}
      {isFavorite ? (
            <FaHeart
              className={styles.collectIcon}
              onClick={toggleFavoriteProducts}
            />
          ) : (
            <FaRegHeart
              className={styles.collectIcon}
              onClick={toggleFavoriteProducts}
            />
          )}
      <br />

      
   
            

    </div>

  );
};

