// pages/seller-basic-data/order.js
import React, { useEffect, useState, useContext, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { SELLER_API } from './config'
import { useRouter } from 'next/router'
import { useSeller } from '../../contexts/SellerContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import Section from '@/components/layout/section'
import styles from '../../styles/navbar-seller.module.scss'
import OrderChart from '@/components/OrderChart'; // 確保路徑正確


export default function Order() {
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

  // 使用Ref
  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  // 總查詢
  useEffect(() => {
    console.log('index.js中的sellerId', sellerId)
    if (sellerId) {
      axios
        .get(`${SELLER_API}${sellerId}`)
        .then((response) => {
          const data = response.data.data //   後端資料

          setSellerData((prevData) => ({
            ...prevData,
            profilePicture: data.profile_picture || '',
          }))
        })
        .catch((error) => {
          console.error('拿取頭貼失敗', error)
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
                <h2 className={`${styles.formTitle}`}>定單管理系統</h2>

                {/* 這裡要改成起始日期 */}
                <div className={styles.selectGroup}>
                  <div className="col-auto">
                    <label htmlFor="" className={styles.selectLabel}>
                      以日期選擇
                    </label>
                  </div>
                  <div className="col-auto">
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
                <div className={styles.selectGroup}>
                  <div className="col-auto">
                    <label htmlFor="" className={styles.selectLabel}>
                      以日期選擇
                    </label>
                  </div>
                  <div className="col-auto">
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
                {/* 這裡要改成結束日期 */}

                {/* 這裡要能搜索產品名稱 */}
                <div className="container">
                  <div className="row">
                    <div className="col-md-11 col-9">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="產品名稱..."
                      />
                      {/* 清除搜索職按鈕 */}
                    </div>
                    <div className="col-md-1 col-3">
                      <button className={`${styles.btnoutline}`} type="button">
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>
                  </div>
                  {/* 清除搜索職按鈕 */}
                </div>
                {/* 這裡要能搜索產品名稱 */}

                {/* 這裡要能夠抓取到產品分類 */}
                <div className={styles.selectGroup}>
                  <div className="col-auto">
                    <label htmlFor="" className={styles.selectLabel}>
                      以日期選擇
                    </label>
                  </div>
                  <div className="col-auto">
                    <select
                      className={`form-select ${styles.customSelect}`}
                      id=""
                      name=""
                    >
                      <option value="0">類別1</option>
                      <option value="1">類別2</option>
                    </select>
                  </div>
                </div>
              {/* 這裡要能夠抓取到產品分類 */}

              {/* 我在這裡要實現資料的顯示 */}
              
            
              
              {/* 我在這裡要實現資料的顯示 */}
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
