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

export default function LoginSeller() {
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
                      切換一般會員
                    </button>
                  </div>

                  <div className="seller-input-group step-1">
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
                      <button
                        type="submit"
                        className="btn btn-primary mt-5 mb-5"
                      >
                        下一步
                      </button>
                    </form>
                  </div>

                  {/* <div className="seller-input-group step-2">
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
                        className="btn btn-primary mt-5 mb-5"
                      >
                        註冊
                      </button>
                    </form>
                  </div> */}
                  {/* <div className="seller-input-group step-3">
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
                        className="btn btn-primary mt-5 mb-5"
                      >
                        註冊
                      </button>
                    </form>
                  </div> */}
                  {/* <div className="seller-input-group step-4">
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
                        className="btn btn-primary mt-5 mb-5"
                      >
                        註冊
                      </button>
                    </form>
                  </div> */}
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
                      切換一般會員
                    </button>
                  </div>
                  <div className="seller-input-group">
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
            {/* <div className="seller-min-register">
              <div className="login-title">
                <span>商家會員註冊</span>
                <button type="button" className="btn btn-outline-primary">
                  切換一般
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
                  <button type="submit" className="btn btn-primary mt-5 ">
                    下一步
                  </button>
                </form>
              </div>
            </div> */}
            {/* 商家會員登入 */}
            <div className="seller-min-login">
              <div className="login-title">
                <span>商家會員登入</span>
                <button type="button" className="btn btn-outline-primary">
                  切換一般
                </button>
              </div>
              <div className="seller-input-group">
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
                  <button type="submit" className="btn btn-primary">
                    登入
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
