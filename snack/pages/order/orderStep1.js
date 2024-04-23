import Section from '@/components/layout/section'
import React, { createContext, useContext,useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '@/styles/Order.module.css'
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import OrderDetailItem from '@/components/Order/order1Seller'
import DiscountContentItem from '@/components/Order/addPurchaseProduct'
import Order1Seller from '@/components/Order/order1Seller'
import Order1Product from '@/components/Order/order1Product'


export default function Order() {
  return (
    <>
        <Section>
        {/* 最外層容器 */}
        <div class={styles.outerFrame}>
            <div className={styles.orderTitle}>【 結帳頁面 】</div>

            {/* 步驟紅色邊框 */}
            <div className={styles.stepBorder}>
                
                  {/* 步驟圓圈&長條 */}
              <div className="container">
                  <div className={styles.step1}>1</div>
                  <div className={styles.connectGrey}></div>
                  <div className={styles.stepUndo}>2</div>
                  <div className={styles.connectGrey}></div>
                  <div className={styles.stepUndo}>3</div>
              </div>

                  <br />

                  {/* 步驟文字 */}
                  <div className={styles.textContainer}>
                    <div className={styles.step1Text}>訂單資訊</div>
                    <div className={styles.step2UndoText}>訂單優惠</div>
                    <div className={styles.step3UndoText}>付款方式</div>
                  </div>
                 
            </div>

           {/* 訂單詳細 紅色邊框 */}
          <div className={styles.orderBorder}>

           {/* 訂單詳細 外層容器 */}
            <div className={styles.order1Container}>
   {/* bootstrap:手風琴(Accordion)   */}
  <div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
    {/* 按鈕1 */}
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne"
      style={{ backgroundColor: 'transparent', color: 'inherit',borderBottom:'solid 1px #B1B7B5' }}
      >
        <Order1Seller
         nightmarket = "士林夜市"
         seller = "豪大雞排"
        />
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne" data-bs-parent="#accordionPanelsStayOpenExample">
      <div class="accordion-body">
        {/* 顯示的內容1 */}
        <Order1Product
         imageUrl = "/images/鹹酥雞.jpg"
         product = "海苔雞排"
         price = "80"
         />

        <Order1Product
         imageUrl = "/images/鹹酥雞.jpg"
         product = "海苔雞排"
         price = "80"
         />
      </div>
    </div>
  </div>

  </div>

             {/* <OrderDetailItem/>  */}

            </div>

            <br/>
          
           {/* 訂單詳細 外層容器 */}
           <div className={styles.order1Container}>
   {/* bootstrap:手風琴(Accordion)   */}
  <div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
    {/* 按鈕1 */}
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo"
      style={{ backgroundColor: 'transparent', color: 'inherit',borderBottom:'solid 1px #B1B7B5' }}
      >
        <Order1Seller
         nightmarket = "士林夜市"
         seller = "豪大雞排"
        />
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo" data-bs-parent="#accordionPanelsStayOpenExample">
      <div class="accordion-body">
        {/* 顯示的內容1 */}
        <Order1Product
         imageUrl = "/images/鹹酥雞.jpg"
         product = "海苔雞排"
         price = "80"
         />

        <Order1Product
         imageUrl = "/images/鹹酥雞.jpg"
         product = "海苔雞排"
         price = "80"
         />
      </div>
    </div>
  </div>

  </div>

             {/* <OrderDetailItem/>  */}

            </div>

            <br/>

           {/* 訂單詳細 外層容器 */}
           <div className={styles.order1Container}>
   {/* bootstrap:手風琴(Accordion)   */}
  <div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
    {/* 按鈕1 */}
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree"
      style={{ backgroundColor: 'transparent', color: 'inherit',borderBottom:'solid 1px #B1B7B5' }}
      >
        <Order1Seller
         nightmarket = "士林夜市"
         seller = "豪大雞排"
        />
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingThree" data-bs-parent="#accordionPanelsStayOpenExample">
      <div class="accordion-body">
        {/* 顯示的內容1 */}
        <Order1Product
         imageUrl = "/images/鹹酥雞.jpg"
         product = "海苔雞排"
         price = "80"
         />

        <Order1Product
         imageUrl = "/images/鹹酥雞.jpg"
         product = "海苔雞排"
         price = "80"
         />
      </div>
    </div>
  </div>

  </div>

             {/* <OrderDetailItem/>  */}

            </div>

<h2 className={styles.discountTitle}>【優惠加購】</h2>



    {/* 優惠加購:產品列容器*/}
    <div className={styles.discountContainer}>
    
    <MdArrowBackIosNew className={styles.leftArrow}/>

    <div className={styles.discountArrangement}>

            {/* 優惠加購:產品內容1 */}
           <DiscountContentItem
            seller = "姊姊抓的餅"
            product = "豬排蛋"
            imageUrl = "/images/蛋塔.jpg"
            price="70"
           /> 

       {/* 優惠加購:產品內容2 */}
       <DiscountContentItem
            seller = "姊姊抓的餅"
            product = "豬排蛋"
            imageUrl = "/images/蛋塔.jpg"
            price="70"
           /> 

     {/* 優惠加購:產品內容3 */}
     <DiscountContentItem
            seller = "姊姊抓的餅"
            product = "豬排蛋"
            imageUrl = "/images/蛋塔.jpg"
            price="70"
           /> 

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
