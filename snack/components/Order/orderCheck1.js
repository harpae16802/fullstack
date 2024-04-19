import Image from 'next/image';
import { IoMdTrash } from 'react-icons/io';
import React, { createContext, useContext,useState, useEffect } from 'react'
import styles from '@/styles/Order.module.css'
import { FaShopify } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";




const OrderDetailItem = ({ imageUrl, productName, productPrice }) => {
  return (


    <div className={styles.orderContainerAdd}>
    {/* 上層: 夜市 店家名稱 */}
     <div className={styles.marketCheckout}>
    {/* 夜市icon */}
     <FaShopify style={{ fontSize: '40px', position: 'relative', left: '50px', top: '10px' }} />

      <div className={styles.checkoutMarket}> 士林夜市</div> 
      <div className={styles.checkoutProduct}> 豪大雞排</div> 

      {/* '選此店結帳'按鈕 */}
      <div className={styles.checkoutButton}>選此店結帳</div>
      <IoIosArrowDown style={{
       color:'rgb(163, 44, 45)',
       fontSize:'34px',
       position: 'relative',
       left: '20px',
       top: '16px'
      }}/>
      
      {/* marketCheckout */}
     </div>
     <hr/>
    {/* 下層:訂單內的商品圖片 名稱 */}
    <div className={styles.orderDetail}>
    <Image src="/images/鹹酥雞.jpg" width={100} height={100}
     className={styles.orderPicture}
    />
    <div className={styles.productText}>海苔雞排</div>
    <div className={styles.productText}>$80</div>

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


    <hr/>
    <div className={styles.orderDetail}>
    <Image src="/images/鹹酥雞.jpg" width={100} height={100}
     className={styles.orderPicture}
    />
    <div className={styles.productText}>海苔雞排</div>
    <div className={styles.productText}>$80</div>

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

     {/* orderContainer */}
   </div>







  );
};

export default OrderDetailItem;