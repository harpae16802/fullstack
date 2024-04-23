import Section from '@/components/layout/section'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '@/styles/Product.module.css'
import SearchBar from '@/components/common/search-bar'
import { IoIosArrowDown } from "react-icons/io";
import  PopularProduct  from '@/components/Product/popularProduct';
import ProductItem from '@/components/Product/recommendProduct';
import DiscountInformation from '@/components/Product/discountInformation';
import CategoryItem from '@/components/Product/productCategory'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import style from '../nightmarket-info/nightmarket-info.module.scss'
import CategoryCard from '@/components/nightmarket-info/category/category-card'

import { MARKET_SELLER } from '@/components/config/api-path'

// import { Container, Row, Col } from 'react-bootstrap';



export default function Product() {

  // 食物分類，寫死
  const categories = [
    {
      imgUrl: '/images/category-main.png',
      title: '主食',
      imgStyle: { top: '-50px', left: '-56px' },
    },
    {
      imgUrl: '/images/category-snack.png',
      title: '小吃',
      imgStyle: { top: '-60px', left: '-56px' },
    },
    {
      imgUrl: '/images/category-soup.png',
      title: '湯品',
      imgStyle: { top: '-30px', left: '-64px' },
    },
    {
      imgUrl: '/images/category-sweet.png',
      title: '甜品',
      imgStyle: { top: '-50px', left: '-56px' },
    },
    {
      imgUrl: '/images/category-saltynacks.png',
      title: '點心',
      imgStyle: { top: '-46px', left: '-50px' },
    },
    {
      imgUrl: '/images/category-drink.png',
      title: '飲料',
      imgStyle: { top: '-40px', left: '-52px' },
    },
  ]

  const router = useRouter()
  const { market_id } = router.query
  const { data } = router.query

  useEffect(() => {
    // 因為 market_id 是固定的，這裡不再檢查它的值
    fetch(`${MARKET_SELLER}/1`) // 直接使用市場ID為1
      .then((r) => r.json())
      .then((data) => {
        setFeaturedShops(data.slice(0, 3)) // 只取前三個作為特色商家
        setAllShops(data) // 設置所有商家的數據
      })
      .catch((error) => {
        console.error('獲取商家數據失敗:', error)
      })
  }, [])



  return (
    <>
      <Section>


      <div className="">
        <SearchBar /> 
      </div>
      
      {/* 產品類型 */}

      <div className={`row ${style.content}`}>

      <div className={`col ${style.category}`}>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`col-xs-6 col-md-2 d-flex justify-content-center ${style.categoryCard}`}
            >
              <CategoryCard {...category} />
            </div>
          ))}
        </div>

      {/* <div className="container">

        <div className={`row ${styles.categoryPicInterval}`} >

        <div className="col-2"><CategoryItem /></div>
        <div className="col-2"><CategoryItem /></div>
        <div className="col-2"><CategoryItem /></div>
        <div className="col-2"><CategoryItem /></div>
        <div className="col-2"><CategoryItem /></div>
        <div className="col-2"><CategoryItem /></div>

        </div>

      </div> */}

      

      <button className={styles.filterConditionButton}>篩選條件 <IoIosArrowDown className={styles.filterIcon}/></button>

      {/* 熱門商品 */}
    <div className="container-fluid row">

      <div className={`col ${styles.popularContainer}`}>

      {Array(4)
        .fill(null)
        .map((v,i) => {
          return (
            <div key={i} className='d-flex'>
            <PopularProduct 
              imageUrl = "/images/大腸麵線.jpg"
              saleRanking="No1"
              market = "三和夜市"
              seller = "壺茶車"
              product = "蛤蠣湯"
            />
            </div>
          )
        })}

          {/* <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide className="col-12 col-md-3"><PopularProduct /></SwiperSlide>
          <SwiperSlide className="col-12 col-md-3"><PopularProduct /></SwiperSlide>
          <SwiperSlide className="col-12 col-md-3"><PopularProduct /></SwiperSlide>
          <SwiperSlide className="col-12 col-md-3"><PopularProduct /></SwiperSlide>
          
          </Swiper> */}

          {/* <div className="col-12 col-md-3"><PopularProduct /></div>
          <div className="col-12 col-md-3"><PopularProduct /></div>
          <div className="col-12 col-md-3"><PopularProduct /></div>
          <div className="col-12 col-md-3"><PopularProduct /></div> */}

          </div>

    </div>
     

   
      {/* 推薦餐點 */}
  <div className={`container-fluid row ${styles.recommendOuter}`} >

  <h4 className={styles.recommendTitle}>今天想減肥</h4>

    <div className={`col ${styles.recommendContainer}`}>
     
      {/* 第一行 */}
     {Array(3)
      .fill(null)
      .map((v,i) => {
        return (
          <div key={i} className='d-flex'>
          <ProductItem 
            imageUrl = "/images/鹹酥雞.jpg"
            productName = "海鮮廣東粥"
            score = "4.7"
          />
          </div>
        )
      })}

       </div>

    {/* 第二行 */}
  
  <h4 className={styles.recommendTitle} style={{marginTop:'90px'}}>今天想減肥</h4>
  
    <div className={`col ${styles.recommendContainer}`}>
     
      {/* 第一行 */}
     {Array(3)
      .fill(null)
      .map((v,i) => {
        return (
          <div key={i} className='d-flex'>
          <ProductItem 
            imageUrl = "/images/鹹酥雞.jpg"
            productName = "海鮮廣東粥"
            score = "4.7"
          />
          </div>
        )
      })}

       </div>


    
    {/* 第三行 */}
    <h4 className={styles.recommendTitle} style={{marginTop:'90px'}}>今天想減肥</h4>
  
  <div className={`col ${styles.recommendContainer}`}>
   
 
   {Array(3)
    .fill(null)
    .map((v,i) => {
      return (
        <div key={i} className='d-flex'>
        <ProductItem 
          imageUrl = "/images/鹹酥雞.jpg"
          productName = "海鮮廣東粥"
          score = "4.7"
        />
        </div>
      )
    })}

     </div>


        <div className='col' style={{marginTop:'-930px',marginLeft:'48px'}}>
          {/* 優惠資訊 */}

          <div className='d-flex row'>

          {Array(2)
          .fill(null)
          .map((v,i) => {
            return(
              <div key={i} className=''>
              <DiscountInformation
               imageUrl="/images/優惠.png"
           />
              </div>
              
            )
          })}

          </div>
          
        </div>
      
      </div>

        </div>
      </Section>
    </>
  )
}
