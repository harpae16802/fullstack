// pages/seller-basic-data/addProduct.js
import React, { useEffect, useState, useContext, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { SELLER_API, PRODUCTS_API } from '../../api/config'
import { useRouter } from 'next/router'
import { useSeller } from '../../contexts/SellerContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import Section from '@/components/layout/section'
import styles from '../../styles/navbar-seller.module.scss'
import { Modal, Button, Form } from 'react-bootstrap'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AddProducts() {
  // 使用 useRouter
  const router = useRouter()

  // 使用useRef 作為拿取DOM元素操作
  const fileInputRef = useRef(null)

  //拿取seller_id

  const [sellerId, setSellerId] = useState(null)

  // 安全性 確認身分
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

  // 往店家網頁
  const goToSellerPage = (sellerId) => {
    router.push(`/shop-products/${sellerId}`)
  }

  // 賣家頭像 初始與更新
  const [imageVersion, setImageVersion] = useState(0)

  // 修改賣家資料 後 的狀態
  const [sellerData, setSellerData] = useState({
    profilePicture: '',
  })

  // 動畫
  const [loading, setLoading] = useState(true)

  //驗證
  const [errors, setErrors] = useState({})

  // 新增產品的資料
  const [newProductData, setNewProductData] = useState({
    productName: '',
    productDescription: '',
    price: '',
    productNutrition: '',
    productIngredient: '',
    stockQuantity: '',
    category_id: '',
    category: '',
  })

  // 預覽圖片
  const [imagePreview, setImagePreview] = useState(null)

  // 圖片縮放
  const [showImageModal, setShowImageModal] = useState(false)
  const [currentImage, setCurrentImage] = useState('')

  // 彈出視窗
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showFailModal, setShowFailModal] = useState(false)

  // 使用Ref
  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  // 驗證
  const validateProductForm = () => {
    let formErrors = {}
    let isValid = true

    // 驗證產品名稱是否填寫
    if (!newProductData.productName.trim()) {
      formErrors.productName = '產品名稱不能為空'
      isValid = false
    }

    // 驗證產品描述是否填寫
    if (!newProductData.productDescription.trim()) {
      formErrors.productDescription = '產品描述不能為空'
      isValid = false
    }

    // 驗證價格是否填寫
    if (!String(newProductData.price).trim()) {
      formErrors.price = '價格不能為空'
      isValid = false
    }

    // 驗證庫存數量是否填寫
    if (!newProductData.stockQuantity.toString().trim()) {
      formErrors.stockQuantity = '庫存數量不能為空'
      isValid = false
    }

    // 驗證產品種類是否選擇
    // if (!newProductData.category_id.trim()) {
    //   formErrors.category_id = '必須選擇產品種類'
    //   isValid = false
    // }
    // 驗證產品營養是否選擇
    if (!newProductData.productNutrition.trim()) {
      formErrors.productNutrition = '產品營養表不能為空'
      isValid = false
    }
    // 驗證產品成分表是否選擇
    if (!newProductData.productIngredient.trim()) {
      formErrors.productIngredient = '產品成分表不能為空'
      isValid = false
    }

    setErrors(formErrors)
    return isValid
  }

  // 修改前 如果拿取到seller_id執行這裡
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
    console.log('index.js中的sellerId', sellerId)
    if (sellerId) {
      axios
        .get(`${SELLER_API}${sellerId}`)
        .then((response) => {
          const data = response.data.data
          console.log(data)

          setSellerData((prevData) => ({
            ...prevData,
            profilePicture: data.profile_picture || `${IMG}`,
          }))
        })
        .catch((error) => {
          console.error('取得頭貼失敗', error)
        })
    }
  }, [sellerId])

  //表單狀態
  const handleInputChange = (e) => {
    const { name, value } = e.target

    // 圖片預覽
    if (name === 'store_image' && e.target.files[0]) {
      setNewProductData((prevData) => ({
        ...prevData,
        [name]: e.target.files[0],
      }))
      const fileReader = new FileReader()
      fileReader.onload = () => {
        setImagePreview(fileReader.result)
      }
      fileReader.readAsDataURL(e.target.files[0])
      // 種類
    } else if (name === 'category_id') {
      const category = e.target.options[e.target.selectedIndex].text
      setNewProductData((prevData) => ({
        ...prevData,
        category_id: value,
        category: category,
      }))
    } else {
      setNewProductData((prevData) => ({ ...prevData, [name]: value }))
    }
  }

  //  圖片放大
  const toggleImageModal = (imageSrc) => {
    setCurrentImage(imageSrc)
    setShowImageModal(!showImageModal)
  }

  // 送出表單
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!validateProductForm()) {
      console.error('表單驗證失敗:', errors)
      return
    }
    // 用formData傳送資料
    const formData = new FormData()
    formData.append('productName', newProductData.productName)
    formData.append('productDescription', newProductData.productDescription)
    formData.append('price', newProductData.price)
    formData.append('productNutrition', newProductData.productNutrition)
    formData.append('productIngredient', newProductData.productIngredient)
    formData.append('stockQuantity', newProductData.stockQuantity)
    formData.append('category', newProductData.category)
    formData.append('category_id', newProductData.category_id)
    formData.append('seller_id', sellerId)
    // console.log(sellerId);

    if (fileInputRef.current?.files[0]) {
      formData.append('image', fileInputRef.current.files[0])
    }

    // 產品圖片上傳
    const imageFile = document.querySelector('#store_image').files[0]
    formData.append('image', imageFile)

    // 請求
    try {
      const response = await axios.post(`${PRODUCTS_API}/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        setShowSuccessModal(true)
      } else {
        console.error('產品新增出錯', error)
      }
    } catch (error) {
      console.error('產品新增出錯', error)
      setShowFailModal(true)
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
                  // src={`http://localhost:3002/public/seller/${sellerData.profilePicture}?v=${imageVersion} `}
                  src={
                    sellerData.profilePicture
                      ? `http://localhost:3002/public/seller/${sellerData.profilePicture}?v=${imageVersion}`
                      : IMG
                  }
                  alt="賣家頭像"
                  className={styles.profilePicture}
                  style={{
                    border: '2px solid black',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50px',
                  }}
                  onClick={handleImageClick} // 使用handleImageClick
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = IMG
                  }} // 圖片錯誤處裡
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
          {loading ? (
            <div className={styles.loadingContainer}>
              <FontAwesomeIcon icon={faSpinner} spin size="3x" />
              {/* <p className="mt-2">加載中...</p> */}
            </div>
          ) : (
            <div className="col-md-8 col-12">
              <div className={styles.formCard}>
                <form
                  onSubmit={handleFormSubmit}
                  className={styles.formWrapper}
                >
                  <h2 className={`${styles.formTitle}`}>上架新增商品</h2>

                  <div className="mb-3">
                    <label htmlFor="productName" className="form-label">
                      產品名稱
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.productName ? 'is-invalid' : ''
                      }`}
                      id="productName"
                      name="productName"
                      placeholder="產品名稱"
                      value={newProductData.productName}
                      onChange={handleInputChange}
                    />
                    {errors.productName && (
                      <div className="invalid-feedback">
                        {errors.productName}
                      </div>
                    )}
                    <input
                      type="hidden"
                      name="sellerId"
                      value={sellerId}
                    ></input>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productDescription" className="form-label">
                      產品描述
                    </label>
                    <textarea
                      className={`form-control ${
                        errors.productDescription ? 'is-invalid' : ''
                      }`}
                      id="productDescription"
                      name="productDescription"
                      rows="3"
                      placeholder="產品描述簡介"
                      value={newProductData.productDescription}
                      onChange={handleInputChange}
                    ></textarea>
                    {errors.productDescription && (
                      <div className="invalid-feedback">
                        {errors.productDescription}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      產品價格
                    </label>
                    <input
                      type="number"
                      className={`form-control ${
                        errors.price ? 'is-invalid' : ''
                      }`}
                      id="price"
                      name="price"
                      placeholder="產品價格(台幣)"
                      value={newProductData.price}
                      onChange={handleInputChange}
                    />
                    {errors.price && (
                      <div className="invalid-feedback">{errors.price}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productNutrition  " className="form-label">
                      產品營養表
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.productNutrition ? 'is-invalid' : ''
                      }`}
                      id="productNutrition"
                      name="productNutrition"
                      placeholder="產品營養表"
                      value={newProductData.productNutrition}
                      onChange={handleInputChange}
                    />
                    {errors.productNutrition && (
                      <div className="invalid-feedback">
                        {errors.productNutrition}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productIngredient" className="form-label">
                      產品成分
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.productIngredient ? 'is-invalid' : ''
                      }`}
                      id="productIngredient"
                      name="productIngredient"
                      placeholder="產品成分"
                      value={newProductData.productIngredient}
                      onChange={handleInputChange}
                    />
                    {errors.productIngredient && (
                      <div className="invalid-feedback">
                        {errors.productIngredient}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="stockQuantity" className="form-label">
                      產品數量
                    </label>
                    <input
                      type="number"
                      className={`form-control ${
                        errors.stockQuantity ? 'is-invalid' : ''
                      }`}
                      id="stockQuantity"
                      name="stockQuantity"
                      placeholder="產品數量"
                      value={newProductData.stockQuantity}
                      onChange={handleInputChange}
                    />
                    {errors.stockQuantity && (
                      <div className="invalid-feedback">
                        {errors.stockQuantity}
                      </div>
                    )}
                  </div>

                  <div
                    className="mb-3"
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
                    <label htmlFor="store_image" className="form-label">
                      上傳產品圖片
                    </label>
                    <input
                      type="file"
                      className={`form-control ${
                        errors.store_image ? 'is-invalid' : ''
                      }`}
                      id="store_image"
                      name="store_image"
                      onChange={handleInputChange}
                    />
                    {imagePreview && (
                      <div onClick={() => toggleImageModal(imagePreview)}>
                        <img
                          src={imagePreview}
                          alt="Image Preview"
                          style={{
                            marginTop: '10px',
                            width: '100%',
                            height: 'auto',
                          }}
                        />
                      </div>
                    )}
                    {errors.store_image && (
                      <div className="invalid-feedback">
                        {errors.store_image}
                      </div>
                    )}
                  </div>

                  <div className={styles.selectGroup}>
                    <div className="col-auto ">
                      <label
                        htmlFor="store_image"
                        className={styles.selectLabel}
                      >
                        選擇產品種類
                      </label>
                    </div>

                    <div className="col-auto">
                      <select
                        className={`form-select ${styles.customSelect}`}
                        id="category_id"
                        name="category_id"
                        value={newProductData.category_id}
                        onChange={handleInputChange}
                      >
                        <option value="">新增產品種類</option>
                        <option value="1">點心</option>
                        <option value="2">飲料</option>
                        <option value="3">甜品</option>
                        <option value="4">湯品</option>
                        <option value="5">小吃</option>
                        <option value="6">主食</option>
                      </select>
                      {errors.category_id && (
                        <div className="invalid-feedback">
                          {errors.category_id}
                        </div>
                      )}
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
                      新增商品
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* 表單 */}
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>新增成功</Modal.Title>
        </Modal.Header>
        <Modal.Body>產品已成功添加至賣家目錄。</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className={styles.btnPrimary}
            onClick={() => setShowSuccessModal(false)}
          >
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Fail Modal */}
      <Modal
        show={showFailModal}
        onHide={() => setShowFailModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>新增失敗</Modal.Title>
        </Modal.Header>
        <Modal.Body>添加產品過程中發生錯誤，請檢查數據後重試。</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className={styles.btnPrimary}
            onClick={() => setShowFailModal(false)}
          >
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>圖片預覽</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={currentImage}
            alt="Enlarged"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Modal.Body>
      </Modal>
    </Section>
  )
}
