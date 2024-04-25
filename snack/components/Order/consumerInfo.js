import React, { createContext, useContext,useState, useEffect } from 'react'
import styles from '@/styles/Order.module.css'


export default function ConsumerInfo ({
   account = "",
   orderId = "",
   orderDate = "",
   totalSum = "",
   })  {

  return (
     <>

           {/*買家資訊 文字 */}
           <div style={{display:'flex', justifyContent:'space-between'}} className={styles.borderBottom}>
                <div className={styles.orderInformation1}>買家帳號</div>
                <div className={styles.orderInformation2}>訂單編號</div>
                <div className={styles.orderInformation2}>訂單日期</div>
                <div className={styles.orderInformation2}>訂單總金額</div>
            </div>
        
            {/*買家資訊*/}
            <div style={{display:'flex', justifyContent:'space-between'}} className={styles.borderBottom}>
                <div className={styles.orderInformation1}>{account}</div>
                <div className={styles.orderInformation2}>{orderId}</div>
                <div className={styles.orderInformation2 } style={{marginRight:'85px'}}>{orderDate}</div>
                <div className={styles.orderInformation2}>NT.{totalSum}</div>
            </div>

     

     </>
    
  );
};

