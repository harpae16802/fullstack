// pages/seller-basic-data/order.js
import React, { useEffect, useState, useContext, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { SELLER_API, ORDERDETAIL } from './config'
import { useRouter } from 'next/router'
import { useSeller } from '../../contexts/SellerContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import Section from '@/components/layout/section'
import styles from '../../styles/navbar-seller.module.scss'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Order() {
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

  // 賣家頭像 初始與更新
  const [imageVersion, setImageVersion] = useState(0)

  // 修改賣家資料 後 的狀態
  const [sellerData, setSellerData] = useState({
    profilePicture: '',
  })

  // 載入動畫
  const [loading, setLoading] = useState(false)

  // 資料過濾
  const [query, setQuery] = useState({
    startDate: '',
    endDate: '',
    categoryId: '',
    productName: '',
  })
  const [orders, setOrders] = useState([])
  const [categories, setCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalSum, setTotalSum] = useState(0)
  // 資料過濾

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
            profilePicture: data.profile_picture || `${IMG}`,
          }))
        })
        .catch((error) => {
          console.error('获取商家信息失败', error)
        })
      // 產品類別
      axios
        .get(`${ORDERDETAIL}/categories`)
        .then((response) => {
          setCategories(response.data)
        })
        .catch((error) => {
          console.error('获取产品种类信息失败', error)
        })
      loadTotalSum()
    }
    loadOrders()
  }, [
    sellerId,
    query.startDate,
    query.endDate,
    query.categoryId,
    query.productName,
  ])

  // 後端資料仔入
  // 加載訂單的函數，帶有延遲加載效果
  function loadOrders() {
    setLoading(true) // 在請求之前開始加載
    axios
      .get(`${ORDERDETAIL}/`, {
        params: {
          seller_id: sellerId,
          start_date: query.startDate,
          end_date: query.endDate,
          category_id: query.categoryId,
          product_name: query.productName,
          page: currentPage,
          limit: 5,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          setOrders(response.data.data)
          setTotalPages(response.data.totalPages)
        } else {
          console.log('Unexpected response structure:', response)
          setOrders([]) // 如果響應不如預期，清除訂單
        }
      })
      .catch((error) => {
        console.error('', error)
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false) // 延遲後停止加載
        }, 2000) // 根據用戶體驗調整或刪除延遲
      })
  }

  // 資料輸入
  function handleInputChange(e) {
    const { name, value } = e.target
    setQuery((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  // 處裡日期變更
  function handleDateChange(field, value) {
    setQuery((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // 總金額
  function loadTotalSum() {
    axios
      .get(`${ORDERDETAIL}/revenue/${sellerId}`, {
        params: {
          start_date: query.startDate,
          end_date: query.endDate,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.total_revenue) {
          setTotalSum(response.data.total_revenue)
        } else {
          console.log('Unexpected response structure:', response)
          setTotalSum(0)
        }
      })
      .catch((error) => {
        console.error('获取订单总金额失败', error)
        setTotalSum(0)
      })
  }

  // 類別
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value
    setQuery((prev) => ({
      ...prev,
      categoryId: categoryId,
      startDate: '',
      endDate: '',
      productName: '',
    }))
    // 發送新的請求
    loadOrders()
  }

  // 初始化查詢
  function resetSearch() {
    setQuery({
      startDate: '',
      endDate: '',
      categoryId: '',
      productName: '',
    })
    setCurrentPage(1) // 重置回第一页
    loadOrders() // 重新加载订单
  }

  //分頁
  const renderPageNumbers = () => {
    if (totalPages <= 1) return null

    const pageNumbers = []
    let startPage = Math.max(currentPage - 2, 1)
    let endPage = Math.min(startPage + 4, totalPages)

    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? 'active' : ''}`}
        >
          <button className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>
      )
    }

    return pageNumbers
  }
  // 分頁
  const handlePageChange = (newPage) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage)
      loadOrders() // 重新加载数据
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
          <div className="col-md-8 col-12">
            <div className={styles.formCard}>
              <div className={styles.formWrapper}>
                <h2 className={`${styles.formTitle}`}>訂單管理系統</h2>
                {/* 這裡要改成起始日期 */}
                <br></br>
                <div className={styles.selectGroup}>
                  <div className="col-md-auto col-12">
                    <label htmlFor="" className={styles.selectLabel}>
                      開始日期
                    </label>
                  </div>
                  <div className="col-md-auto col-12">
                    <input
                      type="date"
                      name="startDate"
                      value={query.startDate}
                      onChange={(e) =>
                        handleDateChange('startDate', e.target.value)
                      }
                      className="form-control"
                      placeholder="開始日期"
                    />
                  </div>

                  <div className="col-md-auto col-12">
                    <label htmlFor="" className={styles.selectLabel}>
                      結束日期
                    </label>
                  </div>
                  <div className="col-md-auto col-12">
                    <input
                      type="date"
                      name="endDate"
                      value={query.endDate}
                      onChange={(e) =>
                        handleDateChange('endDate', e.target.value)
                      }
                      className="form-control "
                      placeholder="結束日期"
                    />
                  </div>

                  {/* 這裡要能夠抓取到產品分類 */}
                  <div className="col-md-auto col-12">
                    <label htmlFor="" className={styles.selectLabel}>
                      以類別選擇
                    </label>
                  </div>
                  <div className="col-md-auto col-12">
                    <select
                      name="categoryId"
                      value={query.categoryId}
                      onChange={handleCategoryChange}
                      className="form-control "
                    >
                      <option value="">所有類別</option>
                      {categories.map((category) => (
                        <option
                          key={category.category_id}
                          value={category.category_id}
                        >
                          {category.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* 這裡要能夠抓取到產品分類 */}
                </div>

                {/* 這裡要改成結束日期 */}
                <br></br>
                {/* 這裡要能搜索產品名稱 */}
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 col-12">
                      <input
                        type="text"
                        name="productName"
                        value={query.productName}
                        onChange={handleInputChange}
                        className="form-control mb-2"
                        placeholder="產品名稱..."
                      />
                    </div>
                    {/* <div className="col-md-3 col-12">
                      <button
                        onClick={handleSearch}
                        className={styles.btnPrimary}
                      >
                        查詢銷售數據
                      </button>
                    </div> */}
                    {/* 清除搜索職按鈕 */}
                    <div className="col-md-3 mt-1 col-12">
                      <button
                        onClick={resetSearch}
                        className={styles.btnPrimary}
                        type="button"
                      >
                        初始化搜索
                      </button>
                    </div>
                    {/* 清除搜索職按鈕 */}
                  </div>
                </div>
                <br></br>
                {/* 這裡要能搜索產品名稱 */}
                {/* 我在這裡要實現資料的顯示 */}
                <div
                  className="d-flex justify-content-center align-items-center mt-3"
                  style={{ minHeight: '200px' }}
                >
                  {loading ? (
                    <div className="text-center">
                      <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                    </div>
                  ) : (
                    <table className={`${styles.table}`}>
                      <thead>
                        <tr>
                          <th>產品名稱</th>
                          <th>產品類別</th>
                          <th>銷售數量</th>
                          <th>訂單收入</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.order_id}>
                            <td>{order.product_name}</td>
                            <td>{order.category_name}</td>
                            <td>{order.purchase_quantity}</td>
                            <td>${order.total_sum}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                {/* 我在這裡要實現資料的顯示 */}
                {/* 訂單總金額 */}
                <div className="col-md-12 mt-3 col-12">
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                    訂單總金額：
                  </h3>
                  {totalSum > 0 ? (
                    <p
                      style={{
                        fontSize: '1.25rem',
                        color: 'green',
                        fontWeight: 'bold',
                      }}
                    >{`$${totalSum}`}</p>
                  ) : (
                    <p
                      style={{
                        fontSize: '1.25rem',
                        color: 'red',
                        fontStyle: 'bold',
                      }}
                    >
                      沒有收入
                    </p>
                  )}
                </div>
                {/* 訂單總金額 */}
                {/* 分頁 */}
                <nav>
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? 'disabled' : ''
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        <i className="bi bi-chevron-left "></i>
                      </button>
                    </li>
                    {renderPageNumbers()}
                    <li
                      className={`page-item  ${
                        currentPage === totalPages ? 'disabled' : ''
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <i className="bi bi-chevron-right "></i>
                      </button>
                    </li>
                  </ul>
                </nav>
                {/* 分頁 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
