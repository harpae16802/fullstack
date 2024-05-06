// pages/seller-basic-data/[productId].js
import React, { useEffect, useState, useContext, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Image from 'next/image'
import {
  SELLER_API,
  PRODUCTS_API,
  PRODUCTS_CATEGORIES,
  IMGROUTER,
} from './config'
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

  // 拿取product_id
  const { productId } = router.query

  // 賣家頭像 初始與更新
  const [imageVersion, setImageVersion] = useState(0)

  // 動畫
  const [loading, setLoading] = useState(true)

  // 驗證
  const [errors, setErrors] = useState({})

  // 圖片狀態檢測更新
  const [isFileSelected, setIsFileSelected] = useState(false)

  // 在狀態中添加圖片預覽和模態顯示的變數
  const [showImageModal, setShowImageModal] = useState(false)
  const [currentImage, setCurrentImage] = useState('')

  // 修改賣家資料 後 的狀態
  const [sellerData, setSellerData] = useState({
    profilePicture: '',
  })

  //設定products
  const [productDetails, setProductDetails] = useState({
    product_name: '',
    product_description: '',
    price: '',
    product_nutrition: '',
    product_ingredient: '',
    stock_quantity: '',
    category_id: '',
    category: '',
    image_url: '',
    status: '',
  })

  // 比較資料
  const [originalProductDetails, setOriginalProductDetails] = useState({})

  //彈窗
  const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false)
  const [showUpdateFailModal, setShowUpdateFailModal] = useState(false)
  const [showNoChangeModal, setShowNoChangeModal] = useState(false)
  // 種類
  const [categories, setCategories] = useState([])
  const CATEGORY_MAP = {
    1: '點心',
    2: '飲料',
    3: '甜品',
    4: '湯品',
    5: '小吃',
    6: '主食',
  }

  // 圖片預覽
  const [previewImage, setPreviewImage] = useState(null)

  // 使用Ref
  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  // 如果拿取到seller_id執行這裡
  useEffect(() => {
    console.log('index.js中的sellerId', sellerId)
    if (sellerId) {
      axios
        .get(`${SELLER_API}${sellerId}`)
        .then((response) => {
          const data = response.data.data
          setSellerData((prevData) => ({
            ...prevData,
            profilePicture: data.profile_picture || `${IMG}`,
          }))
        })
        .catch((error) => {
          console.error('拿取頭貼失敗', error)
        })
    }
    if (productId) {
      axios
        .get(`${PRODUCTS_API}/details/${productId}`)
        .then((response) => {
          const productData = response.data.product
          setProductDetails(productData)
          console.log(productData)
          setOriginalProductDetails(productData)
          if (productData.image_url) {
            setPreviewImage(
              `http://localhost:3002/images/${productData.image_url}`
            )
          }
          return axios.get(`${PRODUCTS_CATEGORIES}`)
        })
        .then((response) => {
          setLoading(false)
          setCategories(response.data.categories)
        })
        .catch((error) => {
          console.error('載入產品圖片失敗:', error)
          setLoading(false)
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        })
    } else {
      setLoading(false)
    }
  }, [sellerId, productId])

  //種類對應表
  const handleCategoryInputChange = (categoryId) => {
    const category = CATEGORY_MAP[categoryId] || ''
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      category,
    }))
  }
  // 函數來顯示圖片預覽模態
  const toggleImageModal = (image) => {
    setCurrentImage(image)
    setShowImageModal(!showImageModal)
  }

  // 更新產品 (可控表單)
  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'category_id') {
      handleCategoryInputChange(value)
    }
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }

  // 驗證表單
  const validateProductDetails = () => {
    const newErrors = {}

    if (!productDetails.product_name.trim()) {
      newErrors.product_name = '產品名稱不能為空'
    }

    if (!productDetails.product_description.trim()) {
      newErrors.product_description = '產品描述不能為空'
    }

    // 將 price 轉換為字符串進行檢查
    if (!String(productDetails.price).trim()) {
      newErrors.price = '價格不能為空'
    }

    if (!productDetails.stock_quantity.toString().trim()) {
      newErrors.stock_quantity = '庫存數量不能為空'
    }

    if (!productDetails.product_nutrition.trim()) {
      newErrors.product_nutrition = '產品營養表不能為空'
    }
    if (!productDetails.product_ingredient.trim()) {
      newErrors.product_ingredient = '產品成分表不能為空'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 圖片
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setIsFileSelected(true)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      setIsFileSelected(false)
      setPreviewImage(null)
    }
  }

  // 送出表單
  const handleSubmit = (event) => {
    event.preventDefault()

    console.log('当前文件:', fileInputRef.current.files[0])

    if (!validateProductDetails()) {
      console.error('表單驗證失敗:', errors)
      return
    }

    if (
      JSON.stringify(productDetails) ===
        JSON.stringify(originalProductDetails) &&
      !isFileSelected
    ) {
      setShowNoChangeModal(true)
      return
    }

    const formData = new FormData()
    formData.append('product_name', productDetails.product_name)
    formData.append('product_description', productDetails.product_description)
    formData.append('price', productDetails.price)
    formData.append('product_nutrition', productDetails.product_nutrition)
    formData.append('product_ingredient', productDetails.product_ingredient)
    formData.append('stock_quantity', productDetails.stock_quantity)
    formData.append('category', productDetails.category)
    formData.append('category_id', productDetails.category_id)
    formData.append('status', productDetails.status)

    // 检查是否有选择文件
    if (fileInputRef.current && fileInputRef.current.files[0]) {
      formData.append('image', fileInputRef.current.files[0])
    } else {
      console.error('未选择文件')
      alert('請選擇圖片')
      return
    }

    axios
      .put(`${PRODUCTS_API}/update-product/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setShowUpdateSuccessModal(true) // 更新成功
        // 更新页面上的图片预览
        if (response.data.imageUrl) {
          setPreviewImage(response.data.imageUrl)
        }
      })
      .catch((error) => {
        setShowUpdateFailModal(true)
        console.error('更新失敗:', error)
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
            <div0 className={styles.loadingContainer}>
              <FontAwesomeIcon icon={faSpinner} spin size="3x" />
              {/* <p className="mt-2">加載中...</p> */}
            </div0>
          ) : (
            <div className="col-md-8 col-12">
              <div className={styles.formCard}>
                <form onSubmit={handleSubmit} className={styles.formWrapper}>
                  <h2 className={`${styles.formTitle}`}>修改商品</h2>
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      <div className="mb-3">
                        <label htmlFor="product_name" className="form-label">
                          產品名稱
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.product_name ? 'is-invalid' : ''
                          }`}
                          id="product_name"
                          name="product_name"
                          placeholder="產品名稱"
                          value={productDetails.product_name}
                          onChange={handleChange}
                        />
                        {errors.product_name && (
                          <div className="invalid-feedback">
                            {errors.product_name}
                          </div>
                        )}
                        <input
                          type="hidden"
                          name="sellerId"
                          value={sellerId}
                        ></input>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="product_description"
                          className="form-label"
                        >
                          產品描述
                        </label>
                        <textarea
                          className={`form-control ${
                            errors.product_description ? 'is-invalid' : ''
                          }`}
                          id="product_description"
                          name="product_description"
                          rows="3"
                          placeholder="產品描述簡介"
                          value={productDetails.product_description}
                          onChange={handleChange}
                        ></textarea>
                        {errors.product_description && (
                          <div className="invalid-feedback">
                            {errors.product_description}
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
                          value={productDetails.price}
                          onChange={handleChange}
                        />{' '}
                        {errors.price && (
                          <div className="invalid-feedback">{errors.price}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="product_nutrition  "
                          className="form-label"
                        >
                          產品營養表
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.product_nutrition ? 'is-invalid' : ''
                          }`}
                          id="product_nutrition"
                          name="product_nutrition"
                          placeholder="產品營養表"
                          value={productDetails.product_nutrition}
                          onChange={handleChange}
                        />{' '}
                        {errors.product_nutrition && (
                          <div className="invalid-feedback">
                            {errors.product_nutrition}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="product_ingredient"
                          className="form-label"
                        >
                          產品成分
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.product_ingredient ? 'is-invalid' : ''
                          }`}
                          id="product_ingredient"
                          name="product_ingredient"
                          placeholder="產品成分"
                          value={productDetails.product_ingredient}
                          onChange={handleChange}
                        />{' '}
                        {errors.product_ingredient && (
                          <div className="invalid-feedback">
                            {errors.product_ingredient}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="stock_quantity" className="form-label">
                          產品數量
                        </label>
                        <input
                          type="number"
                          className={`form-control ${
                            errors.stock_quantity ? 'is-invalid' : ''
                          }`}
                          id="stock_quantity"
                          name="stock_quantity"
                          placeholder="產品數量"
                          value={productDetails.stock_quantity}
                          onChange={handleChange}
                        />{' '}
                        {errors.stock_quantity && (
                          <div className="invalid-feedback">
                            {errors.stock_quantity}
                          </div>
                        )}
                      </div>

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
                        <div
                          onClick={() =>
                            toggleImageModal(
                              `${IMGROUTER}public/${productDetails.image_url}`
                            )
                          }
                        >
                          <label htmlFor="store_image" className="form-label">
                            當前產品圖片
                          </label>
                          <br />
                          {productDetails.image_url ? (
                            <img
                              src={`${IMGROUTER}public/${productDetails.image_url}`}
                              alt="Current Product Image"
                              className="img-fluid"
                              style={{ maxWidth: '190px', marginRight: '20px' }}
                            />
                          ) : (
                            <p>無當前圖片</p>
                          )}
                        </div>

                        <div onClick={() => toggleImageModal(previewImage)}>
                          <label htmlFor="store_image" className="form-label">
                            新上傳圖片預覽
                          </label>
                          <br />
                          {previewImage ? (
                            <img
                              src={previewImage}
                              alt="新增產品圖片"
                              className="img-fluid"
                              style={{ maxWidth: '190px' }}
                            />
                          ) : (
                            <p>請選擇圖片以預覽</p>
                          )}
                        </div>
                      </div>

                      <label htmlFor="store_image" className="form-label">
                        更新產品圖片
                      </label>
                      <input
                        type="file"
                        id="store_image"
                        name="store_image"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className={`form-control col-6`}
                      />

                      <br></br>
                      <div className={styles.selectGroup}>
                        <div className="col-md-auto col-12 mb-3">
                          <label
                            htmlFor="category"
                            className={styles.selectLabel}
                          >
                            選擇產品種類
                          </label>
                        </div>

                        <div className="col-md-auto col-12 mb-3">
                          <select
                            className={`form-control ${
                              errors.category_id ? 'is-invalid' : ''
                            }`}
                            id="category"
                            name="category_id"
                            value={productDetails.category_id}
                            onChange={handleChange}
                          >
                            {categories &&
                              categories.map((category) => (
                                <option
                                  key={category.category_id}
                                  value={category.category_id}
                                >
                                  {category.category_name}
                                </option>
                              ))}
                          </select>
                          {errors.category_id && (
                            <div className="invalid-feedback">
                              {errors.category_id}
                            </div>
                          )}
                        </div>

                        <div className="col-md-auto col-12 mb-3">
                          <label
                            htmlFor="status"
                            className={styles.selectLabel}
                          >
                            選擇產品上下架狀態
                          </label>
                        </div>

                        <div className="col-md-auto col-12 mb-3">
                          <select
                            className="form-control"
                            id="status"
                            name="status"
                            value={productDetails.status}
                            onChange={handleChange}
                          >
                            <option value="">上下架狀態</option>
                            <option value="1">上架</option>
                            <option value="0">下架</option>
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
                    </>
                  )}
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
          <Modal.Title>更新成功</Modal.Title>
        </Modal.Header>
        <Modal.Body>產品資料已成功更新。</Modal.Body>
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
          <Modal.Title>更新失敗</Modal.Title>
        </Modal.Header>
        <Modal.Body>產品更新過程中發生錯誤。</Modal.Body>
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
            className={styles.btnPrimary}
            onClick={() => setShowNoChangeModal(false)}
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
