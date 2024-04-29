import React, { useEffect, useState } from 'react'
// 套件
import Modal from 'react-modal'
import dayjs from 'dayjs'
// 元件
import { useAuth } from '@/contexts/custom-context'
// icons
import { CgClose } from 'react-icons/cg'
import {
  FaRegClock,
  FaRegStar,
  FaRegHeart,
  FaHeart,
  FaStar,
  FaStarHalfAlt,
} from 'react-icons/fa'
// api-path
import {
  FAVORITE_STORE,
  COMMENT_DATA,
  C_FAVORITE_STORE,
} from '@/components/config/api-path'
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
  const { auth, getAuthHeader } = useAuth()

  const [isFavorite, setIsFavorite] = useState(false) // 最愛
  const [modalIsOpen, setIsModalOpen] = useState(false) // 彈窗
  const [comments, setComments] = useState([]) // 渲染評論
  const [averageScore, setAverageScore] = useState(0) // 店家評分

  // 加入收藏 - 店家
  const toggleFavoriteShop = async () => {
    try {
      if (!auth.token) {
        const willLogIn = confirm('請先登入會員')
        if (willLogIn) {
          window.location.href = '/login/login-custom'
        }
        return
      }

      const response = await fetch(`${FAVORITE_STORE}/${seller_id}`, {
        headers: { ...getAuthHeader() },
      })

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

  // 檢查收藏
  const checkFavoriteStatus = async () => {
    if (!auth.token) {
      // 如果未登录，暂不做任何操作
      console.log('用户未登录，暂不检查收藏状态')
      return
    }

    try {
      const r = await fetch(`${C_FAVORITE_STORE}/${seller_id}`, {
        headers: { ...getAuthHeader() },
      })
      if (!r.ok) throw new Error('网络回应错误')
      const data = await r.json()
      if (data.isFavorite !== undefined) {
        setIsFavorite(data.isFavorite)
      }
    } catch (error) {
      console.error('检查收藏状态时出错:', error)
    }
  }

  // 用於渲染星星的函數
  const renderStars = () => {
    let score = parseFloat(averageScore)
    let stars = []
    for (let i = 0; i < 5; i++) {
      if (score >= 1) {
        stars.push(
          <FaStar key={i} className={`${style.star} ${style.bigStar}`} />
        )
      } else if (score > 0) {
        stars.push(
          <FaStarHalfAlt key={i} className={`${style.star} ${style.bigStar}`} />
        )
      } else {
        stars.push(
          <FaRegStar key={i} className={`${style.star} ${style.bigStar}`} />
        )
      }
      score -= 1
    }
    return stars
  }

  // modal open
  const openModal = () => {
    setIsModalOpen(true)
  }
  // close
  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    // 撈 comment 資料
    const fetchComments = async () => {
      try {
        const r = await fetch(`${COMMENT_DATA}/${seller_id}`)

        if (!r.ok) throw new Error('網絡回應錯誤')
        const data = await r.json()
        setComments(data)
        // 計算平均分數
        const totalScore = data.reduce(
          (acc, curr) => acc + curr.store_rating,
          0
        )
        const average =
          data.length > 0 ? (totalScore / data.length).toFixed(1) : 0
        setAverageScore(average) // 設定平均分數
      } catch (error) {
        console.error('撈取 comment 資料錯誤:', error)
      }
    }

    if (auth.token) {
      checkFavoriteStatus()
    }

    fetchComments()
  }, [seller_id, auth.token])

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
              <h2 className="m-0 me-1">{averageScore}</h2>
              <p className="m-0">/ 5</p>
            </div>
            {/* star */}
            <div>{renderStars()}</div>

            {/* btn */}
            <div className={style.btnDiv}>
              <button className={`${style.searchBtn}`}>全部(15)</button>
              <button className={style.searchBtn}>五星(15)</button>
              <button className={style.searchBtn}>四星(15)</button>
              <button className={style.searchBtn}>三星(15)</button>
              <button className={style.searchBtn}>一星(15)</button>
              <button className={style.searchBtn}>附上照片(15)</button>
              <button className={style.searchBtn}>最新</button>
              <button className={style.searchBtn}>熱門</button>
            </div>

            {/* user comment */}
            {comments.map((comment, index) => {
              const formattedDate = dayjs(comment.datetime).format(
                'YYYY-MM-DD HH:mm:ss'
              )
              return (
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
                        <span className={style.time}>{formattedDate}</span>
                      </div>
                    </div>
                  </div>
                  <p className={`m-0`}>{comment.comment}</p>
                  <div className={style.likes}>
                    <FaRegHeart className={style.icon} />
                    <span>{comment.likes}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </Modal>
      </div>
    </div>
  )
}
