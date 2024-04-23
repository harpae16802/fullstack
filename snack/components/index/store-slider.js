import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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
function StoreSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  }

  return (
    <div className="slider-container store-index-gruop">
      <Slider {...settings}>
        <div className="card-store-index">
          <div className="store-name">月氏激蛋葱油餅</div>
          <div className="store-market">寧夏夜市</div>
          <button type="button" className="btn btn-light">
            看更多
          </button>
        </div>
        <div className="card-store-index">
          <div className="store-name">月氏激蛋葱油餅</div>
          <div className="store-market">寧夏夜市</div>
          <button type="button" className="btn btn-light">
            看更多
          </button>
        </div>
        <div className="card-store-index">
          <div className="store-name">月氏激蛋葱油餅</div>
          <div className="store-market">寧夏夜市</div>
          <button type="button" className="btn btn-light">
            看更多
          </button>
        </div>
        <div className="card-store-index">
          <div className="store-name">月氏激蛋葱油餅</div>
          <div className="store-market">寧夏夜市</div>
          <button type="button" className="btn btn-light">
            看更多
          </button>
        </div>
        <div className="card-store-index">
          <div className="store-name">月氏激蛋葱油餅</div>
          <div className="store-market">寧夏夜市</div>
          <button type="button" className="btn btn-light">
            看更多
          </button>
        </div>
      </Slider>
    </div>
  )
}

export default StoreSlider
