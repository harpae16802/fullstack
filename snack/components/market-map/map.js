import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// 套件
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
// context
import { useMapContext } from '@/contexts/mapContext'
// fetch 網址
import { MARKET_DATA, API_SERVER } from '@/components/config/api-path'
// 樣式
import style from './style.module.scss'

// 創建一個新的組件用來更新地圖的位置
function MapUpdater({ mapPosition }) {
  const map = useMap() // 使用useMap hook獲取地圖實例
  const router = useRouter()

  useEffect(() => {
    if (mapPosition.lat && mapPosition.lng) {
      const newPosition = new L.LatLng(mapPosition.lat, mapPosition.lng)
      map.panTo(newPosition)

      const details = mapPosition.details

      const popupContent = `
      <div class=${style.card}>
      <img
        src="${API_SERVER}/${details.market_img}"
        alt=${details.market_img}
        class=${style.img}
      />
      <div class="d-flex justify-content-between ${style.text}">
        <div>
          <h4 class="fw-bold">${details.market_name}</h4>
          <button id="seeMoreButton" class="text-decoration-none ${style.seeMore}" >
            看更多夜市介紹
          </button>
        </div>
        <div
          class="d-flex justify-content-center align-items-center ${style.score}"
        >
          <h6 class="fw-bold m-0">4.7</h6>
        </div>
      </div>
    </div>
      `

      // 使用傳入的消息創建並顯示Popup
      const popup = L.popup({ className: style.popup })
        .setLatLng(newPosition)
        .setContent(popupContent)
        .openOn(map)

      // 添加点击事件处理程序，导航到相应的夜市信息页面
      popup
        .getElement()
        .querySelector('#seeMoreButton')
        .addEventListener('click', () => {
          router.push(`/nightmarket-info/${details.market_id}`) // 导航到目标 URL
        })
    }
  }, [map, mapPosition, router])

  return null // 這個組件不渲染任何jsx元素
}

const MapComponent = () => {
  const router = useRouter()
  const { mapPosition } = useMapContext()

  // 所有夜市
  const [places, setPlaces] = useState([])

  // 地圖預設顯示台灣中心點
  const centerPosition = [23.973875, 120.982024]

  // 自定義地圖 maker
  const createCustomIcon = (market_name) => {
    return new L.divIcon({
      className: style.btn,
      html: `<button class="${style.placeBtn}">${market_name}</button>`,
      iconSize: L.point(30, 30),
      iconAnchor: [30, 30],
    })
  }

  // 撈資料呈現
  useEffect(() => {
    const fetchData = async () => {
      try {
        const r = await fetch(MARKET_DATA)
        if (!r.ok) {
          throw new Error('Network response 錯誤')
        }
        const data = await r.json()
        setPlaces(
          data.map((place) => ({
            ...place,
            position: place.latitude_and_longitude.split(', ').map(Number),
          }))
        )
      } catch (error) {
        console.log('fetch 錯誤:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <MapContainer
      center={centerPosition}
      zoom={8}
      style={{ height: '80vh', width: '100%' }}
    >
      <MapUpdater mapPosition={mapPosition} /> {/* 新增的組件來更新地圖 */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {places.map((point) => (
        <Marker
          key={point.market_id}
          position={point.position}
          icon={createCustomIcon(point.market_name)}
        >
          <Popup offset={L.point(46, -24)} className={style.popup}>
            <div className={style.card}>
              <img
                src={`${API_SERVER}/${point.market_img}`}
                alt=""
                className={style.img}
              />
              <div className={`d-flex justify-content-between ${style.text}`}>
                <div>
                  <h4 className="fw-bold">{point.market_name}</h4>
                  <button
                    className={`text-decoration-none ${style.seeMore}`}
                    onClick={() =>
                      router.push(`/nightmarket-info/${point.market_id}`)
                    }
                  >
                    看更多夜市介紹
                  </button>
                </div>
                <div
                  className={`d-flex justify-content-center align-items-center ${style.score}`}
                >
                  <h6 className="fw-bold m-0">
                    {Number(point.average_night_rating).toFixed(1)}
                  </h6>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default MapComponent
