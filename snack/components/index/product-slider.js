import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { FaSistrix, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa'

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

  return (
    <div className="slider-container product-index-gruop">
      <Slider {...settings}>
        <div className="card-product-index">
          <div className="product-top">
            <div className="product-title">
              {/* 商品詳細頁 && 購物車連結*/}
              <div className="product-name">姊姊抓的餅</div>
              <div className="product-name">豬排蛋</div>
            </div>
            <div className="product-img">
              <button type="button" className="btn btn-light">
                看更多
              </button>
            </div>
          </div>
          <div className="product-text">
            <div className="price">$70</div>
            <div className="butinput">
              <div className="quantity">
                <button>
                  <FaPlus />
                </button>
                <input type="text" min="1" style={{ border: 'none' }} />
                <button>
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
        <div className="card-product-index">
          <div className="product-top">
            <div className="product-title">
              {/* 商品詳細頁 && 購物車連結*/}
              <div className="product-name">姊姊抓的餅</div>
              <div className="product-name">豬排蛋</div>
            </div>
            <div className="product-img">
              <button type="button" className="btn btn-light">
                看更多
              </button>
            </div>
          </div>
          <div className="product-text">
            <div className="price">$70</div>
            <div className="butinput">
              <div className="quantity">
                <button>
                  <FaPlus />
                </button>
                <input type="text" min="1" style={{ border: 'none' }} />
                <button>
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
        <div className="card-product-index">
          <div className="product-top">
            <div className="product-title">
              {/* 商品詳細頁 && 購物車連結*/}
              <div className="product-name">姊姊抓的餅</div>
              <div className="product-name">豬排蛋</div>
            </div>
            <div className="product-img">
              <button type="button" className="btn btn-light">
                看更多
              </button>
            </div>
          </div>
          <div className="product-text">
            <div className="price">$70</div>
            <div className="butinput">
              <div className="quantity">
                <button>
                  <FaPlus />
                </button>
                <input type="text" min="1" style={{ border: 'none' }} />
                <button>
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
        <div className="card-product-index">
          <div className="product-top">
            <div className="product-title">
              {/* 商品詳細頁 && 購物車連結*/}
              <div className="product-name">姊姊抓的餅</div>
              <div className="product-name">豬排蛋</div>
            </div>
            <div className="product-img">
              <button type="button" className="btn btn-light">
                看更多
              </button>
            </div>
          </div>
          <div className="product-text">
            <div className="price">$70</div>
            <div className="butinput">
              <div className="quantity">
                <button>
                  <FaPlus />
                </button>
                <input type="text" min="1" style={{ border: 'none' }} />
                <button>
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
      </Slider>
    </div>
  )
}

export default ProductSlider
