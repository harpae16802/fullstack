import React from 'react'
import Image from 'next/image'
import { FaSistrix } from 'react-icons/fa'
import SearchBar from '@/components/common/search-bar'

export default function SectionIndex() {
  return (
    <>
      {' '}
      <div className="simple-news">
        <div className="col-2 col-md-1">
          <h6>即時消息</h6>
        </div>
        <div className="col-10 col-md-11 news">
          <a href="#">即時消息即時消息即時消息即時消息即時消息即時消息</a>
          <a href="#">即時消息即時消息即時消息即時消息即時消息即時消息</a>
          <a href="#">即時消息即時消息即時消息即時消息即時消息即時消息</a>
          <a href="#">即時消息即時消息即時消息即時消息即時消息即時消息</a>
          <a href="#">即時消息即時消息即時消息即時消息即時消息即時消息</a>
        </div>
      </div>
      <div className="kv">
        <div className="title">一鍵搜尋，最優惠夜市小吃輕鬆網羅</div>
        <SearchBar />
      </div>
      <div className="section-index">
        <div className="index-title">最新消息</div>
        <h1>aaaaa</h1>
      </div>
      <div className="section-index">
        <div className="index-title">店家</div>
        <h1>aaaaa</h1>
      </div>
      <div className="section-index">
        <div className="index-title">商品</div>
        <h1>aaaaa</h1>
      </div>
      <div className="section-index">
        <div className="index-title">關於我們</div>
        <h1>aaaaa</h1>
      </div>
    </>
  )
}
