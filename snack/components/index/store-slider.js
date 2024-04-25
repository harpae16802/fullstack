import React from 'react'
import Slider from 'react-slick'

export default function StoreSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  }
  return (
    <div className="slider-container">
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
