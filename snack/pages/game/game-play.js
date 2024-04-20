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
import QrcodeCurrent from '@/components/modal/qrcodeCurrent'
import GameRule from '@/components/modal/game-rule'

export default function GamePlay() {
  const divStyle = {
    padding: '0px',
  }
  return (
    <>
      <div className="game-play-page">
        {/* <QrcodeCurrent /> */}
        {/* <GameRule /> */}
        {/* <div className="black-mode black-show"></div> */}
        <div className="game-main">
          <div className="time-table">
            <div className="level">第一關</div>
            <div className="table-bottom">
              <div className="time-group">
                <div className="time-text">剩餘時間</div>
                <div className="game-seconds">01:00</div>
              </div>
              <div className="point-group">
                <div className="point-text">剩餘分數</div>
                <div className="game-point">1000</div>
              </div>
            </div>
          </div>
          <div className="play-div ">
            <div className="balloon-play">
              <img
                src="/images/game/ballon.png"
                className="balloon-obj"
                alt="..."
              />
              <img
                src="/images/game/ballon.png"
                className="balloon-obj"
                alt="..."
              />
            </div>
          </div>
        </div>
        
        {/* <div className="chara-group">
          <div className="talk-group">
            <div class="triangle"></div>
            <div className="talk">
              呼～總算把這些氣球全部射下來了！
              <br />
              雖然只是從遙遠的垃圾變成近一點的垃圾......
            </div>
          </div>
          <div className="character">
            {' '}
            <img
              src="/images/game/cha01.png"
              className="character-obj"
              alt="..."
            />
          </div>
        </div> */}
      </div>
    </>
  )
}
