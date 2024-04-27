// pages/seller-basic-data/reviews.js
import React, { useEffect, useState, useContext, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { SELLER_API, COMMENT } from './config'
import { useRouter } from 'next/router'
import { useSeller } from '../../contexts/SellerContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import Section from '@/components/layout/section'
import styles from '../../styles/navbar-seller.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import ReplyModal from '@/components/ReplyModal'
import ReplySuccessModal from '@/components/ReplySuccessModal'
import { Modal, Button, Form } from 'react-bootstrap'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Reviews() {
  // 使用 useRouter
  const router = useRouter()

  // 使用useRef 作為拿取DOM元素操作
  const fileInputRef = useRef(null)

  //拿取seller_id
  const { seller } = useSeller()
  const sellerId = seller?.id

  // 賣家頭像 初始與更新
  const [imageVersion, setImageVersion] = useState(0)

  // 修改賣家資料 後 的狀態
  const [sellerData, setSellerData] = useState({
    profilePicture: '',
  })

  // 評論區
  const [comments, setComments] = useState([])

  // 動畫
  const [loading, setLoading] = useState(true)

  // 評論區的篩選
  const [filterRating, setFilterRating] = useState('')

  // 回覆系統的初始直
  const [showModal, setShowModal] = useState(false)
  const [selectedCommentId, setSelectedCommentId] = useState(null)
  const [commentContent, setCommentContent] = useState('')
  const [replySuccess, setReplySuccess] = useState(false)

  // 使用Ref
  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  // 總查詢
  useEffect(() => {
    console.log('index.js中的sellerId', sellerId)
    if (sellerId) {
      axios
        .get(`${SELLER_API}${sellerId}`)
        .then((response) => {
          const data = response.data.data // 注意确保这里的路径正确
          console.log(data) // 查看数据结构

          setSellerData((prevData) => ({
            ...prevData,
            profilePicture: data.profile_picture || '',
          }))
        })
        .catch((error) => {
          console.error('获取商家信息失败', error)
        })
    }
    fetchData()
 
    
  }, [sellerId])

  // 過濾評論
  const filteredComments = comments.filter((comment) =>
    filterRating ? comment.store_rating === parseInt(filterRating) : true
  )
  // 星星圖標
  const renderStars = (count) => {
    let stars = ''
    for (let i = 0; i < count; i++) {
      stars += '★'
    }
    return stars
  }
  // 評論區星星
  const renderCommentStars = (count) => {
    let stars = []
    for (let i = 0; i < count; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} key={i} />)
    }
    return <>{stars}</>
  }

  // 拿取評論
  const fetchData = async () => {
    try {
      const response = await axios.get(`${COMMENT}/${sellerId}`)
      setComments(response.data) //設定評論
    } catch (error) {
      console.error('獲取評論失敗:', error)
    }
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  // 篩選評論
  const handleRatingChange = (event) => {
    setLoading(true); 
    setFilterRating(event.target.value);
    fetchData();
  }

  // 回覆系統
  const handleReplyClick = (commentId, commentContent) => {
    setSelectedCommentId(commentId)
    setCommentContent(commentContent)
    setShowModal(true)
  }
  const submitReply = async (commentId, reply) => {
    try {
      await axios.post(`${COMMENT}/reply/${commentId}`, {
        seller_id: sellerId,
        reply,
      })
      fetchData()
      setReplySuccess(true)
    } catch (error) {
      console.error('回复提交失败', error)
    }
  }

  // 更新賣家 頭貼 包含顯示
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('profilePicture', file)

    axios
      .put(`${SELLER_API}${sellerId}/edit/profilePicture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        alert('頭像上傳成功')
        setImageVersion((prevVersion) => prevVersion + 1) // 更新imageVersion以刷新图片
        setSellerData((prevData) => ({
          ...prevData,
          profilePicture: response.data.imageUrl, // 使用后端返回的新图片路径
        }))
      })
      .catch((error) => {
        console.error('頭像上傳失敗', error)
        alert('頭像上傳失敗')
      })
  }

  return (
    <Section className={styles.sellerBasicSection}>
      <div className={`container mt-5`}>
        <div className="row">
          {/* 導覽列 */}
          <div className={`col-md-3 col-12`}>
            {/* 這裡的賣家頭像直接連結伺服器 */}
            <div className={styles.profileContainer}>
              <div className={styles.profileWrapper}>
                <img
                  src={`http://localhost:3002/public/seller/${sellerData.profilePicture}?v=${imageVersion}`}
                  alt="賣家頭像"
                  className={styles.profilePicture}
                  style={{
                    border: '2px solid black',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50px',
                  }}
                  onClick={handleImageClick} // 使用handleImageClick
                />

                <input
                  type="file"
                  id="profilePictureInput"
                  style={{ display: 'none' }}
                  ref={fileInputRef} // 將ref賦予到DOM元素
                  onChange={handleProfilePictureChange}
                />
              </div>
              {/* 這裡的賣家頭像直接連結伺服器 */}
              <div
                className={styles.sellerSidebarWrapper}
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <ul className="list-unstyled">
                  <li className={styles.navListItem}>
                    <Link href="/seller-basic-data/" passHref>
                      <span className={styles.navLink}>商家基本資料</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/seller-basic-data/bank" passHref>
                      <span className={styles.navLink}>銀行帳號設定</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/seller-basic-data/orderList">
                      <span className={styles.navLink}>訂單管理</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/seller-basic-data/addProduct">
                      <span className={styles.navLink}>上架商品</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/seller-basic-data/producutsList">
                      <span className={styles.navLink}>產品列表</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/seller-basic-data/reviews">
                      <span className={styles.navLink}>賣家評論區</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/seller-basic-data/QRcode">
                      <span className={styles.navLink}>QRcode掃描區</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/seller-basic-data/ad">
                      <span className={styles.navLink}>廣告投放</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* 導覽列 */}
          <div className="col-md-1 col-12"></div> {/* 用於分隔 */}
          {/* 表單 */}
       
          <div className="col-md-8 col-12">
            <div className={styles.formCard}>
              <div className={styles.formWrapper}>
                <h2 className={`${styles.formTitle}`}>賣家評論區</h2>
                {/* 篩選 */}
          
                <div className={styles.selectGroup}>
                  <div className="col-md-auto col-12">
                    <label htmlFor="" className={styles.selectLabel}>
                      以星級篩選
                    </label>
                  </div>
                  <div className="col-md-auto col-12">
                    <select
                      className="form-select"
                      value={filterRating}
                      onChange={handleRatingChange}
                    >
                      <option value="">選擇星級</option>
                      <option value="1">{renderStars(1)}</option>
                      <option value="2">{renderStars(2)}</option>
                      <option value="3">{renderStars(3)}</option>
                      <option value="4">{renderStars(4)}</option>
                      <option value="5">{renderStars(5)}</option>
                    </select>
                  </div>
                </div>
                {/* 篩選 */}
                <br></br>
                <br></br>
                <br></br>
                {loading ? (
            <div
                   className={styles.loadingContainer1}>
                    <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                    {/* <p className="mt-2">加載中...</p> */}
                  </div>
                ) : (
                <div className="row">
                  {filteredComments.map((comment, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">
                            用戶：{comment.custom_account}
                          </h5>
                          <h6 className="card-subtitle mb-2 text-muted">
                            評分：{renderCommentStars(comment.store_rating)}
                          </h6>
                          <p className="card-text">{comment.comment}</p>
                          <p className="card-text">
                            <small className="text-muted">
                              評論日期：
                              {new Date(comment.datetime).toLocaleDateString()}
                            </small>
                          </p>
                          <Button
                            className={` border-radius: 5% ${styles.btnPrimary}`}
                            onClick={() =>
                              handleReplyClick(comment.id, comment.comment)
                            }
                          >
                            回復
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                </div>
                )}
                <ReplyModal
                  show={showModal}
                  onHide={() => setShowModal(false)}
                  commentId={selectedCommentId}
                  commentContent={commentContent}
                  submitReply={submitReply}
                />
                <ReplySuccessModal
                  show={replySuccess}
                  onHide={() => setReplySuccess(false)}
                />
                {/* 篩選 */}
              </div>
            </div>
          </div>
         
          {/* 表單 */}
        </div>
      </div>
    </Section>
  )
}
