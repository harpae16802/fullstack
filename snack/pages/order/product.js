import Section from '@/components/layout/section'
import React from 'react'
import Image from 'next/image'
import styles from '@/styles/Product.module.css'
import SearchBar from '@/components/common/search-bar'
import { IoIosArrowDown } from "react-icons/io";
import  PopularProduct  from '@/components/Product/popularProduct';
import ProductItem from '@/components/Product/recommendProduct';
import DiscountInformation from '@/components/Product/discountInformation';
import CategoryItem from '@/components/Product/productCategory'

// import { Container, Row, Col } from 'react-bootstrap';

export default function Product() {
  return (
    <>
      <Section>


      <div className="">
        <SearchBar /> 
      </div>
      
      {/* 產品類型 */}
      <div className="container">

        <div className={`row ${styles.categoryPicInterval}`} >

        <div className="col-2"><CategoryItem /></div>
        <div className="col-2"><CategoryItem /></div>
        <div className="col-2"><CategoryItem /></div>
        <div className="col-2"><CategoryItem /></div>
        <div className="col-2"><CategoryItem /></div>
        <div className="col-2"><CategoryItem /></div>

        </div>
      </div>
      

      <button className={styles.filterConditionButton}>篩選條件 <IoIosArrowDown className={styles.filterIcon}/></button>

      {/* 熱門商品 */}
    <div className="container-fluid">
      <div className={`row ${styles.popularContainer}`}>

          <div className="col-12 col-md-3"><PopularProduct /></div>
          <div className="col-12 col-md-3"><PopularProduct /></div>
          <div className="col-12 col-md-3"><PopularProduct /></div>
          <div className="col-12 col-md-3"><PopularProduct /></div>
          </div>

    </div>
     

   
      {/* 推薦餐點 */}
      <div className={`${styles.recommendContainer}`} style={{marginLeft:'150px'}}>
    <div style={{display:'flex', flexDirection:'column'}}>
    <div className={styles.recommendTitle}>今天想減肥</div>
      {/* 第一行 */}
     <div style={{display:'flex'}}>
      <ProductItem />
       <ProductItem  />
       <ProductItem  />
     </div>

    {/* 第二行 */}
    <div className={`${styles.recommendTitle}`} style={{marginTop:'80px'}}>今天想減肥</div>
    
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
