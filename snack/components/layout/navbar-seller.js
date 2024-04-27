import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import { FaBars, FaUser, FaShoppingCart, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import {
  FaBars,
  FaUser,
  FaShoppingCart,
  FaAngleDown,
  FaAngleUp,
} from 'react-icons/fa'
import NavbarLogout from '@/components/sellerLogout'
import 'bootstrap/dist/css/bootstrap.min.css'
import LogoutModal from '@/components/sellerLogoutModal'

export default function NavbarSeller() {
  // 導覽列的名稱樣式
  const router = useRouter()

  // 談窗
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleLogout = () => {
    // 清除localStorage中的seller_id
    localStorage.removeItem('sellerId')
    // 更新Context
    setSeller(null)

    setTimeout(() => {
      Replace()
    }, 3000)
  }  
  const Replace = () => {
    router.replace('/')
  }

  const handleCloseLogoutModal = () => {
    // 關閉彈窗
    setShowLogoutModal(false)
  }

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
                    className={`nav-link ${
                      router.pathname === '/market-map' ? 'active' : ''
                    }`}
                    aria-current="page"
                    href="/market-map"
                  >
                    夜市導覽
                  </Link>
                </li>
                <li className="nav-item" style={{ border: 'none' }}>
                  <Link
                    className={`nav-link ${
                      router.pathname === '/nightmarket-info/index'
                        ? 'active'
                        : ''
                    }`}
                    href="/nightmarket-info/index"
                  >
                    美味商城
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <a className={`nav-link ${router.pathname === '/game/game-select' ? 'active' : ''}`} href="#">
                    趣味遊戲
                  </a>
                </li> */}
              </div>
              {/* 手機版的選單 開始 */}
              <div className="nav-min-types">
                {/* 商家會員版 開始*/}
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
                      <span>商家會員中心</span>
                      <FaAngleDown className="faangle faangledown" />
                      <FaAngleUp className="faangle faangleup" />
                    </div>
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="/seller-basic-data/QRcode"
                      >
                        掃描QRcode
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        進入店面
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/seller-basic-data/orderList"
                      >
                        訂單管理
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <NavbarLogout onClick={() => setShowLogoutModal(true)} />
                </li>
                {/* 商家會員結束 */}
              </div>
              {/* 手機版的選單 結束 */}

              {/* 網頁版的浮動視窗 開始 */}
              <div className="nav-icon-items">
                <li className="nav-item">
                  <div className="nav-icons">
                    {/* 商家會員 Start */}
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
                        <div className="triangle"></div>
                        <li>
                          <a className="dropdown-item" href="/">
                            進入店面
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="/seller-basic-data/orderList"
                          >
                            訂單管理
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="/seller-basic-data/QRcode"
                          >
                            掃描QRcode
                          </a>
                        </li>
                        <li>
                          <NavbarLogout
                            onClick={() => setShowLogoutModal(true)}
                          />
                        </li>
                      </ul>
                    </div>
                    <LogoutModal
                      show={showLogoutModal}
                      onClose={handleCloseLogoutModal}
                      onConfirm={handleLogout}
                    />
                    {/* 商家會員 End */}
                  </div>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link" href="#">
                    <div className="nav-icons">
                      <FaShoppingCart className="fa-solid fa-cart-shopping" />
                    </div>
                  </a>
                </li> */}
              </div>
              {/* 網頁版的浮動視窗 結束 */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
