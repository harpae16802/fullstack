// pages/order/orderStep3.js 訂單詳細頁面
import Section from '@/components/layout/section'
import React, { useState, useEffect } from 'react'
import styles from '@/styles/Order.module.css'
import axios from 'axios'
import ConsumerInfo from '@/components/Order/consumerInfo'
import { usePayment } from '@/contexts/PaymentContext'
import OrderLastCheck from '@/components/Order/orderLastCheck'
import { CARTITEM, IMGROUTER } from '../seller-basic-data/config'

export default function OrderF() {
  // 定義要接收的組件狀態
  const [paymentData, setPaymentData] = useState({
    items: [],
    selectedDiscount: null,
    finalAmount: 0,
    pointsReduction: 0,
    totalAmount: 0,
    remainingPoints: 0,
  })

  // 拿取 第二部結帳的 組件的資料
  useEffect(() => {
    const data = localStorage.getItem('paymentData')
    if (data) {
      const parsedData = JSON.parse(data)
      parsedData.items = parsedData.items 
      setPaymentData(parsedData)
      console.log(parsedData)
      if (parsedData.items.length > 0) {
        handleOrderCheckout(
          parsedData.items,
          parsedData.customId,
          [parsedData.selectedDiscount],
          parsedData.pointsReduction
        )
      }
    }
  }, [])

  // 將數據注入資料庫 order_data
  const handleOrderCheckout = async (
    items,
    customId,
    discounts,
    pointsUsed
  ) => {
    try {
      // 生成隨機訂單編號
      const orderNumber = Math.floor(100000 + Math.random() * 900000) // 生成 6 位數的隨機數字

      // 其他訂單相關數據
      const totalAmount = items.reduce((acc, item) => acc + item.total_price, 0)
      const discountId = discounts.length ? discounts[0].id : null

      // 發送訂單信息到 order_data
      const orderDataResponse = await axios.post(`${CARTITEM}order_data`, {
        custom_id: customId,
        seller_id: items[0].seller_id,
        order_number: orderNumber,
        discount_category_id: discountId,
        consume_gamepoint: pointsUsed ? pointsUsed : 0,
        total_sum: totalAmount,
      })

      const orderId = orderDataResponse.data.order_id

      // 為每個產品創建訂單詳細信息
      const orderDetailsPromises = items.map((item) =>
        axios.post(`${CARTITEM}order_detail`, {
          order_id: orderId,
          product_id: item.product_id,
          purchase_quantity: item.quantity,
        })
      )

      await Promise.all(orderDetailsPromises)
      console.log('訂單提交成功！')

      // 清除 localStorage 中的 paymentData
      localStorage.removeItem('paymentData')

      // 在成功下單後清除購物車中的商品
      await handleClearCart(customId, items)
    } catch (error) {
      console.error('提交訂單時出現錯誤：', error)
    }
  }

  // 刪除購物車中的商品
  const handleClearCart = async (customId, items) => {
    try {
      // 從商品中提取產品ID
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
