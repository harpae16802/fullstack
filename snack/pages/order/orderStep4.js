import Section from '@/components/layout/section'
import React, { createContext, useContext } from 'react'
import styles from '@/styles/Order.module.css'
import ConsumerInfo from '@/components/Order/consumerInfo'
import OrderLastCheck from '@/components/Order/orderLastCheck'

export default function Order() {
  return (
    <>
        <Section>
        {/* 最外層容器 */}
        <div class={styles.outerFrame } style={{height:'1250px'}}>
            <h2 className={styles.orderTitle}>【 結帳頁面 】</h2>

            {/* 步驟紅色邊框 */}
            <div className={styles.stepBorder}>
                
                {/* 步驟圓圈&長條 */}
            <div className="container">
                <div className={styles.step1}>1</div>
                <div className={styles.connectRed}></div>
                <div className={styles.step2}>2</div>
                <div className={styles.connectRed}></div>
                <div className={styles.step2}>3</div>
            </div>

                <br />

                {/* 步驟文字 */}
                <div className={styles.textContainer}>
                  <div className={styles.step1Text}>訂單資訊</div>
                  <div className={styles.step2Text}>訂單優惠</div>
                  <div className={styles.step3Text}>完成</div>
                </div>
               
          </div>

           {/* 訂單詳細 紅色邊框 */}
          <div className={styles.orderBorder}>

          <div className={styles.orderDetailText}>訂單詳細</div>

           {/* 訂單詳細 外層容器 */}
            <div className={styles.order4Container}>
            
             {/*買家資訊 文字 */}
  
              {/*買家資訊*/}
              <ConsumerInfo
                account = "Test123"
                orderId = "20240206280"
                orderDate = "2024-02-06"
                totalSum = "2800"
              />


              {/* 訂單詳細:列 */}
            <div style={{display:'flex',flexDirection:'column'}}>
                {/* 訂單詳細:行 */}
                <div style={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
                    <div className={styles.orderInformation1}>商品名稱</div>
                    <div className={styles.orderInformation2}>商品數量</div>
                    <div className={styles.orderInformation2} >商品價格</div>
                    <div className={styles.orderInformation2}>商品總價</div>
                </div>

                <OrderLastCheck
                   product = "雞排"
                   number = "5"
                   price = "120"
                   total = "600"
                />

                <OrderLastCheck
                   product = "雞排"
                   number = "5"
                   price = "120"
                   total = "600"
                />

                  <OrderLastCheck
                   product = "雞排"
                   number = "5"
                   price = "120"
                   total = "600"
                />

                  <OrderLastCheck
                   product = "雞排"
                   number = "5"
                   price = "120"
                   total = "600"
                />

                  <OrderLastCheck
                   product = "雞排"
                   number = "5"
                   price = "120"
                   total = "600"
                />


            </div>

              {/* orderContainer */}
            </div>

 
            {/* orderBorder */}
          </div>
          
       

       {/* '查看商品 繼續選購'按鈕 */}
          <div style={{display:'flex',justifyContent:'center'}}>
            <div className={styles.previousButton}>查看商品</div>
            <div className={styles.nextButton} style={{paddingTop:'3px'}}>繼續選購</div>
          </div>

          {/* outerFrame */}
        </div>

        </Section>
    </>
  )
}
