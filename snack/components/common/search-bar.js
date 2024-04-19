// import React from 'react'
// import { FaSistrix } from 'react-icons/fa'

// export default function SearchBar() {
//   return (
//     <>
//       <div className="search-item">
//         <nav>
//           <div className="nav nav-tabs" id="nav-tab" role="tablist">
//             <button
//               className="nav-link active"
//               id="nav-home-tab"
//               data-bs-toggle="tab"
//               data-bs-target="#nav-home"
//               type="button"
//               role="tab"
//               aria-controls="nav-home"
//               aria-selected="true"
//             >
//               以地點搜尋
//             </button>
//             <button
//               className="nav-link"
//               id="nav-profile-tab"
//               data-bs-toggle="tab"
//               data-bs-target="#nav-profile"
//               type="button"
//               role="tab"
//               aria-controls="nav-profile"
//               aria-selected="false"
//             >
//               以地圖搜尋
//             </button>
//           </div>
//         </nav>
//         <div className="tab-content" id="nav-tabContent">
//           <div
//             className="tab-pane fade show active"
//             id="nav-home"
//             role="tabpanel"
//             aria-labelledby="nav-home-tab"
//           >
//             <div className="search-bar">
//               <form className="d-flex justify-content-between">
//                 <div className="search-icon">
//                   <FaSistrix className="fa-sistrix" />
//                 </div>
//                 <input
//                   className="form-control me-2"
//                   type="search"
//                   placeholder="Search"
//                   aria-label="Search"
//                 />
//                 <button className="btn btn-primary rounded-pill" type="submit">
//                   搜尋
//                 </button>
//               </form>
//             </div>
//           </div>
//           <div
//             className="tab-pane fade"
//             id="nav-profile"
//             role="tabpanel"
//             aria-labelledby="nav-profile-tab"
//           >
//             <div className="search-bar">
//               <form className="d-flex justify-content-between">
//                 <div className="search-icon">
//                   <FaSistrix className="fa-sistrix" />
//                 </div>
//                 <input
//                   className="form-control me-2"
//                   type="search"
//                   placeholder="Search"
//                   aria-label="Search"
//                 />
//                 <button className="btn btn-primary rounded-pill" type="submit">
//                   搜尋
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FaSistrix } from 'react-icons/fa'
// api-path
import { MARKET_SEARCH } from '@/components/config/api-path'

export default function SearchBar() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('') // active 狀態 - tung
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
              className={`nav-link ${activeTab === 'info' ? 'active' : ''}`}
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected={activeTab === 'info'}
              onClick={() => setActiveTab('info')}
            >
              以地點搜尋
            </button>
            <button
              className={`nav-link ${activeTab === 'map' ? 'active' : ''}`}
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected={activeTab === 'map'}
              onClick={() => setActiveTab('map')}
            >
              以地圖搜尋
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className={`tab-pane fade ${
              activeTab === 'info' ? 'show active' : ''
            }`}
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
            className={`tab-pane fade ${
              activeTab === 'map' ? 'show active' : ''
            }`}
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <div className="search-bar">
              <form className="d-flex justify-content-between">
                <div className="search-icon">
                  <FaSistrix className="fa-sistrix" />
                </div>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
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
