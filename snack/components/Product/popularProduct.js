import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import styles from '@/styles/Product.module.css';
import ProductDetailCard from '@/components/Product/productDetail';

export default function PopularProduct(props) {
  console.log('props',props)


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

      <div className={styles.bestProduct}>{props.product}
      <FaRegHeart className={styles.collectIcon}/></div>

      <br />

  
            

    </div>

  );
};

