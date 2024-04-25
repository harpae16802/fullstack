import React from 'react'
import Image from 'next/image'
import { FaSistrix, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa'
import SearchBar from '@/components/common/search-bar'
import CustomSlider from '@/components/index/custom-slider'
import StoreSlider from '@/components/index/store-slider'

export default function SectionIndex() {
  return (
    <>
      {' '}
      <div className="simple-news">
        <div className="col-2 col-md-1">
          <h6>即時消息</h6>
        </div>
        <div className="col-10 col-md-11 news">
          <a href="#">即時消息即時消息即時消息即時消息即時消息即時消息</a>
          <a href="#">即時消息即時消息即時消息即時消息即時消息即時消息</a>
          <a href="#">即時消息即時消息即時消息即時消息即時消息即時消息</a>
          <a href="#">即時消息即時消息即時消息即時消息即時消息即時消息</a>
          <a href="#">即時消息即時消息即時消息即時消息即時消息即時消息</a>
        </div>
      </div>
      <div className="kv">
        <div className="kv-title">一鍵搜尋，最優惠夜市小吃輕鬆網羅</div>
        <SearchBar />
        <div className="card-publicity-group">
          <div className="card-publicity">
            <div className="publicity-top">
              <span className="publicity">全台夜市</span>
            </div>
            <div className="publicity-buttom">
              <span className="publicity-big">999</span>
              <span className="publicity">處</span>
            </div>
          </div>
          <div className="card-publicity">
            <div className="publicity-top">
              <span className="publicity">收集最棒小吃</span>
            </div>
            <div className="publicity-buttom">
              <span className="publicity-big">9999</span>
              <span className="publicity">種</span>
            </div>
          </div>
          <div className="card-publicity">
            <div className="publicity-top">
              <span className="publicity">總計夜市小吃</span>
            </div>
            <div className="publicity-buttom">
              <span className="publicity-big">99999</span>
              <span className="publicity">種</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="section-index index-nop 
discount"
      >
        <div className="index-title">最新消息</div>
        <div className="slide-container">
          <div className="slide-group">
            {/* <CustomSlider /> */}

            <div className="slide-item">
              <Image
                src="/images/layout/P_20240224_194256.jpg"
                alt="discount-img"
                className="discount-img"
                width={500}
                height={300}
              />
              <div className="discount-text discount-store">
                士林夜市 林藤茶坊
              </div>
              <div className="discount-text discount-name">滿百折三十</div>
            </div>
            <div className="slide-item">
              <Image
                src="/images/layout/P_20240224_194256.jpg"
                alt="discount-img"
                className="discount-img"
                width={500}
                height={300}
              />
              <div className="discount-text discount-store">
                士林夜市 林藤茶坊
              </div>
              <div className="discount-text discount-name">滿百折三十</div>
            </div>
            <div className="slide-item">
              <Image
                src="/images/layout/P_20240224_194256.jpg"
                alt="discount-img"
                className="discount-img"
                width={500}
                height={300}
              />
              <div className="discount-text discount-store">
                士林夜市 林藤茶坊
              </div>
              <div className="discount-text discount-name">滿百折三十</div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-index index-nop index-store">
        <div className="index-title">店家</div>
        {/* <StoreSlider/> */}
        <div className="store-index-gruop">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={29}
            height={162}
            viewBox="0 0 29 162"
            fill="none"
            className="fa-arrow pre-arrow"
          >
            <path
              d="M28.1426 1L0.869039 81.1429L28.1426 161.285"
              stroke="#070505"
            />
          </svg>

          <div className="card-store-index-group">
            <div className="card-store-index">
              <div className="store-name">月氏激蛋葱油餅</div>
              <div className="store-market">寧夏夜市</div>
              <button type="button" className="btn btn-light">
                看更多
              </button>
            </div>
            <div className="card-store-index">
              <div className="store-name">月氏激蛋葱油餅</div>
              <div className="store-market">寧夏夜市</div>
              <button type="button" className="btn btn-light">
                看更多
              </button>
            </div>
            <div className="card-store-index">
              <div className="store-name">月氏激蛋葱油餅</div>
              <div className="store-market">寧夏夜市</div>
              <button type="button" className="btn btn-light">
                看更多
              </button>
            </div>
            <div className="card-store-index">
              <div className="store-name">月氏激蛋葱油餅</div>
              <div className="store-market">寧夏夜市</div>
              <button type="button" className="btn btn-light">
                看更多
              </button>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={29}
            height={162}
            viewBox="0 0 29 162"
            fill="none"
            className="fa-arrow next-arrow"
          >
            <path
              d="M1.14258 1L28.4161 81.1429L1.14258 161.285"
              stroke="#070505"
            />
          </svg>
        </div>
      </div>
      <div className="section-index index-nop">
        <div className="index-title">商品</div>
        <div className="product-index-gruop">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={29}
            height={162}
            viewBox="0 0 29 162"
            fill="none"
            className="fa-arrow pre-arrow"
          >
            <path
              d="M28.1426 1L0.869039 81.1429L28.1426 161.285"
              stroke="#070505"
            />
          </svg>

          <div className="card-product-index-group">
            <div className="card-product-index">
              <div className="product-top">
                <div className="product-title">
                  <div className="product-name">姊姊抓的餅</div>
                  <div className="product-name">豬排蛋</div>
                </div>
                <div className="product-img">
                  <button type="button" className="btn btn-light">
                    看更多
                  </button>
                </div>
              </div>
              <div className="product-text">
                <div className="price">$70</div>
                <div className="butinput">
                  <div className="quantity">
                    <button>
                      <FaPlus />
                    </button>
                    <input type="text" min="1" />
                    <button>
                      <FaMinus />
                    </button>
                  </div>
                  <button type="button" className="btn btn-primary">
                    <span className="cart-text">加入購物車</span>{' '}
                    <FaShoppingCart className="fa-cart" />
                  </button>
                </div>
              </div>
            </div>
            <div className="card-product-index">
              <div className="product-top">
                <div className="product-title">
                  <div className="product-name">姊姊抓的餅</div>
                  <div className="product-name">豬排蛋</div>
                </div>
                <div className="product-img">
                  <button type="button" className="btn btn-light">
                    看更多
                  </button>
                </div>
              </div>
              <div className="product-text">
                <div className="price">$70</div>
                <div className="butinput">
                  <div className="quantity">
                    <button>
                      <FaPlus />
                    </button>
                    <input type="text" min="1" />
                    <button>
                      <FaMinus />
                    </button>
                  </div>
                  <button type="button" className="btn btn-primary">
                    <span className="cart-text">加入購物車</span>{' '}
                    <FaShoppingCart className="fa-cart" />
                  </button>
                </div>
              </div>
            </div>
            <div className="card-product-index">
              <div className="product-top">
                <div className="product-title">
                  <div className="product-name">姊姊抓的餅</div>
                  <div className="product-name">豬排蛋</div>
                </div>
                <div className="product-img">
                  <button type="button" className="btn btn-light">
                    看更多
                  </button>
                </div>
              </div>
              <div className="product-text">
                <div className="price">$70</div>
                <div className="butinput">
                  <div className="quantity">
                    <button>
                      <FaPlus />
                    </button>
                    <input type="text" min="1" />
                    <button>
                      <FaMinus />
                    </button>
                  </div>
                  <button type="button" className="btn btn-primary">
                    <span className="cart-text">加入購物車</span>{' '}
                    <FaShoppingCart className="fa-cart" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={29}
            height={162}
            viewBox="0 0 29 162"
            fill="none"
            className="fa-arrow next-arrow"
          >
            <path
              d="M1.14258 1L28.4161 81.1429L1.14258 161.285"
              stroke="#070505"
            />
          </svg>
        </div>
      </div>
      <div className="section-index">
        <div className="index-title">關於我們</div>
        <div className="qr-text">
          <div className="qr-video col-12 col-md-7 mb-5 mb-md-0">
            <iframe
              width={840}
              height={542}
              src="https://www.youtube.com/embed/TjPwQlOjzb8?si=iWeV4pjfbpcJLqLc"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen=""
            />
          </div>
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
                      但去逛夜市常常都人擠人，買個雞排可能要走一段路點餐後還要等可能還沒地方吃東西，如果是夏天又熱個半死，簡直是地獄！因此我們平台，就是提供給那些想吃夜市美食又對夜市望而卻步的人們一個方便優惠的服務。台灣的夜市美食一直都深受廣大民眾的喜愛，讓人一想到口水就流下來了。
                      但去逛夜市常常都人擠人，買個雞排可能要走一段路點餐後還要等可能還沒地方吃東西，如果是夏天又熱個半死，簡直是地獄！因此我們平台，就是提供給那些想吃夜市美食又對夜市望而卻步的人們一個方便優惠的服務。
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
                      <strong>This is the third item's accordion body.</strong>{' '}
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
