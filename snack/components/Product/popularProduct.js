import React from 'react';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import styles from '@/styles/Product.module.css';


const PopularProduct = ({ imageUrl, market, sellerName, productName, buttonText }) => {

  return (

    <div className={` ${styles.popularProduct}`} style={{ marginRight: '20px' }}>

      <div className={styles.popularInfo}>

        <Image src="/images/fire.png" width={45} height={55} className={styles.popularIcon} />

        <div className={styles.bestSellerText}>本週熱銷</div>

        <div className={styles.bestSellerText}>NO1</div>
      </div>

      <Image src={"/images/大腸麵線.jpg"} width={345} height={275} className={styles.popularImage} />

      <p className={styles.bestSeller}  style={{marginTop: '10px' }}>{market}三和夜市</p>

      <p  className={styles.bestSeller} style={{marginTop: '-18px' }}>{sellerName} 壺茶車</p>

      <div className={styles.bestProduct}>{productName}
      蛤蠣湯<FaRegHeart className={styles.collectIcon}/></div>

      <br />

      <button className={styles.seeMoreButton}>{buttonText}看更多</button>

    </div>
  );
};

export default PopularProduct;