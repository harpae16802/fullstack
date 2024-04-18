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

export default function SearchBar() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('')
  const [searchTerm, setSearchTerm] = useState('') // 用於保存搜索條件的狀態

  // 處理搜索提交的函數
  const handleSearchSubmit = async (e) => {
    e.preventDefault() // 阻止表單默認提交行為
    try {
      const response = await axios.get(`/api/search/${searchTerm}`) // 使用 axios 發起搜索請求
      // 導航到顯示詳細資訊的頁面，並帶上返回的數據
      router.push({
        pathname: '/nightmarket-info', // 假設這是顯示夜市資訊的路由
        query: { data: JSON.stringify(response.data) }, // 將夜市資訊作為查詢參數
      })
    } catch (error) {
      console.error('搜索出錯:', error)
      // 可以在這裡處理錯誤，例如顯示消息給用戶
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
          <div
            className={`tab-pane fade ${
              activeTab === 'map' ? 'show active' : ''
            }`}
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <div className="search-bar">
              <form
                className="d-flex justify-content-between"
                onSubmit={handleSearchSubmit} // 表單提交時調用 handleSearchSubmit
              >
                <div className="search-icon">
                  <FaSistrix className="fa-sistrix" />
                </div>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // 當輸入值變化時更新 searchTerm 狀態
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
