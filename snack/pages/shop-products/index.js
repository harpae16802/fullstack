import React, { useEffect, useState } from 'react'
// 元件
import SectionProducts from '@/components/layout/section-nopaddin'
import ShopInfo from '@/components/shop-products/shop-info/shop-info'
import SearchBarSmaller from '@/components/common/search-bar-smaller'
import ProductCard from '@/components/shop-products/product-card/product-card'
import ProductCard2 from '@/components/shop-products/product-card2/product-card2'
// icons
import { FaShoppingCart } from 'react-icons/fa'
// fetch 網址
import { SELLER_DATA, PRODUCTS_DATA } from '@/components/config/api-path'

// 樣式
import style from './shop-products.module.scss'

export default function ShopProducts() {
  const [seller, setSeller] = useState(null)
  const [products, setProducts] = useState([])

  const seller_id = 4

  // 撈 seller 資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const r = await fetch(SELLER_DATA)
        if (!r.ok) {
          throw new Error('Network response 錯誤')
        }
        const data = await r.json()
        setSeller(data[3])
      } catch (error) {
        console.log('fetch 錯誤:', error)
      }
    }
    fetchData()
  }, [])

  // 撈 products 資料
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const r = await fetch(`${PRODUCTS_DATA}/${seller_id}`)
        if (!r.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await r.json()
        setProducts(data.slice(0, 4))
      } catch (error) {
        console.error('fetch products 錯誤:', error)
      }
    }

    fetchProducts()
  }, [seller_id])

  return (
    <SectionProducts>
      <div className={`container-fluid ${style.container}`}>
        {/* banner */}
        <div className="row">
          <img
            src="/images/shop-banner01.jpg"
            alt=""
            className={style.banner}
          />
        </div>

        <div className={`row d-flex justify-content-center ${style.content}`}>
          <div className="col">
            {/* shop info */}
            {seller && (
              <ShopInfo
                seller_id={seller.seller_id}
                shopName={seller.store_name}
                time1="周一到周六"
                time2="下午5:00到上午2:00"
                score="4.2"
                comment="169則留言"
              />
            )}
          </div>

          {/* search & nav */}
          <div className={`row d-flex align-items-center ${style.search}`}>
            <div className="col-12 col-md-3">
              <SearchBarSmaller />
            </div>

            <div className="col-12 col-md-9">
              <ul className={`d-flex align-items-center p-0 ${style.ul}`}>
                {Array(4)
                  .fill(1)
                  .map((v, i) => {
                    return (
                      <li key={i} className={`${style.li}`}>
                        <a href="#!" className={`fw-bold ${style.a}`}>
                          人氣精選
                        </a>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>

          {/* product */}
          <div className={`row ${style.buy}`}>
            {/* card */}
            <div className="col-12 col-md-9">
              <div className="row">
                <div className="row">
                  <div className="col">
                    <h5 className="fw-bold">人氣精選</h5>
                  </div>
                </div>

                {/* card1 */}
                <div
                  className={`row flex-nowrap flex-md-wrap ${style.productCardRow}`}
                >
                  {products.map((product) => {
                    return (
                      <div
                        className={`col-12 col-lg-3 ${style.productCardCol}`}
                        key={product.product_id}
                      >
                        <ProductCard
                          product_id={product.product_id}
                          imgUrl={`/images/products/${product.image_url}`}
                          title={product.product_name}
                          price={product.price}
                          percentage="4.3"
                          pepole="46"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* card2 */}
              {Array(4)
                .fill(1)
                .map((v) => {
                  return (
                    <div key={v} className={`row ${style.card2}`}>
                      <div className="row">
                        <h5 className="fw-bold">人氣精選</h5>
                      </div>
                      <div className="row">
                        {Array(5)
                          .fill(1)
                          .map((v) => {
                            return (
                              <div key={v} className={`col-12 col-md-6`}>
                                <ProductCard2
                                  title="酥炸杏鮑菇"
                                  price="80"
                                  percentage="36"
                                  pepole="48"
                                  imgUrl="/images/shop02.jpg"
                                />
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  )
                })}
            </div>

            {/* cart */}
            <div className="d-none col-0 d-md-block col-md-3">
              <div
                className={`d-flex justify-content-center align-items-center flex-column sticky-top ${style.cart}`}
              >
                <FaShoppingCart className={`${style.icon}`} />
                <h4 className="fw-bold">購物車目前空空</h4>
                <div className="d-flex">
                  <p>總計</p>
                  <p>0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionProducts>
  )
}
