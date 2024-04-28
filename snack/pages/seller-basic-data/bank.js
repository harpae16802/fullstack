// pages/seller-basic-data/bank.js
import React, { useEffect, useState, useContext, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { SELLER_API } from './config'
import { useRouter } from 'next/router'
import { useSeller } from '../../contexts/SellerContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import Section from '@/components/layout/section'
import styles from '../../styles/navbar-seller.module.scss'
import { Modal, Button } from 'react-bootstrap'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function bank() {
  // 使用 useRouter
  const router = useRouter()

  // 使用useRef 作為拿取DOM元素操作
  const fileInputRef = useRef(null)

  //拿取seller_id
  const sellerId = typeof window !== 'undefined' ? localStorage.getItem('sellerId') : null;


  // 賣家頭像 初始與更新
  const [imageVersion, setImageVersion] = useState(0)

  // 修改賣家資料 後 的狀態
  const [sellerData, setSellerData] = useState({
    profilePicture: '', // 賣家頭像
    bankAccounts: [], // 初始化為空數組
  })

  //彈出視窗
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showFailModal, setShowFailModal] = useState(false)
  const [originalBankAccounts, setOriginalBankAccounts] = useState([]);
  const [showNoChangeModal, setShowNoChangeModal] = useState(false);

  // 動畫
  const [loading, setLoading] = useState(true)

  // 驗證
  const [errors, setErrors] = useState({});

  // 使用Ref
  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  // 總查詢
  useEffect(() => {
    if (!sellerId) {
      router.replace('/login/login-seller');  
    }
    if (sellerId) {
      axios
        .get(`${SELLER_API}${sellerId}`)
        .then((response) => {
          const { profile_picture, bankAccounts } = response.data.data // 解構出我的資料
          console.log('後端的數據:', response.data) // debug

          setSellerData((prevData) => ({
            ...prevData,
            profilePicture: profile_picture || '', // 使用鉤子
            bankAccounts: bankAccounts || [], // 使用鉤子
          }))
          setOriginalBankAccounts(bankAccounts || []);  
        })
        .catch((error) => {
          console.error('获取商家信息失败', error)
        })
        setTimeout(() => {
          setLoading(false)
        }, 1000)
    }
  }, [sellerId, imageVersion])

  // 修改銀行帳號
  const handleBankAccountChange = (index, field) => (event) => {
    const updatedBankAccounts = sellerData.bankAccounts.map((account, idx) => {
      if (idx === index) {
        return { ...account, [field]: event.target.value }
      }
      return account
    })

    setSellerData({ ...sellerData, bankAccounts: updatedBankAccounts })
  }

// 驗證
const validateBankAccounts = () => {
  const newErrors = {};
  sellerData.bankAccounts.forEach((account, index) => {
    if  (!account.account_number || !account.account_number.trim()) {
      newErrors[`accountNumber-${index}`] = "銀行帳號不能為空";
    }
    const bankCode = String(account.bank_code || "");
    if (!bankCode.trim()) {
      newErrors[`bankCode-${index}`] = "銀行代碼不能為空";
    }
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0; 
};

  // 送出表單
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateBankAccounts()) {
      console.error('表單驗證失敗:', errors);
      return;  
    }
    if (JSON.stringify(sellerData.bankAccounts) === JSON.stringify(originalBankAccounts)) {
      setShowNoChangeModal(true);
      return;
    }
    axios
      .put(`${SELLER_API}/${sellerId}/update-bank-accounts`, {
        bankAccounts: sellerData.bankAccounts,
      })
      .then((response) => {
        setShowSuccessModal(true);
      })
      .catch((error) => {
        setShowFailModal(true);
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
        setImageVersion((prevVersion) => prevVersion + 1) // 更新imageVersion以刷新图片
        setSellerData((prevData) => ({
          ...prevData,
          profilePicture: response.data.imageUrl, // 使用后端返回的新图片路径
        }))
      })
      .catch((error) => {
        console.error('頭像上傳失敗', error)
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
              <form onSubmit={handleSubmit} className={styles.formWrapper}>
                <h2 className={`${styles.formTitle}`}>銀行帳號設定</h2>
                {sellerData.bankAccounts.map((account, index) => (
                  <React.Fragment key={`bank-account-group-${index}`}>
                    <div className="mb-5">
                      <label
                        htmlFor={`accountNumber-${index}`}
                        className="form-label"
                      >
                        {`銀行帳號 ${index + 1}`}
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors[`accountNumber-${index}`] ? 'is-invalid' : ''}`}
                        id={`accountNumber-${index}`}
                        name="account_number"
                        placeholder={`请输入第 ${index + 1} 銀行帳號`}
                        value={account.account_number || ''}
                        onChange={handleBankAccountChange(
                          index,
                          'account_number'
                        )}
                      />
                      {errors[`accountNumber-${index}`] && <div className="invalid-feedback">{errors[`accountNumber-${index}`]}</div>}
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor={`bankCode-${index}`}
                        className="form-label"
                      >
                        {`銀行代碼 ${index + 1}`}
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors[`bankCode-${index}`] ? 'is-invalid' : ''}`}
                        id={`bankCode-${index}`}
                        name="bank_code"
                        placeholder={`请输入第 ${index + 1}銀行代碼 `}
                        value={account.bank_code || ''}
                        onChange={handleBankAccountChange(index, 'bank_code')}
                      />
                       {errors[`bankCode-${index}`] && <div className="invalid-feedback">{errors[`bankCode-${index}`]}</div>}
                    </div>
                  </React.Fragment>
                ))}

                {/* 提交按鈕 */}
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
                )}
          {/* 表單 */}
        </div>
      </div>

      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>修改成功</Modal.Title>
        </Modal.Header>
        <Modal.Body>銀行帳號已成功更新。</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showFailModal}
        onHide={() => setShowFailModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>修改失敗</Modal.Title>
        </Modal.Header>
        <Modal.Body>更新銀行帳號失敗，請重試。</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFailModal(false)}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showNoChangeModal} onHide={() => setShowNoChangeModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>資料未變更</Modal.Title>
  </Modal.Header>
  <Modal.Body>您沒有做任何變更。</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowNoChangeModal(false)}>關閉</Button>
  </Modal.Footer>
</Modal>
    </Section>
  )
}
