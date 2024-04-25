import React from 'react';
import Image from 'next/image'; // 確保引入了 Image
import styles from '@/styles/Product.module.css'; // 確保引入了正確的樣式文件



const CategoryItem = ({ imageUrl, categoryName }) => {
  return (

      <>
      <div className={`container ${styles.categoryPicInterval}`}>
     
            <div className="col">
             
              <Image src={"/images/主食.png"} width={119} height={119} className={styles.categoryImage} />

              <p className={styles.categoryText}>{"主食"}</p>

            </div>
        
      </div>

 
 
      </>

  );
};

export default CategoryItem;