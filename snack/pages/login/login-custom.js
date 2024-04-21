import Section from '@/components/layout/section'
import React, { useState } from 'react'
import Image from 'next/image'
import SearchBar from '@/components/common/search-bar'
import Link from 'next/link'
import { useAuth } from '@/contexts/custom-context'
import { useRouter } from 'next/router'

// 用在分頁的icon
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa'

export default function LoginCustom({toggleRegister}) {
  const router = useRouter()

  const { auth, login, logout } = useAuth()

  // 處理手機板的頁面呈現
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  const handleToggleRegister  = () => {
    if(toggleRegister){
      setIsRegisterVisible(!isRegisterVisible);
    }else{
      setIsRegisterVisible(isRegisterVisible);

    }
  };

  return (
    <>
      <Section>
        <div className="custom-page">
          <div className="custom-login-group">
            <div className="login-pic col-7">
              <Image
                src="/images/login/loginpic.jpg"
                alt=""
                className="login-index-pic"
                width={1200}
                height={933}
              />
            </div>

            <div className="custom-login-page col-5">
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
                    一般會員註冊
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
                    一般會員登入
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
                    <span>一般會員註冊</span>
                    <button type="button" className="btn btn-outline-primary">
                      切換商家會員
                    </button>
                  </div>
                  <div className="custom-input-group">
                    <form name="form3" method="post" onSubmit={() => {}}>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          <span>E-MAIL</span>
                          <span className="must-text">*必填項目</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          name="email"
                          aria-describedby="emailHelp"
                        />
                        <div id="emailHelp" className="form-text"></div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password3" className="form-label">
                          <span>密碼</span>
                          <span className="must-text">*必填項目</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password3"
                          name="password3"
                        />
                        <div id="passwordHelp" className="form-text"></div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password4" className="form-label">
                          <span>再次確認密碼</span>
                          <span className="must-text">*必填項目</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password4"
                          name="password4"
                        />
                        <div id="passwordHelp" className="form-text"></div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-4 mb-4"
                      >
                        註冊
                      </button>
                    </form>

                    <button className="google-login mt-4">
                      <Image
                        src="/images/login/Google.svg"
                        alt=""
                        className="google-pic"
                        width={33}
                        height={33}
                      />
                      <span>使用Google帳戶註冊</span>
                    </button>
                  </div>
                </div>
                <div
                  className="tab-pane fade show active"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="login-title">
                    <span>一般會員登入</span>
                    <button type="button" className="btn btn-outline-primary">
                      <Link href="/login/login-seller">切換商家會員</Link>
                    </button>
                  </div>
                  <div className="custom-input-group">
                    <form
                      name="form1"
                      method="post"
                      onSubmit={(e) => {
                        e.preventDefault() // 防止表單預設行為
                        const account = e.target.account.value
                        const password = e.target.password.value
                        login(account, password).then((success) => {
                          if (success) {
                            // 登入成功後的操作，例如導航到另一個頁面
                            alert('登入成功')
                            router.replace(`/`)
                          } else {
                            // 登入失敗，顯示錯誤訊息
                            alert('登入失敗，請檢查帳號和密碼')
                          }
                        })
                      }}
                    >
                      <div className="mb-3">
                        <label htmlFor="account" className="form-label">
                          帳號
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="account"
                          name="account"
                        />
                        <div id="emailHelp" className="form-text"></div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          密碼
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                        />
                        <div id="passwordHelp" className="form-text"></div>
                      </div>
                      <div className="forget-text">
                        <Link href="/opt" className="forget-p">
                          <p>忘記密碼？</p>
                        </Link>
                      </div>
                      <button type="submit" className="btn btn-primary mb-5">
                        登入
                      </button>
                    </form>
                    <button className="google-login mt-5">
                      <Image
                        src="/images/login/Google.svg"
                        alt=""
                        className="google-pic"
                        width={33}
                        height={33}
                      />
                      <span>使用Google帳戶登入</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 以下是min版 */}
        <div className="custom-page-min">
          <div className="custom-min-group">
            {/* 一般會員註冊 */}
            <div className="custom-min-register" style={{ display: isRegisterVisible ? 'block' : 'none' }}>
              <div className="login-title">
                <span>一般會員註冊</span>
                <button type="button" className="btn btn-outline-primary">
                  切換商家
                </button>
              </div>
              <div className="custom-input-group">
                <form name="form4" method="post" onSubmit={() => {}}>
                  <div className="mb-3">
                    <label htmlFor="email2" className="form-label">
                      <span>E-MAIL</span>
                      <span className="must-text">*必填項目</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email2"
                      name="email2"
                      aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text"></div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="password5"
                      className="form-label"
                    >
                      <span>密碼</span>
                      <span className="must-text">*必填項目</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password5"
                      name="password5"
                    />
                    <div id="passwordHelp" className="form-text"></div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="password6"
                      className="form-label"
                    >
                      <span>再次確認密碼</span>
                      <span className="must-text">*必填項目</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password6"
                      name="password6"
                    />
                    <div id="passwordHelp" className="form-text"></div>
                  </div>
                  <button type="submit" className="btn btn-primary mt-4 mb-4">
                    註冊
                  </button>
                </form>

                <button className="google-login mt-4">
                  <Image
                    src="/images/login/Google.svg"
                    alt=""
                    className="google-pic"
                    width={33}
                    height={33}
                  />
                  <span>使用Google帳戶註冊</span>
                </button>
              </div>
            </div>
            {/* 一般會員登入 */}
            <div className="custom-min-login" style={{ display: isRegisterVisible ? 'none' : 'block' }}>
              <div className="login-title">
                <span>一般會員登入</span>
                <button type="button" className="btn btn-outline-primary">
                <Link href="/login/login-seller">切換商家</Link>
                </button>
              </div>
              <div className="custom-input-group">
              <form
                      name="form2"
                      method="post"
                      onSubmit={(e) => {
                        e.preventDefault() // 防止表單預設行為
                        const account = e.target.account2.value
                        const password = e.target.password2.value
                        login(account, password).then((result) => {
                          if (result) {
                            // 登入成功後的操作，例如導航到另一個頁面
                            alert('登入成功')
                            router.replace(`/`)
                          } else {
                            // 登入失敗，顯示錯誤訊息
                            alert('登入失敗，請檢查帳號和密碼')
                          }
                        })
                      }}
                    >
                  <div className="mb-3">
                    <label htmlFor="account2" className="form-label">
                      帳號
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="account2"
                      name="account2"
                      aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text"></div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="password2"
                      className="form-label"
                    >
                      密碼
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password2"
                      name="password2"
                    />
                    <div id="passwordHelp" className="form-text"></div>
                  </div>
                  <div className="forget-text">
                    <Link href="/opt" className="forget-p">
                      <p>忘記密碼？</p>
                    </Link>
                  </div>
                  <button type="submit" className="btn btn-primary mb-4">
                    登入
                  </button>
                </form>
                <button className="google-login mt-4">
                  <Image
                    src="/images/login/Google.svg"
                    alt=""
                    className="google-pic"
                    width={33}
                    height={33}
                  />
                  <span>使用Google帳戶登入</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
