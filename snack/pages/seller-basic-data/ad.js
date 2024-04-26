// pages/seller-basic-data/index.js
import React, { useEffect, useState, useContext, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { SELLER_API, ADROUTER ,ADROUTER} from './config'
import { useRouter } from 'next/router'
import { useSeller } from '../../contexts/SellerContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, Button, Form } from 'react-bootstrap'
import Section from '@/components/layout/section'
import styles from '../../styles/navbar-seller.module.scss'

export default function Ad() {
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
  // 廣告類型
  const [adType, setAdType] = useState('')

  // 儲存狀態
  const [file, setFile] = useState(null)

  // 彈出視窗
  const [isModalVisible, setIsModalVisible] = useState(false)

  // 廣告類型
  const [showAlertModal, setShowAlertModal] = useState(false)

  // 使用Ref
  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  // 修改前 如果拿取到seller_id執行這裡
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
            // 其他字段...
          }))
        })
        .catch((error) => {
          console.error('获取商家信息失败', error)
        })
    }
  }, [sellerId])

  // 處裡文件
  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  // 上傳廣告
  const handleUpload = async () => {
    if (!file || !adType) {
      setShowAlertModal(true)
      return
    }

    const formData = new FormData()
    formData.append('adImage', file)
    formData.append('seller_id', sellerId)
    formData.append('ad_type', adType)

    try {
      const response = await axios.post(
        `${ADROUTER}/upload${adType}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      console.log(response.data)
      setFile(null)
      setAdType('')
      setIsModalVisible(true)
    } catch (error) {
      console.error('上船失敗', error)
    }
  }

  const closeModal = () => setIsModalVisible(false)

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
                <h2 className={`${styles.formTitle}`}>廣告投放系統</h2>
                {/* 廣告系統 */}

                <div className="container mt-5">
                  <div className="row">
                    <div className="col-md-6">
                      <div
                        className={`card ${
                          adType === 'type1' ? styles.adCardActive : ''
                        }`}
                      >
                        <img
                          className="card-img-top"
                          src="/adimg/ad_type1.jpg" //   圖片在這
                          alt="Ad Type 1"
                        />
                        <div className="card-body d-flex justify-content-center">
                          <button
                            onClick={() => setAdType('type1')}
                            className={`btn ${
                              adType === 'type1'
                                ? 'btn-primary'
                                : `${styles.btnPrimary}`
                            }`}
                          >
                            產品列表廣告
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 廣告類型2 */}
                    <div className="col-md-6">
                      <div
                        className={`card ${
                          adType === 'type2' ? styles.adCardActive : ''
                        }`}
                      >
                        <img
                          className="card-img-top"
                          src="/adimg/ad_type1.jpg" //   圖片在這
                          alt="Ad Type 2"
                        />
                        <div className="card-body d-flex justify-content-center">
                          <button
                            onClick={() => setAdType('type2')}
                            className={`btn ${
                              adType === 'type2'
                                ? 'btn-primary'
                                : `${styles.btnPrimary}`
                            }`}
                          >
                            商家店面廣告
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
                {/* 圖片上傳 */}
                <div className="mb-3">
                  <label htmlFor="adImage" className="form-label">
                    上傳廣告圖片
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="adImage"
                    name="adImage"
                    onChange={handleFileChange}
                  />
                  
                </div>
                {file && (
                  <div className="preview-container">
                    <p>圖片名稱: {file.name}</p>
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="img-preview"
                    />
                  </div>
                )}
                {/* 上傳 */}
                <button onClick={handleUpload} className={`${styles.btnPrimary} ,d-flex justify-content-center`}>
                  上傳廣告
                </button>
              
                {/* 廣告系統 */}
              </div>
            </div>
          </div>
          {/* 表單 */}
        </div>
      </div>
      {isModalVisible && (
        <Modal show={isModalVisible} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>上傳成功</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>上傳成功</p>
          </Modal.Body>
          <Modal.Footer>
            <Link href="/seller-basic-data/producutsList" passHref>
              <Button variant="secondary"  className={styles.secondary}>
                前往產品頁
              </Button>
            </Link>
            <Link href="/seller-basic-data" passHref>
              <Button variant="primary"  className={styles.btnPrimary}> 前往店家頁</Button>
            </Link>
          </Modal.Footer>
        </Modal>
      )}

      {showAlertModal && (
        <Modal
          show={showAlertModal}
          onHide={() => setShowAlertModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>提示</Modal.Title>
          </Modal.Header>
          <Modal.Body>請選擇廣告類型並上傳檔案。</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className={styles.btnPrimary}
              onClick={() => setShowAlertModal(false)}
            >
              關閉
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Section>
  )
}
