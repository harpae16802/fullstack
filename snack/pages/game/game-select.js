import Section from '@/components/layout/section'
import React, { useState } from 'react'
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
import { useSelectedLevel } from '@/contexts/LevelContext'; // 引入剛剛創建的上下文


export default function GameSelect() {
  const router = useRouter() // 使用 useRouter 鉤子獲取路由信息
  const { selectedLevel,setSelectedLevel } = useSelectedLevel(); // 使用選擇的關卡值上下文
  const { auth } = useAuth()
  const startGame = () => {
    if (!selectedLevel) {
       // 登入失敗，顯示錯誤訊息
      toast.error('請選擇一個關卡', {
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
    

    console.log('選擇的關卡:', selectedLevel, 'ID:', auth.custom_id);
    router.push(`/game/game-play`);
  }

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
            <select className="form-select" aria-label="Default select example" value={selectedLevel || ''}
          onChange={(e) => {
            setSelectedLevel(e.target.value)
          }}>
              <option value="">請選擇關卡</option>
              <option value={1}>第一關</option>
              <option value={2}>第二關</option>
              <option value={3}>第三關</option>
              <option value={4}>第四關</option>
              <option value={5}>第五關</option>
            </select>
            <button type="button" className="btn btn-primary" onClick={startGame}>
              開始遊戲
            </button>
          </div>
        </div>
        <Toaster />
    </>
  )
}
