import React from 'react';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import styles from '@/styles/Product.module.css';
import ProductDetailCard from '@/components/Product/productDetail'

export default function PopularProduct ({ 
  imageUrl = "",
  saleRanking = "",
  market = "",
  seller = "",
  product = "",
 }) {

  return (

    <div className={styles.popularProduct} style={{ marginRight: '20px' }}>

      <div className={styles.popularInfo}>
          {/* 火焰icon */}
        <Image src="/images/fire.png" width={45} height={55} className={styles.popularIcon} />

        <div className={styles.bestSellerText}>本週熱銷</div>

        <div className={styles.bestSellerText}>{saleRanking}</div>
      </div>
      
      <Image src={imageUrl} width={345} height={275} className={styles.popularImage} />

      <p className={styles.bestSeller}  style={{marginTop: '10px' }}>{market}</p>

      <p  className={styles.bestSeller} style={{marginTop: '-18px' }}>{seller} </p>

      <div className={styles.bestProduct}>{product}
      <FaRegHeart className={styles.collectIcon}/></div>

      <br />

      <ProductDetailCard
          imageUrl2 = "/images/蛋塔.jpg"
          sellerName = "姊姊抓的餅"
           productName = "豬排蛋"
           description = "香噴噴的炸豬排，外酥內嫩，蛋汁滑嫩地流淌出來，與香氣四溢的抓餅完美融合。一口咬下，豬排的鮮美與蛋的滑嫩在口中交融，配上外皮香脆的抓餅，彷彿是一場口感盛宴，勾勒出濃郁的台灣街頭味道。"
           price = "70"
           ingredient = "麵粉、麵粉、雞蛋、鹽"
          nutrition="營養成分表"
      />

    </div>



  );
};

