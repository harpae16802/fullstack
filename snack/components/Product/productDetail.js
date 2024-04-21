import React from 'react';
import Image from 'next/image';
import { FiHeart } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import styles from '@/styles/Product.module.css'; // 確保引入了正確的樣式文件
import { RxCross1 } from "react-icons/rx";

const ProductDetailCard = () => {
  return (
    <>
    
    <div className={styles.detailContainer}>


       <Image src="/images/蛋塔.jpg" width={759} height={726} className={styles.detailPic}/>

       

      
     <div className={styles.detailTextArray}>

     <RxCross1 className={styles.detailCrossIcon}/>


      <div className={styles.detailSeller}>姊姊抓的餅</div>

      <div className={styles.detailProductName}>豬排蛋</div>

      

    <div className={styles.detailIntroduce}>香噴噴的炸豬排，外酥內嫩，蛋汁滑嫩地流淌出來，與香氣四溢的抓餅完美融合。一口咬下，豬排的鮮美與蛋的滑嫩在口中交融，配上外皮香脆的抓餅，彷彿是一場口感盛宴，勾勒出濃郁的台灣街頭味道。</div>

    <div className={styles.detailPrice}>$70</div>

    {/* '+ -'按鈕 */}
    <div className={styles.detailNumber}>
        <button className={styles.detailNumberButton}>-</button>
        <div className={styles.detailNumberShow}>1</div>
        <button className={styles.detailNumberButton}>+</button>
    </div>

    {/* 收藏 加入購物車 */}
    <div style={{display:'flex', marginTop:'20px',marginLeft:'115px',color:'#A32C2D',fontSize:'30px'}}>

    <FiHeart  className={styles.detailHeartIcon}/>

    <button className={styles.addCartButton}>加入購物車</button>

    <button className={styles.immediateBuyButton}>立即購買</button>

    </div>

    {/* 虛線 */}
   <div className={styles.detailDashed}></div>

   <div className={styles.ingredientText}>成分</div>

    {/* 成分 */}
    <div className={styles.detailIngredient}>含有：麵粉、麵粉、雞蛋、鹽</div>

    <IoIosArrowDown className={styles.ingredientDown1}  />

    {/* 實線 */}
    <div className={styles.detailSolid}></div>

         
          <div className={styles.nutritionIngredient}>是否有營養成分表</div>
        <IoIosArrowDown className={styles.ingredientDown2}/>
        

       </div>

    </div>

    <FiHeart  className={styles.detailProductCollect}/>
    </>
 
  );
};

export default ProductDetailCard;