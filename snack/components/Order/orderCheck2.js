import Image from 'next/image';
import React, { createContext, useContext } from 'react'
import styles from '@/styles/Order.module.css'


export default function OrderCheck ({ 
  imageUrl = "",
  product = "",
  size = "",
  material = "",
  discount = "",
  quantity = "",
  price = "" ,
  })  {

  return (

<>

<div className={styles.order2Detail}>

<Image src={imageUrl} width={100} height={100}
 className={styles.order2Picture} 
/>

   <div className={styles.productText}>{product}</div>

<div>
   <div className={styles.applyDiscount1}>Size:{size},Material: {material}</div>
   <div className={styles.applyDiscount2}>優惠:{discount}</div>
</div>

<div className={styles.buyText}>購買數量:  |   {quantity}</div>


<div className={styles.product2Price}>${price}</div>




</div>

    <div className={styles.step2BottomLine }></div> 


</>

  );



};

