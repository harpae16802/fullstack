import Section from './section.js'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/Product.module.css'
import SearchBar from '@/components/common/search-bar'
import PopularProduct from '@/components/Product/popularProduct'
import ProductItem from '@/components/Product/recommendProduct'
import DiscountInformation from '@/components/Product/discountInformation'
import { Swiper, SwiperSlide } from 'swiper/react'
import classNames from "classnames"
import 'swiper/css'
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
  C_FAVORITE_PRODUCTS,
} from '@/components/config/api-path'

export default function Product() {
  const [popularProducts, setPopularProducts] = useState([])
  const [recommendProducts, setRecommendProducts] = useState([])
  const [productScore, setProductScore] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [products, setProducts] = useState([])

  const router = useRouter()
  const { market_id } = router.query

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

  useEffect(() => {
    const fetchPopularProduct = async () => {
      try {
        const response = await fetch('http://localhost:3002/productPageRouter/product')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setPopularProducts(data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchPopularProduct()
  }, [])

  useEffect(() => {
    const fetchRecommendProduct = async () => {
      try {
        const response = await fetch('http://localhost:3002/productPageRouter/recommendProduct')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setRecommendProducts(data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchRecommendProduct()
  }, [])

  useEffect(() => {
    const fetchProductScore = async () => {
      try {
        const response = await fetch('http://localhost:3002/productPageRouter/recommendProduct')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setProductScore(data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchProductScore()
  }, [])

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

  const handleProductClick = (product) => {
    setSelectedProduct(selectedProduct === product ? null : product)
  }

  return (
    <Section>
      <SearchBar />
      <div className={`row ${style.content}`}>
        <div className="container-fluid">
          <div className={`col ${style.category}`}>
            {categories.map((category, index) => (
              <div
                key={index}
                className={classNames(`justify-content-center ${style.categoryCard}`, style.productsList)}
              >
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <h2>熱門產品</h2>
        <div className="row">
          {popularProducts.map((product) => (
            <div key={product.product_id} className="col-md-4">
              <PopularProduct product={product} onClick={() => handleProductClick(product)} />
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <h2>隨機推薦</h2>
        <div className="row">
          {recommendProducts.map((product) => (
            <div key={product.product_id} className="col-md-4">
              <ProductItem product={product} onClick={() => handleProductClick(product)} />
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <h2>產品評分</h2>
        <div className="row">
          {productScore.map((product) => (
            <div key={product.product_id} className="col-md-4">
              <ProductDetailCard product={product} onClick={() => handleProductClick(product)} />
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <Modal show={true} onHide={() => setSelectedProduct(null)} centered>
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
    </Section>
  )
}
