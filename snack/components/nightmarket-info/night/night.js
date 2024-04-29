import React, { useEffect, useState } from 'react'
import Link from 'next/link'
// icons
import { FaBusAlt } from 'react-icons/fa'
// api-path
import {
  IMAGES_NIGHT,
  IMAGES_SELLER,
  TAIPEI_BUS,
} from '@/components/config/api-path'
// 樣式
import style from './style.module.scss'

export default function Night({
  nightName = '',
  introduction = '',
  nightImg = '',
  store_image = '',
  market_id,
}) {
  const [uniqueBusStops, setUniqueBusStops] = useState([])

  useEffect(() => {
    fetch(`${TAIPEI_BUS}/${market_id}/500`)
      .then((r) => r.json())
      .then((data) => {
        const seen = new Map()
        const uniqueStops = data.filter((stop) => {
          const duplicate = seen.has(stop.StopName)
          seen.set(stop.StopName, true)
          return !duplicate
        })

        setUniqueBusStops(uniqueStops)
      })
      .catch((error) => {
        console.error('獲取商家數據失敗:', error)
      })
  }, [])

  return (
    <div className={`${style.container}`}>
      {/* 標題 */}
      <div className="row">
        <div className="col-12">
          <h1 className={style.nightName}>{nightName}</h1>
        </div>
      </div>

      {/* 夜市資訊 */}
      <div className={`row ${style.nightInfo}`}>
        {/* 桌面版 */}
        <div className={`col-lg-8 d-none d-lg-block ${style.left}`}>
          <img
            src={`${IMAGES_NIGHT}/${nightImg}`}
            alt={nightImg}
            className={style.bigImage}
          />

          <Link href="#shopList" className={`btn btn-light ${style.shopList}`}>
            店家列表
          </Link>

          <div className={`row`}>
            {store_image.map((imgUrl, index) => {
              return (
                <div className={`col-4`}>
                  <img
                    src={`${IMAGES_SELLER}/${imgUrl}`}
                    alt={`商店圖片 ${index}`}
                    className={`${style.smallImage}`}
                  />
                </div>
              )
            })}
          </div>
        </div>
        {/* 手機版 */}
        <div className="col-12 d-lg-none p-0 mb-2">
          <div className={`d-flex overflow-auto ${style.scrollbar}`}>
            <img
              src={`/images/night/${nightImg}`}
              alt={nightImg}
              className={`${style.mobileImg} img-fluid`}
            />
            <img
              src="/images/shop02.jpg"
              alt="商店一"
              className={`${style.mobileImg} img-fluid`}
            />
            <img
              src="/images/shop02.jpg"
              alt="商店二"
              className={`${style.mobileImg} img-fluid`}
            />
            <img
              src="/images/shop02.jpg"
              alt="商店三"
              className={`${style.mobileImg} img-fluid`}
            />
          </div>
        </div>

        {/* 右邊文字資訊 */}
        <div className={`col-12 col-lg-4 pt-0 pb-0 ${style.right}`}>
          <div className="row">
            <p className={`p-0 ${style.p}`}>{introduction}</p>
          </div>
          <div className={`row ${style.traffic}`}>
            <div className={style.title}>
              <FaBusAlt className={style.icon} />
              <h4 className={`m-0 fw-bold`}>大眾交通資訊</h4>
            </div>
            {uniqueBusStops.map((stop, index) => (
              <div key={index} className={style.trafficInfo}>
                <div>
                  <span className={`pe-4`}>公車站</span>
                  <span>{stop.StopName}</span>
                </div>
                <span>350公尺</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
