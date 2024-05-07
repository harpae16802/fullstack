import Section from '@/components/layout/section'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import styles from '@/styles/Product.module.css'
import SearchBar from '@/components/common/search-bar'
import  PopularProduct  from '@/components/Product/popularProduct';
import ProductItem from '@/components/Product/recommendProduct';
import DiscountInformation from '@/components/Product/discountInformation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import style from '../nightmarket-info/nightmarket-info.module.scss'
import CategoryCard from '@/components/nightmarket-info/category/category-card'
import FilterOptions from '@/components/Product/productFilter'
import { MARKET_SELLER } from '@/components/config/api-path'
import  tryApi from "@/api/productApi.js/tryApi"
import ProductDetailCard from '@/components/Product/productDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
// fetch 網址
import {
  FAVORITE_PRODUCTS,
  C_FAVORITE_PRODUCTS,
} from '@/components/config/api-path'
// 加入收藏:樣式
// import style from './style.module.scss'


// import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'; 


export default function Product() {
  // 熱門產品
  const [popularProducts, setPopularProducts] = useState([]);

  const [selectedProducts, setSelectedProducts] = useState(null);

  const handleProductClick = (product) => {
    // 如果點擊的是當前已選定的產品，則取消選定
    setSelectedProducts(product);
  };

  useEffect(() => {
    const fetchPopularProduct = async () => {
      try {
        const response = await fetch('http://localhost:3002/productPageRouter/product');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('eddie',data.data); // 檢查從後端獲得的資料
        // 解構第一個產品資料並設置到狀態中
    
        setPopularProducts(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // 處理錯誤
      }
    };

    fetchPopularProduct();
  }, []); // 空的依賴項表示只在組件 mount 時執行一次


//隨機推薦
const [recommendProducts, setRecommendProducts] = useState([]);

useEffect(() => {
  const fetchRecommendProduct = async () => {
    try {
      const response = await fetch('http://localhost:3002/productPageRouter/recommendProduct');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('eddie',data.data); // 檢查從後端獲得的資料
      // 解構第一個產品資料並設置到狀態中
  
      setRecommendProducts(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // 處理錯誤
    }
  };

  fetchRecommendProduct();
}, []); // 空的依賴項表示只在組件 mount 時執行一次


// 商品的評分
const [productScore, setProductScore] = useState([]);

useEffect(() => {
  const fetchProductScore = async () => {
    try {
      const response = await fetch('http://localhost:3002/productPageRouter/recommendProduct');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('eddie',data.data); // 檢查從後端獲得的資料
      // 解構第一個產品資料並設置到狀態中
  
      setProductScore(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // 處理錯誤
    }
  };

  fetchProductScore();
}, []); // 空的依賴項表示只在組件 mount 時執行一次



  // 食物分類，寫死
  const categories = [
    {
      imgUrl: '/images/category-main.png',
      title: '主食',
      imgStyle: { top: '-50px', left: '-56px' },
    },
    {
      imgUrl: '/images/category-snack.png',
      title: '小吃',
      imgStyle: { top: '-60px', left: '-56px' },
    },
    {
      imgUrl: '/images/category-soup.png',
      title: '湯品',
      imgStyle: { top: '-30px', left: '-64px' },
    },
    {
      imgUrl: '/images/category-sweet.png',
      title: '甜品',
      imgStyle: { top: '-50px', left: '-56px' },
    },
    {
      imgUrl: '/images/category-saltynacks.png',
      title: '點心',
      imgStyle: { top: '-46px', left: '-50px' },
    },
    {
      imgUrl: '/images/category-drink.png',
      title: '飲料',
      imgStyle: { top: '-40px', left: '-52px' },
    },
  ]

  const router = useRouter()
  const { market_id } = router.query
  const { data } = router.query
  const [showProductFilter, setShowProductFilter] = useState();
  // const [popularProduct, setPopularProduct] = useState([])

 
      //熱銷產品 撈資料呈現
      useEffect(()=>{
        
        (async function() {
        // 这里是立即执行函数的代码块
       const data=await tryApi.customAP({custom_id:1});
        console.log(data)
      })()
       
        
        // const fetchData = async () => {
        //   try {
        //     const r = await fetch('http://localhost:3002/');
        //     if (!r.ok) {
        //       throw new Error("Network response 錯誤");
        //     }
        //     const data = await r.json();
        //     setSeller(data[3]);
        //   } catch (error) {
        //     console.log("fetch 錯誤:", error);
        //   }
        // };
        // fetchData();
      }, []);


  //產品資訊:HTTP請求
  const [products, setProducts] = useState([]);
 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);



  useEffect(() => {
    // 因為 market_id 是固定的，這裡不再檢查它的值
    fetch(`${MARKET_SELLER}/1`) // 直接使用市場ID為1
      .then((r) => r.json())
      .then((data) => {
        setFeaturedShops(data.slice(0, 3)) // 只取前三個作為特色商家
        setAllShops(data) // 設置所有商家的數據
      })
      .catch((error) => {
        console.error('獲取商家數據失敗:', error)
      })
  }, [])


  //swiper
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 576);
    };

    handleResize(); // 確保初始狀態正確
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (
    <>
      <Section>



      
      {/* 產品類型 */}

      <div className={`row ${style.content}`}>

      {/* 產品種類 */}
      <div className={`col ${style.category}`}>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`col-xs-6 col-md-2 d-flex justify-content-center ${style.categoryCard}`}
            >
              <CategoryCard  {...category} />
            </div>
          ))}
        </div>

    

      <FilterOptions />

      {/* 熱門商品 */}

      
    <div className={`container-fluid  ${styles.popularDisplay}`}>

      <div className={`col justify-content-center ${styles.popularContainer}`}>

        {/* 熱門產品 */}
        {popularProducts && popularProducts.map((product, index) => (
  <div key={index} className='col-12 col-sm-3'>
    <PopularProduct 
      product_id={product.product_id}
      imageUrl={`/${product.image_url}`}
      saleRanking={`No${index + 1}`}
      market={product.market_name}
      seller={product.store_name}
      product={product.product_name}
      // 将 selectedProduct 设置为选定的商品状态
      selectedProduct={selectedProducts}
    />

    <button onClick={() => handleProductClick(product)} className={styles.seeMoreButton} type="button" data-bs-toggle="modal" data-bs-target="#detailModal">看更多</button>

    
    
    {/* 如果選定的商品等於當前迴圈中的商品，則渲染商品詳細資訊 */}
   {selectedProducts && selectedProducts.product_id === product.product_id &&
      <ProductDetailCard 
        imageUrl={`/${product.image_url}`}
        seller={product.store_name}
        product={product.product_name}
        description={product.product_description}
        price={product.price}
        ingredient={product.product_ingredient}
        nutrition={product.product_nutrition}
        // 将 selectedProduct 设置为选定的商品状态
        // selectedProduct={selectedProduct}
      />
   }

   
  </div>
))}


          </div>

    </div>
     

   
      {/* 推薦餐點 */}
  <div className={`container-fluid row ${styles.recommendOuter}`} >

{/* 原本標題 */}
<div className={styles.recommendTitle}>推薦餐點</div>

    <div className={`col ${styles.recommendContainer}`}>
     
      {/* 第一行 */}


{recommendProducts && (
  <div className={`d-flex flex-wrap overflow-hidden`} style={{overflowX: 'auto'}}>
    {recommendProducts.map((product, index) => (
      <div key={index} className={`col-lg-4 col-md-6 mb-4 mr-lg-4 ml-lg-4`}>
        <div className={styles.productItemContainer}>
        <ProductItem 
          product_id = {product.product_id}
          imageUrl={`/${product.image_url}`}
          productName={product.product_name}
          score="4.7"
          
        />
        </div>

      </div>
    ))}
  </div>

)}

       </div>




        <div className={`col ${styles.discountContainer}`} >
          {/* 優惠資訊 */}

          <div className='d-flex row'>

          {Array(2)
          .fill(null)
          .map((v,i) => {
            return(
              <div key={i} className=''>
              <DiscountInformation
               imageUrl="/images/優惠.png"
           />
              </div>
              
            )
          })}

          </div>
          
        </div>
      
      </div>

        </div>
      </Section>
    </>
  )
}





