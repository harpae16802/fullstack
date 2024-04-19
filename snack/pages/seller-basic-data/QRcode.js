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
import CameraQRScanner from '@/components/CameraQRScanner'

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

  // 修改賣家資料 後 的狀態
  const [sellerData, setSellerData] = useState({
    profilePicture: '',
  })

  //QRcode
  const [showScanner, setShowScanner] = useState(false)
  const [qrCode, setQrCode] = useState('')

  // 使用Ref
  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  //  QRcode掃描觸發
  const handleScanClick = () => {
    setShowScanner((prev) => !prev) //切換顯示 類似toggle
  }

  // QRcode 資料
  const handleCodeDetected = (data) => {
    console.log('掃描到的數據：', data)
    setQrCode(data)
    const parsedData = JSON.parse(atob(data)); // 假设数据是 base64 编码的JSON字符串
    console.log("解構後的數據", parsedData);
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
          console.error('獲取賣家頭像失敗', error)
        })
    }
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
                      id=""
                      name=""
                    >
                      <option value="0">處裡中</option>
                      <option value="1">以兌換</option>
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
                      <th>產品名稱</th>
                      <th>產品數量</th>
                      <th>產品狀態</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {products.map((product) => (
                    <tr key={product.product_id}>
                      <td>{product.productName}</td>
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
                      {/* <td>
                        <input
                          type="checkbox"
                          onChange={() => {}}
                          value={product.product_id}
                        />
                      </td>
                    </tr> 
                  ))}*/}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
