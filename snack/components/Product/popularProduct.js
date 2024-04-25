import React from 'react';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import styles from '@/styles/Product.module.css';


export default function PopularProduct ({ 
  imageUrl = "",
  saleRanking = "",
  market = "",
  seller = "",
  product = "",
 }) {

  return (

    <div className={` ${styles.popularProduct}`} style={{ marginRight: '20px' }}>

      <div className={styles.popularInfo}>
          {/* 火焰icon */}
        <Image src="/images/fire.png" width={45} height={55} className={styles.popularIcon} />

        <div className={styles.bestSellerText}>本週熱銷</div>

        <div className={styles.bestSellerText}>{saleRanking}</div>
      </div>
      
      <Image src={imageUrl} width={345} height={275} className={styles.popularImage} />

      <p className={styles.bestSeller}  style={{marginTop: '10px' }}>{market}</p>

      <p  className={styles.bestSeller} style={{marginTop: '-18px' }}>{seller} </p>

      <div className={styles.bestProduct}>{product}
      <FaRegHeart className={styles.collectIcon}/></div>

      <br />

      <button className={styles.seeMoreButton}>看更多</button>

    </div>



  );
};

