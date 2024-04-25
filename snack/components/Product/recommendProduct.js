import React from 'react';
import { FiHeart } from 'react-icons/fi';
import styles from '@/styles/Product.module.css'; // 確保引入了正確的樣式文件

const ProductItem = ({ imageUrl, productName, productScore }) => {
    return (
      <div  style={{marginLeft:'60px'}}>
        <img src={"/images/鹹酥雞.jpg"} width={345} height={225} style={{
          borderRadius: '70px',
          border: 'solid 8px #fff',
          marginTop: '22px'
        }} />
        <div style={{ display: 'flex' }}>
          <p className={styles.recommendName}>{"海鮮廣東粥"}</p>
          <FiHeart style={{
            color: 'rgb(163, 44, 45)',
            fontSize: '26px',
            marginTop: '12px',
            marginLeft: '18px'
          }} />
          <div className={styles.productScore}>{"4.7"}</div>
        </div>
      </div>
    );
  };

export default ProductItem;