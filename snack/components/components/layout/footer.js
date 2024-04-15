import React from 'react'
import Image from 'next/image'

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
                <a className="footer-link" href="#">
                  夜市導覽
                </a>
              </li>
              <li className="footer-item">
                <a className="footer-link" href="#">
                  美味商城
                </a>
              </li>
              <li className="footer-item">
                <a className="footer-link" href="#">
                  趣味遊戲
                </a>
              </li>
            </ul>
            <ul className="right-footer col-6 d-flex flex-column flex-md-row">
              <li className="footer-item">
                <a className="footer-link" href="#">
                  最新消息
                </a>
              </li>
              <li className="footer-item">
                <a className="footer-link" href="#">
                  成為店家
                </a>
              </li>
              <li className="footer-item">
                <a className="footer-link" href="#">
                  聯絡我們
                </a>
              </li>
            </ul>
          </div>
          <div className="center-text d-flex ">
            <div className="icon-pic">
              {' '}
              <Image
                src="/images/layout/icons.png"
                alt="web-icon"
                className="web-icon"
                width={250}
                height={250}
              />
            </div>
            <div className="web-info">
              <div className="tel">
                <span className="tel-item col-6">電話 . 0911222333</span>
                <span className="tel-item col-6">傳真 . 0911222333</span>
              </div>
              <span className="col-12">信箱 . nightmarket@gmail.com</span>
              <span className="col-12">地址 . 新北市中和區某某路100號10樓</span>
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
