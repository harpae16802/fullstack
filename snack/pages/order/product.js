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
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import {
  FAVORITE_PRODUCTS,
} from '@/components/config/api-path'

export default function Product() {
  const [popularProducts, setPopularProducts] = useState([])
  const [recommendProducts, setRecommendProducts] = useState([])
  const [productScore, setProductScore] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)

  const router = useRouter()
  const { market_id } = router.query

  const fetchProductsData = async (url, setState) => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setState(data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchProductsData('http://localhost:3002/productPageRouter/product', setPopularProducts)
    fetchProductsData('http://localhost:3002/productPageRouter/recommendProduct', setRecommendProducts)
    fetchProductsData('http://localhost:3002/productPageRouter/recommendProduct', setProductScore)
  }, [])

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  const toggleFavoriteProduct = async (productId) => {
    try {
      const response = await fetch(`${FAVORITE_PRODUCTS}/${productId}`)
      const data = await response.json()
      if (data.success) {
        setIsFavorite(data.action === 'add')
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

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

  return (
    <>
      <Section>
        <SearchBar />
        <div className={`d-flex justify-content-center ${style.category}`}>
          {categories.map((category, index) => (
            <div key={index} className={`d-flex justify-content-center ${style.categoryCard}`}>
              <CategoryCard {...category} />
            </div>
          ))}
        </div>

        <FilterOptions />

        <div className='d-flex justify-content-center'>
          <div className="d-flex justify-content-between" style={{ width: "80vw" }}>
            {popularProducts.map((product, index) => (
              <div key={index} className="d-flex flex-column">
                <div className={styles.popularInfo}>
                  <Image
                    src="/images/fire.png"
                    width={45}
                    height={55}
                    className={styles.popularIcon}
                    alt="火焰icon"
                  />
                  <div className={styles.bestSellerText}>本週熱銷</div>
                  <div className={styles.bestSellerText}>{`NO${index + 1}`}</div>
                </div>
                <Image
                  src={`http://localhost:3002/public/${product.image_url}`}
                  width={345}
                  height={275}
                  className={styles.popularImage}
                  alt={product.product_name}
                />
                <p className={styles.bestSeller} style={{ marginTop: '10px' }}>{product.market_name}</p>
                <p className={styles.bestSeller} style={{ marginTop: '-18px' }}>{product.store_name}</p>
                <p className={styles.bestProduct} style={{ marginTop: '-18px' }}>{product.product_name}</p>
                {isFavorite ? (
                  <FaHeart className={styles.collectIcon} onClick={() => toggleFavoriteProduct(product.product_id)} style={{ cursor: 'pointer' }} />
                ) : (
                  <FaRegHeart className={styles.collectIcon} onClick={() => toggleFavoriteProduct(product.product_id)} style={{ cursor: 'pointer' }} />
                )}
                <br />
                <button
                  className={styles.seeMoreButton}
                  type="button"
                  data-bs-target="#detailModal"
                  data-bs-toggle="modal"
                  onClick={() => handleProductClick(product)}
                >
                  看更多
                </button>

                {selectedProduct && (
                  <Modal show={selectedProduct.product_id === product.product_id} onHide={() => setSelectedProduct(null)} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>{selectedProduct.product_name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ProductDetailCard product={selectedProduct} />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setSelectedProduct(null)}>
                        關閉
                      </Button>
                    </Modal.Footer>
                  </Modal>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={`container-fluid row ${styles.recommendOuter}`}>
          <div className={styles.recommendTitle}>推薦餐點</div>
          <div className={`col ${styles.recommendContainer}`}>
            <div className={`d-flex flex-wrap overflow-hidden`} style={{ overflowX: 'auto' }}>
              {recommendProducts.map((product, index) => (
                <div key={index} className={`col-lg-4 col-md-6 mb-4`}>
                  <ProductItem
                    product_id={product.product_id}
                    imageUrl={`http://localhost:3002/public/${product.image_url}`}
                    productName={product.product_name}
                    score={product.avg}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={`col ${styles.discountContainer}`}>
            <div className="d-flex row">
              <DiscountInformation imageUrl="/images/seller/小七的滷肉飯.jpg" />
              <DiscountInformation imageUrl="/images/seller/阿嬤的鹹酥雞.jpg" />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
