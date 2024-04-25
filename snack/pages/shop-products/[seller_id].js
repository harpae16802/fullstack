import React, { useEffect, useState } from 'react'
import Link from 'next/link'
// 元件
import SectionProducts from '@/components/layout/section-nopaddin'
import ShopInfo from '@/components/shop-products/shop-info/shop-info'
import SearchBarSmaller from '@/components/common/search-bar-smaller'
import ProductCard from '@/components/shop-products/product-card/product-card'
import ProductCard2 from '@/components/shop-products/product-card2/product-card2'
// icons
import { FaShoppingCart } from 'react-icons/fa'
// api-path
import { SELLER_DATA, PRODUCTS_DATA } from '@/components/config/api-path'
// 樣式
import style from './shop-products.module.scss'
import { useRouter } from 'next/router'

export default function ShopProducts() {
  const router = useRouter()
  const { seller_id } = router.query

  const [seller, setSeller] = useState(null) // 渲染資訊出來
  const [products, setProducts] = useState([]) // 渲染資訊出來
  const [mainDishes, setMainDishes] = useState([]) // 渲染過濾的商品
  const [snack, setSnack] = useState([]) // 渲染過濾的商品
  const [sweet, setSweet] = useState([]) // 渲染過濾的商品
  const [drink, setDrink] = useState([]) // 渲染過濾的商品

  useEffect(() => {
    // 撈 seller 資料
    const fetchData = async () => {
      try {
        const r = await fetch(`${SELLER_DATA}/${seller_id}`)

        if (!r.ok) throw new Error('網絡回應錯誤')
        const data = await r.json()
        setSeller(data[0])
      } catch (error) {
        console.error('撈取 seller 資料錯誤:', error)
      }
    }

    // 撈 products 資料跟分類
    const fetchProducts = async () => {
      try {
        const r = await fetch(`${PRODUCTS_DATA}/${seller_id}`)
        if (!r.ok) {
          throw new Error('網絡回應錯誤')
        }
        const data = await r.json()
        setProducts(data.slice(0, 4))

        // 過濾分類
        const mainDishProducts = data.filter(
          (product) => product.category === '主食'
        )
        setMainDishes(mainDishProducts)

        // 過濾分類
        const snackProducts = data.filter(
          (product) => product.category === '小吃'
        )
        setSnack(snackProducts)

        // 過濾分類
        const sweetProducts = data.filter(
          (product) => product.category === '甜品'
        )
        setSweet(sweetProducts)

        // 過濾分類
        const drinkProducts = data.filter(
          (product) => product.category === '飲料'
        )
        setDrink(drinkProducts)
      } catch (error) {
        console.error('撈取 products 資料錯誤:', error)
      }
    }

    fetchData()
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
                shopName={seller.store_name} // 确保从状态动态传递 store_name
                time1="周一到周六" // 如果这些信息也应该是动态的，请替换为对应的状态
                time2="下午5:00到上午2:00" // 同上
                score="4.2" // 如果有动态数据，请替换
                comment="169則留言" // 如果有动态数据，请替换
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
                <li className={`d-flex ${style.li}`}>
                  <Link href="#hotSell" className={`fw-bold ${style.a}`}>
                    人氣精選
                  </Link>
                  <Link href="#mainFood" className={`fw-bold ${style.a}`}>
                    主食單點區
                  </Link>
                  <Link href="#snack" className={`fw-bold ${style.a}`}>
                    副食單點區
                  </Link>
                  <Link href="#sweet" className={`fw-bold ${style.a}`}>
                    這裡都是甜的
                  </Link>
                  <Link href="#drink" className={`fw-bold ${style.a}`}>
                    想喝飲料看這裡
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* product */}
          <div className={`row ${style.buy}`}>
            {/* card */}
            <div className="col-12 col-md-9">
              <div className="row">
                {/* card1 */}
                <div className="col">
                  <h5 className="fw-bold" id="hotSell">
                    人氣精選
                  </h5>
                </div>

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

              {/* card2 主食 */}
              <div className={`row ${style.card2}`}>
                <div className="row">
                  <h5 className="fw-bold" id="mainFood">
                    主食單點區
                  </h5>
                </div>
                <div className="row">
                  {mainDishes.map((dish, index) => {
                    return (
                      <div key={index} className={`col-12 col-md-6`}>
                        <ProductCard2
                          product_id={dish.product_id}
                          title={dish.product_name}
                          price={dish.price}
                          percentage="3.6"
                          pepole="48"
                          imgUrl={`/images/products/${dish.image_url}`}
                          introduce={dish.product_description}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* 小吃 */}
              <div className={`row ${style.card2}`}>
                <div className="row">
                  <h5 className="fw-bold" id="snack">
                    副食單點區
                  </h5>
                </div>
                <div className="row">
                  {snack.map((dish, index) => {
                    return (
                      <div key={index} className={`col-12 col-md-6`}>
                        <ProductCard2
                          product_id={dish.product_id}
                          title={dish.product_name}
                          price={dish.price}
                          percentage="3.6"
                          pepole="48"
                          imgUrl={`/images/products/${dish.image_url}`}
                          introduce={dish.product_description}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* 甜品 */}
              <div className={`row ${style.card2}`}>
                <div className="row">
                  <h5 className="fw-bold" id="sweet">
                    這裡都是甜的
                  </h5>
                </div>
                <div className="row">
                  {sweet.map((dish, index) => {
                    return (
                      <div key={index} className={`col-12 col-md-6`}>
                        <ProductCard2
                          product_id={dish.product_id}
                          title={dish.product_name}
                          price={dish.price}
                          percentage="3.6"
                          pepole="48"
                          imgUrl={`/images/products/${dish.image_url}`}
                          introduce={dish.product_description}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* 飲料 */}
              <div className={`row ${style.card2}`}>
                <div className="row">
                  <h5 className="fw-bold" id="drink">
                    想喝飲料看這裡
                  </h5>
                </div>
                <div className="row">
                  {drink.map((dish, index) => {
                    return (
                      <div key={index} className={`col-12 col-md-6`}>
                        <ProductCard2
                          product_id={dish.product_id}
                          title={dish.product_name}
                          price={dish.price}
                          percentage="3.6"
                          pepole="48"
                          imgUrl={`/images/products/${dish.image_url}`}
                          introduce={dish.product_description}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
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
