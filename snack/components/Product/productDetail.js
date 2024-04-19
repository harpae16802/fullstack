import React from 'react';
import Image from 'next/image';
import { FiHeart } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import styles from '@/styles/Product.module.css'; // 確保引入了正確的樣式文件
import { RxCross1 } from "react-icons/rx";

const ProductDetailCard = () => {
  return (
    <>
        <div style={{width:'1518px',height:'726px',borderRadius:'20px',backgroundColor:'#fff',display:'flex'}}>

<Image src="/images/蛋塔.jpg" width={759} height={726} style={{borderRadius:'20px 0px 0px 20px'}}/>

  <div style={{display:'flex',flexDirection:'column'}}>

    <RxCross1 style={{color:'#A32C2D', fontSize:'28px',fontWeight:'bolder',marginTop:'20px',marginLeft:'700px'}}/>


     <div style={{width:'150px',height:'35px', color:'#fff', backgroundColor:'#A32C2D',marginTop:'50px',marginLeft:'100px',paddingTop:'3px',paddingLeft:'15px',fontWeight:'bold',fontSize:'20px'}}>姊姊抓的餅</div>

     <div style={{width:'110px',height:'35px', color:'#fff', backgroundColor:'#A32C2D',marginTop:'10px',marginLeft:'100px',paddingTop:'3px',paddingLeft:'15px',fontWeight:'bold',fontSize:'20px'}}>豬排蛋</div>

    <div style={{width:'421px',marginTop:'15px', marginLeft:'115px',fontWeight:'bolder'}}>香噴噴的炸豬排，外酥內嫩，蛋汁滑嫩地流淌出來，與香氣四溢的抓餅完美融合。一口咬下，豬排的鮮美與蛋的滑嫩在口中交融，配上外皮香脆的抓餅，彷彿是一場口感盛宴，勾勒出濃郁的台灣街頭味道。</div>

    <div style={{fontSize:'28px',color:'#A32C2D',marginTop:'20px',marginLeft:'115px'}}>$70</div>

    {/* '+ -'按鈕 */}
    <div style={{display:'flex',marginTop:'10px',marginLeft:'115px'}}>
        <button className={styles.gbButton}>-</button>
        <div className={styles.gbButton} style={{paddingTop:'6px'}}>1</div>
        <button className={styles.gbButton}>+</button>
    </div>

    {/* 收藏 加入購物車 */}
    <div style={{display:'flex', marginTop:'20px',marginLeft:'115px',color:'#A32C2D',fontSize:'30px'}}>

    <FiHeart />

    <button className={styles.wbButton} style={{fontSize:'16px',width:'140px', height:'32px',marginLeft:'30px'}}>加入購物車</button>

    <button className={styles.rbButton} style={{fontSize:'16px',width:'140px', height:'32px',marginLeft:'15px'}}>立即購買</button>

    </div>

    {/* 虛線 */}
   <div style={{width:'580px',marginTop:'32px',marginLeft:'110px',borderBottom:'dashed 1px #000'}}></div>

    {/* 成分 */}
    <div style={{marginTop:'15px',marginLeft:'115px',fontWeight:'bold'}}>含有：麵粉、麵粉、雞蛋、鹽</div>

    {/* 實線 */}
    <div style={{width:'580px',marginTop:'16px',marginLeft:'110px',borderBottom:'solid 2px #E5E1DD'}}></div>

    <div style={{display:'flex',marginTop:'16px',marginLeft:'115px'}}>
        <div style={{fontSize:'16px',fontWeight:'bold'}}>是否有營養成分表</div>
        <IoIosArrowDown style={{marginTop:'3px',marginLeft:'410px',fontSize:'20px'}}/>
    </div>

  </div>

        </div>
    </>
 
  );
};

export default ProductDetailCard;