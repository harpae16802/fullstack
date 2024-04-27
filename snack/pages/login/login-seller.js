// pages/login/seller-login.js
import Section from '@/components/layout/section'
import React, { useState, useContext } from 'react'
import Image from 'next/image'
import SearchBar from '@/components/common/search-bar'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LoginForm from '../../components/loginForm' // 賣家表單
import CustomModal from '../../components/CustomModal' // 賣家彈窗
import { MiniloginContext } from '@/contexts/minilogin-context'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

// 用在分頁的icon
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa'

export default function LoginSeller() {
  // 處理手機板的註冊登入的頁面呈現
  const { selectedContent, handleLinkClick } = useContext(MiniloginContext)
  // const [formData, setFormData] = useState({ email: '', password: '' });

  // const handleFormChange = (newData) => {
  //   setFormData(prev => ({ ...prev, ...newData }));
  // };

  const [passwordVisibility, setPasswordVisibility] = useState({
    password3: false,
    password4: false,
    password5: false,
    password6: false,
  })

  // 切換指定密碼欄位的顯示狀態
  const togglePasswordVisibility = (fieldName) => {
    setPasswordVisibility({
      ...passwordVisibility,
      [fieldName]: !passwordVisibility[fieldName],
    })
  }

  const router = useRouter()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const handleSuccess = () => {
    setShowSuccessModal(true)

    setTimeout(() => {
      Replace()
    }, 2000)
  }

  const handleError = () => {
    setShowErrorModal(true)
  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
  }

  const handleCloseErrorModal = () => {
    setShowErrorModal(false)
  }
  const Replace = () => {
    router.replace('/seller-basic-data')
  }

  return (
    <>
      <Section>
        <div className="seller-page">
          <div className="seller-login-group">
            <div className="seller-login-page col-5">
              <div className="lamp-pic">
                <Image
                  src="/images/login/lamp.svg"
                  alt=""
                  className="lamp-obj"
                  width={166}
                  height={242}
                />
              </div>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link "
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    商家會員註冊
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    商家會員登入
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="login-title">
                    <span>商家會員註冊</span>
                    <button type="button" className="btn btn-outline-primary">
                      <Link href="/login/login-custom">切換一般會員</Link>
                    </button>
                  </div>

                  <div className="seller-input-group">
                    <form>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputMobile"
                          className="form-label"
                        >
                          <span>手機號碼</span>
                          <span className="must-text">*必填項目</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputMobile"
                          aria-describedby="mobileHelp"
                        />
                        <div id="mobileHelp" className="form-text"></div>
                      </div>
                      {/* 追加1 */}
                      <div className="mb-3 pswinput">
                        <label htmlFor="password3" className="form-label">
                          <span>密碼</span>
                          <span className="must-text">*必填項目</span>
                        </label>
                        <input
                          type={
                            passwordVisibility.password3 ? 'text' : 'password'
                          }
                          className="form-control"
                          id="password3"
                          name="password3"
                        />
                        <div
                          className="password-eye"
                          onClick={() => togglePasswordVisibility('password3')}
                        >
                          {passwordVisibility.password3 ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </div>
                        <div id="passwordHelp" className="form-text"></div>
                      </div>
                      <div className="mb-3 pswinput">
                        <label htmlFor="password4" className="form-label">
                          <span>再次確認密碼</span>
                          <span className="must-text">*必填項目</span>
                        </label>
                        <input
                          type={
                            passwordVisibility.password4 ? 'text' : 'password'
                          }
                          className="form-control"
                          id="password4"
                          name="password4"
                        />
                        <div
                          className="password-eye"
                          onClick={() => togglePasswordVisibility('password4')}
                        >
                          {passwordVisibility.password4 ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </div>
                        <div id="passwordHelp" className="form-text"></div>
                      </div>
                      {/* 追 */}
                      <button type="submit" className="btn btn-primary mt-4">
                        註冊
                      </button>
                    </form>
                  </div>
                </div>
                <div
                  className="tab-pane fade show active"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="login-title">
                    <span>商家會員登入</span>
                    <button type="button" className="btn btn-outline-primary">
                      <Link href="/login/login-custom">切換一般會員</Link>
                    </button>
                  </div>
                  <div className="seller-input-group">
                    <LoginForm onSuccess={handleSuccess} />

                    <div className="forget-text">
                      <Link href="/opt" className="forget-p">
                        <p>忘記密碼？</p>
                      </Link>
                    </div>
                    {/* <button type="submit" className="btn btn-primary mb-5">
                        登入
                      </button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="login-pic col-7">
              <Image
                src="/images/login/loginpic.jpg"
                alt=""
                className="login-index-pic"
                width={1200}
                height={933}
              />
            </div>
            {/* <SearchBar /> */}
          </div>
        </div>
        {/* 以下是min版 */}
        <div className="seller-page-min">
          <div className="seller-min-group">
            {/* 商家會員註冊 */}
            <div
              className="seller-min-register"
              style={{
                display: selectedContent === 'type1' ? 'block' : 'none',
              }}
            >
              <div className="login-title">
                <span>商家會員註冊</span>
                <button type="button" className="btn btn-outline-primary">
                  <Link
                    href="/login/login-custom"
                    onClick={() => handleLinkClick('type1')}
                  >
                    切換一般
                  </Link>
                </button>
              </div>
              <div className="seller-input-group">
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputMobile" className="form-label">
                      <span>手機號碼</span>
                      <span className="must-text">*必填項目</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputMobile"
                      aria-describedby="mobileHelp"
                    />
                    <div id="mobileHelp" className="form-text"></div>
                  </div>
                  <div className="mb-3 pswinput">
                    <label htmlFor="password5" className="form-label">
                      <span>密碼</span>
                      <span className="must-text">*必填項目</span>
                    </label>
                    <input
                      type={passwordVisibility.password5 ? 'text' : 'password'}
                      className="form-control"
                      id="password5"
                      name="password5"
                    />
                    <div
                      className="password-eye"
                      onClick={() => togglePasswordVisibility('password5')}
                    >
                      {passwordVisibility.password5 ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </div>
                    <div id="passwordHelp" className="form-text"></div>
                  </div>
                  <div className="mb-3 pswinput">
                    <label htmlFor="password6" className="form-label">
                      <span>再次確認密碼</span>
                      <span className="must-text">*必填項目</span>
                    </label>
                    <input
                      type={passwordVisibility.password6 ? 'text' : 'password'}
                      className="form-control"
                      id="password6"
                      name="password6"
                    />
                    <div
                      className="password-eye"
                      onClick={() => togglePasswordVisibility('password6')}
                    >
                      {passwordVisibility.password6 ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </div>
                    <div id="passwordHelp" className="form-text"></div>
                  </div>
                  <button type="submit" className="btn btn-primary mt-4 mb-4 ">
                    註冊
                  </button>
                </form>
              </div>
            </div>
            {/* 商家會員登入 */}
            <div
              className="seller-min-login"
              style={{
                display: selectedContent === 'type2' ? 'block' : 'none',
              }}
            >
              <div className="login-title">
                <span>商家會員登入</span>
                <button type="button" className="btn btn-outline-primary">
                  <Link
                    href="/login/login-custom"
                    onClick={() => handleLinkClick('type2')}
                  >
                    切換一般
                  </Link>
                </button>
              </div>
              <div className="seller-input-group">
                <LoginForm onSuccess={handleSuccess} onError={handleError} />

                {/* 登入成功彈窗 */}
                <CustomModal
                  show={showSuccessModal}
                  onClose={handleCloseSuccessModal}
                  title="登入成功"
                  body="您已成功登入。"
                />

                {/* 登入失敗彈窗 */}
                <CustomModal
                  show={showErrorModal}
                  onClose={handleCloseErrorModal}
                  title="登入失敗"
                  body="帳號或密碼錯誤，請重新輸入。"
                />

                
                <div className="forget-text">
                  <Link href="/opt" className="forget-p">
                    <p>忘記密碼？</p>
                  </Link>
                </div>
                {/* <button type="submit" className="btn btn-primary">
                    登入
                  </button> */}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
