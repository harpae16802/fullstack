import Section from '@/components/layout/section'
import React, { createContext, useContext, useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '@/styles/Order.module.css'
import { MdArrowBackIosNew } from 'react-icons/md'
import { MdArrowForwardIos } from 'react-icons/md'
import OrderDetailItem from '@/components/Order/order1Seller'
import DiscountContentItem from '@/components/Order/addPurchaseProduct'
import CheckoutProduct from '@/components/Order/checkoutProduct'
import { useAuth } from '@/contexts/custom-context'
import { CARTITEM } from '../../pages/seller-basic-data/config'

export default function Order() {
  // 取得狀態
  const { auth } = useAuth()

  // 儲存目前選購狀態
  const [selectedSeller, setSelectedSeller] = useState(null)
  const [groupedItems, setGroupedItems] = useState({})

  // 購物車第一步篩選出的資料
  const [selectedItems, setSelectedItems] = useState([])

  // 設定進度條
  const [step, setStep] = useState(1)

  // 從購物車組件中拿取產品資廖
  useEffect(() => {
    if (selectedSeller) {
      setSelectedItems(groupedItems[selectedSeller])
    }
  }, [selectedSeller, groupedItems])

  // 儲存第一步的資料
  const handleSelectSeller = (seller) => {
    setSelectedSeller(seller)
    setSelectedItems(groupedItems[seller])
  }

  // 設定進度條
  const handleNext = () => {
    if (step === 1 && !selectedSeller) {
      alert('請先選擇一個賣家進行結帳！')
      return
    }

    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  // 自動跳轉
  const handleSelectItems = (items) => {
    setSelectedItems(items) // 保存選擇的商品資料
    setStep(2) // 移動到下一步
  }

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
              <div className={step >= 1 ? styles.step1 : styles.stepUndo}>
                1
              </div>
              <div className={styles.connectGrey}></div>
              <div className={step >= 2 ? styles.step1 : styles.stepUndo}>
                2
              </div>
              <div className={styles.connectGrey}></div>
              <div className={step >= 3 ? styles.step1 : styles.stepUndo}>
                3
              </div>
            </div>

            <br />

            {/* 步驟文字 */}
            <div className={styles.textContainer}>
              <div className={styles.step1Text}>訂單資訊</div>
              <div className={styles.step2UndoText}>訂單優惠</div>
              <div className={styles.step3UndoText}>完成</div>
            </div>
          </div>

          {/* 訂單詳細 紅色邊框 */}
          <div className={styles.orderBorder}>
            {/* 訂單詳細 外層容器 */}
            <div className={` mt-5 ${styles}`}>
              {step === 1 && (
                <OrderDetailItem
                  onCheckout={setSelectedItems}
                  onSelectSeller={handleSelectSeller}
                  onGroupedItemsChange={setGroupedItems}
                />
              )}
            </div>

            <br />

            {/* 訂單詳細 外層容器 */}
            <div className={styles.order1Container}>
              {step === 2 && <DiscountContentItem items={selectedItems} />}
            </div>

            <br />

            {/* 訂單詳細 外層容器 */}
            <div className={styles.order1Container}>
              {/* {step === 3 && <CheckoutProduct />} */}
            </div>

            <h2 className={styles.discountTitle}>【優惠加購】</h2>

            {/* 優惠加購:產品列容器*/}
            <div className={styles.discountContainer}>
              <MdArrowBackIosNew className={styles.leftArrow} />

              <div className={styles.discountArrangement}>
                {/* 優惠加購:產品內容1 */}
                <DiscountContentItem
                  seller="姊姊抓的餅"
                  product="豬排蛋"
                  imageUrl="/images/蛋塔.jpg"
                  price="70"
                />

                {/* 優惠加購:產品內容2 */}
                <DiscountContentItem
                  seller="姊姊抓的餅"
                  product="豬排蛋"
                  imageUrl="/images/蛋塔.jpg"
                  price="70"
                />

                {/* 優惠加購:產品內容3 */}
                <DiscountContentItem
                  seller="姊姊抓的餅"
                  product="豬排蛋"
                  imageUrl="/images/蛋塔.jpg"
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={styles.previousButton} onClick={handleBack}>
              上一步
            </div>
            <div className={styles.nextButton} onClick={handleNext}>
              下一步
            </div>
          </div>
          {/* outerFrame */}
        </div>
      </Section>
    </>
  )
}
