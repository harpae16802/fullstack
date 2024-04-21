import React, { useState } from 'react'
//套件
import toast from 'react-hot-toast'
// icons
import { FaSistrix } from 'react-icons/fa'

export default function SearchBarSmaller({ onSearch }) {
  const [input, setInput] = useState('') // 關鍵字搜尋

  // 關鍵字搜尋
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) {
      toast.error('請輸入搜尋關鍵字')
      return
    }
    onSearch(input)
  }

  return (
    <div className="search-item">
      <div className="tab-content" id="nav-tabContent">
        {/* 由于内容重复，只保留一个tab-pane，除非有其他具体的功能 */}
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <div className="search-bar-small">
            <form
              className="d-flex justify-content-between"
              onSubmit={handleSearchSubmit}
            >
              <div className="search-icon">
                <FaSistrix className="fa-sistrix" />
              </div>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="btn btn-primary rounded-pill" type="submit">
                搜尋
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
