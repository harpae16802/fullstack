import Section from '@/components/layout/section'
import React from 'react'
import Image from 'next/image'
import SearchBar from '@/components/common/search-bar'
import Link from 'next/link'
// 用在分頁的icon
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa'

export default function LoginCustom() {
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
                    <form>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          <span>E-MAIL</span>
                          <span className="must-text">*必填項目</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                        <div id="emailHelp" className="form-text"></div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          <span>密碼</span>
                          <span className="must-text">*必填項目</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                        />
                        <div id="passwordHelp" className="form-text"></div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          <span>再次確認密碼</span>
                          <span className="must-text">*必填項目</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
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
                      <span>使用google帳戶註冊</span>
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
                      切換商家會員
                    </button>
                  </div>
                  <div className="custom-input-group">
                    <form>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          帳號
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                        <div id="emailHelp" className="form-text"></div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          密碼
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
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
                      <span>使用google帳戶登入</span>
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
            {/* <div className="custom-min-register">
              <div className="login-title">
                <span>一般會員註冊</span>
                <button type="button" className="btn btn-outline-primary">
                  切換商家
                </button>
              </div>
              <div className="custom-input-group">
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      <span>E-MAIL</span>
                      <span className="must-text">*必填項目</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text"></div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      <span>密碼</span>
                      <span className="must-text">*必填項目</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                    <div id="passwordHelp" className="form-text"></div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      <span>再次確認密碼</span>
                      <span className="must-text">*必填項目</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
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
                  <span>使用google帳戶註冊</span>
                </button>
              </div>
            </div> */}
            {/* 一般會員登入 */}
            <div className="custom-min-login">
              <div className="login-title">
                <span>一般會員登入</span>
                <button type="button" className="btn btn-outline-primary">
                  切換商家
                </button>
              </div>
              <div className="custom-input-group">
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      帳號
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text"></div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      密碼
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
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
                  <span>使用google帳戶登入</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
