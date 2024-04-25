import Image from 'next/image';
import React, { createContext, useContext } from 'react'
import styles from '@/styles/Order.module.css'


export default function OrderLastCheck ({ 
  product = "",
  number = "",
  price = "", 
  total ="",
  })  {

return (

  <>

     <div style={{display:'flex',justifyContent:'space-between'}}>
        <div className={styles.orderInformation1} style={{marginLeft:'85px'}}>{product}</div>
        <div className={styles.orderInformation2} style={{marginLeft:'25px'}}>{number}</div>
        <div className={styles.orderInformation2} style={{marginLeft:'25px'}}>NT.{price}</div>
         <div className={styles.orderInformation2} style={{color:'#ff2828'}}>NT.{total}</div>
    </div>

  </>

  );
};
