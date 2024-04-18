import Section from '@/components/layout/section'
import React from 'react'
import Image from 'next/image'
import SearchBar from '@/components/common/search-bar'
// 用在分頁的icon
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa'

export default function GameSelect() {
  return (
    <>
        <div className="game-select-page">
          <div className="select-content">
            <div className="game-title">
              <div className="game-text">夜</div>
              <div className="game-text">市</div>
              <div className="game-text">射</div>
              <div className="game-text">氣</div>
              <div className="game-text">球</div>
            </div>
            <select className="form-select" aria-label="Default select example">
              <option selected="">請選擇關卡</option>
              <option value={1}>第一關</option>
              <option value={2}>第二關</option>
              <option value={3}>第三關</option>
              <option value={4}>第四關</option>
              <option value={5}>第五關</option>
            </select>
            <button type="button" className="btn btn-primary">
              開始遊戲
            </button>
          </div>
        </div>
    </>
  )
}
