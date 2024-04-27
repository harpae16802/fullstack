import Section from '@/components/layout/section'
import React, { useState, useContext, useEffect } from 'react'
import useFirebase from '@/hooks/use-firebase'
import Image from 'next/image'
import SearchBar from '@/components/common/search-bar'
import Link from 'next/link'
import { useAuth } from '@/contexts/custom-context'
import { useRouter } from 'next/router'
import { MiniloginContext } from '@/contexts/minilogin-context'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { SIGN_UP_POST, GOOGLE_LOGIN_POST } from '@/components/config/api-path'
import { z } from 'zod'
import toast, { Toaster } from 'react-hot-toast'



export default function LoginCustom() {
  const router = useRouter()

  // 會員登入登出的勾子
  const { auth, login, logout, callbackGoogleLoginRedirect } = useAuth()

  // 處理手機板的註冊登入的頁面呈現
  const { selectedContent, handleLinkClick } = useContext(MiniloginContext)

 

  //loginGoogleRedirect無callback，要改用initApp在頁面初次渲染後監聽google登入狀態
  const { logoutFirebase, loginGoogleRedirect, initApp, loginGoogle } =
    useFirebase()



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





  return (
    <>
      <Section>
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
                        login(account, password).then((result) => {
                          if (result) {
                            // 登入成功後的操作，例如導航到另一個頁面

                            toast.success('歡迎您！登入成功', {
                              style: {
                                color: '#a32c2d',
                              },
                              iconTheme: {
                                primary: '#29a21e',
                                secondary: '#ffffff',
                              },
                            })

                            setTimeout(() => {
                              router.push('/')
                            }, 2000)
                          } else {
                            // 登入失敗，顯示錯誤訊息
                            toast.error('登入失敗，請檢查帳號和密碼', {
                              style: {
                                color: '#ff0101',
                              },
                              iconTheme: {
                                primary: '#ff0101',
                                secondary: '#ffffff',
                              },
                            })
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
                      <button
                        type="submit"
                        className="btn btn-primary mb-4 mt-4"
                      >
                        登入
                      </button>
                      <div className="forget-text">
                        <Link href="/opt" className="forget-p mb-5">
                          <p>忘記密碼？</p>
                        </Link>
                      </div>
                    </form>
                    <button
                      className="google-login mt-5"
                      onClick={() => {
                        loginGoogleRedirect()
                        // toast.success('歡迎您！登入成功', {
                        //   style: {
                        //     color: '#a32c2d',
                        //   },
                        //   iconTheme: {
                        //     primary: '#29a21e',
                        //     secondary: '#ffffff',
                        //   },
                        // })

                        // setTimeout(() => {
                        //   router.push('/')
                        // }, 2000)
                      }}
                    >
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
        <Toaster />
      </Section>
    </>
  )
}
