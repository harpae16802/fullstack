import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import Link from 'next/link'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {
  INDEX_INFO_DISCOUNT,
  IMAGES_SELLER,
} from '@/components/config/api-path'

function NewsSlider() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2500,
    autoplaySpeed: 2500,
    cssEase: 'linear',
  }

  // 抓首頁資料的部分
  const [listData, setListData] = useState([])

  // 抓商品資料用的
  useEffect(() => {
    fetch(`${INDEX_INFO_DISCOUNT}`)
      .then((r) => r.json())
      .then((result) => {
        // console.log(result)
        setListData(result)
      })
  }, [])
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {listData?.map((v, i) => {
          return (
            <Link href={`/shop-products/${v.seller_id}`} key={i}>
              <p>
                ‧【{v.store_name}】－ {v.name}！
                {v.market_name === '士林夜市' ? '現正優惠！' : '要買要快～'}【
                {v.market_name}】
              </p>
            </Link>
          )
        })}
      </Slider>
    </div>
  )
}

export default NewsSlider
