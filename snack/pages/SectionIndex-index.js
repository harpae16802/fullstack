import React from 'react'
import Image from 'next/image'
import CustomSlider from '@/components/index/custom-slider'
import StoreSlider from '@/components/index/store-slider'
import NewsSlider from '@/components/index/news-slider'
import ProductSlider from '@/components/index/product-slider'
import SearchBarIndex from '@/components/common/search-bar-index'
import { FaVolumeDown } from 'react-icons/fa'
import Link from 'next/link'

export default function SectionIndex() {
  // 搜尋後 跳轉至 夜市資訊 || 地圖導覽
  // const handlesearch = ()=>{

  // }

  return (
    <>
      {' '}
      <div className="topicon" onClick={() => window.scrollTo(0, 0)}>
        ↑TOP
      </div>
      <div className="simple-news">
        <div className="col-2 col-md-1 newsup">
          <h6>即時消息</h6>
          <FaVolumeDown className="vol" />
        </div>
        <div className="col-10 col-md-11 news">
          <NewsSlider />
        </div>
      </div>
      <div className="kv">
        <div className="kv-title">一鍵搜尋，最優惠夜市小吃輕鬆網羅</div>
        <SearchBarIndex />
        <div className="card-publicity-group">
          <div className="card-publicity">
            <div className="publicity-top">
              <span className="publicity">全台夜市</span>
            </div>
            <div className="publicity-buttom">
              <span className="publicity-big">125</span>
              <span className="publicity">處</span>
            </div>
          </div>
          <div className="card-publicity">
            <div className="publicity-top">
              <span className="publicity">收集最棒小吃</span>
            </div>
            <div className="publicity-buttom">
              <span className="publicity-big">3684</span>
              <span className="publicity">種</span>
            </div>
          </div>
          <div className="card-publicity">
            <div className="publicity-top">
              <span className="publicity">總計夜市小吃</span>
            </div>
            <div className="publicity-buttom">
              <span className="publicity-big">8574</span>
              <span className="publicity">種</span>
            </div>
          </div>
        </div>
      </div>
      <div className="section-index index-nop discount">
        <div className="index-title" id="discountnews">
          最新消息
        </div>
        <CustomSlider />
        <div className="bgc-tapi">
          <Image
            src="/images/layout/2_tapioca.png"
            alt="tapioca"
            className="tapioca"
            width={600}
            height={600}
          />
        </div>
        <div className="bgc-tofu">
          <Image
            src="/images/layout/18_tofu.png"
            alt="stinky-tofu"
            className="tofu"
            width={800}
            height={800}
          />
        </div>
      </div>
      <div className="section-index index-nop index-store">
        <div className="index-title">店家</div>
        <StoreSlider />
      </div>
      <div className="section-index index-nop index-product">
        <div className="index-title">商品</div>
        <ProductSlider />
      </div>
      <div className="section-index">
        <div className="index-title" id="aboutme">
          關於我們
        </div>
        <div className="qr-text">
          <div className="qr-video col-12 col-md-7 mb-5 mb-md-0">
            {/* <iframe
              width={840}
              height={542}
              src="https://www.youtube.com/embed/TjPwQlOjzb8?si=iWeV4pjfbpcJLqLc"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen=""
            /> */}
            <iframe
              width={840}
              height={542}
              src="https://www.youtube.com/embed/iMgnutnCtsE?si=jLeSoea0zuuZGS36"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen=""
            ></iframe>
          </div>

          {/* 商品詳細頁 && 購物車連結*/}
          <div className="qr-about col-12 col-md-5">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <span className="accordion-word fw-bold">品牌精神</span>
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <span className="accordion-word fw-bold">
                      台灣的夜市美食一直都深受廣大民眾的喜愛，讓人一想到口水就流下來了。
                      但去逛夜市常常都人擠人，買個雞排可能要走一段路點餐後還要等可能還沒地方吃東西，如果是夏天又熱個半死，簡直是地獄！因此我們平台，就是提供給那些想吃夜市美食又對夜市望而卻步的人們一個方便優惠的服務。
                      <br />
                      　　夜市獵人Nightmarket Hunter是夜市攤販提升銷售額的利器，也是替顧客省荷包的好網站。透過夜市獵人，攤販能夠掌握客戶資訊，提供個人化廣告和即時優惠訊息，也可以增加攤販的曝光度，透過報表及評論可以讓攤販對銷售的資訊更深入了解來提供更好服務及產品。
                      而客戶利用QRcode系統，可彈性分次兌換商品，並且享受更優惠價格，不僅方便還吸引了更多外國客人，不用現金就可以透過我們的網站，去購買商品，減少對現金的依賴。
                      <br />
                      　　快來加入夜市獵人Nightmarket Hunter、瞄準你想要的夜市攤販商品！
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <span className="accordion-word fw-bold">
                      QR兌換教學文字版
                    </span>
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <span className="accordion-word fw-bold">
                      <strong>This is the second item's accordion body.</strong>{' '}
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    <span className="accordion-word fw-bold">合作模式</span>
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body border-0">
                    <span className="accordion-word fw-bold">
                      夜市獵人Nightmarket Hunter誠摯邀請您加入我們的合作行列！作為夜市攤販的您，和我們合作可以得到：
                      <br/>
                      ．曝光增加：透過夜市獵人，您的攤位將得到更多的曝光和宣傳機會。
                      <br/>
                      ．個性化推廣：我們提供個性化的廣告和即時優惠訊息，幫助您更精準地吸引目標客群。
                      <br/>
                      ．資訊收集：我們能夠幫助您收集客戶資訊，深入了解顧客需求，提供更好的服務和產品。
                      <br/>
                      ．QRcode系統：客戶可以透過QRcode系統彈性分次兌換商品，享受更優惠價格，增加您的銷售額。
                      <br/>
                      ．無現金交易：我們採用第三方支付工具，客戶無需現金即可購買商品。
                      <br/>
                      ．通關遊戲折扣：顧客可透過通關遊戲獲得折扣，吸引更多顧客前來購買。
                      <br/>
                      　　加入夜市獵人Nightmarket Hunter，與我們一起攜手合作，共同打造更加繁榮的夜市文化！
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
