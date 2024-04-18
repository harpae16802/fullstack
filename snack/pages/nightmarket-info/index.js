import React from 'react'
import { useRouter } from 'next/router'
// 元件
import SectionNopaddin from '@/components/layout/section-nopaddin'
import SearchBar from '@/components/common/search-bar'
import CategoryCard from '@/components/nightmarket-info/category/category-card'
import Night from '@/components/nightmarket-info/night/night'
import ShopCard from '@/components/nightmarket-info/shop-card/shop-card'
// 樣式
import style from './nightmarket-info.module.scss'
import { useEffect } from 'react/cjs/react.production.min'

export default function NightmarketInfo() {
  const router = useRouter()

  // 食物分類物件，寫死
  const categories = [
    {
      imgUrl: '/images/category-main.png',
      title: '主食',
      imgStyle: { top: '-50px', left: '-56px' },
    },
    {
      imgUrl: '/images/category-snack.png',
      title: '小吃',
      imgStyle: { top: '-60px', left: '-56px' },
    },
    {
      imgUrl: '/images/category-soup.png',
      title: '湯品',
      imgStyle: { top: '-30px', left: '-64px' },
    },
    {
      imgUrl: '/images/category-sweet.png',
      title: '甜品',
      imgStyle: { top: '-50px', left: '-56px' },
    },
    {
      imgUrl: '/images/category-saltynacks.png',
      title: '點心',
      imgStyle: { top: '-46px', left: '-50px' },
    },
    {
      imgUrl: '/images/category-drink.png',
      title: '飲料',
      imgStyle: { top: '-40px', left: '-52px' },
    },
  ]

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
              <CategoryCard {...category} />
            </div>
          ))}
        </div>

        <div className={`row`}>
          <div className="col">
            <Night />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <h3 className={style.shopsTitle}>店家列表</h3>
          </div>
        </div>

        {Array(3)
          .fill(1)
          .map((v) => {
            return (
              <div key={v} className={`row ${style.shopCard}`}>
                {Array(4)
                  .fill(null)
                  .map((v, i) => (
                    <div
                      key={i}
                      className={`col d-flex justify-content-center ${style.col}`}
                    >
                      <ShopCard
                        imgUrl="/images/shop02.jpg"
                        title="加賀魷魚大王"
                        time1="周一到周六"
                        time2="下午5:00到上午2:00"
                        score="4.2"
                        comment="(169則留言)"
                      />
                    </div>
                  ))}
              </div>
            )
          })}
      </div>
    </SectionNopaddin>
  )
}
