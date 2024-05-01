// export default DiscountContentItem  結帳第二步 付款與優惠
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CARTITEM, BackEndPIMG } from '../../pages/seller-basic-data/config';
import styles from '@/styles/Order.module.css';

const DiscountContentItem = ({ items = [] }) => {
  const [discounts, setDiscounts] = useState([]);

  // 從後端接收到的折扣信息，假定默認使用第一個折扣
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  useEffect(() => {
    if (items.length > 0 && items[0].seller_id) {
      const sellerId = items[0].seller_id;
      fetchDiscounts(sellerId);
    }
  }, [items]);

  useEffect(() => {
    if (discounts.length > 0) {
      setSelectedDiscount(discounts[0]); // 默認選擇第一個折扣
    }
  }, [discounts]);

  const fetchDiscounts = async (sellerId) => {
    try {
      const response = await axios.get(`${CARTITEM}discounts/${sellerId}`);
      setDiscounts(response.data.discounts || []);
    } catch (error) {
      console.error('Failed to fetch discounts:', error);
    }
  };

  // 計算訂單的總金額
  const totalAmount = items.reduce((acc, item) => acc + item.total_price, 0);

  // 折扣後的總金額計算
  const totalDiscountAmount = selectedDiscount ? selectedDiscount.discount : 0;
  const finalAmount = totalAmount - totalDiscountAmount;

  return (
    <>
      {items.map((item, index) => (
        <div key={index} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '10px', padding: '10px', borderRadius: '10px', backgroundColor: '#f9f9f9',
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '10px' }}>
              <Image
                src={`${BackEndPIMG}${item.image_url}`}
                alt={item.product_name}
                width={60}
                height={60}
                unoptimized
                style={{ borderRadius: '10px', objectFit: 'cover' }}
              />
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>{item.product_name}</div>
              <div>產品價格: ${item.price}</div>
              <div>產品數量: {item.quantity}</div>
              <div>產品總價: ${item.total_price}</div>
            </div>
          </div>
        </div>
      ))}

      {/* 结算部分 */}
      <div className="col">
        <div className={styles.paymentContainer}>
          <div className={styles.amountText}>目前訂單金額:</div>
          <div className={styles.amount}>{totalAmount}</div>
        </div>

        {selectedDiscount && (
          <>
            <div className={styles.paymentContainer}>
              <div className={styles.discountText}>折扣名稱:</div>
              <div className={styles.amount}>{selectedDiscount.name}</div>
            </div>

            <div className={styles.paymentContainer}>
              <div className={styles.discountText}>折扣金額:</div>
              <div className={styles.amount}>${totalDiscountAmount}</div>
            </div>
          </>
        )}

        <div style={{ display: 'flex' }}>
          <div className={styles.sumText}>總金額:</div>
          <div className={styles.sumTotal}>{finalAmount}</div>
        </div>
      </div>
    </>
  )
}

export default DiscountContentItem;
