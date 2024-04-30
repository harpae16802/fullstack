import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { FaShopify, FaTrashAlt } from 'react-icons/fa'
// import styles from '@/styles/Order.module.css'
import { useAuth } from '@/contexts/custom-context'
import { CARTITEM, BackEndPIMG } from '../../pages/seller-basic-data/config'


const groupItemsBySeller = (items) => {
  const groupedItems = items.reduce((acc, item) => {
    // 商家分類
    const key = item.store_name
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }, {})
  return groupedItems
}

const OrderDetailItem = () => {
  const [groupedItems, setGroupedItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${CARTITEM}${auth.custom_id}`);
        setGroupedItems(groupItemsBySeller(response.data.cartItems));
        
      } catch (error) {
        setError(error.message || '拿取產品詳細失敗');
      }
      setIsLoading(false);
    };
  
    fetchData();
  }, [auth.custom_id]);
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  const customId= auth.custom_id  

  // 更新购物车中的商品数量
  const updateCartItem = async (customId, productId, newQuantity) => {
    try {
      const response = await axios.put(`${CARTITEM}/${customId}`, {
        product_id: productId,
        quantity: newQuantity
      });
      console.log('Update response:', response.data);
    } catch (error) {
      console.error('Error updating cart:', error.response ? error.response.data : error);
    }
  };


// 商品增加数量
const handleIncreaseQuantity = (seller, productId) => {
  const newGroupedItems = { ...groupedItems };
  const item = newGroupedItems[seller].find(item => item.product_id === productId);
  if (item) {
    item.quantity += 1;
    const price = parseFloat(item.price) || 0; // 如果转换失败则使用0
const quantity = parseInt(item.quantity) || 0; // 如果转换失败则使用0
    item.total_price = quantity * price;  
    setGroupedItems(newGroupedItems);
    updateCartItem(auth.custom_id, productId, item.quantity);
  }
};

// 商品减少数量
const handleDecreaseQuantity = (seller, productId) => {
  const newGroupedItems = { ...groupedItems };
  const itemIndex = newGroupedItems[seller].findIndex(item => item.product_id === productId);
  if (itemIndex >= 0) {
    const item = newGroupedItems[seller][itemIndex];
    if (item.quantity > 1) {
      item.quantity -= 1;
      item.total_price = parseFloat(item.price) * item.quantity;  
      setGroupedItems(newGroupedItems);
      updateCartItem(auth.custom_id, productId, item.quantity);
    } else {
      handleRemoveProduct(seller, productId);
    }
  }
};


  // 移除商品
  const handleRemoveProduct = async (seller, productId) => {
    try {
      const response = await axios.delete(`${CARTITEM}/${auth.custom_id}/${productId}`);
      console.log('Remove response:', response.data);
      const updatedItems = { ...groupedItems };
      updatedItems[seller] = updatedItems[seller].filter(item => item.product_id !== productId);
      setGroupedItems(updatedItems);
    } catch (error) {
      console.error('Error removing product:', error.response ? error.response.data : error);
    }
  };
  


  return (
    <>
      {Object.entries(groupedItems).map(([seller, items], index) => (
        <div key={seller} style={{ marginBottom: '20px', padding: '10px', borderRadius: '10px', border: '1px solid #eaeaea', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <FaShopify style={{ marginRight: '5px' }} />{seller}
          </h2>
          {items.map((item) => (
            <div key={item.product_name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '10px', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ padding: '5px', borderRadius: '10px', border: '1px solid #eaeaea', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Image src={`${BackEndPIMG}${item.image_url}`} alt={item.product_name} width={60} height={60} unoptimized style={{ borderRadius: '10px',objectFit:'cover' }} />
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <div style={{ fontWeight: 'bold', padding: '2px 0' }}>{item.product_name}</div>
                  <div style={{ padding: '2px 0' }}>${item.price}</div>
                  <div style={{ padding: '2px 0' }}>總價格 : ${item.total_price}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button onClick={() => handleDecreaseQuantity(seller, item.product_id)} style={{ marginRight: '5px' }}>-</button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button  onClick={() => handleIncreaseQuantity(seller, item.product_id)} style={{ marginLeft: '5px' }}>+</button>
                <button  onClick={() => handleRemoveProduct(seller, item.product_id)} style={{ marginLeft: '10px', color: 'red' }}><FaTrashAlt /></button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default OrderDetailItem;