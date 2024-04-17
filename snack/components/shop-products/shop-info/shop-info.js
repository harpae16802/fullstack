import React, { useState } from 'react'
// 套件
import Modal from 'react-modal'
// icons
import { CgClose } from 'react-icons/cg'
import {
  FaRegClock,
  FaRegStar,
  FaRegHeart,
  FaHeart,
  FaStar,
} from 'react-icons/fa'
// fetch 網址
import { FAVORITE_STORE } from '@/components/config/api-path'
// 樣式
import style from './style.module.scss'

Modal.setAppElement('#__next')

export default function ShopInfo({
  seller_id,
  shopName = '',
  time1 = '',
  time2 = '',
  score = '',
  comment = '',
}) {
  const [isFavorite, setIsFavorite] = useState(false) // 最愛
  const [modalIsOpen, setIsModalOpen] = useState(false) // 彈窗

  // 加入收藏 - 店家
  const toggleFavoriteShop = async () => {
    try {
      const response = await fetch(`${FAVORITE_STORE}/${seller_id}`)
      const data = await response.json()
      if (data.success) {
        setIsFavorite(data.action === 'add')
      } else {
        // 處理錯誤情況
        console.error('Failed to toggle favorite:', data.error)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  // modal open
  const openModal = () => {
    setIsModalOpen(true)
  }
  // close
  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className={`row ${style.shopInfo}`}>
      <div className={`col-12 d-flex ${style.title}`}>
        <h1 className={`fw-bold mb-0`}>{shopName}</h1>
        {isFavorite ? (
          <FaHeart className={`${style.icon}`} onClick={toggleFavoriteShop} />
        ) : (
          <FaRegHeart
            className={`${style.icon}`}
            onClick={toggleFavoriteShop}
          />
        )}
      </div>
      <div className={`col-12 d-flex align-items-center`}>
        <FaRegClock className={style.icon} />
        <span className={style.span}>{time1}</span>
        <span>{time2}</span>
      </div>
      <div className={`col-12 d-flex align-items-center`}>
        <FaRegStar className={style.icon} />
        <span className={style.span}>{score}</span>
        <span>({comment})</span>
        <button className={style.comment} onClick={openModal}>
          查看評論
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="評論"
          className={style.modal}
          overlayClassName={style.overlay}
        >
          <div>
            <CgClose className={`${style.close}`} onClick={closeModal} />
          </div>
          <div className="d-flex flex-column">
            <div className={`d-flex align-items-end`}>
              <h2 className="m-0 me-1">5</h2>
              <p className="m-0">/ 5</p>
            </div>
            {/* star */}
            <div>
              {Array(5)
                .fill(1)
                .map((v) => {
                  return (
                    <FaStar
                      key={v}
                      className={`${style.star} ${style.bigStar}`}
                    />
                  )
                })}
            </div>

            {/* btn */}
            <div className={style.btnDiv}>
              {Array(9)
                .fill(1)
                .map((v) => {
                  return (
                    <button key={v} className={style.searchBtn}>
                      最新
                    </button>
                  )
                })}
            </div>

            {/* user comment */}
            <div className={style.userComment}>
              <div className={`d-flex ${style.user}`}>
                <img
                  src="/avatar.png"
                  alt=""
                  className={`rounded-circle ${style.avatar}`}
                />
                <div>
                  <p className="m-0 fw-bold">肥倫</p>
                  <div className="d-flex align-items-center">
                    {Array(5)
                      .fill(1)
                      .map((v) => (
                        <FaStar key={v} className={style.star} />
                      ))}
                    <span className={style.time}>2024.04.17</span>
                  </div>
                </div>
              </div>
              <p className="m-0">最接近橘子工坊的百香QQ綠，口味讚啦！</p>
              <div>
                <FaRegHeart className={style.icon} />
                <span>3</span>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
