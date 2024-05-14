// export default DiscountContentItem  結帳第二步 付款與優惠
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CARTITEM,
  BackEndPIMG,
  IMGROUTER,
} from '../../pages/seller-basic-data/config'
import styles from '@/styles/Order.module.css'
import { useAuth } from '@/contexts/custom-context'
import { usePayment } from '@/contexts/PaymentContext'
import { Modal, Button } from 'react-bootstrap'

const DiscountContentItem = ({ items = [] }) => {
  // 拿取custom_id
  const { auth } = useAuth()
  const customId = auth.custom_id

  // const [ paymentData, setPaymentData ] = useState([]); 訂單詳細
  const [paymentData, setPaymentData] = useState({
    items: items,
    selectedDiscount: null,
    finalAmount: 0,
    pointsReduction: 0,
    totalAmount: 0,
    remainingPoints: 0,
  })

  // 折扣
  const [discounts, setDiscounts] = useState([])

  // 點數設置
  const [customPoints, setCustomPoints] = useState(0)

  // 是否使用點數
  const [usePoints, setUsePoints] = useState(false)

  // 從後端接收到的折扣信息，假定默認使用第一個折扣
  const [selectedDiscount, setSelectedDiscount] = useState(null)

  // 使用彈出視窗
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

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
        const { data } = await axios.get(`${CARTITEM}cart/${customId}`)
        setCustomPoints(data.sum)
        console.log(customPoints)
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
    console.log(discounts)
    
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

  // 結帳付款(發送請球)
  const handleLinePay = async () => {
    const currentTime = new Date().toISOString().replace(/\.\d+Z$/, '') + 'Z'
  
    
    const finalAmount = calculateFinalAmount();
  
    const linePayRequest = {
      amount: Math.round(finalAmount), 
      currency: 'TWD',
      orderId: `order${currentTime}`,
      packages: [
        {
          id: `package${currentTime}`,
          amount: Math.round(finalAmount), 
          products: [
            {
              name: 'Night Market Hunter Order',
              quantity: 1,
              price: Math.round(finalAmount),
            },
          ],
        },
      ],
      redirectUrls: {
        confirmUrl: 'http://localhost:3000/order/orderStep3',
        cancelUrl: 'http://localhost:3000/order/orderStep3',
      },
    }
  
    try {
      const response = await axios.post(
        'http://127.0.0.1:3002/backRoute/linePayBox',
        linePayRequest,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      console.log('LINE Pay Response:', response.data)
      handleLinePayResponse(response)
    
    } catch (error) {
      console.error('LINE Pay Request Error', error)
    }
  }
  
  //處裡付款(處裡回傳資料)
  const handleLinePayResponse = (response) => {
    const {
      returnCode,
      returnMessage,
      info: { paymentUrl, transactionId },
    } = response.data

    if (returnCode === '0000') {
      console.log('Success:', returnMessage)
      console.log('Transaction ID:', transactionId)
      const urlToOpen = paymentUrl.web

      // 當支付成功 將資料儲存在 locastorage
      updatePaymentData(selectedDiscount);
      
      window.open(urlToOpen, '_blank')
    } else {
      console.error('Error:', returnMessage)
    }
  }

  // 計算訂單的總金額
  const totalAmount = items.reduce((acc, item) => acc + item.total_price, 0)

  // 折扣後 與點數 的總金額計算
  const calculateFinalAmount = () => {
    const totalAmount = items.reduce((acc, item) => acc + item.total_price, 0);
    let discountAmount = 0;
    if (selectedDiscount && totalAmount >= selectedDiscount.min_amount) {
      discountAmount = selectedDiscount.discount;
    }
  
    const discountTotal = totalAmount - discountAmount;
    const pointsReduction = usePoints ? Math.min(customPoints / 10, discountTotal) : 0; 
    let finalAmount = discountTotal - pointsReduction;
  
    finalAmount = items.length > 0 ? Math.max(1, Math.round(finalAmount)) : 0;
  
    return finalAmount;
  }
  
  
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

  
  // 將資料劗送到locastorage
  const updatePaymentData = (discount) => {
    const finalAmount = calculateFinalAmount(); 
    const pointsUsed = usePoints ? Math.min(customPoints, finalAmount * 10) : 0;
    const remainingPoints = customPoints - pointsUsed;
    
    const selectedDiscountId = discount ? discount.discount_category_id : null; 
    const newPaymentData = {
      items,
      selectedDiscount: discount,
      discount_category_id: selectedDiscountId,
      finalAmount,
      pointsReduction: pointsUsed,
      totalAmount: finalAmount,
      remainingPoints: remainingPoints > 0 ? remainingPoints : 0, 
    }
    
    setPaymentData(newPaymentData);
    console.log(newPaymentData);
    localStorage.setItem('paymentData', JSON.stringify(newPaymentData));
  }
  
  
  
  // 樣式-------------------------------------------------------
  
  return (
    <div>
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
                    src={`${IMGROUTER}public/${item.image_url}`}
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
                  <div style={orderItemPriceStyle}>
                    購買數量: {item.quantity}
                  </div>
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
                <div style={orderItemTextStyle}>您目前持有的點數:</div>
                <div style={orderItemTextStyle}>{customPoints}</div>
              </div>
              <label>
                <input
                  type="checkbox"
                  checked={usePoints}
                  onChange={(e) => setUsePoints(e.target.checked)}
                  style={orderItemTextStyle}
                />{' '}
                使用您的遊戲點數來抵扣購買金額
                (最低能折扣至1元)
              </label>
            </div>

            {/* 顯示選定的折扣 */}
            {selectedDiscount && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '20px',
                  padding: '10px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '10px',
                }}
              >
                <p
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    color: '#333',
                  }}
                >
                折扣名稱: {selectedDiscount.name}
                </p>
                <p
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                   {selectedDiscount.discount}
                </p>
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
              <div style={amountStyle}>${calculateFinalAmount()} </div>
            </div>
          </div>
        </div>
      </div>

      {/* 測試 */}
      {/** 
      <button
        type="button"
        onClick={() => {
          updatePaymentData(selectedDiscount)
        }}
      >
        測試按鈕
      </button>*/}
      {/* 測試 */}

      {/* 付款方式 */}
      <div className={styles.paymentMethodBorder}>
        <h3 className={styles.orderTitle}>【 請選擇支付方式來結帳 】</h3>

        <div className={styles.methodFlex}>
          {/* 711繳費 */}
          <div className={styles.payment}>
            <Image
              src="/images/7-11.png"
              width={30}
              height={30}
              className={styles.methodImage}
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
            />

            <p className={styles.paymentText} onClick={handleShowModal}>
              LINE繳費
            </p>
          </div>

          {/* linePay繳費 */}
          <div className={styles.payment}>
            <Image
              src="/images/applePay.png"
              width={40}
              height={30}
              className={styles.methodImage}
            />
            <p className={styles.paymentText} style={{ marginLeft: '35px' }}>
              APPLEPay繳費
            </p>
          </div>

          {/* linePay繳費 */}
          <div className={styles.payment}>
            <Image
              src="/images/ecpay.png"
              width={30}
              height={30}
              className={styles.methodImage}
            />
            <p className={styles.paymentText}>ECPay繳費</p>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>是否使用LINE Pay 支付?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>即將跳轉頁面 ... </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className={styles.secondary}
            onClick={handleCloseModal}
          >
            取消支付
          </Button>
          <Button
            variant="primary"
            className={styles.btnPrimary}
            onClick={() => {
              handleCloseModal() 
              handleLinePay() 
            }}
          >
            確認支付
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DiscountContentItem
