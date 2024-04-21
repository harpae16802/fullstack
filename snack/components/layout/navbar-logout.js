import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  FaBars,
  FaUser,
  FaShoppingCart,
  FaAngleDown,
  FaAngleUp,
} from 'react-icons/fa'

export default function NavbarLogout({ toggleRegister }) {
  return (
    <>
      {' '}
      <nav className="navbar navbar-expand-lg  ">
        <div className="container-fluid">
          <div className="inline-nav">
            <Link className="navbar-brand" href="/">
              <Image src="/logo-o.svg" alt="" width={180} height={70} />
            </Link>
            <div className="right-icons">
              <a className="navbar-brand min-cart" href="#">
                <FaShoppingCart />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <FaBars className="navbar-toggler-icon fa-solid fa-bars" />
              </button>
            </div>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="me-auto" />
            <ul className="navbar-nav mb-2 mb-lg-0">
              <div className="view-nav-items">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    href="/market-map"
                  >
                    夜市導覽
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/nightmarket-info/index">
                    美味商城
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/game/game-select">
                    趣味遊戲
                  </Link>
                </li>
              </div>
              {/* 手機版的選單 開始 */}
              <div className="nav-min-types">
                {/* 未登入版 開始*/}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="my-drop-items">
                      <span>註冊</span>
                      <FaAngleDown className="faangle faangledown" />
                      <FaAngleUp className="faangle faangleup" />
                    </div>
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" href="/login/login-custom" onClick={() => toggleRegister(true)}>
                        一般會員註冊
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/login/login-seller">
                        商家會員註冊
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="my-drop-items">
                      <span>登入</span>
                      <FaAngleDown className="faangle faangledown" />
                      <FaAngleUp className="faangle faangleup" />
                    </div>
                  </a>
                  <ul
                    className="dropdown-menu login-border"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" href="/login/login-custom"  onClick={() => toggleRegister(false)}>
                        一般會員登入
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/login/login-seller">
                        商家會員登入
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* 未登入版結束 */}
              </div>
              {/* 手機版的選單 結束 */}

              {/* 網頁版的浮動視窗 開始 */}
              <div className="nav-icon-items">
                <li className="nav-item">
                  <div className="nav-icons">
                    {/* 未登入 Start */}
                    <div className="dropdown">
                      <a
                        className="dropdown-webbar"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {/* <FaBars className="fa-solid fa-bars" /> */}
                        <FaUser className="fa-solid fa-user" />
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <div className="triangle" />
                        <li>
                          <Link className="dropdown-item" href="/login/login-custom">
                            一般會員【登入/註冊】
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="/login/login-seller">
                            商家會員【登入/註冊】
                          </Link>
                        </li>
                      </ul>
                    </div>
                    {/* 未登入 End */}
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <div className="nav-icons">
                      <FaShoppingCart className="fa-solid fa-cart-shopping" />
                    </div>
                  </a>
                </li>
              </div>
              {/* 網頁版的浮動視窗 結束 */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
