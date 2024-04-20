import Section from '@/components/layout/section'
import React, { createContext, useContext } from 'react'
import Image from 'next/image'
import styles from '@/styles/Order.module.css'
import { IoSearchOutline } from "react-icons/io5";
import { FaShopify } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { Container, Row, Col } from 'react-bootstrap';



export default function Order() {
  return (
    <>
     
        <Section  >
        {/* 最外層容器 */}
        <div class={styles.outerFrame } style={{height:'2100px'}}>
            <h2 className={styles.orderTitle}>【 結帳頁面 】</h2>

            {/* 步驟紅色邊框 */}
            <div className={styles.stepBorder}>
                
                  {/* 步驟圓圈&長條 */}
                  <div className="container" >
                  <div className={styles.step1} style={{marginTop:'60px',marginLeft:'293px'}}>1</div>
                  <div className={styles.connect2}></div>
                  <div className={styles.step1}>2</div>
                  <div className={styles.connect2}></div>
                  <div className={styles.step1}>3</div>
                  <div className={styles.connect1}></div>
                  <div className={styles.step2}>4</div>
                </div>
                  <br />

                  {/* 步驟文字 */}
                  <div className={styles.textContainer}>
                    <div className={styles.step1Text} style={{marginTop:'50px',marginLeft:'435px'}}>訂單資訊</div>
                    <div className={styles.step1Text} style={{marginTop:'50px',marginLeft:'120px'}}>訂單優惠</div>
                    <div className={styles.step1Text} style={{marginTop:'50px',marginLeft:'125px'}}>付款方式</div>
                    <div className={styles.step2Text} style={{marginTop:'50px',marginLeft:'145px'}}>完成</div>
                    {/* textContainer */}
                  </div>
                 
            </div>

           {/* 訂單詳細 紅色邊框 */}
          <div className={styles.orderBorder} style={{height:'1180px'}}>

           {/* 訂單詳細 外層容器 */}
            <div className={styles.orderContainer} style={{height:'714px'}}>
             
             
             {/*訂單詳細 */}
             <div className={styles.orderDetail}>
             <Image src="/images/鹹酥雞.jpg" width={100} height={100}
              className={styles.orderPicture} style={{marginTop:'25px'}} 
             />
  
                <div className={styles.productText}>海苔雞排</div>
            
             <div>
                <div className={styles.applyDiscount}>Size: medium, Material: 珍珠、鮮奶、伊斯蘭卡紅茶</div>
                <div className={styles.applyDiscount}>優惠:滿十送一</div>
             </div>

            <div className={styles.buyText}>購買數量: 5</div>
           

             <div className={styles.productText} style={{marginBottom:'12px'}}>$80</div>

         


             </div>

             <hr/>

             <div className={styles.orderDetail}>
             <Image src="/images/鹹酥雞.jpg" width={100} height={100}
              className={styles.orderPicture}  
             />
  
                <div className={styles.productText}>海苔雞排</div>
            
             <div>
                <div className={styles.applyDiscount}>Size: medium, Material: 珍珠、鮮奶、伊斯蘭卡紅茶</div>
                <div className={styles.applyDiscount}>優惠:滿十送一</div>
             </div>

            <div className={styles.buyText}>購買數量: 5</div>
           

             <div className={styles.productText} style={{marginBottom:'12px'}}>$80</div>

         


             </div>

             <hr/>

             <div className={styles.orderDetail}>
             <Image src="/images/鹹酥雞.jpg" width={100} height={100}
              className={styles.orderPicture}  
             />
  
                <div className={styles.productText}>海苔雞排</div>
            
             <div>
                <div className={styles.applyDiscount}>Size: medium, Material: 珍珠、鮮奶、伊斯蘭卡紅茶</div>
                <div className={styles.applyDiscount}>優惠:滿十送一</div>
             </div>

            <div className={styles.buyText}>購買數量: 5</div>
           

             <div className={styles.productText} style={{marginBottom:'12px'}}>$80</div>

         


             </div>

             <hr/>

             <div className={styles.orderDetail}>
             <Image src="/images/鹹酥雞.jpg" width={100} height={100}
              className={styles.orderPicture}  
             />
  
                <div className={styles.productText}>海苔雞排</div>
            
             <div>
                <div className={styles.applyDiscount}>Size: medium, Material: 珍珠、鮮奶、伊斯蘭卡紅茶</div>
                <div className={styles.applyDiscount}>優惠:滿十送一</div>
             </div>

            <div className={styles.buyText}>購買數量: 5</div>
           

             <div className={styles.productText} style={{marginBottom:'12px'}}>$80</div>

         


             </div>

             <hr/>

             <div className={styles.orderDetail}>
             <Image src="/images/鹹酥雞.jpg" width={100} height={100}
              className={styles.orderPicture}  
             />
  
                <div className={styles.productText}>海苔雞排</div>
            
             <div>
                <div className={styles.applyDiscount}>Size: medium, Material: 珍珠、鮮奶、伊斯蘭卡紅茶</div>
                <div className={styles.applyDiscount}>優惠:滿十送一</div>
             </div>

            <div className={styles.buyText}>購買數量: 5</div>
           

             <div className={styles.productText} style={{marginBottom:'12px'}}>$80</div>

         


             </div>
             <hr/>

          {/* 結帳金額 */}
             <div style={{marginLeft:'1000px',display:'flex'}}>
                <div className={styles.amountText}>金額:</div>
                <div className={styles.amount}>$1403.00</div>
             </div>

            {/* 折扣金額 */}
             <div style={{marginLeft:'1000px',display:'flex'}}>
                <div className={styles.discountText}>折扣:</div>
                <div className={styles.discountAmount}>-$14.00</div>
             </div>

            {/* 點數折扣 */}
             <div style={{marginLeft:'1000px',display:'flex'}}>
                <div className={styles.pointText}>點數折扣:</div>
                <div className={styles.usePoint}>使用點數</div>
             </div>

             {/* 總金額 */}
             <div style={{display:'flex'}}>
               <h1 className={styles.sumText}>總金額:</h1>
               <h1 className={styles.sumTotal}>1403.00</h1>
             </div>
             

              {/* orderContainer */}
            </div>

            
           







   

 
            {/* orderBorder */}
          </div>
          
          {/* 付款方式 */}
          <div className={styles.orderBorder} style={{height:'300px'}}>
              <h3 className={styles.orderTitle}>【 選擇支付方式 】</h3>

         <div style={{display:'flex'}}>
                          {/* 711繳費 */}
                          <div className={styles.payment}  style={{display:'flex',marginLeft:'80px'}}>
                    <Image src="/images/7-11.png" width={30} height={30}/>
                    <p className={styles.paymentText}>711繳費</p>
                    </div>

              {/* linePay繳費 */}
                 <div className={styles.payment}  style={{display:'flex',marginLeft:'80px'}}>
                    <Image src="/images/line.jpg" width={30} height={30}/>
                    <p className={styles.paymentText}>LINE繳費</p>
                    </div>

              {/* linePay繳費 */}
                <div className={styles.payment}  style={{display:'flex',marginLeft:'80px'}}>
                    <Image src="/images/applePay.png" width={40} height={30}/>
                    <p className={styles.paymentText} style={{marginLeft:'35px'}}>APPLEPay繳費</p>
                    </div>

              {/* linePay繳費 */}
             <div className={styles.payment}  style={{display:'flex',marginLeft:'80px'}}>
                    <Image src="/images/ecpay.png" width={30} height={30}/>
                    <p className={styles.paymentText}>ECPay繳費</p>
                    </div>



         </div>

              
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
