import React, { useState } from 'react'
// 套件
import Modal from 'react-modal'
// icons
import {
  FaRegClock,
  FaRegStar,
  FaRegHeart,
  FaHeart,
  FaStar,
  FaThumbsUp,
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
  const [isFavorite, setIsFavorite] = useState(false)
  const [modalIsOpen, setIsModalOpen] = useState(false)

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

            {/* comment */}
            <div className={`${style.comment}`}>
              <div>
                <img
                  src="12345.jpg"
                  alt=""
                  className={`rounded-circle ${style.avatar}`}
                />
                <p className="fw-bold m-0">肥倫</p>
                {/* star */}
                <div>
                  {Array(5)
                    .fill(1)
                    .map((v) => {
                      return <FaStar key={v} className={style.star} />
                    })}
                  <span>1周前</span>
                </div>
              </div>

              <p>最接近橘子工坊的百香QQ綠，口味讚啦！</p>
              <FaThumbsUp />
              <span>5</span>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
