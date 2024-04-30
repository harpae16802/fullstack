import React, { useEffect, useState } from 'react'
// 套件
import Modal from 'react-modal'
import dayjs from 'dayjs'
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
// context
import { useAuth } from '@/contexts/custom-context'
// api-path
import {
  FAVORITE_STORE,
  COMMENT_DATA,
  C_FAVORITE_STORE,
  SHOP_PRODUCTS,
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
  const [filter, setFilter] = useState(null) // 評論過濾
  const [sortByNewest, setSortByNewest] = useState(false) // 最新評論
  const [sortByLikes, setSortByLikes] = useState(false)
  const [ratingsCount, setRatingsCount] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  })

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

  // 加入收藏 - 評論
  const toggleFavoriteComment = async (comment_id) => {
    try {
      if (!auth.token) {
        const willLogIn = confirm('請先登入會員')
        if (willLogIn) {
          window.location.href = '/login/login-custom'
        }
        return
      }

      const response = await fetch(
        `${SHOP_PRODUCTS}/toggle-like-comment/${comment_id}`,
        {
          headers: { ...getAuthHeader() },
        }
      )

      const data = await response.json()
      if (data.success) {
        setComments((currentComments) =>
          currentComments.map((c) =>
            c.id === comment_id
              ? {
                  ...c,
                  isFavorite: data.action === 'add',
                  likes: c.likes + (data.action === 'add' ? 1 : -1),
                }
              : c
          )
        )
      } else {
        console.error('Failed to toggle favorite:', data.error)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  // 檢查收藏 - 店家
  const checkFavoriteStatus = async () => {
    try {
      if (!auth.token) {
        // 如果未登录，暂不做任何操作
        console.log('用户未登录，暂不检查收藏状态')
        return
      }

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
  const renderStars = (scoreParam, useBigStars = false) => {
    let score = parseFloat(scoreParam || averageScore)
    let stars = []
    for (let i = 0; i < 5; i++) {
      let star
      if (score >= 1) {
        star = useBigStars ? (
          <FaStar className={`${style.star} ${style.bigStar}`} />
        ) : (
          <FaStar className={style.star} />
        )
      } else if (score > 0) {
        star = useBigStars ? (
          <FaStarHalfAlt className={`${style.star} ${style.bigStar}`} />
        ) : (
          <FaStarHalfAlt className={style.star} />
        )
      } else {
        star = useBigStars ? (
          <FaRegStar className={`${style.star} ${style.bigStar}`} />
        ) : (
          <FaRegStar className={style.star} />
        )
      }
      stars.push(React.cloneElement(star, { key: i }))
      score -= 1
    }
    return stars
  }

  // 數字的映射函數
  const mapDayToChinese = (dayNumber) => {
    const dayMapping = {
      1: '一',
      2: '二',
      3: '三',
      4: '四',
      5: '五',
    }
    return dayMapping[dayNumber] || '未知' // 如果沒有匹配到，返回'未知'
  }

  // modal open
  const openModal = () => {
    setIsModalOpen(true)
  }
  // close
  const closeModal = () => {
    setIsModalOpen(false)
  }

  const filteredComments =
    filter === null
      ? comments
      : comments.filter((comment) => comment.store_rating === filter)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const r = await fetch(`${COMMENT_DATA}/${seller_id}`)
        if (!r.ok) throw new Error('网络响应错误')
        let data = await r.json()

        // 计算评级数量
        const ratings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, all: data.length }
        data.forEach((comment) => {
          if (comment.store_rating in ratings) {
            ratings[comment.store_rating]++
          }
        })
        setRatingsCount(ratings)

        // 检查收藏状态
        const favoriteStatuses = await Promise.all(
          data.map((comment) =>
            fetch(`${SHOP_PRODUCTS}/check-like-comment/${comment.id}`, {
              headers: { ...getAuthHeader() },
            }).then((res) => res.json())
          )
        )

        // 合并收藏状态到评论数据中
        data = data.map((comment, index) => ({
          ...comment,
          isFavorite: favoriteStatuses[index].isFavorite,
        }))

        if (sortByNewest) {
          data.sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
        } else if (sortByLikes) {
          data.sort((a, b) => b.likes - a.likes)
        }

        setComments(data)
        const totalScore = data.reduce(
          (acc, curr) => acc + curr.store_rating,
          0
        )
        const average =
          data.length > 0 ? (totalScore / data.length).toFixed(1) : 0
        setAverageScore(average)
      } catch (error) {
        console.error('获取评论数据错误:', error)
      }
    }

    if (auth.token) {
      checkFavoriteStatus()
    }

    fetchComments()
  }, [seller_id, auth.token, sortByNewest, filter])

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
            <div>{renderStars(undefined, true)}</div>

            {/* btn */}
            <div className={style.btnDiv}>
              <button
                className={`${style.searchBtn} ${
                  filter === null && !sortByNewest && !sortByLikes
                    ? style.active
                    : ''
                }`}
                onClick={() => {
                  setSortByNewest(false)
                  setSortByLikes(false)
                  setFilter(null)
                }}
              >
                全部({ratingsCount.all})
              </button>

              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  className={`${style.searchBtn} ${
                    filter === rating ? style.active : ''
                  }`}
                  onClick={() => {
                    setSortByNewest(false)
                    setFilter(rating)
                    setSortByLikes(false)
                  }}
                >
                  {mapDayToChinese(rating)}星({ratingsCount[rating]})
                </button>
              ))}
              <button className={style.searchBtn}>附上照片(15)</button>
              <button
                className={`${style.searchBtn} ${
                  sortByNewest ? style.active : ''
                }`}
                onClick={() => {
                  setFilter(null)
                  setSortByNewest(true)
                }}
              >
                最新
              </button>
              <button
                className={`${style.searchBtn} ${
                  sortByLikes ? style.active : ''
                }`}
                onClick={() => {
                  setFilter(null)
                  setSortByNewest(false)
                  setSortByLikes(true)
                }}
              >
                熱門
              </button>
            </div>

            {/* user comment */}
            {filteredComments.map((comment) => {
              const formattedDate = dayjs(comment.datetime).format(
                'YYYY-MM-DD HH:mm'
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
                      <p className="m-0 fw-bold">{comment.custom_name}</p>
                      <div className="d-flex align-items-center">
                        {renderStars(comment.store_rating)}
                        <span className={style.time}>{formattedDate}</span>
                      </div>
                    </div>
                  </div>
                  <p className={`m-0`}>{comment.comment}</p>
                  <div className={style.likes}>
                    {comment.isFavorite ? (
                      <FaHeart
                        className={`${style.icon}`}
                        onClick={() => toggleFavoriteComment(comment.id)}
                      />
                    ) : (
                      <FaRegHeart
                        className={`${style.icon}`}
                        onClick={() => toggleFavoriteComment(comment.id)}
                      />
                    )}
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
