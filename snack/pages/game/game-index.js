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
import { useAuth } from '@/contexts/custom-context'
import toast, { Toaster } from 'react-hot-toast'

import { useRouter } from 'next/router'

export default function GameIndex() {
  const router = useRouter() // 使用 useRouter 鉤子獲取路由信息

  const { auth } = useAuth()
  const startSelect = () => {
    if (!auth.custom_id) {
      
      toast.error('您尚未登入', {
        duration: 1500,
        style: {
          color: '#ff0101',
        },
        iconTheme: {
          primary: '#ff0101',
          secondary: '#ffffff',
        },
      })
      return;
    }
    // 在這裡處理開始遊戲的邏輯
    

    console.log( auth.custom_id);
    router.push(`/game/game-select`);
  }
  return (
    <>
      <Section>
        <div className="game-index">
          <div className="lampR">
            <img
              src="/images/game/lampR.png"
              className="lamp-right"
              alt="..."
            />
          </div>
          <div className="lampL">
            <img src="/images/game/lampL.png" className="lamp-left" alt="..." />
          </div>
          <div className="game-rule col-md-7 col-12">
            <div className="left col-12 col-md-6">
              <img
                src="/images/game/game-main.png"
                className="lamp-left"
                alt="..."
              />
            </div>
            <div className="right col-12 col-md-6">
              <div className="t1">本次的遊戲是......</div>
              <div className="t2">【夜市射氣球】</div>
              <div className="t3">
                ．點擊氣球，累積達到通關需求點數並破關！
                <br />
                ．通關拿到點數，可用於本站購物折扣！
                <br />
                ．除了初次通關還有多次通關的成就，成就達成後可以獲得更多點數喔！
              </div>
              <div className="t4">
                跟隨小獵人的腳步
                <br />
                挑戰射氣球吧！
              </div>
            </div>
          </div>
          <div className="cha-start col-md-4 col-12">
            <div className="chara-group">
              <div className="talk-group">
                <div className="triangle"></div>
                <div className="talk">
                  那邊好像有什麼騷動？
                  <br />
                  去看看好了！
                </div>
              </div>
              <div className="character">
                {' '}
                <img
                  src="/images/game/cha02.png"
                  className="character-obj"
                  alt="..."
                />
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={startSelect}>
              前往關卡
            </button>
          </div>
          <div className="vendor">
            <img
              src="/images/game/vendor.png"
              className="vendor-line"
              alt="..."
            />
          </div>
        </div>
        <Toaster />
      </Section>
    </>
  )
}
