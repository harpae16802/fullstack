import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CARTITEM, BackEndPIMG } from '../../pages/seller-basic-data/config'
import styles from '@/styles/Order.module.css';

const DiscountContentItem = ({ items = [] }) => {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    if (items.length > 0 && items[0].seller_id) {
      const sellerId = items[0].seller_id; 
      fetchDiscounts(sellerId);
    }
  }, [items]);

  const fetchDiscounts = async (sellerId) => {
    try {
      const response = await axios.get(`${CARTITEM}discounts/${sellerId}`)
      setDiscounts(response.data.discounts || []); 
    } catch (error) {
      console.error('Failed to fetch discounts:', error);
    }
  };

  return (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
          }}
        >
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
      {discounts.length > 0 && (
        <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#e0f7fa', borderRadius: '10px' }}>
          <h3>可用折扣</h3>
          {discounts.map((discount, index) => (
            <div key={index}>
              <p>折扣名稱: {discount.name}</p>
              <p>最小訂單金額: ${discount.min_amount}</p>
              <p>折扣金額: ${discount.discount}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default DiscountContentItem;
