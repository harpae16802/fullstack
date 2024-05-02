import React from 'react';
import { FiHeart } from 'react-icons/fi';
import styles from '@/styles/Product.module.css'; // 確保引入了正確的樣式文件
import Image from 'next/image';


export default function ProductItem  ({ 
    imageUrl = "",
    productName = "",
    score = ""
   }) {
    return (
      <div  className={styles.recommendProductContainer}>
        <Image src={imageUrl} width={345} height={225} style={{
          borderRadius: '70px',
          border: 'solid 8px #fff',
          marginTop: '22px',
        }} />

        <div style={{ display: 'flex' }}>

          <p className={styles.recommendName}>{productName}</p>

          <FiHeart className={styles.RecommendCollectIcon} />

          <div className={styles.productScore}>{score}</div>



        </div>
      </div>
    );
  };

