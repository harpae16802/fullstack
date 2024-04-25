import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {
  INDEX_INFO_DISCOUNT,
  IMAGES_SELLER,
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
          console.log(result)
          // setListData(result)
        })
    }, [])

  return (
    <div className="slider-container discount-index-gruop ss">
      <Slider {...settings}>
        <Link className="slide-item" href="/">
          {/* 點圖片要到 咚咚的 商家頁面 */}
          <Image
            src="/images/layout/P_20240224_194256.jpg"
            alt="discount-img"
            className="discount-img"
            width={500}
            height={300}
          />
          <div className="discount-text discount-store">士林夜市 林藤茶坊</div>
          <div className="discount-text discount-name">滿百折三十</div>
        </Link>
        <Link className="slide-item" href="/">
          {/* 點圖片要到 咚咚的 商家頁面 */}
          <Image
            src="/images/layout/P_20240224_194256.jpg"
            alt="discount-img"
            className="discount-img"
            width={500}
            height={300}
          />
          <div className="discount-text discount-store">士林夜市 林藤茶坊</div>
          <div className="discount-text discount-name">滿百折三十</div>
        </Link>
        <Link className="slide-item" href="/">
          {/* 點圖片要到 咚咚的 商家頁面 */}
          <Image
            src="/images/layout/P_20240224_194256.jpg"
            alt="discount-img"
            className="discount-img"
            width={500}
            height={300}
          />
          <div className="discount-text discount-store">士林夜市 林藤茶坊</div>
          <div className="discount-text discount-name">滿百折三十</div>
        </Link>
        <Link className="slide-item" href="/">
          {/* 點圖片要到 咚咚的 商家頁面 */}
          <Image
            src="/images/layout/P_20240224_194256.jpg"
            alt="discount-img"
            className="discount-img"
            width={500}
            height={300}
          />
          <div className="discount-text discount-store">士林夜市 林藤茶坊</div>
          <div className="discount-text discount-name">滿百折三十</div>
        </Link>
        <Link className="slide-item" href="/">
          {/* 點圖片要到 咚咚的 商家頁面 */}
          <Image
            src="/images/layout/P_20240224_194256.jpg"
            alt="discount-img"
            className="discount-img"
            width={500}
            height={300}
          />
          <div className="discount-text discount-store">士林夜市 林藤茶坊</div>
          <div className="discount-text discount-name">滿百折三十</div>
        </Link>
        <Link className="slide-item" href="/">
          {/* 點圖片要到 咚咚的 商家頁面 */}
          <Image
            src="/images/layout/P_20240224_194256.jpg"
            alt="discount-img"
            className="discount-img"
            width={500}
            height={300}
          />
          <div className="discount-text discount-store">士林夜市 林藤茶坊</div>
          <div className="discount-text discount-name">滿百折三十</div>
        </Link>
      </Slider>
    </div>
  )
}

export default CustomSlider
