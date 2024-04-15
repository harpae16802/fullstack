import Section from '@/components/layout/section'
import React from 'react'
import Image from 'next/image'
import styles from '@/styles/Setting.module.css'
import { IoSearchOutline } from "react-icons/io5";
import SearchBar from '@/components/common/search-bar'
import { FaThumbsUp } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

// '產品分類'元件
const CategoryItem = ({ imageUrl, categoryName }) => {
  return (
    <div className={styles.categoryImage}>
      <Image src={"/images/主食.png"} width={119} height={119} />
      <p style={{ fontSize: '16px' }}>{"主食"}</p>
    </div>
  );
};



// '熱銷商品'元件
const PopularProduct = ({ imageUrl, market,sellerName, productName, buttonText }) => {
  return (
    <div className={styles.popularProduct} style={{marginRight:'20px'}}>
      <div className={styles.popularInfo}>
        <Image src="/images/fire.png" width={43} height={55} style={{ marginTop: '-15px' }} />
        <div style={{ fontSize: '28px', color: 'rgb(163, 44, 45)', marginBottom: '7px', marginLeft: '8px' }}>本週熱銷</div>
        <div style={{ fontSize: '28px', color: 'rgb(163, 44, 45)', marginBottom: '7px', marginLeft: '8px', fontSize: '26px' }}>NO1</div>
      </div>
      <Image src={"/images/大腸麵線.jpg"} width={345} height={275} />
      <p style={{ fontSize: '16px', marginTop: '10px' }}>{"三和夜市"}</p>
      <p style={{ fontSize: '16px', marginTop: '-20px' }}>{"德記麵線"}</p>
      <div style={{ fontSize: '28px', marginTop: '-20px', color: 'rgb(0,0,0)' }}>{"大腸麵線"}<FaRegHeart style={{ fontWeight: 'bolder', marginBottom: '3px', marginLeft: '8px', color: 'rgb(163, 44, 45)' }} /></div>
      <br />
      <button className={styles.wbButton} style={{ width: '128px', height: '38px', border: 'solid 3px', marginLeft: '205px', marginTop: '-10px', fontSize: '16px' }}>{"看更多"}</button>
    </div>
  );
};

// '推薦商品'元件
const ProductItem = ({ imageUrl, productName, productScore }) => {
  return (
    <div  style={{marginLeft:'60px'}}>
      <Image src={"/images/鹹酥雞.jpg"} width={343} height={231} style={{
        borderRadius: '70px',
        border: 'solid 8px #fff',
        marginTop: '22px'
      }} />
      <div style={{ display: 'flex' }}>
        <p className={styles.recommendName}>{"海鮮廣東粥"}</p>
        <FiHeart style={{
          color: 'rgb(163, 44, 45)',
          fontSize: '26px',
          marginTop: '12px',
          marginLeft: '18px'
        }} />
        <div className={styles.productScore}>{"4.7"}</div>
      </div>
    </div>
  );
};

// '優惠資訊'元件
const DiscountInformation = () => {
  return (
    <div style={{ marginTop: '480px', marginLeft: '48px', position: 'relative' }}>
      <Image src="/images/優惠.png" width={329} height={314} className={styles.discountInformation} style={{ position: 'absolute' }} />
      <button className={styles.bbButton} style={{ width: '120px', height: '32px', marginBottom: '30px', position: 'absolute', top: '252px', left: '58px' }}>查看優惠</button>
    </div>
  );
};



export default function Product() {
  return (
    <>
      <Section>


      <div className="">
        <SearchBar /> 
      </div>
      
      {/* 產品類型 */}
      <div className={styles.categoryContainer} >
         <CategoryItem />

         <CategoryItem />

         <CategoryItem />

         <CategoryItem />

         <CategoryItem />

         <CategoryItem />

      </div>

      <button className={styles.rbButton} style={{width:'150px', height:'32px',paddingRight:'10px',marginLeft:'1050px'}}>篩選條件 <IoIosArrowDown style={{fontSize:'20px'}}/></button>

      {/* 熱門商品 */}
      <div className={styles.popularContainer}>
        <PopularProduct />
        <PopularProduct />
        <PopularProduct />
        <PopularProduct />
      </div>

      {/* 推薦餐點 */}
      <div className={styles.recommendContainer} style={{marginLeft:'150px'}}>
    <div style={{display:'flex', flexDirection:'column'}}>
    <div className={styles.recommendTitle}>今天想減肥</div>
      {/* 第一行 */}
     <div style={{display:'flex'}}>
      <ProductItem />
       <ProductItem  />
       <ProductItem  />
     </div>

    {/* 第二行 */}
    <div className={styles.recommendTitle} style={{marginTop:'80px'}}>今天想減肥</div>
    
     <div style={{display:'flex'}}>
      <ProductItem />
       <ProductItem  />
       <ProductItem  />
     </div>


    
    {/* 第三行 */}
    <div className={styles.recommendTitle} style={{marginTop:'80px'}}>今天想減肥</div>
    
    <div style={{display:'flex'}}>
     <ProductItem />
      <ProductItem  />
      <ProductItem  />
    </div>
    </div>

    <div>
       {/* 優惠資訊 */}
      <div style={{display:'flex', flexDirection:'column'}}>

       <DiscountInformation />
        <div style={{marginTop:'-45px'}}></div>
       <DiscountInformation />
      </div>
       

    </div>
      

      </div>



      </Section>
    </>
  )
}
