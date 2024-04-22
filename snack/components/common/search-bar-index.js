import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FaSistrix } from 'react-icons/fa'
// api-path
import { MARKET_SEARCH } from '@/components/config/api-path'

export default function SearchBarIndex() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('') // 用戶搜尋 - tung

  const handleSearch = async (e) => {
    e.preventDefault()

    try {
      const r = await fetch(
        `${MARKET_SEARCH}/${encodeURIComponent(searchQuery)}`
      )
      const data = await r.json()

      if (data) {
        router.push({
          pathname: '/nightmarket-info',
          query: { data: JSON.stringify(data) },
        })
      }
    } catch (error) {
      console.log(`執行搜尋錯誤 : ${error}`)
    }
  }

  return (
    <>
      <div className="search-item">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
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
