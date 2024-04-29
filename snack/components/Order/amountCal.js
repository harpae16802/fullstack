import Image from 'next/image';
import { IoMdTrash } from 'react-icons/io';
import React, { createContext, useContext,useState, useEffect } from 'react'
import styles from '@/styles/Order.module.css'
import { FaShopify } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import PointsRedeemWindow from '@/components/Order/pointConsume'

export default function AmountCal ({
   payment = "",
   discount = "",
   total =  "",
   }) {


  return (
<>
         {/* 結帳金額 */}
    <div className='col'>

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
            <PointsRedeemWindow
               point = "1014"
            />
         </div>

        <div className={styles.SettlementLine}></div>

         {/* 總金額 */}
         <div style={{display:'flex'}}>
           <div className={styles.sumText}>總金額:</div>
           <div className={styles.sumTotal}>{total}.00</div>
         </div>
    </div>
</>
  );
};

