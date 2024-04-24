import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaSistrix } from 'react-icons/fa'
// context
import { useMapContext } from '@/contexts/mapContext'
// api-path
import { MARKET_SEARCH, MARKET_MAP_SEARCH } from '@/components/config/api-path'

export default function SearchBarIndex() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('') // active 狀態 - tung
  const [searchQuery, setSearchQuery] = useState('') // 用戶搜尋 - tung
  // 使用來自context的更新地圖位置方法
  const { updateMapPosition } = useMapContext()

  const handleMapSearch = async () => {
    try {
      const response = await fetch(
        `${MARKET_MAP_SEARCH}?term=${encodeURIComponent(searchQuery)}`
      )
      const data = await response.json()
      if (data && data.lat && data.lng) {
        updateMapPosition(data.lat, data.lng, {
          market_name: data.market_name,
          market_img: data.market_img,
          market_id: data.market_id,
        })
      } else {
        console.error('API返回格式错误或未包含经纬度信息')
      }
    } catch (error) {
      console.error(`地图搜索错误: ${error}`)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()

    if (activeTab === 'info') {
      try {
        const r = await fetch(
          `${MARKET_SEARCH}/${encodeURIComponent(searchQuery)}`
        )
        const data = await r.json()

        if (data) {
          router.push({
            pathname: `/nightmarket-info/${data.market_id}`,
          })
        }
      } catch (error) {
        console.log(`地點搜尋 錯誤 : ${error}`)
      }
    } else if (activeTab === 'map') {
      // 執行地圖搜索
      await handleMapSearch()
    }
  }

  useEffect(() => {
    // 根據當前路由設置活動選項卡
    if (router.pathname.includes('info')) {
      setActiveTab('info')
    } else if (router.pathname.includes('map')) {
      setActiveTab('map')
    }
  }, [router])

  return (
    <>
      <div className="search-item">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              // className={`nav-link ${
              //   activeTab === 'info' ? 'show active' : ''
              // }`}
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              以地點搜尋
            </button>
            <button
              className="nav-link"
              //   className={`nav-link ${
              //   activeTab === 'map' ? 'show active' : ''
              // }`}
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              以地圖搜尋
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <div className="search-bar">
              <form
                className="d-flex justify-content-between"
                onSubmit={handleSearch}
              >
                <div className="search-icon">
                  <FaSistrix className="fa-sistrix" />
                </div>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary rounded-pill" type="submit">
                  搜尋
                </button>
              </form>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <div className="search-bar">
              <form
                className="d-flex justify-content-between"
                onSubmit={handleSearch}
              >
                <div className="search-icon">
                  <FaSistrix className="fa-sistrix" />
                </div>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary rounded-pill" type="submit">
                  搜尋
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
