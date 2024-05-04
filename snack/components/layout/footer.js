import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


export default function Footer() {
  return (
    <>
      {' '}
      <footer className="row">
        <div className="footer-circle">
          <div className="circle"></div>
        </div>
        <div className="footer-bar d-flex flex-column">
          <div className="footer-top d-flex  flex-md-row">
            <ul className="left-footer col-6 d-flex flex-column flex-md-row">
              <li className="footer-item">
                <Link className="footer-link" href="/market-map">
                  夜市導覽
                </Link>
              </li>
              <li className="footer-item">
                <Link className="footer-link" href="/nightmarket-info/index">
                  美味商城
                </Link>
              </li>
              <li className="footer-item">
                <Link className="footer-link" href="/game/game-select">
                  趣味遊戲
                </Link>
              </li>
            </ul>
            <ul className="right-footer col-6 d-flex flex-column flex-md-row">
              <li className="footer-item">
                <Link className="footer-link" href="/#discountnews">
                  最新消息
                </Link>
              </li>
              <li className="footer-item">
                <Link className="footer-link" href="/login/login-seller">
                  成為店家
                </Link>
              </li>
              <li className="footer-item">
                <Link className="footer-link" href="/#aboutme">
                  關於我們
                </Link>
              </li>
            </ul>
          </div>
          <div className="center-text d-flex ">
            <div className="icon-pic">
              {' '}
              <Image
                src="/images/layout/logo-foot.svg"
                alt="web-icon"
                className="web-icon"
                width={250}
                height={250}
              />
            </div>
            <div className="web-info">
              <div className="tel">
                <span className="tel-item col-6">手機 . 0987-432-123</span>
                <span className="tel-item col-6">電話 . 02-6631-6588</span>
              </div>
              <span className="col-12">信箱 . nightmarket@gmail.com</span>
              <span className="col-12">地址 . 台北市大安區復興南路一段390號2樓</span>
              <span className="copy col-12">
                Copyright © 2024 Nightmarket Hunter All Rights Reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
