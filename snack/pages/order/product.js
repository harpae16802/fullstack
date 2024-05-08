import Section from '@/components/layout/section'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { RxCross1 } from 'react-icons/rx'
import { FaHeart, FaRegHeart } from 'react-icons/fa' 
import styles from '@/styles/Product.module.css'
import SearchBar from '@/components/common/search-bar'
import PopularProduct from '@/components/Product/popularProduct'
import ProductItem from '@/components/Product/recommendProduct'
import DiscountInformation from '@/components/Product/discountInformation'
import style from '../nightmarket-info/nightmarket-info.module.scss'
import CategoryCard from '@/components/nightmarket-info/category/category-card'
import FilterOptions from '@/components/Product/productFilter'
import { MARKET_SELLER } from '@/components/config/api-path'
import tryApi from '@/api/productApi.js/tryApi'
import ProductDetailCard from '@/components/Product/productDetail'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from "./card";
import { Modal, Button } from 'react-bootstrap'

// fetch 網址
import {
  FAVORITE_PRODUCTS,
  C_FAVORITE_PRODUCTS,
} from '@/components/config/api-path'
// 加入收藏:樣式
// import style from './style.module.scss'

// import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'

export default function Product() {
  // 熱門產品
  const [popularProducts, setPopularProducts] = useState([])
  const [isFavorite, setIsFavorite] = useState(false) // 最愛
  const [selectedProducts, setSelectedProducts] = useState(null)

  const handleProductClick = (product) => {
    // 如果點擊的是當前已選定的產品，則取消選定
    setSelectedProducts(product)
  }
  const toggleFavoriteProducts = async () => {
    try {
      const r = await fetch(`${FAVORITE_PRODUCTS}/${product_id}`)
      const data = await r.json()
      if (data.success) {
        setIsFavorite(data.action === 'add')
      }
    } catch (error) {
      console.error('加入最愛 錯誤:', error)
    }
  }
  useEffect(() => {
    const fetchPopularProduct = async () => {
      try {
        const response = await fetch(
          'http://localhost:3002/productPageRouter/product'
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        console.log('eddie', data.data) // 檢查從後端獲得的資料
        // 解構第一個產品資料並設置到狀態中
        const m = data.data.map((v, i) => {
          v.imageUrl = 'http://localhost:3002/public/' + v.image_url
          return v
        })

        setPopularProducts(m)
      } catch (error) {
        console.error('Error fetching data:', error)
        // 處理錯誤
      }
    }

    fetchPopularProduct()
  }, []) // 空的依賴項表示只在組件 mount 時執行一次

  //隨機推薦
  const [recommendProducts, setRecommendProducts] = useState([])

  useEffect(() => {
    const fetchRecommendProduct = async () => {
      try {
        const response = await fetch(
          'http://localhost:3002/productPageRouter/recommendProduct'
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        console.log('eddie', data.data) // 檢查從後端獲得的資料
        // 解構第一個產品資料並設置到狀態中

        setRecommendProducts(data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
        // 處理錯誤
      }
    }

    fetchRecommendProduct()
  }, []) // 空的依賴項表示只在組件 mount 時執行一次

  // 商品的評分
  const [productScore, setProductScore] = useState([])

  useEffect(() => {
    const fetchProductScore = async () => {
      try {
        const response = await fetch(
          'http://localhost:3002/productPageRouter/recommendProduct'
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        console.log('eddie', data.data) // 檢查從後端獲得的資料
        // 解構第一個產品資料並設置到狀態中

        setProductScore(data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
        // 處理錯誤
      }
    }

    fetchProductScore()
  }, []) // 空的依賴項表示只在組件 mount 時執行一次


  const showCategory1 = () =>{
   
  }

  // 食物分類，寫死
  const categories = [
    {
      imgUrl: '/images/category-main.png',
      title: '主食',
      imgStyle: { top: '-50px', left: '-56px' },
      onClick: () => {showCategory1()},
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
  const [showProductFilter, setShowProductFilter] = useState()
  // const [popularProduct, setPopularProduct] = useState([])

  //熱銷產品 撈資料呈現
  useEffect(() => {
    ;(async function () {
      // 这里是立即执行函数的代码块
      const data = await tryApi.customAP({ custom_id: 1 })
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
  }, [])

  //產品資訊:HTTP請求
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products')
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

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



  //產品篩選:點心
  const [productCategory1, setProductCategory1] = useState([])

  useEffect(() => {
    const fetchProductCategory1 = async () => {
      try {
        const response = await fetch(
          'http://localhost:3002/productPageRouter/productCategory1'
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        console.log('eddie', data.data) // 檢查從後端獲得的資料
        // 解構第一個產品資料並設置到狀態中

        setProductCategory1(data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
        // 處理錯誤
      }
    }

    fetchProductCategory1()
  }, []) // 空的依賴項表示只在組件 mount 時執行一次






  return (
    <>
      <Section>
        {/* 產品類型 */}

        <div>
          {/* 產品種類 */}
          <div className={` ${style.category} d-flex justify-content-center`}>
            {categories.map((category, index) => (
              <div
                key={index}
                className={` d-flex justify-content-center ${style.categoryCard}`}
              >
                <CategoryCard {...category} />
              </div>
            ))}
          </div>

          <FilterOptions />

          {/* 熱門商品 */}

          <div className='d-flex justify-content-center'>
            <div className="d-flex justify-content-between" style={{width:"80vw"}}>
              {/* 熱門產品 */}
              {popularProducts &&
                popularProducts.map((product, index) => (
                  <div className="d-flex flex-column ">
                    <div className={styles.popularInfo}>
                      {/* 火焰icon */}
                      <Image
                        src="/images/fire.png"
                        width={45}
                        height={55}
                        className={styles.popularIcon}
                        alt="火焰icon"
                      />

                      <div className={styles.bestSellerText}>本週熱銷</div>

                      <div className={styles.bestSellerText}>
                        {`NO${index + 1}`}
                      </div>
                    </div>

                    <Image
                      src={product.imageUrl}
                      width={345}
                      height={275}
                      className={styles.popularImage}
                      alt={product.product_name}
                    />

                    <p
                      className={styles.bestSeller}
                      style={{ marginTop: '10px' }}
                    >
                      {product.market_name}
                    </p>

                    <p
                      className={styles.bestSeller}
                      style={{ marginTop: '-18px' }}
                    >
                      {product.store_name}{' '}
                    </p>

                    <p
                      className={styles.bestProduct}
                      style={{ marginTop: '-18px' }}
                    >
                      {product.product_name}{' '}
                    </p>

                    {/* <div className={styles.bestProduct}>{props.product}
<FaRegHeart  className={styles.collectIcon}  onClick={toggleFavoriteProducts}/></div> */}
                    {isFavorite ? (
                      <FaHeart
                        className={styles.collectIcon}
                        onClick={toggleFavoriteProducts}
                        style={{cursor:'pointer'}}
                      />
                    ) : (
                      <FaRegHeart
                        className={styles.collectIcon}
                        onClick={toggleFavoriteProducts}
                        style={{cursor:'pointer'}}
                      />
                    )}
                    <br />
                    <button
                      className={styles.seeMoreButton}
                      type="button"
                      data-bs-target="#detailModal"
                      data-bs-toggle="modal"
                    >
                      看更多
                    </button>

                    {/* 如果選定的商品等於當前迴圈中的商品，則渲染商品詳細資訊 */}
                    {/* ProductDetailCard */}
                    <div
                      className="modal fade"
                      id="detailModal"
                      tabindex="-1"
                      aria-labelledby="detailModalLabel"
                      aria-hidden="true"
                    >

                    {/* 產品詳細 */}
                      <div className={`modal-dialog ${styles.detailModalSize}`}>
                        <div className="modal-content">
                          <div className="modal-body">
                            <div className={styles.detailContainer}>
                              {/* 產品圖 */}
                              <Image
                                src={product.imageUrl}
                                width={759}
                                height={726}
                                className={styles.detailPic}
                                alt={product.imageUrl}
                              />

                              <div className={styles.detailTextArray}>
                              
                                <RxCross1
                                  type="button"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                  className={`btn-close ${styles.detailCrossIcon}`}
                                ></RxCross1>

                                {/* 店家名稱 */}
                                <div className={styles.detailSeller}>
                                  {product.store_name}
                                </div>
                                {/* 產品名稱 */}
                                <div className={styles.detailProductName}>
                                  {product.product_name}
                                </div>

                                {/* 產品描述 */}
                                <div className={styles.detailIntroduce}>
                                  {product.product_description}
                                </div>
                                {/* 價格 */}
                                <div className={styles.detailPrice}>
                                  ${product.price}
                                </div>

                                {/* '+ -'按鈕 */}
                                <div className={styles.detailNumber}>
                                  <button className={styles.detailNumberButton}>
                                    -
                                  </button>
                                  <div className={styles.detailNumberShow}>
                                    1
                                  </div>
                                  <button className={styles.detailNumberButton}>
                                    +
                                  </button>
                                </div>

                                {/* 收藏 加入購物車 */}
                                <div
                                  style={{
                                    display: 'flex',
                                    marginTop: '20px',
                                    marginLeft: '115px',
                                    color: '#A32C2D',
                                    fontSize: '30px',
                                  }}
                                >
                                  {/* 加入收藏 */}
                                  {isFavorite ? (
                                    <FaHeart
                                      className={styles.collectIcon}
                                      onClick={toggleFavoriteProducts}
                                      style={{cursor:'pointer'}}
                                    />
                                  ) : (
                                    <FaRegHeart
                                      className={styles.collectIcon}
                                      onClick={toggleFavoriteProducts}
                                      style={{cursor:'pointer'}}
                                    />
                                  )}

                                  <button className={styles.addCartButton}>
                                    加入購物車
                                  </button>

                                  <button className={styles.immediateBuyButton}>
                                    立即購買
                                  </button>
                                </div>

                                {/* // 手風琴:營養成分表 */}
                                <div
                                  className={`accordion accordion-flush ${styles.detailAccordionPosition}`}
                                  id="accordionFlushExample"
                                >
                                  <div className="accordion-item">
                                    <h2
                                      className="accordion-header"
                                      id="flush-headingOne"
                                    >
                                      <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseOne"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseOne"
                                      >
                                        成分 :
                                      </button>
                                    </h2>
                                    <div
                                      id="flush-collapseOne"
                                      className="accordion-collapse collapse"
                                      aria-labelledby="flush-headingOne"
                                      data-bs-parent="#accordionFlushExample"
                                    >
                                      <div
                                        className={`accordion-body ${styles.detailIngredient}`}
                                      >
                                        {product.product_ingredient}
                                      </div>
                                    </div>
                                  </div>

                                  <div class="accordion-item"></div>
                                </div>

                                {/* <IoIosArrowDown className={styles.ingredientDown1}  /> */}

                                {/* 營養成分表 */}
                                <div
                                  className="accordion accordion-flush"
                                  id="accordionFlushExample"
                                >
                                  <div className="accordion-item">
                                    <h2
                                      className="accordion-header"
                                      id="flush-headingTwo"
                                    >
                                      <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseTwo"
                                      >
                                        營養成分:
                                      </button>
                                    </h2>
                                    <div
                                      id="flush-collapseTwo"
                                      className="accordion-collapse collapse"
                                      aria-labelledby="flush-headingTwo"
                                      data-bs-parent="#accordionFlushExample"
                                    >
                                      <div
                                        className={`accordion-body ${styles.nutritionIngredient}`}
                                      >
                                        {product.product_nutrition}
                                      </div>
                                    </div>
                                  </div>

                                  <div class="accordion-item"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* 下方按鈕 */}
                        </div>
                      </div>
  



                    </div>
                  </div>
                ))}
              {/* 熱門產品 */}
              {/* {popularProducts &&
                popularProducts.map((product, index) => (
                  <Card product={product}/>
                ))} */}
            </div>
          </div>

          {/* 推薦餐點 */}
          <div className={`container-fluid row ${styles.recommendOuter}`}>
            {/* 原本標題 */}
            <div className={styles.recommendTitle} >推薦餐點</div>

            <div className={`col ${styles.recommendContainer}`}>
              {/* 第一行 */}

              {recommendProducts && (
                <div
                  className={`d-flex flex-wrap overflow-hidden`}
                  style={{ overflowX: 'auto' }}
                >
                  {recommendProducts.map((product, index) => (
                    <div
                      key={index}
                      className={`col-lg-4 col-md-6 mb-4 mr-lg-4 ml-lg-4`}
                    >
                      <div className={styles.productItemContainer}>
                        <ProductItem
                          product_id={product.product_id}
                          imageUrl={`/${product.image_url}`}
                          productName={product.product_name}
                          score={product.avg}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={`col ${styles.discountContainer}`}>
              {/* 優惠資訊 */}

              <div className="d-flex row">
              <DiscountInformation imageUrl="/images/seller/小七的滷肉飯.jpg" />
              <DiscountInformation imageUrl="/images/seller/阿嬤的鹹酥雞.jpg" />
                {/* {Array(2)
                  .fill(null)
                  .map((v, i) => {
                    return (
                      <div key={i} className="">
                        <DiscountInformation imageUrl="/images/優惠.png" />
                      </div>
                    )
                  })} */}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
