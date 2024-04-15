import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'

export default function CustomSlider() {
  const settings = {
    dots: false, // 指示點
    infinite: true, //最後一張回到第一張
    speed: 800,
    slidesToShow: 3, //一次顯示幾張
    slidesToScroll: 1, //滑動顯示幾張
    autoplay: true, // 自動輪播功能
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slide-item">
          <Image
            src="https://storage.googleapis.com/www-cw-com-tw/article/201810/article-5bd182cf13ebb.jpg"
            alt="Slide 1"
            width={250}
            height={250}
          />
        </div>
        <div className="slide-item">
          <Image
            src="https://storage.googleapis.com/www-cw-com-tw/article/201810/article-5bd182cf13ebb.jpg"
            alt="Slide 2"
            width={250}
            height={250}
          />
        </div>
        <div className="slide-item">
          <Image
            src="https://storage.googleapis.com/www-cw-com-tw/article/201810/article-5bd182cf13ebb.jpg"
            alt="Slide 3"
            width={250}
            height={250}
          />
        </div>
      </Slider>
    </div>
  )
}
