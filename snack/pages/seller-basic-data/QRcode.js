// pages/seller-basic-data/QRcode.js
import React, { useEffect, useState, useContext, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { SELLER_API } from './config'
import { useRouter } from 'next/router'
import { useSeller } from '../../contexts/SellerContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import Section from '@/components/layout/section'
import styles from '../../styles/navbar-seller.module.scss'
import { Modal, Button, Form } from 'react-bootstrap'
import CameraQRScanner from '@/components/CameraQRScanner'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function QRcode() {
  // 使用 useRouter
  const router = useRouter()
  // const CameraQRScanner = dynamic(() => import('@/components/CameraQRScanner'), {
  //   ssr: false
  // });

  // 使用useRef 作為拿取DOM元素操作
  const fileInputRef = useRef(null)

  //拿取seller_id
  const { seller } = useSeller()
  const sellerId = seller?.id

  // 賣家頭像 初始與更新
  const [imageVersion, setImageVersion] = useState(0)

  // 動畫
  const [loading, setLoading] = useState(true)

  // 修改賣家資料 後 的狀態
  const [sellerData, setSellerData] = useState({
    profilePicture: '',
  })

  //QRcode
  const [showScanner, setShowScanner] = useState(false)
  const [qrcodeid, setqrcodeid] = useState('') // 解析的 資料
  const [selectedStatus, setSelectedStatus] = useState('0') // 初始狀態為 "處理中"
  const [orderDetails, setOrderDetails] = useState([])
  const [showSuccessModal, setShowSuccessModal] = useState(false) // 彈出視窗

  const [showOrderNotExistModal, setShowOrderNotExistModal] = useState(false)
  const [showOrderNotFoundModal, setShowOrderNotFoundModal] = useState(false)
  const [showOrderUpdateSuccessModal, setShowOrderUpdateSuccessModal] =
    useState(false)
  const [showOrderUpdateFailModal, setShowOrderUpdateFailModal] =
    useState(false)
  const [showScanFailModal, setShowScanFailModal] = useState(false)

  // 使用Ref
  const handleImageClick = () => fileInputRef.current.click()

  const handleScanClick = () => setShowScanner((prev) => !prev)

  // QRcode 資料解析
  const handleCodeDetected = (data) => {
    try {
      const jsonData = JSON.parse(data)
      if (jsonData.length > 0 && jsonData[0].qrcode_id) {
        setqrcodeid(jsonData[0].qrcode_id) // 設置 qrcodIid
        fetchOrderDetails(jsonData[0].qrcode_id)
        setShowSuccessModal(true)
      } else {
        console.error('解析的數據中沒有qrcode_id')
      }
    } catch (error) {
      setShowScanFailModal(true) // 顯示掃描失敗彈窗

      console.error('解析出錯:', error)
    }
  }

  const fetchOrderDetails = async (qrcodeid) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/QRcode/details/${qrcodeid}`
      )
      if (response.data.length > 0) {
        const data = response.data[0]
        if (data.seller_id.toString() === sellerId.toString()) {
          setOrderDetails(response.data)
          setSelectedStatus(data.status.toString())
        } else {
          setShowOrderNotExistModal(true)
          setOrderDetails([]) // 清空不相關的訂單數據
        }
      } else {
        alert('未找到訂單資訊')
        setShowOrderNotFoundModal(true)
        setOrderDetails([])
      }
    } catch (error) {
      console.error('获取订单详情失败:', error)
    } 
  }

  // 更新訂單
  const updateOrderStatus = async (newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3002/QRcode/update-status/${qrcodeid}`,
        {
          status: newStatus,
        }
      )
      console.log('訂單狀態更新成功:', response.data)
      setShowOrderUpdateSuccessModal(true)
      fetchOrderDetails(qrcodeid) // 重新獲取訂單詳情來更新 UI
    } catch (error) {
      setShowOrderUpdateFailModal(true)
      console.error('訂單狀態更新失敗:', error)
    }
  }

  // 彈出視窗關閉部分
  const handleCloseSuccessModal = () => setShowSuccessModal(false)
  const handleCloseNotExistModal = () => setShowOrderNotExistModal(false)
  const handleCloseOrderNotFoundModal = () => setShowOrderNotFoundModal(false)
  const handleCloseUpdateSuccessModal = () =>
    setShowOrderUpdateSuccessModal(false)
  const handleCloseUpdateFailModal = () => setShowOrderUpdateFailModal(false)
  const handleCloseScanFailModal = () => setShowScanFailModal(false)

  
  // 修改前 如果拿取到seller_id執行這裡
  useEffect(() => {
    if (!sellerId) {
      router.replace('/login/login-seller');  
    }
    console.log('index.js中的sellerId', sellerId)
    if (sellerId) {
      axios
        .get(`${SELLER_API}${sellerId}`)
        .then((response) => {
          const data = response.data.data // 注意确保这里的路径正确

          setSellerData((prevData) => ({
            ...prevData,
            profilePicture: data.profile_picture || '',
            // 其他字段...
          }))
        })
        .catch((error) => {
          console.error('獲取賣家頭像失敗', error)
        })
    }setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [sellerId])

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
          {loading ? (
            <div0
                   className={styles.loadingContainer}>
                    <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                    {/* <p className="mt-2">加載中...</p> */}
                  </div0>
                ) : (
          <div className="col-md-8 col-12">
            <div className={styles.formCard}>
              <div className={styles.formWrapper}>
                <h2 className={`${styles.formTitle}`}>QRcode掃描區</h2>
                {/* 下拉是選單 */}
                <div className={styles.selectGroup}>
                  {/* 按鈕 */}
                  <div className="col-auto">
                    <button
                      onClick={handleScanClick}
                      className={styles.btnPrimary}
                    >
                      掃描QRcode
                    </button>
                  </div>

                  <div className="col-auto">
                    <label className={styles.selectLabel}>
                      選擇產品兌換狀態:
                    </label>
                  </div>

                  <div className="col-4">
                    <select
                      className={`form-select ${styles.customSelect}`}
                      value={selectedStatus}
                      onChange={(e) => {
                        setSelectedStatus(e.target.value) // 首先更新本地選擇狀態
                        updateOrderStatus(e.target.value) // 然後更新後端數據
                      }}
                    >
                      <option value="0">處理中</option>
                      <option value="1">已兌換</option>
                    </select>
                  </div>
                </div>
                {/* QRcode */}
                {showScanner && (
                  <CameraQRScanner
                    onCodeDetected={handleCodeDetected}
                    shouldDisplay={showScanner}
                  />
                )}
                {/* {qrCode && (
                  <div className={styles.qrCodeDisplay}>
                    掃描到的資料：{qrCode}
                  </div>
                )} */}

                <br></br>
                {/* 表格 */}
                <table className={`${styles.table}`}>
                  <thead>
                    <tr>
                      <th>購買帳號</th>
                      <th>產品名稱</th>
                      <th>產品數量</th>
                      {/* <tr>總金額</tr> */}
                      <th>產品狀態</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails.map((item, index) => (
                      <tr key={index}>
                        <td>{item.custom_account}</td>
                        <td>{item.product_name}</td>
                        <td>{item.purchase_quantity}</td>
                        {/* <td>{item.total_sum}</td> */}
                        <td>{item.status === 0 ? '未兌換' : '兌換成功'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
                )}
        </div>
      </div>
      {/*  */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>掃描成功</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>掃描結果已確認。</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            確定
          </Button>
        </Modal.Footer>
      </Modal>
{/*  */}
      <Modal
        show={showScanFailModal}
        onHide={handleCloseScanFailModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>掃描失敗</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>無法解析QR碼，請確保QR碼清晰且完整。</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseScanFailModal}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
   
      <Modal
        show={showOrderNotExistModal}
        onHide={handleCloseNotExistModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>訂單不存在</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>此訂單不存在或不屬於當前賣家。</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNotExistModal}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    
      <Modal
        show={showOrderNotFoundModal}
        onHide={handleCloseOrderNotFoundModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>訂單未找到</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>未找到訂單資訊。</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOrderNotFoundModal}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
   
      <Modal
        show={showOrderUpdateSuccessModal}
        onHide={handleCloseUpdateSuccessModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>更新成功</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>訂單狀態更新成功。</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateSuccessModal}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showOrderUpdateFailModal}
        onHide={handleCloseUpdateFailModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>更新失敗</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>訂單狀態更新失敗，請重試。</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateFailModal}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </Section>
  )
}
