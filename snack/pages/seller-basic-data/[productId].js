// pages/seller-basic-data/[productId].js
import React, { useEffect, useState, useContext, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { SELLER_API, PRODUCTS_API } from './config'
import { useRouter } from 'next/router'
import { useSeller } from '../../contexts/SellerContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import Section from '@/components/layout/section'
import styles from '../../styles/navbar-seller.module.scss'

export default function ProductModify() {
  // 使用 useRouter
  const router = useRouter()

  // 使用useRef 作為拿取DOM元素操作
  const fileInputRef = useRef(null)

  //拿取seller_id
  const { seller } = useSeller()
  const sellerId = seller?.id
  const { productId } = router.query
  console.log(productId)

  const [product, setProduct] = useState({
    productId: productId,
    productName: '',
    productDescription: '',
    price: '',
    productNutrition: '',
    productIngredient: '',
    stockQuantity: '',
    imageUrl: '',
  })

  // 賣家頭像 初始與更新
  const [imageVersion, setImageVersion] = useState(0)

  // 修改賣家資料 後 的狀態
  const [sellerData, setSellerData] = useState({
    profilePicture: '',
  })

  // 下拉選單
  const handleChangeStatus = (e) => {
    setProduct((prev) => ({ ...prev, status: e.target.value }))
  }
  // 使用Ref
  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  // 總查詢
  useEffect(() => {
    if (sellerId) {
      axios
        .get(`${SELLER_API}${sellerId}`)
        .then((response) => {
          const data = response.data.data
          setSellerData((prevData) => ({
            ...prevData,
            profilePicture: data.profile_picture || '',
          }))
        })
        .catch((error) => console.error('獲取賣家資訊失敗', error))
    }

    if (productId) {
      axios
        .get(`${PRODUCTS_API}/details/${productId}`)
        .then((response) => {
          const {
            product_id,
            category,
            product_name,
            product_description,
            image_url,
            price,
            stock_quantity,
            status,
            category_id,
            product_ingredient,
            product_nutrition,
            seller_id,
            favorite_count,
            created_at,
          } = response.data.product
          setProduct({
            productId: product_id,
            category,
            productName: product_name,
            productDescription: product_description,
            imageUrl: image_url,
            price,
            stockQuantity: stock_quantity,
            status,
            categoryId: category_id,
            productIngredient: product_ingredient,
            productNutrition: product_nutrition,
            sellerId: seller_id,
            favoriteCount: favorite_count,
            createdAt: created_at,
          })
        })
        .catch((error) => {
          console.error('获取产品资料失败', error)
        })
    }
  }, [productId, sellerId]) // 确保這裡有 productId

  // 表單更改
  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  // 圖片上傳
  const handleFileChange = (e) => {
    setProduct((prev) => ({ ...prev, imageUrl: e.target.files[0] }))
  }

  // 表單提交
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(product) // 输出查看所有字段值
    const formData = new FormData()
    Object.keys(product).forEach((key) => {
      if (key === 'imageUrl' && product[key] instanceof File) {
        formData.append('image', product[key])
      } else if (product[key] != null) {
        // 确保不添加null值
        formData.append(key, product[key])
      }
    })

    axios
      .put(`${PRODUCTS_API}/update/${productId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        console.log('Response received:', response)
        if (response.data.success) {
          alert('產品更新成功')
          router.push('/seller-basic-data/productsList')
        } else {
          throw new Error(response.data.message)
        }
      })
      .catch((error) => {
        console.error('更新產品信息失败', error)
        alert(
          `更新產品信息失败: ${
            error.response ? error.response.data.message : '网络错误'
          }`
        )
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
                <h2 className={`${styles.formTitle}`}>編輯產品資料</h2>

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
                    value={product.productName}
                    onChange={handleChange}
                  />
                </div>
                <input type="hidden" name="sellerId" value={productId}></input>
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
                    value={product.productDescription}
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
                    value={product.price}
                    onChange={handleChange}
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
                    value={product.productNutrition}
                    onChange={handleChange}
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
                    value={product.productIngredient}
                    onChange={handleChange}
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
                    value={product.stockQuantity}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">
                    上傳產品圖片
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="imageUrl"
                    name="imageUrl"
                    onChange={handleFileChange}
                  />
                  {/* 顯示當前的產品圖片 */}
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl || 'default-placeholder.png'}
                      alt="Product Image"
                    />
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    產品狀態
                  </label>
                  <select
                    className="form-control"
                    id="status"
                    value={product.status || ''}
                    onChange={handleChangeStatus}
                  >
                    <option value="1">上架</option>
                    <option value="0">下架</option>
                  </select>
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
