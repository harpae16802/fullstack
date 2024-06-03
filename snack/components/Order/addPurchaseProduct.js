//  DiscountContentItem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { CARTITEM, IMGROUTER } from '../../api/config';
import { useAuth } from '@/contexts/custom-context';
import { Modal, Button } from 'react-bootstrap';
import styles from '@/styles/Order.module.css';
import { replace } from 'lodash';
import { useRouter } from 'next/router';
const DiscountContentItem = ({ items = [] }) => {
  const { auth } = useAuth();
  const customId = auth.custom_id;
  const router = useRouter(); 

  const [paymentData, setPaymentData] = useState({
    items: [],
    selectedDiscount: null,
    finalAmount: 0,
    pointsReduction: 0,
    totalAmount: 0,
    remainingPoints: 0,
  });
  const [discounts, setDiscounts] = useState([]);
  const [customPoints, setCustomPoints] = useState(0);
  const [usePoints, setUsePoints] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const { data } = await axios.get(`${CARTITEM}cart/${customId}`);
        setCustomPoints(data.sum);
        console.log(customPoints);
      } catch (error) {
        console.error('拿取點數錯誤:', error);
      }
    };

    if (customId) {
      fetchPoints();
    }
  }, [customId]);

  useEffect(() => {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    setPaymentData((prev) => ({
      ...prev,
      items: selectedItems,
    }));
  }, []);

  useEffect(() => {
    if (paymentData.items.length > 0 && paymentData.items[0].seller_id) {
      const sellerId = paymentData.items[0].seller_id;
      fetchDiscounts(sellerId);
    }
  }, [paymentData.items]);

  const fetchDiscounts = async (sellerId) => {
    try {
      const response = await axios.get(`${CARTITEM}discounts/${sellerId}`);
      setDiscounts(response.data.discounts || []);
    } catch (error) {
      console.error('拿取折扣錯誤', error);
    }
  };

  useEffect(() => {
    if (discounts.length > 0) {
      setSelectedDiscount(discounts[0]);
    }
    console.log(discounts);
  }, [discounts]);

  const handleLinePay = async () => {
    const currentTime = new Date().toISOString().replace(/\.\d+Z$/, '') + 'Z';
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
    };

    try {
      const response = await axios.post('http://127.0.0.1:3002/backRoute/linePayBox', linePayRequest, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('LINE Pay Response:', response.data);
      handleLinePayResponse(response);
    } catch (error) {
      console.error('LINE Pay Request Error', error);
    }
  };

  const handleLinePayResponse = (response) => {
    const { returnCode, returnMessage, info: { paymentUrl, transactionId } } = response.data;

    if (returnCode === '0000') {
      console.log('Success:', returnMessage);
      console.log('Transaction ID:', transactionId);
      const urlToOpen = paymentUrl.web;

      updatePaymentData(selectedDiscount);
      window.open(urlToOpen, '_blank');
    } else {
      console.error('Error:', returnMessage);
    }
  };

  const calculateFinalAmount = () => {
    const totalAmount = paymentData.items.reduce((acc, item) => acc + item.total_price, 0);
    let discountAmount = 0;
    if (selectedDiscount && totalAmount >= selectedDiscount.min_amount) {
      discountAmount = selectedDiscount.discount;
    }

    const discountTotal = totalAmount - discountAmount;
    const pointsReduction = usePoints ? Math.min(customPoints / 10, discountTotal) : 0;
    let finalAmount = discountTotal - pointsReduction;

    finalAmount = paymentData.items.length > 0 ? Math.max(1, Math.round(finalAmount)) : 0;

    return finalAmount;
  };

  const updatePaymentData = (discount) => {
    const finalAmount = calculateFinalAmount();
    const pointsUsed = usePoints ? Math.min(customPoints, finalAmount * 10) : 0;
    const remainingPoints = customPoints - pointsUsed;

    const selectedDiscountId = discount ? discount.discount_category_id : null;
    const newPaymentData = {
      items: paymentData.items,
      selectedDiscount: discount,
      discount_category_id: selectedDiscountId,
      finalAmount,
      pointsReduction: pointsUsed,
      totalAmount: finalAmount,
      remainingPoints: remainingPoints > 0 ? remainingPoints : 0,
    };

    setPaymentData(newPaymentData);
    console.log(newPaymentData);
    localStorage.setItem('paymentData', JSON.stringify(newPaymentData));
    router.replace('/order/orderStep3')
  };

  return (
    <div>
      <div className="container" style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '20px' }}>
        {paymentData.items.map((item, index) => (
          <div key={index} className="row" style={{ marginBottom: '20px', backgroundColor: '#ffffff', borderRadius: '10px', padding: '15px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <div className="col">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Image src={`${IMGROUTER}public/${item.image_url}`} alt={item.product_name} width={100} height={100} unoptimized objectFit="cover" style={{ borderRadius: '10px', objectFit: 'cover', marginRight: '15px' }} />
                  <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#333' }}>{item.product_name}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>產品價格: ${item.price}</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>購買數量: {item.quantity}</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#FA541C' }}>產品總價: ${item.total_price}</div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="row">
          <div className="col">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '10px', marginTop: '20px', backgroundColor: '#ffffff', padding: '15px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#333' }}>目前訂單金額:</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#FA541C' }}>{paymentData.items.reduce((acc, item) => acc + item.total_price, 0)}</div>
             </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '10px', marginTop: '20px', backgroundColor: '#ffffff', padding: '15px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#333' }}>您目前持有的點數:</div>
                <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#333' }}>{customPoints}</div>
              </div>
              <label>
                <input type="checkbox" checked={usePoints} onChange={(e) => setUsePoints(e.target.checked)} style={{ fontWeight: 'bold', fontSize: '20px', color: '#333' }} /> 使用您的遊戲點數來抵扣購買金額 (最低能折扣至1元)
              </label>
            </div>

            {selectedDiscount && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                <p style={{ fontWeight: 'bold', fontSize: '20px', color: '#333' }}>折扣名稱: {selectedDiscount.name}</p>
                <p style={{ fontWeight: 'bold', fontSize: '20px' }}>{selectedDiscount.discount}</p>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '10px', marginTop: '20px', backgroundColor: '#ffffff', padding: '15px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#FA541C' }}>總金額:</div>
              <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#FA541C' }}>${calculateFinalAmount()}</div>
            </div>
          </div>
        </div>
      </div>

      <button type="button" onClick={() => updatePaymentData(selectedDiscount)}>
        直接付款測試按鈕
      </button>

      <div className={styles.paymentMethodBorder}>
  <h3 className={styles.orderTitle}>【 請選擇支付方式來結帳 】</h3>
  API 因為安全性上 已移除 剩下沙盒LINEPAY測試 請使用直接付款按鈕
  <div className={styles.methodFlex}>
    <div className={styles.payment}>
      <Image src="/images/7-11.png" width={30} height={30} className={styles.methodImage} />
      {/* <p className={styles.paymentText}>711繳費</p> */}
    </div>

    <div className={styles.payment}>
      <Image src="/images/line.jpg" onClick={handleShowModal} width={30} height={30} className={styles.methodImage} />
      {/* <p className={styles.paymentText} >
        LINE繳費
      </p> */}
    </div>

    <div className={styles.payment}>
      <Image src="/images/applePay.png" width={40} height={30} className={styles.methodImage} />
      {/* <p className={styles.paymentText} style={{ marginLeft: '35px' }}>
        APPLEPay繳費
      </p> */}
    </div>

    <div className={styles.payment}>
      <Image src="/images/ecpay.png" width={30} height={30} className={styles.methodImage} />
      {/* <p className={styles.paymentText}>ECPay繳費</p> */}
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
          <Button variant="secondary" className={styles.secondary} onClick={handleCloseModal}>
            取消支付
          </Button>
          <Button variant="primary" className={styles.btnPrimary} onClick={() => {
            handleCloseModal();
            handleLinePay();
          }}>
            確認支付
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DiscountContentItem;
