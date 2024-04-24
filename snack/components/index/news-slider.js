import React from 'react'
import Slider from 'react-slick'
import Link from 'next/link'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'



function NewsSlider() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2500,
    autoplaySpeed: 2500,
    cssEase: "linear",
    
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <Link href="/">
        <p>．即時消息即時消息即時消息即時消息即時消息即時消息時消息即時消息即時消息時消息即時消息即時消息時消息即時消息即時消息</p>
        </Link>
        <Link href="/">
        <p>．即時消息即時消息即時消息即時消息即時時消息即時消息即時消息時消息即時消息即時消息時消息即時消息即時消息消息即時消息</p>
        </Link>
        <Link href="/">
        <p>．即時消息即時消息即時消息即時消息即時消息即時消息時消息即時消息即時消息時消息即時消息即時消息時消息即時消息即時消息</p>
        </Link>
        <Link href="/">
        <p>．即時消息即時消息即時消息即時消息即時消息即時消息時消息即時消息即時消息時消息即時消息即時消息時消息即時消息即時消息</p>
        </Link>
        <Link href="/">
        <p>．即時消息即時消息即時消息即時消息即時消息即時消息時消息即時消息即時消息時消息即時消息即時消息時消息即時消息即時消息</p>
        </Link>
        <Link href="/">
        <p>．即時消息即時消息即時消時消息即時消息即時消息時消息即時消息即時消息時消息即時消息即時消息息即時消息即時消息即時消息</p>
        </Link>

      
      </Slider>
    </div>
  );
}


export default NewsSlider
