// pages/seller-basic-data/addProduct.js
import React, { useEffect, useState, useContext, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { SELLER_API, PRODUCTS_API } from './config'
import { useRouter } from 'next/router'
import { useSeller } from '../../contexts/SellerContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import Section from '@/components/layout/section'
import styles from '../../styles/navbar-seller.module.scss'

export default function AddProducts() {
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

  //表單狀態
  const handleInputChange = (e) => {
    const { name, value } = e.target
  
    // 種類
    if (name === 'category_id') {
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

  // 送出表單
  const handleFormSubmit = async (e) => {
    e.preventDefault()

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
    formData.append('seller_id', sellerId) //
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
        alert('产品添加成功')
      } else {
        alert('产品添加失败')
      }
    } catch (error) {
      console.error('产品添加出错', error)
      alert('产品添加过程中发生错误')
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
              <form onSubmit={handleFormSubmit} className={styles.formWrapper}>
                <h2 className={`${styles.formTitle}`}>上架新增商品</h2>

                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">
                    產品名稱
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    name="productName"
                    placeholder="產品名稱"
                    value={newProductData.productName}
                    onChange={handleInputChange}
                  />
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
                    className="form-control"
                    id="productDescription"
                    name="productDescription"
                    rows="3"
                    placeholder="產品描述簡介"
                    value={newProductData.productDescription}
                    onChange={handleInputChange}
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
                    value={newProductData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productNutrition  " className="form-label">
                    產品營養表
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productNutrition"
                    name="productNutrition"
                    placeholder="產品營養表"
                    value={newProductData.productNutrition}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productIngredient" className="form-label">
                    產品成分
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productIngredient"
                    name="productIngredient"
                    placeholder="產品成分"
                    value={newProductData.productIngredient}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="stockQuantity" className="form-label">
                    產品數量
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="stockQuantity"
                    name="stockQuantity"
                    placeholder="產品數量"
                    value={newProductData.stockQuantity}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="store_image" className="form-label">
                    上傳產品圖片
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="store_image"
                    name="store_image"
                  />
                </div>

                <div className={styles.selectGroup}>
                  <div className="col-auto ">
                    <label htmlFor="store_image" className={styles.selectLabel}>
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
                  </div>
                </div>
                <br></br>
                {/* 按鈕樣式 */}
                <div className={styles.buttonGroup}>
                  <Link href="/seller-basic-data/">
                    <button className={styles.btnSecondary}>回到店面</button>
                  </Link>
                  <button type="submit" className={styles.btnPrimary}>
                    提交修改
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* 表單 */}
        </div>
      </div>
    </Section>
  )
}
