// pages/seller-basic-data/index.js
import React, { useEffect, useState, useContext, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { SELLER_API } from './config'
import { useRouter } from 'next/router'
import { useSeller } from '../../contexts/SellerContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import Section from '@/components/layout/section'
import styles from '../../styles/navbar-seller.module.scss'

export default function SellerBasicData() {
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
    profilePicture: '', // 賣家頭像
    bankAccounts: [], // 初始化為空數組
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
          const { profile_picture, bankAccounts } = response.data.data // 直接从data对象读取profile_picture和bankAccounts
          console.log('完整的响应数据:', response.data) // 打印完整的响应数据

          setSellerData((prevData) => ({
            ...prevData,
            profilePicture: profile_picture || '', // 使用正确的属性名profile_picture
            bankAccounts: bankAccounts || [], // 确保bankAccounts是一个数组
            // ...如果还有其他seller信息，也可以在这里展开
          }))
        })
        .catch((error) => {
          console.error('获取商家信息失败', error)
        })
    }
  }, [sellerId, imageVersion])

  // useEffect(() => {

  //   console.log("index.js中的sellerId", sellerId);

  //   if (sellerId) {
  //     axios
  //       .get(`${SELLER_API}${sellerId}`)
  //       .then((response) => {
  //         const data = response.data.data; // 注意确保这里的路径正确
  //         console.log(data); // 查看数据结构

  //         setSellerData((prevData) => ({
  //           ...prevData,
  //           profilePicture: data.profile_picture || "",
  //           // 其他字段...
  //         }));
  //       })
  //       .catch((error) => {
  //         console.error("获取商家信息失败", error);
  //       });
  //   }
  // }, [sellerId]);

  // 修改 更新 賣家的 資料
  // 修改银行账号数据
  const handleBankAccountChange = (index, field) => (event) => {
    const updatedBankAccounts = sellerData.bankAccounts.map((account, idx) => {
      if (idx === index) {
        return { ...account, [field]: event.target.value }
      }
      return account
    })

    setSellerData({ ...sellerData, bankAccounts: updatedBankAccounts })
  }

  // 提交表单
  const handleSubmit = (e) => {
    e.preventDefault()

    // 假设您的后端接收的是 sellerData 的格式
    axios
    axios
      .put(`${SELLER_API}/${sellerId}/update-bank-accounts`, {
        bankAccounts: sellerData.bankAccounts,
      })
      .then((response) => {
        console.log('数据更新成功:', response.data)
        // 在这里处理更新成功后的逻辑
      })
      .catch((error) => {
        console.error('数据更新失败:', error)
        // 在这里处理更新失败后的逻辑
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
        setImageVersion((prevVersion) => prevVersion + 1) // 獲取頭貼
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
                <h2 className={`${styles.formTitle}`}>銀行帳號設定</h2>
                {sellerData.bankAccounts.map((account, index) => (
                  <React.Fragment key={`bank-account-group-${index}`}>
                    <div className="mb-3">
                      <label
                        htmlFor={`accountNumber-${index}`}
                        className="form-label"
                      >
                        {`銀行帳號 ${index + 1}`}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`accountNumber-${index}`}
                        name="account_number"
                        placeholder={`请输入第 ${index + 1} 銀行帳號`}
                        value={account.account_number || ''}
                        onChange={handleBankAccountChange(
                          index,
                          'account_number'
                        )}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor={`bankCode-${index}`}
                        className="form-label"
                      >
                        {`銀行代碼 ${index + 1}`}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`bankCode-${index}`}
                        name="bank_code"
                        placeholder={`请输入第 ${index + 1}銀行代碼 `}
                        value={account.bank_code || ''}
                        onChange={handleBankAccountChange(index, 'bank_code')}
                      />
                    </div>
                  </React.Fragment>
                ))}

                {/* 提交按鈕 */}
                <div className={styles.buttonGroup}>
                  <Link href="/seller-basic-data/">
                    <button utton className={styles.btnSecondary}>
                      回到店面
                    </button>
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
