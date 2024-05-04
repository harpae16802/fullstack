// pages/seller-basic-data/index.js
import React, { useEffect, useState, useContext, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { SELLER_API, IMGROUTER, BackEndSIMG } from './config'
import { useRouter } from 'next/router'
import { useSeller } from '../../contexts/SellerContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import Section from '@/components/layout/section'
import styles from '../../styles/navbar-seller.module.scss'
import { Modal, Button, Form } from 'react-bootstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PasswordToggle from './PasswordToggle'

export default function SellerBasicData() {
  // 使用 useRouter
  const router = useRouter()

  // 使用useRef 作為拿取DOM元素操作
  const fileInputRef = useRef(null)

  //拿取seller_id

  const [sellerId, setSellerId] = useState(null)

  // 往店家網頁
  const goToSellerPage = (sellerId) => {
    router.push(`/shop-products/${sellerId}`)
  }
  useEffect(() => {
    const localSellerId = localStorage.getItem('sellerId')
    if (localSellerId) {
      setSellerId(localSellerId)
    } else {
      router.replace('/login/login-seller')
    }
  }, [])

  // 預設圖片
  const IMG = 'http://localhost:3000/images/seller.jpg'

  // 賣家頭像 初始與更新
  const [imageVersion, setImageVersion] = useState(0)

  // 修改賣家資料 後 的狀態
  const [sellerData, setSellerData] = useState({
    account: '',
    password: '',
    storeName: '',
    contactNumber: '',
    email: '',
    companyAddress: '',
    storeImage: '',
    companyDescription: '',
    openingHours: '09:00',
    closingHours: '22:00',
    restDay: '0',
    profilePicture: '',
  })

  // 彈出視窗
  const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false)
  const [showUpdateFailModal, setShowUpdateFailModal] = useState(false)
  const [filePictureSuccessModal, setfilePictureSuccessModal] = useState(false)
  const [filePictureFailModal, setfilePictureFailModal] = useState(false)
  const [originData, setOriginData] = useState({})
  const [showNoChangeModal, setShowNoChangeModal] = useState(false)

  //眼睛符號
  const [passwordShown, setPasswordShown] = useState(false)

  // 動畫
  const [loading, setLoading] = useState(true)

  // 驗證
  const [errors, setErrors] = useState({})

  // 上傳的新圖片
  const [newImagePreviewUrl, setNewImagePreviewUrl] = useState(null)

  // 使用Ref
  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  // 修改前 如果拿取到seller_id執行這裡
  useEffect(() => {
    if (sellerId) {
      axios
        .get(`${SELLER_API}${sellerId}`)
        .then((response) => {
          const data = response.data.data
          console.log(data)

          setSellerData((prevData) => ({
            ...prevData,
            account: data.account || '',
            password: data.password || '',
            storeName: data.store_name || '',
            contactNumber: data.contact_number || '',
            email: data.email || '',
            companyAddress: data.company_address || '',
            companyDescription: data.company_description || '',
            openingHours: data.opening_hours || '17:00',
            closingHours: data.closing_hours || '23:00',
            restDay: data.rest_day?.toString() || '6',
            storeImage: data.storeImage || '您還沒有圖片唷~',
            profilePicture: data.profile_picture || `${IMG}`,
          }))
          setOriginData(data)
          console.log(data)
        })

        .catch((error) => {
          console.error('獲取賣家頭貼失敗', error)
        })
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [sellerId, imageVersion])

  // 修改 更新 賣家的 資料
  const handleChange = (e) => {
    const { name, value } = e.target
    setSellerData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  // 眼睛符號
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown)
  }

  // 驗證
  const validateForm = () => {
    let newErrors = {}
    // 驗證手機號碼
    if (!/^09\d{8}$/.test(sellerData.account)) {
      newErrors.account = '請輸入有效的台灣手機號碼，例如: 0912345678'
    }

    // 驗證密碼
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(sellerData.password)) {
      newErrors.password = '密碼必須是8-16位，且至少包含一個字母和一個數字'
    }

    // 驗證店名
    if (
      sellerData.storeName.trim() === '' ||
      sellerData.storeName.length > 20
    ) {
      newErrors.storeName = '店名不能為空，且最長20字'
    }

    // 驗證地址
    if (
      sellerData.companyAddress.trim() === '' ||
      sellerData.companyAddress.length > 50
    ) {
      newErrors.companyAddress = '地址不能為空，且最長50字'
    }

    // 驗證店家簡介
    if (
      sellerData.companyDescription.trim() === '' ||
      sellerData.companyDescription.length > 200
    ) {
      newErrors.companyDescription = '店家簡介不能為空，且最大不超過200字'
    }
    // 店家聯絡電話
    if (
      !/^(09\d{8})$|^\(?\d{2,3}\)?[-\s]?\d{6,8}$/.test(sellerData.contactNumber)
    ) {
      newErrors.contactNumber = '請輸入有效的台灣手機號碼或市話'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 修改 更新 賣家所有資料 包含圖片
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSellerData((prevState) => ({
        ...prevState,
        [e.target.name]: file,
      }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewImagePreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setNewImagePreviewUrl(null)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors({})
    if (!validateForm()) {
      console.error('表單驗證失敗:', errors)
      return
    }
    if (JSON.stringify(sellerData) === JSON.stringify(originData)) {
      setShowNoChangeModal(true)
      return
    }
    const formData = new FormData()
    formData.append('account', sellerData.account)
    formData.append('password', sellerData.password)
    formData.append('storeName', sellerData.storeName)
    formData.append('contactNumber', sellerData.contactNumber)
    formData.append('email', sellerData.email)
    formData.append('companyAddress', sellerData.companyAddress)
    formData.append('companyDescription', sellerData.companyDescription)
    formData.append('openingHours', sellerData.openingHours) // 添加營業開始時間
    formData.append('closingHours', sellerData.closingHours)
    formData.append('restDay', sellerData.restDay)
    // 文字部分
    const storeImageInput = document.getElementById('store_image')
    if (storeImageInput && storeImageInput.files && storeImageInput.files[0]) {
      formData.append('store_image', storeImageInput.files[0])
    }

    // 發送請求
    axios
      .put(`${SELLER_API}${sellerId}/edit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setShowUpdateSuccessModal(true)
      })
      .catch((error) => {
        setShowUpdateFailModal(true)
      })
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
        setImageVersion((prevVersion) => prevVersion + 1)
        setSellerData((prevData) => ({
          ...prevData,
          profilePicture: response.data.imageUrl,
        }))
        setfilePictureSuccessModal(true)
      })
      .catch((error) => {
        setfilePictureFailModal(ture)
        // alert('頭像上傳失敗')
      })
  }
  // 生成24小時時間選項
  const generateTimeOptions = () => {
    const options = []
    for (let hour = 0; hour < 24; hour++) {
      const value = `${hour.toString().padStart(2, '0')}:00`
      options.push(
        <option key={hour} value={value}>
          {value}
        </option>
      )
    }
    return options
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
                  // src={`http://localhost:3002/public/seller/${sellerData.profilePicture}?v=${imageVersion} `}
                  src={
                    sellerData.profilePicture
                      ? `http://localhost:3002/public/seller/${sellerData.profilePicture}?v=${imageVersion}`
                      : IMG
                  }
                  alt="賣家頭像"
                  width={100}
                  height={100}
                  className={styles.profilePicture}
                  onClick={handleImageClick} // 使用handleImageClick
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = '/images/seller.jpg'
                  }} // 圖片錯誤處裡
                />

                <input
                  type="file"
                  id="profilePictureInput"
                  style={{ display: 'none' }}
                  ref={fileInputRef} // 將ref賦予到DOM元素
                  onChange={handleProfilePictureChange}
                  name="profilePicture"
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
                    <Link href="/seller-basic-data/">
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
          {loading ? (
            <div className={`${styles.loadingContainer}`}>
              <FontAwesomeIcon icon={faSpinner} spin size="3x" />
              {/* <span className="ml-2">加載中...</span>  */}
            </div>
          ) : (
            <div className="col-md-8 col-12">
              {/* 表單 */}
              <div className={styles.formCard}>
                <form onSubmit={handleSubmit} className={styles.formWrapper}>
                  <h2 className={`${styles.formTitle}`}>商家基本資料</h2>

                  <div className="mb-5">
                    <label htmlFor="account" className="form-label">
                      使用帳號
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.account ? 'is-invalid' : ''
                      }`}
                      id="account"
                      name="account"
                      placeholder="手機號碼驗證"
                      value={sellerData.account || ''}
                      onChange={handleChange}
                    />
                    {errors.account && (
                      <div className="invalid-feedback">{errors.account}</div>
                    )}
                  </div>
                  {/* <div className="mb-3 container">
                    <label htmlFor="password" className="form-label">
                      使用者密碼
                    </label>
                    <div className="input-wrapper row">
                      <input
                        type={passwordShown ? 'text' : 'password'}
                        className={`form-control col-6 ${
                          errors.password ? 'is-invalid' : ''
                        }`}
                        id="password"
                        name="password"
                        placeholder="至少包含英文 數字長度不少於8位數 不大於16位數"
                        value={sellerData.password || ''}
                        onChange={handleChange}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                      <i
                        className="icon-toggle col-6"
                        onClick={togglePasswordVisibility}
                        style={{
                          position: 'absolute',
                          top: '265px',
                          left: '150px',
                          transform: 'translateY(-50%)',
                          fontSize: '30px',
                          cursor: 'pointer',
                          zIndex: '2',
                        }}
                      >
                        {passwordShown ? <FaEyeSlash /> : <FaEye />}
                      </i>
                    </div>
                  </div> */}
                  <div className="mb-5 col-12container">
                    <label htmlFor="password" className="form-label">
                      使用者密碼
                    </label>
                    <div className="input-wrapper row">
                      {' '}
                      <PasswordToggle
                        name="password"
                        value={sellerData.password}
                        onChange={handleChange}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="storeName" className="form-label">
                      商家店名
                    </label>
                    <input
                      type="text"
                      className={`form-control col-6${
                        errors.storeName ? 'is-invalid' : ''
                      }`}
                      id="storeName"
                      name="store_image"
                      placeholder="不能為空 最常20字"
                      value={sellerData.storeName || ''}
                      onChange={handleChange}
                    />
                    {errors.storeName && (
                      <div className="invalid-feedback">{errors.storeName}</div>
                    )}
                  </div>
                  <div className="mb-5">
                    <label htmlFor="contactNumber" className="form-label">
                      商家連絡電話
                    </label>
                    <input
                      type="text"
                      className={`form-control col-6${
                        errors.contactNumber ? 'is-invalid' : ''
                      }`}
                      id="contactNumber"
                      name="contactNumber"
                      placeholder="為台灣的手機號碼或是台灣的市話"
                      value={sellerData.contactNumber || ''}
                      onChange={handleChange}
                    />
                    {errors.contactNumber && (
                      <div className="invalid-feedback">
                        {errors.contactNumber}
                      </div>
                    )}
                  </div>
                  <div className="mb-5">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="電子郵件"
                      value={sellerData.email || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="companyAddress" className="form-label">
                      商家地址
                    </label>
                    <input
                      type="text"
                      className={`form-control col-6${
                        errors.companyAddress ? 'is-invalid' : ''
                      }`}
                      id="companyAddress"
                      name="companyAddress"
                      placeholder="商家地址"
                      value={sellerData.companyAddress || ''}
                      onChange={handleChange}
                    />
                    {errors.companyAddress && (
                      <div className="invalid-feedback">
                        {errors.companyAddress}
                      </div>
                    )}
                  </div>

                  {/* 商家圖片 */}
                  <div
                    className="mb-5"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      border: '2px solid #de4f4f',
                      borderRadius: '10px',
                      padding: '10px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div>
                      <label htmlFor="store_image" className="form-label">
                        現有商家圖片
                      </label>
                      <br />
                      {sellerData.storeImage ? (
                        <Image
                          src={`${IMGROUTER}${sellerData.storeImage}`}
                          alt="商家現有圖片"
                          className="img-fluid"
                          style={{ maxWidth: '200px', marginRight: '20px' }}
                          width={200}
                          height={200}
                        />
                      ) : (
                        <p>暫無圖片</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="store_image" className="form-label">
                        新上傳圖片預覽
                      </label>
                      <br />
                      {newImagePreviewUrl ? (
                        <Image
                          src={newImagePreviewUrl}
                          alt="新上傳圖片預覽"
                          className="img-fluid"
                          style={{ maxWidth: '200px' }}
                          width={200}
                          height={200}
                        />
                      ) : (
                        <p>請選擇圖片以預覽</p>
                      )}
                    </div>
                  </div>

                  <label htmlFor="store_image" className="form-label">
                    上傳商家圖片
                  </label>
                  <input
                    type="file"
                    className={`form-control col-6`}
                    id="store_image"
                    name="store_image"
                    onChange={handleFileChange}
                  />
                  <br></br>
                  <div className="mb-5">
                    <label htmlFor="companyDescription" className="form-label">
                      店家簡介
                    </label>
                    <textarea
                      className={`form-control col-6${
                        errors.companyDescription ? 'is-invalid' : ''
                      }`}
                      id="companyDescription"
                      name="companyDescription"
                      rows="3"
                      placeholder="商家簡介最大不超過 200字"
                      value={sellerData.companyDescription || ''}
                      onChange={handleChange}
                    ></textarea>
                    {errors.companyDescription && (
                      <div className="invalid-feedback">
                        {errors.companyDescription}
                      </div>
                    )}
                  </div>
                  <br></br>
                  {/* 下拉是選單 */}
                  <div className={styles.selectGroup}>
                    <div className="col-md-auto">
                      <label htmlFor="restDay" className={styles.selectLabel}>
                        選擇公休日
                      </label>
                    </div>
                    <div className="col-md-auto col-12">
                      <select
                        className={`form-select ${styles.customSelect}`}
                        id="restDay"
                        name="restDay"
                        value={sellerData.restDay || ''}
                        onChange={handleChange}
                      >
                        {[...Array(8).keys()].map((day) => (
                          <option key={day} value={day}>
                            {day === 0 ? '請選擇公休日' : `每週第${day}天`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-auto col-12">
                      <label
                        htmlFor="openingHours"
                        className={styles.selectLabel}
                      >
                        開始營業時間
                      </label>
                    </div>
                    <div className="col-md-auto col-12">
                      <select
                        className={`form-select  ${styles.customSelect}`}
                        id="openingHours"
                        name="openingHours"
                        value={sellerData.openingHours || ''}
                        onChange={handleChange}
                      >
                        {generateTimeOptions()}
                      </select>
                    </div>

                    <div className="col-md-auto col-12">
                      <label
                        htmlFor="closingHours"
                        className={styles.selectLabel}
                      >
                        結束營業時間
                      </label>
                    </div>
                    <div className="col-md-auto col-12">
                      <select
                        className={`form-select ${styles.customSelect}`}
                        id="closingHours"
                        name="closingHours"
                        value={sellerData.closingHours || ''}
                        onChange={handleChange}
                      >
                        {generateTimeOptions()}
                      </select>
                    </div>
                  </div>
                  <br></br>
                  {/* 按鈕樣式 */}
                  <div className={styles.buttonGroup}>
                    <button
                      type="button"
                      className={styles.btnSecondary}
                      onClick={() => goToSellerPage(sellerId)}
                    >
                      前往店面
                    </button>

                    <button type="submit" className={styles.btnPrimary}>
                      提交修改
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* 表單 */}
        </div>
      </div>

      <Modal
        show={showUpdateSuccessModal}
        onHide={() => setShowUpdateSuccessModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>修改成功</Modal.Title>
        </Modal.Header>
        <Modal.Body>您的商家資料已成功更新。</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className={styles.btnPrimary}
            onClick={() => setShowUpdateSuccessModal(false)}
          >
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showUpdateFailModal}
        onHide={() => setShowUpdateFailModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>修改失敗</Modal.Title>
        </Modal.Header>
        <Modal.Body>更新過程中發生錯誤，請稍後再試。</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className={styles.btnPrimary}
            onClick={() => setShowUpdateFailModal(false)}
          >
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={filePictureSuccessModal}
        onHide={() => setfilePictureSuccessModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>修改成功</Modal.Title>
        </Modal.Header>
        <Modal.Body>您的頭貼資料已成功更新。</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className={styles.btnPrimary}
            onClick={() => setfilePictureSuccessModal(false)}
          >
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={filePictureFailModal}
        onHide={() => setfilePictureFailModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>修改失敗</Modal.Title>
        </Modal.Header>
        <Modal.Body>更新過程中發生錯誤，請稍後再試。</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className={styles.btnPrimary}
            onClick={() => setfilePictureFailModal(false)}
          >
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showNoChangeModal}
        onHide={() => setShowNoChangeModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>資料未變更</Modal.Title>
        </Modal.Header>
        <Modal.Body>您沒有做任何變更。</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowNoChangeModal(false)}
          >
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </Section>
  )
}
