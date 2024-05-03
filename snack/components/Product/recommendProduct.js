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
        <Image src={imageUrl} width={370} height={250} className={styles.recommendImage}/>

        <div style={{ display: 'flex' }}>

          <p className={styles.recommendName}>{productName}</p>

          <FiHeart className={styles.RecommendCollectIcon} />

          <div className={styles.productScore}>{score}</div>



        </div>
      </div>
    );
  };

