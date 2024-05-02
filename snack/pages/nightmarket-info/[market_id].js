import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// 元件
import SectionNopaddin from '@/components/layout/section-nopaddin'
import SearchBar from '@/components/common/search-bar'
import CategoryCard from '@/components/nightmarket-info/category/category-card'
import Night from '@/components/nightmarket-info/night/night'
import ShopCard from '@/components/nightmarket-info/shop-card/shop-card'
// api-path
import {
  MARKET_SELLER,
  IMAGES_SELLER,
  CATEGORY,
  MARKET,
} from '@/components/config/api-path'
// 樣式
import style from './nightmarket-info.module.scss'

export default function NightmarketInfo({ initialMarketData }) {
  const router = useRouter()
  const { market_id } = router.query

  const [featuredShops, setFeaturedShops] = useState([]) // 夜市店家圖片(3)
  const [allShops, setAllShops] = useState([]) // 所有商家的數據

  // 食物分類，寫死
  const categories = [
    {
      id: 6,
      imgUrl: '/images/category-main.png',
      title: '主食',
      imgStyle: { top: '-50px', left: '-56px' },
    },
    {
      id: 5,
      imgUrl: '/images/category-snack.png',
      title: '小吃',
      imgStyle: { top: '-60px', left: '-56px' },
    },
    {
      id: 4,
      imgUrl: '/images/category-soup.png',
      title: '湯品',
      imgStyle: { top: '-30px', left: '-64px' },
    },
    {
      id: 3,
      imgUrl: '/images/category-sweet.png',
      title: '甜品',
      imgStyle: { top: '-50px', left: '-56px' },
    },
    {
      id: 1,
      imgUrl: '/images/category-saltynacks.png',
      title: '點心',
      imgStyle: { top: '-46px', left: '-50px' },
    },
    {
      id: 2,
      imgUrl: '/images/category-drink.png',
      title: '飲料',
      imgStyle: { top: '-40px', left: '-52px' },
    },
  ]

  const marketInfo = initialMarketData[0] || {}

  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await fetch(`${CATEGORY}?category=${categoryId}`)
      const filteredShops = await response.json()
      setAllShops(filteredShops) // 更新顯示篩選後的店家列表
      // 滑動到店家列表
      const shopListElement = document.getElementById('shopList')
      if (shopListElement) {
        shopListElement.scrollIntoView({ behavior: 'smooth' })
      }
    } catch (error) {
      console.error('獲取分類店家數據失敗:', error)
    }
  }

  useEffect(() => {
    fetch(`${MARKET_SELLER}/${market_id}`)
      .then((r) => r.json())
      .then((data) => {
        const shopImages = data.map((shop) => shop.store_image)
        setFeaturedShops(shopImages.slice(0, 3)) // 只取前三個作為特色商家圖片
        setAllShops(data) // 設置所有商家的圖片路徑
      })
      .catch((error) => {
        console.error('獲取商家數據失敗:', error)
      })
  }, [])

  return (
    <SectionNopaddin>
      <img
        src="/images/shop-banner01.jpg"
        alt="bannerAd"
        className={style.bannerAd}
      />

      <SearchBar />

      <div className={`container-fluid ${style.content}`}>
        <div className={`row ${style.category}`}>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`col-xs-6 col-md-2 d-flex justify-content-center ${style.categoryCard}`}
            >
              <CategoryCard
                {...category}
                onClick={() => handleCategoryClick(category.id)}
              />
            </div>
          ))}
        </div>

        <div className={`row`}>
          <div className="col">
            <Night
              nightName={marketInfo.market_name}
              introduction={marketInfo.market_introduction}
              nightImg={marketInfo.market_img}
              store_image={featuredShops}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <h3 className={style.shopsTitle} id="shopList">
              店家列表
            </h3>
          </div>
        </div>

        <div className={`row ${style.shopCard}`}>
          {allShops.map((seller, index) => {
            const handleCardClick = () => {
              router.push(
                `http://localhost:3000/shop-products/${seller.seller_id}`
              )
            }
            return (
              <div
                key={index}
                className={`col-3 d-flex justify-content-center ${style.col}`}
              >
                <ShopCard
                  imgUrl={`${IMAGES_SELLER}/${seller.store_image}`}
                  title={seller.store_name}
                  time1="周一到周六"
                  time2="下午5:00到上午2:00"
                  score="4.2"
                  comment="(169則留言)"
                  onClick={handleCardClick}
                />
              </div>
            )
          })}
        </div>
      </div>
    </SectionNopaddin>
  )
}

// 頁面重整時
export async function getServerSideProps(context) {
  let initialMarketData = null

  try {
    const { market_id } = context.params
    const response = await fetch(`${MARKET}/${market_id}`)
    if (response.ok) {
      initialMarketData = await response.json()
    } else {
      // 處理 API 錯誤情況
      console.error('API response error:', response.statusText)
    }
  } catch (error) {
    console.error('获取市场数据失败', error)
  }

  // 返回給組件的props
  return {
    props: {
      initialMarketData,
    },
  }
}
