// pages/order/orderStep3.js 訂單詳細頁面
import Section from '@/components/layout/section'
import React, { useState, useEffect } from 'react'
import styles from '@/styles/Order.module.css'
import axios from 'axios'
import { useAuth } from '../../contexts/custom-context'
import { CARTITEM } from '../seller-basic-data/config'
export default function OrderF() {
  const { auth } = useAuth()
  const customId = auth.custom_id
  console.log(customId)
  const [paymentData, setPaymentData] = useState({
    items: [],
    selectedDiscount: null,
    finalAmount: 0,
    pointsReduction: 0,
    remainingPoints: 0,
  })

  // 拿取 locastorage中的資料
  useEffect(() => {
    const data = localStorage.getItem('paymentData')
    if (data) {
      const parsedData = JSON.parse(data)
      setPaymentData(parsedData)
    }
  }, [])

  // 如果有資料 就發送請求到後端
  useEffect(() => {
    if (paymentData.items.length > 0 && customId) {
      handleOrderCheckout(
        paymentData.items,
        customId,
        paymentData.selectedDiscount,
        paymentData.pointsReduction
      )
    }
  }, [paymentData, customId])

  //  發送糗求到後端
  async function handleOrderCheckout(
    items,
    customId,
    selectedDiscount,
    pointsReduction
  ) {
    if (
      !customId ||
      !selectedDiscount ||
      !selectedDiscount.discount_category_id
    ) {
      console.error('Invalid data: ', { customId, selectedDiscount })
      return
    }

    try {
      const orderNumber = Math.floor(100000 + Math.random() * 900000)
      await axios.post(`${CARTITEM}order_data`, {
        custom_id: customId,
        seller_id: items[0].seller_id,
        order_number: orderNumber,
        discount_category_id: selectedDiscount.discount_category_id,
        consume_gamepoint: pointsReduction,
        total_sum: paymentData.finalAmount,
        items: items.map((item) => ({
          product_id: item.product_id,
          purchase_quantity: item.quantity,
        })),
      })
      console.log('訂單成功提交')
      await handleClearCart(customId, items)
    } catch (error) {
      console.error('提交訂單時出現錯誤：', error)
    }
  }

  async function handleClearCart(customId, items) {
    try {
      const productIds = items.map((item) => item.product_id)
      await axios.put(`${CARTITEM}cart/clear`, {
        custom_id: customId,
        product_ids: productIds,
      })
      console.log('購物車已經成功清除')
    } catch (error) {
      console.error('清除購物車該筆訂單出錯', error)
    }
  }

  return (
    <Section>
      <div className={styles.outerFrame} style={{ height: '1250px' }}>
        <h2 className={styles.orderTitle}>【 訂單明細 】</h2>
        <div className={styles.stepBorder}>
          <div className="container">
            <div className={styles.step1}>1</div>
            <div className={styles.connectRed}></div>
            <div className={styles.step2}>2</div>
            <div className={styles.connectRed}></div>
            <div className={styles.step2}>3</div>
          </div>
          <br />
          <div className={styles.textContainer}>
            <div className={styles.step1Text}>訂單資訊</div>
            <div className={styles.step2Text}>訂單優惠</div>
            <div className={styles.step3Text}>完成</div>
          </div>
        </div>

        {/* 表格 */}
        <div className={styles.outerFrame11}>
          <div className={styles.orderDetailContainer}>
            <div className={styles.orderHeader}>
              <p>訂單號碼：{paymentData.orderNumber}</p>
              <p>訂單日期：{paymentData.orderDate}</p>
            </div>
            <table className={styles.orderTable}>
              <thead>
                <tr>
                  <th>產品名稱</th>
                  <th>數量</th>
                  <th>單價</th>
                  <th>總價</th>
                </tr>
              </thead>
              <tbody>
                {paymentData.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.total_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.orderFooter1}>
              <p>總金額: {paymentData.finalAmount}</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={styles.nextButton} style={{ paddingTop: '3px' }}>
            回到主頁
          </div>
        </div>
      </div>
    </Section>
  )
}
