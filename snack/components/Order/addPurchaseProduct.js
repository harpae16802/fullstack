import Image from 'next/image'
import { IoCart } from 'react-icons/io5'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaShopify, FaTrashAlt } from 'react-icons/fa'
import styles from '@/styles/Order.module.css'
import { useAuth } from '@/contexts/custom-context'
import { CARTITEM, BackEndPIMG } from '../../pages/seller-basic-data/config'

const DiscountContentItem = ({ items = [] }) => {
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
    </>
  )
}

export default DiscountContentItem
