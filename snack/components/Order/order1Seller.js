import Image from 'next/image'
import React, { createContext, useContext,useState, useEffect } from 'react'
import styles from '@/styles/Order.module.css'
import { FaShopify } from "react-icons/fa"
import { IoIosArrowDown } from "react-icons/io"

export default function Order1Seller ({
   nightmarket = "",
   seller = "",
   }) {


  return (

    <div className={styles.orderContainerAdd}>
    {/* 上層: 夜市 店家名稱 */}
     <div className={styles.marketCheckout}>
    {/* 夜市icon */}
     <FaShopify className={styles.sellerIcon} />

      <div className={styles.checkoutMarket}>{nightmarket}</div> 

      <div className={styles.checkoutProduct}>{seller}</div> 

      {/* '選此店結帳'按鈕 */}
      <div className={styles.checkoutButton}>選此店結帳</div>
      {/* <IoIosArrowDown className={styles.checkoutDownIcon} /> */}
      
      {/* marketCheckout */}
     </div>


     {/* orderContainer */}
   </div>







  );
};

