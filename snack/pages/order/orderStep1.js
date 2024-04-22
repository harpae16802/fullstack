import Section from '@/components/layout/section'
import React, { createContext, useContext,useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '@/styles/Order.module.css'
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import OrderDetailItem from '@/components/Order/orderCheck1'
import DiscountContentItem from '@/components/Order/addPurchaseProduct'


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
   {/* bootstrap:手風琴(Accordion)   */}
  <div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
    {/* 按鈕1 */}
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne"
      style={{ backgroundColor: 'transparent', color: 'inherit' }}
      >
        Accordion Item #1
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
      <div class="accordion-body">
        {/* 顯示的內容1 */}
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>

  </div>


             {/* <OrderDetailItem/>  */}

            </div>

            <br/>
            {/* 訂單詳細 外層容器 */}
            <div className={styles.orderContainer}>
          
             <OrderDetailItem/> 

            </div>

            <br/>
 {/* 訂單詳細 外層容器 */}
 <div className={styles.orderContainer}>
          
          <OrderDetailItem/> 

         </div>

<h2 className={styles.discountTitle}>【優惠加購】</h2>



    {/* 優惠加購:產品列容器*/}
    <div className={styles.discountContainer}>
    
    <MdArrowBackIosNew className={styles.leftArrow}/>

    <div className={styles.discountArrangement}>

            {/* 優惠加購:產品內容1 */}
           <DiscountContentItem/> 

       {/* 優惠加購:產品內容2 */}
       <DiscountContentItem /> 

     {/* 優惠加購:產品內容3 */}
       <DiscountContentItem/> 

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
