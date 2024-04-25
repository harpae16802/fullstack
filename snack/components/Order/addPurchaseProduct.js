import Image from 'next/image';
import { IoCart } from 'react-icons/io5';
import React, { createContext, useContext,useState, useEffect } from 'react'
import styles from '@/styles/Order.module.css'


export default function DiscountContentItem ({
   seller = "",
   product = "",
   imageUrl = "",
   price = "",
   })  {

  return (
     <>

 <div className={`${styles.discountContent}`}>
   <div className={styles.discountSeller}>{seller}</div>

     <div className={styles.discountProduct}>{product}</div>
        <Image src={imageUrl} width={250} height={250} className={styles.discountPicture}
/>
    <div className={styles.priceAndCart}>
    <p className={styles.discountPrice}>${price}</p>

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









