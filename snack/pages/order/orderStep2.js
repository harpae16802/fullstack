import Section from '@/components/layout/section'
import React from 'react'
import Image from 'next/image'
import styles from '@/styles/Order.module.css'
import OrderCheck from '@/components/Order/orderCheck2'
import AmountCal from '@/components/Order/amountCal'

export default function Order() {
  return (
    <Section>
      {/* 最外層容器 */}
      <div className={styles.outerFrame}>
        <h2 className={styles.orderTitle}>【 結帳頁面 】</h2>

        <div className={styles.stepBorder}>
          {/* 步驟圓圈&長條 */}
          <div className="container">
            <div className={styles.step1}>1</div>
            <div className={styles.connectRed}></div>
            <div className={styles.step2}>2</div>
            <div className={styles.connectGrey}></div>
            <div className={styles.stepUndo}>3</div>
          </div>

          <br />

          {/* 步驟文字 */}
          <div className={styles.textContainer}>
            <div className={styles.step1Text}>訂單資訊</div>
            <div className={styles.step2Text}>訂單優惠</div>
            <div className={styles.step3UndoText}>完成</div>
          </div>
        </div>

        {/* 訂單詳細 紅色邊框 */}
        <div className={styles.orderBorder}>
          {/* 訂單詳細 外層容器 */}
          <div className={styles.order2Container}>
            {/* 訂單詳細 */}
            {Array(5)
              .fill(null)
              .map((v, i) => {
                return (
                  <div key={i} className="col">
                    <OrderCheck
                      imageUrl="/images/鹹酥雞.jpg"
                      product="海苔雞排"
                      size="medium"
                      material="珍珠、鮮奶、伊斯蘭卡紅茶"
                      discount="滿十送一"
                      quantity="5"
                      price="80"
                    />
                  </div>
                )
              })}

            <AmountCal payment="1403" discount="14" total="1403" />
          </div>
        </div>

        {/* 付款方式 */}
        <div className={styles.paymentMethodBorder}>
          <h3 className={styles.orderTitle}>【 選擇支付方式 】</h3>

          <div className={styles.methodFlex}>
            {/* 711繳費 */}
            <div className={styles.payment}>
              <Image
                src="/images/7-11.png"
                width={30}
                height={30}
                className={styles.methodImage}
                alt="711繳費"
              />
              <p className={styles.paymentText}>711繳費</p>
            </div>

            {/* linePay繳費 */}
            <div className={styles.payment}>
              <Image
                src="/images/line.jpg"
                width={30}
                height={30}
                className={styles.methodImage}
                alt="LINE繳費"
              />
              <p className={styles.paymentText}>LINE繳費</p>
            </div>

            {/* applePay繳費 */}
            <div className={styles.payment}>
              <Image
                src="/images/applePay.png"
                width={40}
                height={30}
                className={styles.methodImage}
                alt="APPLEPay繳費"
              />
              <p
                className={styles.paymentText}
                style={{ marginLeft: '35px' }}
              >
                APPLEPay繳費
              </p>
            </div>

            {/* ECPay繳費 */}
            <div className={styles.payment}>
              <Image
                src="/images/ecpay.png"
                width={30}
                height={30}
                className={styles.methodImage}
                alt="ECPay繳費"
              />
              <p className={styles.paymentText}>ECPay繳費</p>
            </div>
          </div>
        </div>

        {/* '上一步 下一步'按鈕 */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={styles.previousButton}>上一步</div>
          <div className={styles.nextButton}>下一步</div>
        </div>
      </div>
    </Section>
  )
}
