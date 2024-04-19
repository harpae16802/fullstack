import Image from 'next/image';
import { IoCart } from 'react-icons/io5';
import React, { createContext, useContext,useState, useEffect } from 'react'
import styles from '@/styles/Order.module.css'


const DiscountContentItem = ({ sellerName, productName, imageUrl, price }) => {
  return (
     <>
 <div className={`${styles.discountContent}`}>
   <div className={styles.discountSeller}>姊姊抓的餅</div>

     <div className={styles.discountProduct}>豬排蛋</div>
        <Image src="/images/蛋塔.jpg" width={250} height={250} className={styles.discountPicture}
/>
    <div className={styles.priceAndCart}>
    <p className={styles.discountPrice}>$70</p>

        <div className={styles.addToCart}>加入購物車
        <IoCart style={{
            fontSize:27,
            paddingLeft:5,
            paddingBottom:3
            }}/>
        </div>

    </div>



{/* discountContent */}
</div>
     </>
    
  );
};

export default DiscountContentItem;







