import Image from 'next/image';
import { IoMdTrash } from 'react-icons/io';
import React, { createContext, useContext,useState, useEffect } from 'react'
import styles from '@/styles/Order.module.css'
import { FaShopify } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function AmountCal ({
   payment = "",
   discount = "",
   pointDiscount = "",
   total =  "",
   }) {


  return (
<>
         {/* 結帳金額 */}
        <div className={styles.paymentContainer}>
            <div className={styles.amountText}>金額:</div>
            <div className={styles.amount}>${payment}</div>
         </div>

        {/* 折扣金額 */}
         <div className={styles.paymentContainer}>
            <div className={styles.discountText}>折扣:</div>
            <div className={styles.discountAmount}>-${discount}.00</div>
         </div>

        {/* 點數折扣 */}
         <div className={styles.paymentContainer}>
            <div className={styles.pointText}>點數折扣:</div>
            <div className={styles.usePoint}>{pointDiscount}</div>
         </div>

         {/* 總金額 */}
         <div style={{display:'flex'}}>
           <h1 className={styles.sumText}>總金額:</h1>
           <h1 className={styles.sumTotal}>{total}.00</h1>
         </div>

</>
  );
};

