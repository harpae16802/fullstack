// pages/seller-basic-data/[productId].js
import React, { useEffect, useState, useContext, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { SELLER_API, PRODUCTS_API, PRODUCTS_CATEGORIES } from './config'
import { useRouter } from 'next/router'
import { useSeller } from '../../contexts/SellerContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import Section from '@/components/layout/section'
import styles from '../../styles/navbar-seller.module.scss'
import { Modal, Button, Form } from 'react-bootstrap'

export default function AddProducts() {
  // 使用 useRouter
  const router = useRouter()

  // 使用useRef 作為拿取DOM元素操作
  const fileInputRef = useRef(null)

  //拿取seller_id
  const { seller } = useSeller()
  const sellerId = seller?.id

  // 拿取product_id
  const { productId } = router.query

  // 賣家頭像 初始與更新
  const [imageVersion, setImageVersion] = useState(0)

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
  })

  // 種類
  const [categories, setCategories] = useState([])
  const CATEGORY_MAP = {
    1: '點心',
    2: '飲料',
    3: '甜品',
    4: '湯品',
    5: '小吃',
    6: '主食',
  };

  // 載入
  const [loading, setLoading] = useState(false)

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
            
          }))
        })
        .catch((error) => {
          console.error('获取商家信息失败', error)
        })
    }
    if (productId) {
      axios
        .get(`${PRODUCTS_API}/details/${productId}`)
        .then((response) => {
          setProductDetails(response.data.product)
          return axios.get(`${PRODUCTS_CATEGORIES}`)
        })
        .then((response) => {
          setLoading(false)
          setCategories(response.data.categories)
        })
        .catch((error) => {
          console.error('加载产品详情失败:', error)
          setLoading(false)
        })
    }
  }, [sellerId, productId])

  // 更新產品 (可控表單)
  const handleChange = (e) => {
    const { name, value } = e.target
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }


  //種類對應表
  const handleCategoryInputChange = (categoryId) => {
    const category = CATEGORY_MAP[categoryId] || ''; 
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      category, 
    }));
  };
  // 送出表單
  const handleSubmit = (event) => {
    event.preventDefault()
    handleCategoryInputChange(productDetails.category_id);
    const formData = new FormData()
    formData.append('product_name', productDetails.product_name)
    formData.append('product_description', productDetails.product_description)
    formData.append('price', productDetails.price)
    formData.append('product_nutrition', productDetails.product_nutrition)
    formData.append('product_ingredient', productDetails.product_ingredient)
    formData.append('stock_quantity', productDetails.stock_quantity)
    formData.append('category', productDetails.category); 
    formData.append('category_id', productDetails.category_id)
    formData.append('image', fileInputRef.current.files[0]) // 假设图片上传是可选的

    axios
      .put(`${PRODUCTS_API}/update-product/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        alert('产品更新成功')
      })
      .catch((error) => {
        console.error('更新产品信息失败:', error)
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
                        className="form-control"
                        id="product_name"
                        name="product_name"
                        placeholder="產品名稱"
                        value={productDetails.product_name}
                        onChange={handleChange}
                      />
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
                        className="form-control"
                        id="product_description"
                        name="product_description"
                        rows="3"
                        placeholder="產品描述簡介"
                        value={productDetails.product_description}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">
                        產品價格
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        placeholder="產品價格(台幣)"
                        value={productDetails.price}
                        onChange={handleChange}
                      />
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
                        className="form-control"
                        id="product_nutrition"
                        name="product_nutrition"
                        placeholder="產品營養表"
                        value={productDetails.product_nutrition}
                        onChange={handleChange}
                      />
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
                        className="form-control"
                        id="product_ingredient"
                        name="product_ingredient"
                        placeholder="產品成分"
                        value={productDetails.product_ingredient}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="stock_quantity" className="form-label">
                        產品數量
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="stock_quantity"
                        name="stock_quantity"
                        placeholder="產品數量"
                        value={productDetails.stock_quantity}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="store_image" className="form-label">
                        上傳產品圖片
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        value={productDetails.image}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={styles.selectGroup}>
                      <div className="col-auto ">
                        <label htmlFor="" className={styles.selectLabel}>
                          選擇產品種類
                        </label>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                          產品種類
                        </label>
                        <select
                          className="form-control"
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
                      </div>
                    </div>
                    <br></br>
                    {/* 按鈕樣式 */}
                    <div className={styles.buttonGroup}>
                      <Link href="/seller-basic-data/">
                        <button className={styles.btnSecondary}>
                          回到店面
                        </button>
                      </Link>
                      <button type="submit" className={styles.btnPrimary}>
                        提交修改
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
          {/* 表單 */}
        </div>
      </div>
    </Section>
  )
}
