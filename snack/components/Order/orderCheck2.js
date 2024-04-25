import Image from 'next/image';
import React, { createContext, useContext } from 'react'
import styles from '@/styles/Order.module.css'


const OrderCheck = ({ imageUrl, productName, sizeMaterial, discount, quantity, price }) => {
  return (


    <div className={styles.orderDetail}>
    <Image src="/images/鹹酥雞.jpg" width={100} height={100}
     className={styles.orderPicture} style={{marginTop:'25px'}} 
    />

       <div className={styles.productText}>海苔雞排</div>
   
    <div>
       <div className={styles.applyDiscount}>Size: medium, Material: 珍珠、鮮奶、伊斯蘭卡紅茶</div>
       <div className={styles.applyDiscount}>優惠:滿十送一</div>
    </div>

   <div className={styles.buyText}>購買數量: 5</div>
  

    <div className={styles.productText} style={{marginBottom:'12px'}}>$80</div>




    </div>

  );
};

export default OrderCheck;