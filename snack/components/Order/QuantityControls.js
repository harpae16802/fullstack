import { FaPlus, FaMinus } from 'react-icons/fa';
import React, { useState } from 'react';
import Section from '@/components/layout/section'
import styles from '../../styles/navbar-seller.module.scss'

const QuantityControls = ({ seller, item, handleIncreaseQuantity, handleDecreaseQuantity }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateDimensions = () => {
    setWindowWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const buttonStyle = {
    height: windowWidth <= 992 ? '30px' : '37px',
    width: windowWidth <= 992 ? '30px' : '37px',
    border: 'none',
    backgroundColor: '#fff',
    color:  '#de4f4f' ,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const inputStyle = {
    height: windowWidth <= 992 ? '30px' : '37px',
    width: windowWidth <= 992 ? '50px' : '50px',
    fontSize: '16px',
    fontWeight: '500',
    color:'  #de4f4f ', 
    border: 'none',
    textAlign: 'center',
    backgroundColor: '#fff',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '1px' }}>
      <button style={buttonStyle} onClick={() => handleDecreaseQuantity(seller, item.product_id)}>
        <FaMinus />
      </button>
      <input type="text" value={item.quantity} readOnly style={inputStyle} />
      <button style={buttonStyle} onClick={() => handleIncreaseQuantity(seller, item.product_id)}>
        <FaPlus />
      </button>
    </div>
  );
};


export default QuantityControls