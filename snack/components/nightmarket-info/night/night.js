import React, { useEffect, useState } from 'react'
import Link from 'next/link'
// icons
import { FaBusAlt, FaCarAlt } from 'react-icons/fa'
// api-path
import {
  IMAGES_NIGHT,
  IMAGES_SELLER,
  BUS_AND_DISTANCE,
  CART_STOPS,
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
  const [carStops, setcarStops] = useState([])

  useEffect(() => {
    fetch(`${BUS_AND_DISTANCE}/${market_id}`)
      .then((r) => r.json())
      .then((data) => {
        // 創建一個新的 Map 以存儲已經見過的站點名稱
        const seenStopNames = new Map()

        const filteredData = data.filter((stop) => {
          const normalizedName = stop.stopName.trim().toLowerCase() // 正規化站點名稱
          if (!seenStopNames.has(normalizedName)) {
            seenStopNames.set(normalizedName, true)
            return true // 站點名稱未出現過，保留這個站點
          }
          return false // 已經存在的站點名稱，過濾掉
        })

        setUniqueBusStops(filteredData)
      })
      .catch((error) => {
        console.error('獲取商家數據失敗:', error)
      })

    // ------------

    fetch(`${CART_STOPS}/${market_id}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data || !data.CarParkList) {
          console.error('Car stops data is not in the expected format:', data)
          throw new Error('Data format error')
        }
        setcarStops(data.CarParkList)
      })
      .catch((error) => {
        console.error('Error fetching car stops data:', error)
      })
  }, [market_id])

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
                  <span>{stop.stopName}</span>
                </div>
                <span>走路約 {stop.walkingTime} 分鐘</span>
              </div>
            ))}

            <div className={style.title}>
              <FaCarAlt className={style.icon} />
              <h4 className={`m-0 fw-bold`}>停車場</h4>
            </div>
            {carStops.map((stop, index) => (
              <div key={index} className={style.trafficInfo}>
                <div>
                  <span>{stop.CarParkName}</span>
                </div>
                <span>共 {stop.TotalSpaces} 個車位</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
