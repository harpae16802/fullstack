// pages/order/orderStep1.js 總結帳頁面
import Section from '@/components/layout/section'
import React, { createContext, useContext, useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '@/styles/Order.module.css'
import OrderDetailItem from '@/components/Order/order1Seller'
import DiscountContentItem from '@/components/Order/addPurchaseProduct'
import { useAuth } from '@/contexts/custom-context'
import CheckoutProduct from '@/components/Order/checkoutProduct'
import { Modal, Button } from 'react-bootstrap'

export default function Order() {
  // 取得狀態
  const { auth } = useAuth()

  // 彈出視窗
  const [showAlertModal, setShowAlertModal] = useState(false)

  // 儲存目前選購狀態
  const [selectedSeller, setSelectedSeller] = useState(null)
  const [groupedItems, setGroupedItems] = useState({})

  // 第一步 篩選出的資料
  const [selectedItems, setSelectedItems] = useState([])

  // 第一步 狀態更新
  const [chosenSeller, setChosenSeller] = useState(null)

  // 第一步 狀態更新
  const [chosenItems, setChosenItems] = useState([])

  // 設定進度條
  const [step, setStep] = useState(1)

  // 從購物車組件中拿取產品資廖
  useEffect(() => {
    if (selectedSeller) {
      setSelectedItems(groupedItems[selectedSeller])
    }
    console.log('當前進度', step)
    console.log('選則的項目', selectedItems)
  }, [selectedSeller, groupedItems])

  // 儲存第一步的資料
  const handleSelectSeller = (seller, items) => {
    if (items.length > 0) {
      setChosenSeller(seller)
      setChosenItems(items)
    } else {
    }
  }

  // 設定進度條
  const handleNext = () => {
    console.log('Selected Seller: ', chosenSeller)
    console.log('Selected Items: ', selectedItems)
    if (!chosenSeller || selectedItems.length === 0) {
      setShowAlertModal(true)
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

              <div
                className={step >= 2 ? styles.connectRed : styles.connectGrey}
              ></div>

              <div className={step >= 2 ? styles.step2 : styles.stepUndo}>
                2
              </div>

              <div
                className={step >= 3 ? styles.connectRed : styles.connectGrey}
              ></div>
              <div className={step >= 3 ? styles.step2 : styles.stepUndo}>
                3
              </div>

              <br />
            </div>

            {/* 步驟文字 */}
            <div className={styles.textContainer}>
              <div className={step === 1 ? styles.step1Text : styles.step1Text}>
                訂單資訊
              </div>
              <div
                className={step >= 2 ? styles.step2Text : styles.step2UndoText}
              >
                訂單優惠
              </div>
              <div
                className={step === 3 ? styles.step3Text : styles.step3UndoText}
              >
                完成
              </div>
            </div>
          </div>

          {/* 訂單詳細 紅色邊框 */}
          <div className={styles.orderBorder}>
            {/* 訂單詳細 外層容器 */}
            <div className={` mt-5 ${styles}`}>
              {step === 1 && (
                <OrderDetailItem
                  onSelectSeller={handleSelectSeller}
                  onGroupedItemsChange={setGroupedItems}
                  setSelectedItems={setSelectedItems}
                />
              )}
            </div>
            <br />
            {/* 訂單詳細 外層容器 */}
            <div className={styles}>
              {step === 2 && <DiscountContentItem items={selectedItems} />}
            </div>
            <br />
            {/* 訂單詳細 外層容器 */}
            <div className={styles}>
              {/* {step === 3 && <CheckoutProduct />} */}
            </div>
            {/* 優惠加購*/}

            {/* 優惠加購 */}
          </div>

          {/* '上一步 下一步'按鈕 */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {step !== 1 && (
              <div className={styles.previousButton} onClick={handleBack}>
                上一步
              </div>
            )}
            {step !== 2 && (
              <div className={styles.nextButton} onClick={handleNext}>
                下一步
              </div>
            )}
          </div>
          <br></br>
          {/* outerFrame */}
        </div>

        {showAlertModal && (
          <Modal
            show={showAlertModal}
            onHide={() => setShowAlertModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>提示</Modal.Title>
            </Modal.Header>
            <Modal.Body>您還沒有選擇任何商品結帳喔~</Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => setShowAlertModal(false)}
              >
                關閉
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Section>
    </>
  )
}
