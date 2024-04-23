import Section from '@/components/layout/section'
import React, { useState, useContext } from 'react'
import Image from 'next/image'
import SearchBar from '@/components/common/search-bar'
import Link from 'next/link'
import { useAuth } from '@/contexts/custom-context'
import { useRouter } from 'next/router'
import { MiniloginContext } from '@/contexts/minilogin-context'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { SIGN_UP_POST } from '@/components/config/api-path'
import { z } from 'zod'

// 用在分頁的icon
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa'

// 註冊檢查用
const schemaEmail = z.string().email({ message: '請填寫正確的E-MAIL格式' })
const schemaPwd = z.string().min(6, { message: '請填寫正確的密碼格式' })

export default function LoginCustom() {
  const router = useRouter()
  // 會員登入登出的勾子
  const { auth, login, logout } = useAuth()

  // 處理手機板的註冊登入的頁面呈現
  const { selectedContent, handleLinkClick } = useContext(MiniloginContext)

  // 處理必填欄位的CSS
  const [isAccountEmpty, setIsAccountEmpty] = useState(false) // 帳號狀態
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false) // 密碼狀態

  // 處理必填欄位的CSS - 處理帳號輸入
  const handleAccountChange = (e) => {
    if (e.target.value.trim() === '') {
      setIsAccountEmpty(true)
    } else {
      setIsAccountEmpty(false)
    }
  }
  // 處理必填欄位的CSS - 處理密碼輸入
  const handlePasswordChange = (e) => {
    if (e.target.value.trim() === '') {
      setIsPasswordEmpty(true)
    } else {
      setIsPasswordEmpty(false)
    }
  }

  //處理眼睛密碼顯現
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    password2: false,
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

  // ==== 註冊的部分 ====

  // 狀態為物件，屬性對應到表單的欄位名稱
  const [user, setUser] = useState({
    email: '',
    password3: '',
    password4: '',
  })

  // 錯誤訊息狀態
  const [errors, setErrors] = useState({
    email: '',
    password3: '',
    password4: '',
  })

  //

  // 多欄位共用事件函式
  const handleFieldChange = (e) => {
    console.log(e.target.name, e.target.value, e.target.type)

    // ES6特性: 計算得來的屬性名稱(computed property names)
    // [e.target.name]: e.target.value
    // ^^^^^^^^^^^^^^^ 這樣可以動態的設定物件的屬性名稱
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E5%90%8D
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    // 阻擋表單預設送出行為
    e.preventDefault()

    // 表單檢查 --- START
    // 建立一個新的錯誤物件
    const newErrors = {
      email: '',
      password3: '',
      password4: '',
    }

    // 信號值，代表是否有錯誤
    let hasErrors = false

    const r1 = schemaEmail.safeParse(user.email)
    if (!r1.success) {
      hasErrors = true
      newErrors.email = r1.error.issues[0].message
    }
    const r2 = schemaPwd.safeParse(user.password3)
    if (!r2.success) {
      hasErrors = true
      newErrors.password3 = r2.error.issues[0].message
    }

    if (!user.email) {
      newErrors.email = '請輸入E-MAIL'
      hasErrors = true
    }

    if (!user.password3) {
      newErrors.password3 = '請輸入密碼'
      hasErrors = true
    }

    if (!user.password4) {
      newErrors.password4 = '請輸入再次確認密碼'
      hasErrors = true
    }

    if (user.password4 !== user.password3) {
      newErrors.password4 = '密碼不相符'
      hasErrors = true
    }

    // 呈現錯誤訊息
    setErrors(newErrors)

    // 有錯誤，不送到伺服器，跳出submit函式
    if (hasErrors) {
      return
    }
    // 表單檢查 --- END

    // 最後檢查完全沒問題才送到伺服器(ajax/fetch)
    // alert('送到伺服器去')
    // 用fetch送出檔案

    const r = await fetch(SIGN_UP_POST, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await r.json()
    if (result.success) {
      //
      router.push(`/`)
    } else {
      //
      alert('資料新增發生錯誤')
    }

    //   const r = await fetch(AB_ADD_POST, {
    //     method: "POST",
    //     body: JSON.stringify(myForm),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const result = await r.json();
    //   console.log({ result });
    //   if (result.success) {
    //     //
    //     router.push(`/address-book`);
    //   } else {
    //     //
    //     alert("資料新增發生錯誤");
    //   }
    // };
    // const res = await fetch('http://localhost:3005/api/member', {
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'POST',
    //   body: JSON.stringify(user),
    // })

    // const data = await res.json()

    // console.log(data)
  }

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
                    onClick={() => handleLinkClick('type1')}
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
                    onClick={() => handleLinkClick('type2')}
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
                      <Link href="/login/login-seller">切換商家會員</Link>
                    </button>
                  </div>
                  <div className="custom-input-group">
                    <form
                      name="form3"
                      method="post"
                      onSubmit={handleSubmit}
                      style={{
                        paddingTop:
                          errors.email || errors.password3 || errors.password4
                            ? '10px'
                            : '40px',
                      }}
                    >
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          <span>E-MAIL</span>
                          <span className="must-text">*必填項目</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.email ? 'is-invalid' : ''
                          }`}
                          id="email"
                          name="email"
                          value={user.email}
                          onChange={handleFieldChange}
                          aria-describedby="emailHelp"
                          placeholder="請輸入有效的E-MAIL"
                        />
                        <div
                          id="emailHelp"
                          className="form-text invalid-feedback"
                        >
                          {errors.email}
                        </div>
                      </div>
                      <div className="mb-3 pswinput">
                        <label htmlFor="password3" className="form-label">
                          <span>密碼</span>
                          <span className="must-text">*必填項目</span>
                        </label>
                        <input
                          type={
                            passwordVisibility.password3 ? 'text' : 'password'
                          }
                          className={`form-control ${
                            errors.password3 ? 'is-invalid' : ''
                          }`}
                          id="password3"
                          name="password3"
                          value={user.password3}
                          onChange={handleFieldChange}
                          placeholder="請輸入至少6字以上的密碼"
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
                        <div
                          id="passwordHelp"
                          className="form-text invalid-feedback"
                        >
                          {errors.password3}
                        </div>
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
                          className={`form-control ${
                            errors.password4 ? 'is-invalid' : ''
                          }`}
                          id="password4"
                          name="password4"
                          value={user.password4}
                          onChange={handleFieldChange}
                          placeholder="請再次輸入密碼"
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
                        <div
                          id="passwordHelp"
                          className="form-text invalid-feedback"
                        >
                          {errors.password4}
                        </div>
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
                        // 檢查帳號是否為空
                        if (account.trim() === '') {
                          setIsAccountEmpty(true)
                          return // 如果帳號為空，停止表單提交
                        }
                        if (password.trim() === '') {
                          setIsPasswordEmpty(true)
                          return // 如果密碼為空，停止表單提交
                        }
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
                          className={`form-control ${
                            isAccountEmpty ? 'is-invalid' : ''
                          }`}
                          id="account"
                          name="account"
                          onChange={handleAccountChange}
                        />
                        <div
                          id="emailHelp"
                          className={`form-text ${
                            isAccountEmpty ? 'invalid-feedback' : ''
                          }`}
                          style={{ display: isAccountEmpty ? 'block' : 'none' }}
                        >
                          請輸入帳號
                        </div>
                      </div>
                      <div className="mb-3 pswinput">
                        <label htmlFor="password" className="form-label">
                          密碼
                        </label>
                        <input
                          type={
                            passwordVisibility.password ? 'text' : 'password'
                          }
                          className={`form-control ${
                            isPasswordEmpty ? 'is-invalid' : ''
                          }`}
                          id="password"
                          name="password"
                          onChange={handlePasswordChange}
                        />
                        <div
                          className="password-eye"
                          onClick={() => togglePasswordVisibility('password')}
                        >
                          {passwordVisibility.password ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </div>
                        <div
                          id="passwordHelp"
                          className={`form-text ${
                            isPasswordEmpty ? 'invalid-feedback' : ''
                          }`}
                          style={{
                            display: isPasswordEmpty ? 'block' : 'none',
                          }}
                        >
                          請輸入密碼
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary mb-4 mt-4">
                        登入
                      </button>
                      <div className="forget-text">
                        <Link href="/opt" className="forget-p mb-5">
                          <p>忘記密碼？</p>
                        </Link>
                      </div>
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
            <div
              className="custom-min-register"
              style={{
                display: selectedContent === 'type1' ? 'block' : 'none',
              }}
            >
              <div className="login-title">
                <span>一般會員註冊</span>
                <button type="button" className="btn btn-outline-primary">
                  <Link
                    href="/login/login-seller"
                    onClick={() => handleLinkClick('type1')}
                  >
                    切換商家
                  </Link>
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
                      placeholder="請輸入有效的E-MAIL"
                    />
                    <div id="emailHelp" className="form-text"></div>
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
                      placeholder="請輸入至少6字以上的密碼"
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
                      placeholder="請再次輸入密碼"
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
            <div
              className="custom-min-login"
              style={{
                display: selectedContent === 'type2' ? 'block' : 'none',
              }}
            >
              <div className="login-title">
                <span>一般會員登入</span>
                <button type="button" className="btn btn-outline-primary">
                  <Link
                    href="/login/login-seller"
                    onClick={() => handleLinkClick('type2')}
                  >
                    切換商家
                  </Link>
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
                    // 檢查帳號是否為空
                    if (account.trim() === '') {
                      setIsAccountEmpty(true)
                      return // 如果帳號為空，停止表單提交
                    }
                    if (password.trim() === '') {
                      setIsPasswordEmpty(true)
                      return // 如果密碼為空，停止表單提交
                    }
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
                    <label htmlFor="account2" className="form-label">
                      帳號
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        isAccountEmpty ? 'is-invalid' : ''
                      }`}
                      id="account2"
                      name="account2"
                      aria-describedby="emailHelp"
                      onChange={handleAccountChange}
                    />
                    <div
                      id="emailHelp"
                      className={`form-text ${
                        isAccountEmpty ? 'invalid-feedback' : ''
                      }`}
                      style={{ display: isAccountEmpty ? 'block' : 'none' }}
                    >
                      請輸入帳號
                    </div>
                  </div>
                  <div className="mb-3 pswinput">
                    <label htmlFor="password2" className="form-label">
                      密碼
                    </label>
                    <input
                      type={passwordVisibility.password2 ? 'text' : 'password'}
                      className={`form-control ${
                        isPasswordEmpty ? 'is-invalid' : ''
                      }`}
                      id="password2"
                      name="password2"
                      onChange={handlePasswordChange}
                    />
                    <div
                      className="password-eye"
                      onClick={() => togglePasswordVisibility('password2')}
                    >
                      {passwordVisibility.password2 ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </div>
                    <div
                      id="passwordHelp"
                      className={`form-text ${
                        isPasswordEmpty ? 'invalid-feedback' : ''
                      }`}
                      style={{ display: isPasswordEmpty ? 'block' : 'none' }}
                    >
                      請輸入密碼
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary mb-4 mt-4">
                    登入
                  </button>
                  <div className="forget-text">
                    <Link href="/opt" className="forget-p">
                      <p>忘記密碼？</p>
                    </Link>
                  </div>
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
