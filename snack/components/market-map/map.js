import React, { useEffect, useState } from 'react'
// 套件
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
// context
import { useMapContext } from '@/contexts/mapContext'
// fetch 網址
import { MARKET_DATA, IMAGES_NIGHT } from '@/components/config/api-path'
// 樣式
import style from './style.module.scss'

// 創建一個新的組件用來更新地圖的位置
function MapUpdater({ mapPosition }) {
  const map = useMap() // 使用useMap hook獲取地圖實例

  useEffect(() => {
    if (mapPosition.lat && mapPosition.lng) {
      const newPosition = new L.LatLng(mapPosition.lat, mapPosition.lng)
      map.panTo(newPosition)

      const details = mapPosition.details
      const popupContent = `
      <div class=${style.card}>
      <img
        src="${IMAGES_NIGHT}/${details.market_img}"
        alt=${details.market_img}
        class=${style.img}
      />
      <div class="d-flex justify-content-between ${style.text}">
        <div>
          <h4 class="fw-bold">${details.market_name}</h4>
          <a href="#" class="text-decoration-none ${style.a}">
            看更多夜市介紹
          </a>
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
      L.popup({ className: style.popup })
        .setLatLng(newPosition)
        .setContent(popupContent)
        .openOn(map)
    }
  }, [map, mapPosition])

  return null // 這個組件不渲染任何jsx元素
}

const MapComponent = () => {
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
      style={{ height: '72vh', width: '100%' }}
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
                src={`${IMAGES_NIGHT}/${point.market_img}`}
                alt=""
                className={style.img}
              />
              <div className={`d-flex justify-content-between ${style.text}`}>
                <div>
                  <h4 className="fw-bold">{point.market_name}</h4>
                  <a href="#" className={`text-decoration-none ${style.a}`}>
                    看更多夜市介紹
                  </a>
                </div>
                <div
                  className={`d-flex justify-content-center align-items-center ${style.score}`}
                >
                  <h6 className="fw-bold m-0">4.7</h6>
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
