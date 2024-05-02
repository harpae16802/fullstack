// export default DiscountContentItem  結帳第二步 付款與優惠
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CARTITEM, BackEndPIMG,IMGROUTER } from '../../pages/seller-basic-data/config'
import styles from '@/styles/Order.module.css'
import { useAuth } from '@/contexts/custom-context'

const DiscountContentItem = ({ items = [] }) => {
  // 拿取custom_id
  const { auth } = useAuth()
  const customId = auth.custom_id

  // 折扣
  const [discounts, setDiscounts] = useState([])

  // 點數設置
  const [customPoints, setCustomPoints] = useState(0)

  // 是否使用點數
  const [usePoints, setUsePoints] = useState(false)

  // 從後端接收到的折扣信息，假定默認使用第一個折扣
  const [selectedDiscount, setSelectedDiscount] = useState(null)

  //  從購物車來的數據 (使用者想購買的商品 )
  useEffect(() => {
    if (items.length > 0 && items[0].seller_id) {
      const sellerId = items[0].seller_id
      fetchDiscounts(sellerId)
    }
  }, [items])

  // 點數
  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const { data } = await axios.get(`${CARTITEM}points/${customId}`)
        setCustomPoints(data.points)
      } catch (error) {
        console.error('拿取點數錯誤:', error)
      }
    }

    if (customId) {
      fetchPoints()
    }
  }, [customId])

  // 折扣
  useEffect(() => {
    if (discounts.length > 0) {
      setSelectedDiscount(discounts[0]) // 默認選擇第一個折扣
    }
  }, [discounts])

  // 折扣獲取
  const fetchDiscounts = async (sellerId) => {
    try {
      const response = await axios.get(`${CARTITEM}discounts/${sellerId}`)
      setDiscounts(response.data.discounts || [])
    } catch (error) {
      console.error('拿取折扣錯誤', error)
    }
  }
  
  // 付款完成 將資料 放入order_data 與 刪除購物車中的商品
  const handleCheckout = async () => {
    try {
      const orderResponse = await axios.post('/api/order/create', {
        seller_id: sellerId,
        custom_id: customId,
        discounts: selectedDiscounts,
        items: cartItems,
        usePoints,
        customPoints,
        totalAmount
      });
  
      if (orderResponse.data.success) {
        // 訂單創建成功，接下來刪除購物車內的商品
        const cartResponse = await axios.put('/api/cart/remove-purchased', {
          custom_id: customId,
          items: cartItems
        });
  
        if (cartResponse.data.success) {
          // 全部操作成功後的處理，例如導航到訂單確認頁面
          console.log('Checkout completed successfully');
        }
      }
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };
  // 計算訂單的總金額
  const totalAmount = items.reduce((acc, item) => acc + item.total_price, 0)

  // 折扣後的總金額計算
  const totalDiscountAmount = selectedDiscount ? selectedDiscount.discount : 0
  const pointsReduction = usePoints ? customPoints / 10 : 0 // 使用點數時才計算減少的金額
  const finalAmount = totalAmount - totalDiscountAmount - pointsReduction
  // 樣式-------------------------------------------------------

  // 商品的左側價格 數量 總價
  const orderItemTextStyle = {
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#333',
  }

  //  商品的右側價格 數量 總價
  const orderItemPriceStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    // color: '#FA541C'
  }

  // 整體排版
  const amountContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    marginTop: '20px',
  }
  // 結帳金額
  const amountStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#FA541C',
    fontWeight: 'bold',
  }

  const discountNameStyle = {
    color: '#FA541C',
  }

  // 樣式-------------------------------------------------------

  return (
    <div
      className="container"
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="row"
          style={{
            marginBottom: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            padding: '15px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="col">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image
                  src={`${IMGROUTER}${item.image_url}`}
                  alt={item.product_name}
                  width={100}
                  height={100}
                  unoptimized
                  objectFit="cover"
                  style={{
                    borderRadius: '10px',
                    objectFit: 'cover',
                    marginRight: '15px',
                  }}
                />
                <div style={orderItemTextStyle}>{item.product_name}</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div style={orderItemPriceStyle}>產品價格: ${item.price}</div>
                <div style={orderItemPriceStyle}>購買數量: {item.quantity}</div>
                <div style={amountStyle}>產品總價: ${item.total_price}</div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 結算部分 */}
      <div className="row">
        <div className="col">
          <div
            style={{
              ...amountContainerStyle,
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              padding: '15px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={orderItemTextStyle}>目前訂單金額:</div>
            <div style={amountStyle}>{totalAmount}</div>
          </div>

          {/* 使用者點數的部分 */}
          <div
            style={{
              ...amountContainerStyle,
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              padding: '15px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column', // 垂直排列
              alignItems: 'flex-start', // 左對齊
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <div style={orderItemTextStyle} >您目前持有的點數:</div>
              <div style={orderItemTextStyle} >{customPoints}</div>
            </div>
            <label>
              <input
                type="checkbox"
                checked={usePoints}
                onChange={(e) => setUsePoints(e.target.checked)}
                style={orderItemTextStyle}
              />{' '}
              使用您的遊戲點數來抵扣購買金額
            </label>
          </div>

          {/* 顯示選定的折扣 */}
          {selectedDiscount && (
            <div
              style={{
                ...amountContainerStyle,
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                padding: '15px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div style={orderItemTextStyle}>折扣名稱:</div>
              <div style={orderItemTextStyle}>{selectedDiscount.name}</div>
            </div>
          )}

          {/* 總金額 */}
          <div
            style={{
              ...amountContainerStyle,
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              padding: '15px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={amountStyle}>總金額:</div>
            <div style={amountStyle}>{Math.round(finalAmount)} </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscountContentItem
