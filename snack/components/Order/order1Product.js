import Image from 'next/image';
import { IoMdTrash } from 'react-icons/io';
import React, { createContext, useContext,useState, useEffect } from 'react'
import styles from '@/styles/Order.module.css'
import { FaShopify } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function Order1Product ({
   imageUrl = "",
   product = "",
   price = "",
   }) {


  return (

    <div className={`col ${styles.orderProductContainer}`}>

    {/* 下層:訂單內的商品圖片 名稱 */}
    <div className={styles.orderDetail}>
    <Image src={imageUrl} width={100} height={100}
     className={styles.order1Picture}
    />
    <div className={styles.productText}>{product}</div>
    <div className={styles.productPrice}>${price}</div>

   {/* 產品數量增減 */}
   <div className={styles.numberButton}>
    <div className={styles.productNumber}>-</div>
    <div className={styles.productNumber}>1</div>
    <div className={styles.productNumber}>+</div>
   </div>
    
    <div className={styles.removeButton}>移除
    <IoMdTrash className={styles.trashIcon}/>
    </div>

    </div>
   
   <div className={styles.orderProductBorder}></div>
   


     {/* orderContainer */}
   </div>


  );
};

