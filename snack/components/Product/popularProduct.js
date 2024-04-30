import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import styles from '@/styles/Product.module.css';
import ProductDetailCard from '@/components/Product/productDetail';

export default function PopularProduct(props) {
  console.log('props',props)


  return (

    <div className={styles.popularProduct} style={{ marginRight: '20px' }}>

      <div className={styles.popularInfo}>
          {/* 火焰icon */}
        <Image src="/images/fire.png" width={45} height={55} className={styles.popularIcon} alt='火焰icon' />

        <div className={styles.bestSellerText}>本週熱銷</div>

        <div className={styles.bestSellerText}>{props.saleRanking}</div>
      </div>
      
      <Image src={props.imageUrl} width={345} height={275} className={styles.popularImage} alt={props.product} />

      <p className={styles.bestSeller}  style={{marginTop: '10px' }}>{props.market}</p>

      <p  className={styles.bestSeller} style={{marginTop: '-18px' }}>{props.seller} </p>

      <div className={styles.bestProduct}>{props.product}
      <FaRegHeart className={styles.collectIcon}/></div>

      <br />

      <ProductDetailCard
          imageUrl2 = "/images/蛋塔.jpg"
          sellerName = "姊姊抓的餅"
           productName = "豬排蛋"
           description = "香噴噴的炸豬排，外酥內嫩，蛋汁滑嫩地流淌出來，與香氣四溢的抓餅完美融合。一口咬下，豬排的鮮美與蛋的滑嫩在口中交融，配上外皮香脆的抓餅，彷彿是一場口感盛宴，勾勒出濃郁的台灣街頭味道。"
           price = "70"
           ingredient = "麵粉、麵粉、雞蛋、鹽"
          nutrition="營養成分表"
      />

    </div>



  );
};

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { FaRegHeart } from 'react-icons/fa';
// import styles from '@/styles/Product.module.css';
// import ProductDetailCard from '@/components/Product/productDetail';

// export default function PopularProduct() {
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch('http://localhost:3002/productPageRouter/product');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         console.log(data); // 檢查從後端獲得的資料
//         // 解構第一個產品資料並設置到狀態中
//         const firstProduct = data.data[0];
//         const updatedProduct = {
//           imageUrl: `http://localhost:3002/images/products/${firstProduct.image_url}`,
//           saleRanking: firstProduct.sale_ranking,
//           market: firstProduct.market_name,
//           seller: firstProduct.store_name,
//           product: firstProduct.product_name
//         };
//         setProduct(updatedProduct);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         // 處理錯誤
//       }
//     };

//     fetchProduct();
//   }, []); // 空的依賴項表示只在組件 mount 時執行一次

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className={styles.popularProduct} style={{ marginRight: '20px' }}>
//       <div className={styles.popularInfo}>
//         {/* 火焰icon */}
//         <Image src="/images/fire.png" width={45} height={55} className={styles.popularIcon} />
//         <div className={styles.bestSellerText}>本週熱銷</div>
//         <div className={styles.bestSellerText}>{product.saleRanking}</div>
//       </div>
//       <Image src={product.imageUrl} width={345} height={275} className={styles.popularImage} />
//       <p className={styles.bestSeller} style={{ marginTop: '10px' }}>{product.market}</p>
//       <p className={styles.bestSeller} style={{ marginTop: '-18px' }}>{product.seller}</p>
//       <div className={styles.bestProduct}>
//         {product.product}
//         <FaRegHeart className={styles.collectIcon} />
//       </div>
//       <br />
//       <ProductDetailCard
//         imageUrl2={product.imageUrl}
//         sellerName={product.seller}
//         productName={product.product}
//         description="描述"
//         price="價格"
//         ingredient="成分"
//         nutrition="營養成分表"
//       />
//     </div>
//   );
// }
