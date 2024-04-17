import Section from '@/components/layout/section'
import React, { createContext, useContext,useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '@/styles/Order.module.css'
import { IoSearchOutline } from "react-icons/io5";
import { FaShopify } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdTrash } from "react-icons/io";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { IoCart } from "react-icons/io5";
import { Container, Row, Col } from 'react-bootstrap';
import { useStepStyles } from './StyleContext';
import { StyleProvider } from './StyleContext';
import StepComponent from './StepComponent';




export default function Order() {
  return (
    <>
        <Section>
        {/* 最外層容器 */}
        <div class={styles.outerFrame}>
            <h2 className={styles.orderTitle}>【 結帳頁面 】</h2>

            {/* 步驟紅色邊框 */}
            <div className={styles.stepBorder}>
                
                  {/* 步驟圓圈&長條 */}
              <div className="container">
                  <div className={styles.step1} style={{marginTop:'60px',marginLeft:'293px'}}>1</div>
                  <div className={styles.connect1}></div>
                  <div className={styles.step2}>2</div>
                  <div className={styles.connect1}></div>
                  <div className={styles.step2}>3</div>
                  <div className={styles.connect1}></div>
                  <div className={styles.step2}>4</div>
              </div>
                  <br />

                  {/* 步驟文字 */}
                  <div className={styles.textContainer}>
                    <div className={styles.step1Text} style={{marginTop:'50px',marginLeft:'435px'}}>訂單資訊</div>
                    <div className={styles.step2Text} style={{marginTop:'50px',marginLeft:'120px'}}>訂單優惠</div>
                    <div className={styles.step2Text} style={{marginTop:'50px',marginLeft:'125px'}}>付款方式</div>
                    <div className={styles.step2Text} style={{marginTop:'50px',marginLeft:'145px'}}>完成</div>
                    {/* textContainer */}
                  </div>
                 
            </div>

    

           {/* 訂單詳細 紅色邊框 */}
          <div className={styles.orderBorder}>

           {/* 訂單詳細 外層容器 */}
            <div className={styles.orderContainer}>
             {/* 上層: 夜市 店家名稱 */}
              <div className={styles.marketCheckout}>
             {/* 夜市icon */}
              <FaShopify style={{ fontSize: '40px', position: 'relative', left: '50px', top: '10px' }} />

               <div className={styles.checkoutMarket}> 士林夜市</div> 
               <div className={styles.checkoutProduct}> 豪大雞排</div> 

               {/* '選此店結帳'按鈕 */}
               <div className={styles.checkoutButton}>選此店結帳</div>
               <IoIosArrowDown style={{
                color:'rgb(163, 44, 45)',
                fontSize:'34px',
                position: 'relative',
                left: '20px',
                top: '16px'
               }}/>
               
               {/* marketCheckout */}
              </div>
              <hr/>
             {/* 下層:訂單內的商品圖片 名稱 */}
             <div className={styles.orderDetail}>
             <Image src="/images/鹹酥雞.jpg" width={100} height={100}
              className={styles.orderPicture}
             />
             <div className={styles.productText}>海苔雞排</div>
             <div className={styles.productText}>$80</div>

            {/* 產品數量增減 */}
            <div className={styles.numberButton}>
             <div className={styles.productNumber}>-</div>
             <div className={styles.productNumber}>1</div>
             <div className={styles.productNumber}>+</div>
            </div>
             
             <div className={styles.removeButton}>移除
             <IoMdTrash className={styles.trashIcon}/>
             </div>


             </div>
             <hr/>
             <div className={styles.orderDetail}>
             <Image src="/images/鹹酥雞.jpg" width={100} height={100}
              className={styles.orderPicture}
             />
             <div className={styles.productText}>海苔雞排</div>
             <div className={styles.productText}>$80</div>

            {/* 產品數量增減 */}
            <div className={styles.numberButton}>
             <div className={styles.productNumber}>-</div>
             <div className={styles.productNumber}>1</div>
             <div className={styles.productNumber}>+</div>
            </div>
             
             <div className={styles.removeButton}>移除
             <IoMdTrash className={styles.trashIcon}/>
             </div>


             </div>

              {/* orderContainer */}
            </div>

            <br/>
            {/* 訂單詳細 外層容器 */}
            <div className={styles.orderContainerAdd}>
             {/* 上層: 夜市 店家名稱 */}
              <div className={styles.marketCheckout}>
             {/* 夜市icon */}
              <FaShopify style={{ fontSize: '40px', position: 'relative', left: '50px', top: '10px' }} />

               <div className={styles.checkoutMarket}> 士林夜市</div> 
               <div className={styles.checkoutProduct}> 豪大雞排</div> 

               {/* '選此店結帳'按鈕 */}
               <div className={styles.checkoutButton}>選此店結帳</div>
               <IoIosArrowDown style={{
                color:'rgb(163, 44, 45)',
                fontSize:'34px',
                position: 'relative',
                left: '20px',
                top: '16px'
               }}/>
               
               {/* marketCheckout */}
              </div>
              <hr/>
             {/* 下層:訂單內的商品圖片 名稱 */}
             <div className={styles.orderDetail}>
             <Image src="/images/鹹酥雞.jpg" width={100} height={100}
              className={styles.orderPicture}
             />
             <div className={styles.productText}>海苔雞排</div>
             <div className={styles.productText}>$80</div>

            {/* 產品數量增減 */}
            <div className={styles.numberButton}>
             <div className={styles.productNumber}>-</div>
             <div className={styles.productNumber}>1</div>
             <div className={styles.productNumber}>+</div>
            </div>
             
             <div className={styles.removeButton}>移除
             <IoMdTrash className={styles.trashIcon}/>
             </div>


             </div>
             <hr/>
             <div className={styles.orderDetail}>
             <Image src="/images/鹹酥雞.jpg" width={100} height={100}
              className={styles.orderPicture}
             />
             <div className={styles.productText}>海苔雞排</div>
             <div className={styles.productText}>$80</div>

            {/* 產品數量增減 */}
            <div className={styles.numberButton}>
             <div className={styles.productNumber}>-</div>
             <div className={styles.productNumber}>1</div>
             <div className={styles.productNumber}>+</div>
            </div>
             
             <div className={styles.removeButton}>移除
             <IoMdTrash className={styles.trashIcon}/>
             </div>


             </div>

              {/* orderContainer */}
            </div>

            <br/>
 {/* 訂單詳細 外層容器 */}
<div className={styles.orderContainerAdd}>
 {/* 上層: 夜市 店家名稱 */}
  <div className={styles.marketCheckout}>
 {/* 夜市icon */}
  <FaShopify style={{ fontSize: '40px', position: 'relative', left: '50px', top: '10px' }} />

   <div className={styles.checkoutMarket}> 士林夜市</div> 
   <div className={styles.checkoutProduct}> 豪大雞排</div> 

   {/* '選此店結帳'按鈕 */}
   <div className={styles.checkoutButton}>選此店結帳</div>
   <IoIosArrowDown style={{
    color:'rgb(163, 44, 45)',
    fontSize:'34px',
    position: 'relative',
    left: '20px',
    top: '16px'
   }}/>
   
   {/* marketCheckout */}
  </div>
  <hr/>
 {/* 下層:訂單內的商品圖片 名稱 */}
 <div className={styles.orderDetail}>
 <Image src="/images/鹹酥雞.jpg" width={100} height={100}
  className={styles.orderPicture}
 />
 <div className={styles.productText}>海苔雞排</div>
 <div className={styles.productText}>$80</div>

{/* 產品數量增減 */}
<div className={styles.numberButton}>
 <div className={styles.productNumber}>-</div>
 <div className={styles.productNumber}>1</div>
 <div className={styles.productNumber}>+</div>
</div>
 
 <div className={styles.removeButton}>移除
 <IoMdTrash className={styles.trashIcon}/>
 </div>


 </div>
 <hr/>
 <div className={styles.orderDetail}>
 <Image src="/images/鹹酥雞.jpg" width={100} height={100}
  className={styles.orderPicture}
 />
 <div className={styles.productText}>海苔雞排</div>
 <div className={styles.productText}>$80</div>

{/* 產品數量增減 */}
<div className={styles.numberButton}>
 <div className={styles.productNumber}>-</div>
 <div className={styles.productNumber}>1</div>
 <div className={styles.productNumber}>+</div>
</div>
 
 <div className={styles.removeButton}>移除
 <IoMdTrash className={styles.trashIcon}/>
 </div>


 </div>

  {/* orderContainer */}
</div>

<h2 className={styles.discountTitle}>【優惠加購】</h2>



    {/* 優惠加購:產品列容器*/}
    <div className={styles.discountContainer}>
    
    <MdArrowBackIosNew className={styles.leftArrow}/>

    <div className={styles.discountArrangement}>

            {/* 優惠加購:產品內容1 */}
            <div className={styles.discountContent}>
           <div className={styles.discountSeller}>姊姊抓的餅</div>
           
           <div className={styles.discountProduct}>豬排蛋</div>
           <Image src="/images/蛋塔.jpg" width={250} height={250}
            className={styles.discountPicture}
           />
           <div className={styles.priceAndCart}>
           <p className={styles.discountPrice}>$70</p>

            <div className={styles.addToCart}>加入購物車
            <IoCart style={{
              fontSize:27,
              paddingLeft:5,
              paddingBottom:3
            }}/>
            </div>

           </div>

           
          
        {/* discountContent */}
        </div>

    {/* 優惠加購:產品內容2 */}
        <div className={styles.discountContent}>
           <div className={styles.discountSeller}>姊姊抓的餅</div>
           
           <div className={styles.discountProduct}>豬排蛋</div>
           <Image src="/images/蛋塔.jpg" width={250} height={250}
            className={styles.discountPicture}
           />
           <div className={styles.priceAndCart}>
           <p className={styles.discountPrice}>$70</p>

            <div className={styles.addToCart}>加入購物車
            <IoCart style={{
              fontSize:27,
              paddingLeft:5,
              paddingBottom:3
            }}/>
            </div>

           </div>

           
          
        {/* discountContent */}
        </div>

     {/* 優惠加購:產品內容3 */}
     <div className={styles.discountContent}>
           <div className={styles.discountSeller}>姊姊抓的餅</div>
           
           <div className={styles.discountProduct}>豬排蛋</div>
           <Image src="/images/蛋塔.jpg" width={250} height={250}
            className={styles.discountPicture}
           />
           <div className={styles.priceAndCart}>
           <p className={styles.discountPrice}>$70</p>

            <div className={styles.addToCart}>加入購物車
            <IoCart style={{
              fontSize:27,
              paddingLeft:5,
              paddingBottom:3
            }}/>
            </div>

           </div>

           
          
        {/* discountContent */}
        </div>

        {/* discountArrangement */}
    </div>
    



      <MdArrowForwardIos className={styles.rightArrow} />

        {/* discountContainer */}
    </div> 

 
            {/* orderBorder */}
          </div>

       {/* '上一步 下一步'按鈕 */}
          <div style={{display:'flex',justifyContent:'center'}}>
            <div className={styles.previousButton}>上一步</div>
            <div className={styles.nextButton}>下一步</div>
          </div>

          {/* outerFrame */}
        </div>

        </Section>
    </>
  )
}
