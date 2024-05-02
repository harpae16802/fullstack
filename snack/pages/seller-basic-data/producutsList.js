// pages/seller-basic-data/producutsList.js
import React, { useEffect, useState, useContext, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { SELLER_API, PRODUCTS_API, SELLER_LOCATION } from './config' // 引入配置
import { useSeller } from '../../contexts/SellerContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import Section from '@/components/layout/section'
import 'bootstrap-icons/font/bootstrap-icons.css'
import styles from '../../styles/navbar-seller.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button } from 'react-bootstrap'

const ProductsList = () => {
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

  const [products, setProducts] = useState([]) // 產品資訊
  const [imageVersion, setImageVersion] = useState(0) // 賣家頭貼
  const [currentPage, setCurrentPage] = useState(1) // 目前頁數
  const [itemsPerPage, setItemsPerPage] = useState(5) //呈現的分頁數
  const [totalItems, setTotalItems] = useState(0) // 處裡分頁
  const [filter, setFilter] = useState({}) //過濾查詢
  const [searchTerm, setSearchTerm] = useState('') // 篩選
  const [categories, setCategories] = useState([]) // 下拉選單
  const [selectedProducts, setSelectedProducts] = useState([]) // 批量操作
  //彈出視窗
  const [showModal, setShowModal] = useState(false)
  const [showFailModal, setShowFailModal] = useState(false)

  const [loading, setLoading] = useState(false) // 新增 loading 狀態
  // 修改賣家資料 後 的狀態
  const [sellerData, setSellerData] = useState({
    profilePicture: '',
  })

  // 使用Ref
  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  // 總請求 發至後端
  useEffect(() => {
    setLoading(true) 
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
          console.error('獲取失敗', error)
        })
    }
    const queryParams = new URLSearchParams({
      page: currentPage,
      limit: itemsPerPage,
      ...(searchTerm && { productName: searchTerm.trim() }),
      ...Object.fromEntries(
        Object.entries(filter).filter(([_, v]) => v != null)
      ),
    }).toString()

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${PRODUCTS_API}/${sellerId}/categories`
        )
        setCategories(response.data.categories)
      } catch (error) {
        console.error('載入數據失敗', error)
      }
    }

    const fetchData = async () => {
      setLoading(true) 
      try {
        const response = await axios.get(
          `${PRODUCTS_API}/${sellerId}?${queryParams}`
        )
        const categoryMap = new Map(
          categories.map((cat) => [cat.category_id, cat.category_name])
        )
        const updatedProducts = response.data.products.map((prod) => ({
          ...prod,
          category: categoryMap.get(prod.category) || prod.category,
        }))
        setProducts(updatedProducts)
        setTotalItems(response.data.total)
        console.log(response.data.total)
        console.log(response.data.products)
        if (currentPage > Math.ceil(response.data.total / itemsPerPage)) {
          setCurrentPage(1)
        }
      } catch (error) {
        console.error('Fetching data failed', error);
      } finally {
        setTimeout(() => {
          setLoading(false); // 延迟1秒后设置loading为false
        }, 1000); 
      }
    }

    if (sellerId) {
      fetchData()
      fetchCategories()
    }
  }, [sellerId, currentPage, itemsPerPage, filter, searchTerm, totalItems])

  // 處裡分頁
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const renderPageNumbers = () => {
    if (totalItems <= itemsPerPage) return null

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
          <a className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </a>
        </li>
      )
    }

    return pageNumbers
  }
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  // 批量上下架
  const getQueryParams = () => {
    const params = new URLSearchParams({
      page: currentPage,
      limit: itemsPerPage,
      ...(searchTerm && { productName: searchTerm.trim() }), // 确保包含搜索词
      ...Object.fromEntries(
        Object.entries(filter).filter(([_, v]) => v != null)
      ), // 确保包含其他筛选条件
    })

    return params.toString() // 返回查询字符串
  }

  const fetchData1 = async () => {
    setLoading(true) // 显示加载状态
    const queryParams = getQueryParams() // 获取当前的查询参数

    try {
      const response = await axios.get(
        `${PRODUCTS_API}/${sellerId}?${queryParams}`
      )
      const updatedProducts = response.data.products.map((product) => ({
        ...product,
        category:
          categories.find((cat) => cat.category_id === product.category_id)
            ?.category_name || product.category,
      }))
      setProducts(updatedProducts)
      setTotalItems(response.data.total)
      if (currentPage > Math.ceil(response.data.total / itemsPerPage)) {
        setCurrentPage(1)
      }
    } catch (error) {
      console.error('獲取產品失敗', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleProductSelection = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId)
      } else {
        return [...prevSelected, productId]
      }
    })
  }
  const handleBatchUpdateStatus = async (newStatus) => {
    setLoading(true)
    try {
      const response = await axios.put(`${PRODUCTS_API}/update-status`, {
        productIds: selectedProducts,
        status: newStatus,
      })
      if (response.status === 200) {
        handleShow()
      } else {
        handleFailShow()
      }
      await fetchData1()
    } catch (error) {
      console.error('更新失敗', error)
      handleFailShow()
    } finally {
      setLoading(false)
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
        setImageVersion((prevVersion) => prevVersion + 1) // 更新imageVersion圖片
        setSellerData((prevData) => ({
          ...prevData,
          profilePicture: response.data.imageUrl, // 後端返回頭貼
        }))
      })
      .catch((error) => {
        console.error('頭像上傳失敗', error)
        alert('頭像上傳失敗')
      })
  }

  // 彈出視窗
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)
  const handleFailClose = () => setShowFailModal(false)
  const handleFailShow = () => setShowFailModal(true)

  return (
    <Section>
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
          {/* 右側基本資料 */}
          <div className={`col-md-8 col-12 ${styles.formCard}`}>
            <div className={`${styles.formWrapper}`}>
              <h2 className={`${styles.formTitle}`}>產品列表</h2>
              {/* 搜索框 */}
              <br></br>
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="搜索產品名稱..."
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerm(e.target.value) & setCurrentPage(1)
                      }
                    />
                    {/* 清除搜索词按钮 */}
                  </div>

                  <div className="col-md-3 mt-1 col-12">
                    <button
                      className={styles.btnPrimary}
                      type="button"
                      onClick={() => setSearchTerm('')}
                    >
                      初始化搜尋
                    </button>
                  </div>
                </div>
                {/* 清除搜索词按钮 */}
              </div>
              {/* 搜索框 */}
              <br></br>
              <br></br>
              {/* 篩選 */}
              <div className="container">
                <div className="col-12">
                  <div className="row">
                    {/*  類別篩選 */}
                    <div className="col-md-4 col-12 mb-5">
                      <select
                        className="form-control"
                        onChange={(e) => {
                          const value = e.target.value
                          setFilter((prev) => ({
                            ...prev,
                            category: value || undefined, // 当选择“以类别搜索”时，设置为undefined
                          }))
                        }}
                        value={filter.category || ''}
                      >
                        <option value="">以類別搜尋</option>
                        {categories.map((category) => (
                          <option
                            value={category.category_id}
                            key={category.category_id}
                          >
                            {category.category_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 價格篩選 */}
                    <div className="col-md-4 col-12 mb-5">
                      <select
                        className="form-control"
                        onChange={(e) => {
                          const value = e.target.value
                          const [min, max] = value ? value.split('-') : []
                          setFilter((prev) => ({
                            ...prev,
                            minPrice: min || undefined, // 如果没有选择有效的范围，则移除这些键
                            maxPrice: max || undefined,
                          }))
                        }}
                        value={
                          filter.minPrice && filter.maxPrice
                            ? `${filter.minPrice}-${filter.maxPrice}`
                            : ''
                        }
                      >
                        <option value="">以價格搜尋</option>
                        <option value="0-30">0-30</option>
                        <option value="30-60">30-60</option>
                        <option value="60-200">60-200</option>
                      </select>
                    </div>

                    {/* 狀態篩選 */}
                    <div className="col-md-4 col-12 mb-5">
                      <select
                        className="form-control"
                        onChange={(e) =>
                          setFilter({ ...filter, status: e.target.value })
                        }
                        value={filter.status || ''}
                      >
                        <option value="">以上下架分類</option>
                        <option value="1">上架</option>
                        <option value="0">下架</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <br></br>
              {/* 表格 */}

              <div
                className="d-flex justify-content-center align-items-center mt-3"
                style={{ minHeight: '200px' }}
              >
                {loading ? (
                  <div className="text-center">
                    <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                    {/* <p className="mt-2">加載中...</p> */}
                  </div>
                ) : (
                  <table className={`${styles.table}`}>
                    <thead>
                      <tr>
                        <th>產品名稱</th>
                        <th>產品數量</th>
                        <th>產品類別</th>
                        <th>產品價格</th>
                        <th>產品狀態</th>
                        <th>修改</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr
                          key={product.product_id}
                          style={{
                            backgroundColor: selectedProducts.includes(
                              product.product_id
                            )
                              ? '#f8d7da'
                              : '',
                          }}
                          onClick={() =>
                            toggleProductSelection(product.product_id)
                          }
                        >
                          <td style={{ display: 'none' }}>
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(
                                product.product_id
                              )}
                              readOnly
                            />
                          </td>
                          <td style={{ borderRadius: '7px 0px 0px 7px' }}>
                            {product.productName}
                          </td>
                          <td>{product.stockQuantity}</td>
                          <td>{product.category}</td>
                          <td>{product.price}</td>
                          <td>{product.status}</td>
                          <td>
                            <Link
                              href={`/seller-basic-data/[productId]`}
                              as={`/seller-basic-data/${product.product_id}`}
                            >
                              修改
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className={styles.buttonGroup}>
                <button
                  onClick={() => handleBatchUpdateStatus(0)}
                  className={styles.btnSecondary}
                >
                  設為下架
                </button>
                <button
                  onClick={() => handleBatchUpdateStatus(1)}
                  className={styles.btnPrimary}
                >
                  設為上架
                </button>
              </div>
              <br></br>
              {/* 分頁 */}
              <nav>
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? 'disabled' : ''
                    }`}
                  >
                    <button
                      className="page-link cursor:'pointer'"
                      onClick={() =>
                        currentPage > 1 && handlePageChange(currentPage - 1)
                      }
                    >
                      <i className="bi bi-chevron-left cursor:'pointer'"></i>
                    </button>
                  </li>
                  {renderPageNumbers()}
                  <li
                    className={`page-item cursor:'pointer' ${
                      currentPage === totalPages ? 'disabled' : ''
                    }`}
                  >
                    <button
                      className="page-link  cursor-pointer;"
                      onClick={() =>
                        currentPage < totalPages &&
                        handlePageChange(currentPage + 1)
                      }
                    >
                      <i className="bi bi-chevron-right cursor:'pointer'"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>更新成功</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>產品狀態更新完成</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFailModal} onHide={handleFailClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>更新失败</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>產品狀態更新未能完成，请重试。</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFailClose}>
            关闭
          </Button>
        </Modal.Footer>
      </Modal>
    </Section>
  )
}

export default ProductsList
