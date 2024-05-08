import React from 'react';
import Image from 'next/image';
import styles from '@/styles/Product.module.css'; // 確保引入了正確的樣式文件

//'優惠資訊'元件
export default function DiscountInformation ({
      imageUrl = ""
}) {  

    return (

      <div className={styles.discountSize}>
        <Image src={imageUrl} width={329} height={314} className={styles.discountInformation} style={{ position: 'absolute',boxShadow:'0px 10px 20px 0px rgba(0, 0, 0, 0.24)' }} />
        <button className={styles.bbButton} style={{ width: '120px', height: '32px', marginBottom: '30px', position: 'absolute', top: '252px', left: '58px' }}>查看優惠</button>
      </div>

    );
  };

