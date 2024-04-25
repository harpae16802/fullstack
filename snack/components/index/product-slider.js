import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ProductDetailCard from '../Product/productDetail'
import { FaSistrix, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa'
import {
  INDEX_INFO_PRODUCT,
  IMAGES_PRODUCTS,
} from '@/components/config/api-path'

// Prev 箭頭自定義
const CustomPrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className="custom-prev-arrow" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={29}
        height={162}
        viewBox="0 0 29 162"
        fill="none"
        className="fa-arrow pre-arrow"
      >
        <path
          d="M28.1426 1L0.869039 81.1429L28.1426 161.285"
          stroke="#070505"
        />
      </svg>
    </div>
  )
}

// Next 箭頭自定義
const CustomNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className="custom-next-arrow" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={29}
        height={162}
        viewBox="0 0 29 162"
        fill="none"
        className="fa-arrow next-arrow"
      >
        <path d="M1.14258 1L28.4161 81.1429L1.14258 161.285" stroke="#070505" />
      </svg>
    </div>
  )
}
function ProductSlider() {
  const [settings, setSettings] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  })

  // 抓首頁資料的部分
  const [listData, setListData] = useState([])

  // 點選商品的彈窗渲染
  const [selectedProductIndex, setSelectedProductIndex] = useState(null)
  const handleSeeMoreClick = (index) => {
    setSelectedProductIndex(index)
  }

  // 加減的按鈕
  const handleQuantityChange = (index, increment) => {
    const newListData = [...listData]
    const newQuantity = newListData[index].quantity || 0
    const updatedQuantity = increment ? newQuantity + 1 : Math.max(newQuantity - 1, 0)
    newListData[index].quantity = updatedQuantity
    setListData(newListData)
  }

  // 輪播的useEffect
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setSettings({
          dots: false,
          className: 'center',
          centerMode: true,
          infinite: true,
          centerPadding: '80px',
          slidesToShow: 1,
          speed: 500,
        })
      } else {
        setSettings({
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 3,
          prevArrow: <CustomPrevArrow />,
          nextArrow: <CustomNextArrow />,
        })
      }
    }

    handleResize() //初始化時呼叫一次以設定原始狀態

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 抓商品資料用的
  useEffect(() => {
    fetch(`${INDEX_INFO_PRODUCT}`)
      .then((r) => r.json())
      .then((result) => {
        // console.log(result)
        setListData(result)
      })
  }, [])

  return (
    <>
      <div className="slider-container product-index-gruop">
        <Slider {...settings}>
          {listData?.map((v, i) => {
            return (
              <div className="card-product-index" key={i}>
                <div className="product-top">
                  <div className="product-title">
                    {/* 商品詳細頁 && 購物車連結*/}
                    <div className="product-name">{v.store_name}</div>
                    <div className="product-name">{v.product_name}</div>
                  </div>
                  <div className="product-img">
                    <img
                      src={`${IMAGES_PRODUCTS}/${v.image_url}`}
                      alt="product"
                      className="product"
                    />
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => handleSeeMoreClick(i)}
                    >
                      看更多
                    </button>
                  </div>
                </div>
                <div className="product-text">
                  <div className="price">${v.price}</div>
                  <div className="butinput">
                    <div className="quantity">
                      <button onClick={() => handleQuantityChange(i, true)}>
                        <FaPlus />
                      </button>
                      <input
                        type="text"
                        min="1"
                        value={v.quantity || 0}
                        max={parseInt(v.stock_quantity)}
                        style={{ border: 'none', outline: 'none' }}
                      />
                      <button onClick={() => handleQuantityChange(i, false)}>
                        <FaMinus />
                      </button>
                    </div>
                    <button type="button" className="btn btn-primary">
                      <span className="cart-text">加入購物車</span>{' '}
                      <FaShoppingCart className="fa-cart" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>
      </div>
      {selectedProductIndex !== null && (
        <div className="product-detail">
          <ProductDetailCard
            imageUrl={`${IMAGES_PRODUCTS}/${listData[selectedProductIndex].image_url}`}
            seller={listData[selectedProductIndex].store_name}
            product={listData[selectedProductIndex].product_name}
            description={listData[selectedProductIndex].product_description}
            price={listData[selectedProductIndex].price}
            ingredient={listData[selectedProductIndex].product_ingredient}
            nutrition="營養成分表"
          />
        </div>
      )}
    </>
  )
}

export default ProductSlider
