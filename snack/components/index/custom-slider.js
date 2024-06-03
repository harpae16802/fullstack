import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {
  INDEX_INFO_DISCOUNT,
  IMAGES_SELLER,
  API_SERVER,
} from '@/components/config/api-path'

function CustomSlider() {
  const [settings, setSettings] = useState({
    dots: false,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: null,
    nextArrow: null,
  })

  // 抓首頁資料的部分
  const [listData, setListData] = useState([])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setSettings({
          dots: false,
          className: 'center',
          centerMode: true,
          infinite: true,
          centerPadding: '60px',
          slidesToShow: 1,
          speed: 500,
          autoplay: true,
        })
      } else {
        setSettings({
          dots: false,
          infinite: true,
          speed: 1000,
          autoplaySpeed: 3500,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          prevArrow: null,
          nextArrow: null,
        })
      }
    }

    handleResize() // 初始化時呼叫一次以設定原始狀態

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
    <div className="slider-container discount-index-gruop ss">
      <Slider {...settings}>
        {Array.isArray(listData) && listData.length > 0 ? (
          listData.map((v, i) => (
            <Link className="slide-item" href={`/shop-products/${v.seller_id}`} key={i}>
              {/* 點圖片要到 咚咚的 商家頁面 */}
              <Image
                src={`${API_SERVER}/public/${v.store_image}`}
                alt="discount-img"
                className="discount-img"
                width={500}
                height={300}
              />
              <div className="discount-text discount-store">
                {v.market_name} {v.store_name}
              </div>
              <div className="discount-text discount-name">{v.name}</div>
            </Link>
          ))
        ) : (
          <div>No data available</div> // 當 listData 是空數組或未定義時顯示的內容
        )}
      </Slider>
    </div>
  )
}

export default CustomSlider
