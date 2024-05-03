import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import Link from 'next/link'
import { INDEX_INFO_STORE,IMAGES_SELLER } from '@/components/config/api-path'

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
  const [settings, setSettings] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    autoplay: false,
  })

  // 抓首頁資料的部分
  const [listData, setListData] = useState([])

  // 箭頭的useEffect

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
          prevArrow: null,
          nextArrow: null,
          autoplay: false,
        })
      } else {
        setSettings({
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 4,
          prevArrow: <CustomPrevArrow />,
          nextArrow: <CustomNextArrow />,
          autoplay: false,
        })
      }
    }

    handleResize() // 初始化時呼叫一次以設定原始狀態

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 抓資料
  useEffect(() => {
    fetch(`${INDEX_INFO_STORE}`)
      .then((r) => r.json())
      .then((result) => {
        // console.log(result)
        setListData(result)
      })
  }, [])

  return (
    <div className="slider-container store-index-gruop">
      <Slider {...settings}>
        {listData?.map((v, i) => {
          return (
            <div className="card-store-index" key={i}>
              <img
                src={`${IMAGES_SELLER}/${v.store_image}`}
                alt="store-img"
                className="store-img"
              />
              <div className="store-name">{v.store_name}</div>
              <div className="store-market">{v.market_name}</div>
              <Link type="button" className="btn btn-light" href={`/shop-products/${v.seller_id}`}>
                  看更多
              </Link>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default StoreSlider
