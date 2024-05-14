// import React, { useEffect, useRef, useState } from 'react'
// import { useRouter } from 'next/router'
// import Link from 'next/link'
// import dynamic from 'next/dynamic'
// // 套件
// import Slider from 'react-slick'
// // 元件
// import SectionProducts from '@/components/layout/section-nopaddin'
// import ShopInfo from '@/components/shop-products/shop-info/shop-info'
// import SearchBarSmaller from '@/components/common/search-bar-smaller'
// import ProductCard from '@/components/shop-products/product-card/product-card'
// import ProductCard2 from '@/components/shop-products/product-card2/product-card2'
// import Cart from '@/components/shop-products/cart/cart'
// // api-path
// import {
//   SHOP_PRODUCTS,
//   SELLER_DATA,
//   PRODUCTS_DATA,
//   API_SERVER,
// } from '@/components/config/api-path'
// // 樣式
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
// import style from './shop-products.module.scss'

// const StickyCart = dynamic(
//   () => {
//     return import('react-stickynode')
//   },
//   { ssr: false }, // 设置 ssr 为 false 来关闭服务器端渲染
// )

// export default function ShopProducts() {
//   const router = useRouter()
//   const { seller_id } = router.query

//   const cartRef = useRef(null)
//   const [cartWidth, setCartWidth] = useState(0)

//   const [seller, setSeller] = useState(null) // 渲染資訊出來
//   const [products, setProducts] = useState([]) // 渲染資訊出來
//   const [mainDishes, setMainDishes] = useState([]) // 渲染過濾的商品
//   const [snack, setSnack] = useState([]) // 渲染過濾的商品
//   const [sweet, setSweet] = useState([]) // 渲染過濾的商品
//   const [drink, setDrink] = useState([]) // 渲染過濾的商品
//   const [rating, setRating] = useState([]) // 評分
//   const [productRating, setProductRating] = useState([]) // 評分
//   const [discount, setDiscount] = useState([]) // 優惠

//   const settings = {
//     dots: false,
//     infinite: true,
//     slidesToShow: 7,
//     slidesToScroll: 1,
//     autoplay: true,
//     speed: 5000,
//     autoplaySpeed: 4000,
//     cssEase: 'linear',
//     arrows: false,
//     centerMode: true,
//   }

//   // 關鍵字搜尋
//   const handleSearch = (searchTerm) => {
//     const search = searchTerm.toLowerCase().trim()
//     const allProductElements = document.querySelectorAll(
//       `.${style.productCardCol}, .${style.productCardCol2}`,
//     )

//     let found = false

//     allProductElements.forEach((element) => {
//       const titleElement = element.querySelector(`.${style.title}`)
//       if (
//         titleElement &&
//         titleElement.textContent.toLowerCase().includes(search)
//       ) {
//         found = true
//         titleElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
//         titleElement.classList.add(style.titleHighlight)
//       } else if (titleElement) {
//         titleElement.classList.remove(style.titleHighlight)
//       }
//     })

//     // if (!found) {
//     //   toast.error('沒有找到相關項目')
//     // }
//   }

//   // 格式化時間的函數，將 '00:00:00' 轉換為 '00:00'
//   const formatTime = (time) => {
//     return time.slice(0, 5)
//   }

//   // 休息日的映射函數
//   const mapDayToChinese = (dayNumber) => {
//     const dayMapping = {
//       7: '日',
//       1: '一',
//       2: '二',
//       3: '三',
//       4: '四',
//       5: '五',
//       6: '六',
//     }
//     return dayMapping[dayNumber] || '未知' // 如果沒有匹配到，返回'未知'
//   }

//   // 處理資料
//   useEffect(() => {
//     // 取得 seller 資料
//     const fetchData = async () => {
//       try {
//         const r = await fetch(`${SELLER_DATA}/${seller_id}`)

//         if (!r.ok) throw new Error('網絡回應錯誤')
//         const data = await r.json()
//         setSeller(data[0])
//       } catch (error) {
//         console.error('撈取 seller 資料錯誤:', error)
//       }
//     }

//     // 取得 products 資料跟分類
//     const fetchProducts = async () => {
//       try {
//         const r = await fetch(`${PRODUCTS_DATA}/${seller_id}`)
//         if (!r.ok) {
//           throw new Error('網絡回應錯誤')
//         }
//         const productsData = await r.json()

//         const ratingsResponse = await fetch(
//           `${SHOP_PRODUCTS}/product-ratings/${seller_id}`,
//         )
//         if (!ratingsResponse.ok) {
//           throw new Error('網絡回應錯誤')
//         }
//         const ratingsData = await ratingsResponse.json()

//         // 結合產品數據與評分數據
//         const productsWithRatings = productsData.map((product) => {
//           const rating =
//             ratingsData.find((r) => r.product_id === product.product_id) || {}
//           return {
//             ...product,
//             average_night_rating: rating.average_night_rating || 0,
//             total_comments: rating.total_comments || 0,
//           }
//         })

//         // 根據評分降序排序所有產品，然後選擇前四個作為人氣精選
//         const sortedProducts = productsWithRatings.sort(
//           (a, b) => b.average_night_rating - a.average_night_rating,
//         )
//         setProducts(sortedProducts.slice(0, 4)) // 設置人氣精選的產品

//         // 過濾並設置每個分類的產品
//         const mainDishProducts = productsWithRatings.filter(
//           (product) => product.category === '主食',
//         )
//         setMainDishes(mainDishProducts)

//         const snackProducts = productsWithRatings.filter(
//           (product) => product.category === '小吃',
//         )
//         setSnack(snackProducts)

//         const sweetProducts = productsWithRatings.filter(
//           (product) => product.category === '甜品',
//         )
//         setSweet(sweetProducts)

//         const drinkProducts = productsWithRatings.filter(
//           (product) => product.category === '飲料',
//         )
//         setDrink(drinkProducts)
//       } catch (error) {
//         console.error('撈取 products 資料錯誤:', error)
//       }
//     }

//     // 取得評分的資料
//     const fetchRating = async () => {
//       try {
//         const r = await fetch(`${SHOP_PRODUCTS}/store-ratings/${seller_id}`)

//         if (!r.ok) throw new Error('網絡回應錯誤')
//         const data = await r.json()
//         setRating(data[0])
//       } catch (error) {
//         console.error('撈取 seller 資料錯誤:', error)
//       }
//     }

//     const fetchProductRating = async () => {
//       try {
//         const r = await fetch(`${SHOP_PRODUCTS}/product-ratings/${seller_id}`)
//         if (!r.ok) throw new Error('網絡回應錯誤')
//         const data = await r.json()
//         setProductRating(data)
//       } catch (error) {
//         console.error('撈取評分資料錯誤:', error)
//       }
//     }

//     const fetchDiscount = async () => {
//       try {
//         const r = await fetch(`${SHOP_PRODUCTS}/seller-discount/${seller_id}`)
//         if (!r.ok) throw new Error('网络响应错误')
//         let data = await r.json()
//         setDiscount(data[0])
//       } catch (error) {
//         console.error('获取评论数据错误:', error)
//       }
//     }

//     fetchData()
//     fetchProducts()
//     fetchRating()
//     fetchProductRating()
//     fetchDiscount()
//   }, [seller_id])

//   // 處理購物車寬度
//   useEffect(() => {
//     const handleResize = () => {
//       if (cartRef.current) {
//         setCartWidth(cartRef.current.offsetWidth)
//       }
//     }

//     window.addEventListener('resize', handleResize)

//     handleResize()

//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   return (
//     <SectionProducts>
//       <div className={`container-fluid ${style.container}`}>
//         {/* banner */}
//         <div className="row">
//           <img
//             src="/images/shop-banner01.jpg"
//             alt=""
//             className={style.banner}
//           />
//         </div>

//         <div className={`row d-flex justify-content-center ${style.content}`}>
//           <div className="col">
//             {/* shop info */}
//             {seller && (
//               <ShopInfo
//                 seller_id={seller.seller_id}
//                 shopName={seller.store_name}
//                 time1={`每周${mapDayToChinese(seller.rest_day)}休息`}
//                 time2={`下午${formatTime(
//                   seller.opening_hours,
//                 )}到凌晨${formatTime(seller.closing_hours)}`}
//                 score={rating && Number(rating.average_night_rating).toFixed(1)}
//                 comment={rating ? rating.total_comments :'則留言'}
//               />
//             )}
//           </div>
//           {/* 優惠輪播 */}
//           {discount ? (
//             <Slider {...settings} className={style.slider}>
//               {Array(10)
//                 .fill(1)
//                 .map((v, i) => (
//                   <span key={i}>{discount ? discount.name : 'loading...'}</span>
//                 ))}
//             </Slider>
//           ) : (
//             ''
//           )}
//           {/* search & nav */}
//           <div className={`row d-flex align-items-center ${style.search}`}>
//             <div className="col-12 col-md-3">
//               <SearchBarSmaller onSearch={handleSearch} />
//             </div>

//             <div className="col-12 col-md-9">
//               <ul className={`d-flex align-items-center p-0 ${style.ul}`}>
//                 <li className={`d-flex ${style.li}`}>
//                   <Link href="#hotSell" className={`fw-bold ${style.a}`}>
//                     人氣精選
//                   </Link>
//                   <Link href="#mainFood" className={`fw-bold ${style.a}`}>
//                     主食單點區
//                   </Link>
//                   <Link href="#snack" className={`fw-bold ${style.a}`}>
//                     副食單點區
//                   </Link>
//                   <Link href="#sweet" className={`fw-bold ${style.a}`}>
//                     這裡都是甜的
//                   </Link>
//                   <Link href="#drink" className={`fw-bold ${style.a}`}>
//                     多帶杯飲料
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* product */}
//           <div className={`row ${style.buy}`}>
//             {/* card */}
//             <div className="col-12 col-md-9">
//               <div className="row">
//                 {/* card1 */}
//                 <div className="col">
//                   <h5 className="fw-bold" id="hotSell">
//                     人氣精選
//                   </h5>
//                 </div>

//                 <div
//                   className={`row flex-nowrap flex-md-wrap ${style.productCardRow}`}
//                 >
//                   {products.map((product) => {
//                     const productRatings = productRating.find(
//                       (r) => r.product_id === product.product_id,
//                     )
//                     return (
//                       <div
//                         className={`col-12 col-lg-3 ${style.productCardCol}`}
//                         key={product.product_id}
//                       >
//                         <ProductCard
//                           product_id={product.product_id}
//                           imgUrl={`${API_SERVER}/public/${product.image_url}`}
//                           title={product.product_name}
//                           price={product.price}
//                           percentage={
//                             productRatings
//                               ? Number(
//                                   productRatings.average_night_rating,
//                                 ).toFixed(1)
//                               : '無評分'
//                           }
//                           pepole={
//                             productRatings ? productRatings.total_comments : '0'
//                           }
//                         />
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>

//               {/* card2 主食 */}
//               <div className={`row ${style.card2}`}>
//                 <div className="row">
//                   <h5 className="fw-bold" id="mainFood">
//                     主食單點區
//                   </h5>
//                 </div>
//                 <div className="row">
//                   {mainDishes.map((dish, index) => {
//                     return (
//                       <div key={index} className={`col-12 col-md-6`}>
//                         <ProductCard2
//                           product_id={dish.product_id}
//                           title={dish.product_name}
//                           price={dish.price}
//                           percentage={
//                             dish.average_night_rating
//                               ? Number(dish.average_night_rating).toFixed(1)
//                               : '無評分'
//                           }
//                           pepole={dish.total_comments || 0}
//                           imgUrl={`${API_SERVER}/public/${dish.image_url}`}
//                           introduce={dish.product_description}
//                         />
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
//               {/* 小吃 */}
//               <div className={`row ${style.card2}`}>
//                 <div className="row">
//                   <h5 className="fw-bold" id="snack">
//                     副食單點區
//                   </h5>
//                 </div>
//                 <div className="row">
//                   {snack.map((dish, index) => {
//                     return (
//                       <div
//                         key={index}
//                         className={`col-12 col-md-6 ${style.productCardCol2}`}
//                       >
//                         <ProductCard2
//                           product_id={dish.product_id}
//                           title={dish.product_name}
//                           price={dish.price}
//                           percentage={
//                             dish.average_night_rating
//                               ? Number(dish.average_night_rating).toFixed(1)
//                               : '無評分'
//                           }
//                           pepole={dish.total_comments || 0}
//                           imgUrl={`${API_SERVER}/public/${dish.image_url}`}
//                           introduce={dish.product_description}
//                         />
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
//               {/* 甜品 */}
//               <div className={`row ${style.card2}`}>
//                 <div className="row">
//                   <h5 className="fw-bold" id="sweet">
//                     這裡都是甜的
//                   </h5>
//                 </div>
//                 <div className="row">
//                   {sweet.map((dish, index) => {
//                     return (
//                       <div
//                         key={index}
//                         className={`col-12 col-md-6 ${style.productCardCol2}`}
//                       >
//                         <ProductCard2
//                           product_id={dish.product_id}
//                           title={dish.product_name}
//                           price={dish.price}
//                           percentage={
//                             dish.average_night_rating
//                               ? Number(dish.average_night_rating).toFixed(1)
//                               : '無評分'
//                           }
//                           pepole={dish.total_comments || 0}
//                           imgUrl={`${API_SERVER}/public/${dish.image_url}`}
//                           introduce={dish.product_description}
//                         />
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
//               {/* 飲料 */}
//               <div className={`row ${style.card2}`}>
//                 <div className="row">
//                   <h5 className="fw-bold" id="drink">
//                     想喝飲料看這裡
//                   </h5>
//                 </div>
//                 <div className="row">
//                   {drink.map((dish, index) => {
//                     return (
//                       <div
//                         key={index}
//                         className={`col-12 col-md-6 ${style.productCardCol2}`}
//                       >
//                         <ProductCard2
//                           product_id={dish.product_id}
//                           title={dish.product_name}
//                           price={dish.price}
//                           percentage={
//                             dish.average_night_rating
//                               ? Number(dish.average_night_rating).toFixed(1)
//                               : '無評分'
//                           }
//                           pepole={dish.total_comments || 0}
//                           imgUrl={`${API_SERVER}/public/${dish.image_url}`}
//                           introduce={dish.product_description}
//                         />
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
//             </div>

//             {/* cart */}
//             <div ref={cartRef} className="col-md-3 d-none d-md-block">
//               <StickyCart
//                 enabled={true}
//                 top={40}
//                 bottomBoundary={2860}
//                 style={{ width: cartWidth }}
//               >
//                 <Cart />
//               </StickyCart>
//             </div>
//           </div>
//         </div>
//       </div>
//     </SectionProducts>
//   )
// }

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dynamic from 'next/dynamic'
// 套件
import Slider from 'react-slick'
// 元件
import SectionProducts from '@/components/layout/section-nopaddin'
import ShopInfo from '@/components/shop-products/shop-info/shop-info'
import SearchBarSmaller from '@/components/common/search-bar-smaller'
import ProductCard from '@/components/shop-products/product-card/product-card'
import ProductCard2 from '@/components/shop-products/product-card2/product-card2'
import Cart from '@/components/shop-products/cart/cart'
// api-path
import {
  SHOP_PRODUCTS,
  SELLER_DATA,
  PRODUCTS_DATA,
  API_SERVER,
} from '@/components/config/api-path'
// 樣式
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import style from './shop-products.module.scss'

const StickyCart = dynamic(
  () => {
    return import('react-stickynode')
  },
  { ssr: false }, // 设置 ssr 为 false 来关闭服务器端渲染
)

export default function ShopProducts() {
  const router = useRouter()
  const { seller_id } = router.query

  const cartRef = useRef(null)
  const [cartWidth, setCartWidth] = useState(0)

  const [seller, setSeller] = useState(null) // 渲染資訊出來
  const [products, setProducts] = useState([]) // 渲染資訊出來
  const [mainDishes, setMainDishes] = useState([]) // 渲染過濾的商品
  const [snack, setSnack] = useState([]) // 渲染過濾的商品
  const [sweet, setSweet] = useState([]) // 渲染過濾的商品
  const [drink, setDrink] = useState([]) // 渲染過濾的商品
  const [rating, setRating] = useState([]) // 評分
  const [productRating, setProductRating] = useState([]) // 評分
  const [discount, setDiscount] = useState([]) // 優惠

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 4000,
    cssEase: 'linear',
    arrows: false,
    centerMode: true,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  }

  // 關鍵字搜尋
  const handleSearch = (searchTerm) => {
    const search = searchTerm.toLowerCase().trim()
    const allProductElements = document.querySelectorAll(
      `.${style.productCardCol}, .${style.productCardCol2}`,
    )

    let found = false

    allProductElements.forEach((element) => {
      const titleElement = element.querySelector(`.${style.title}`)
      if (
        titleElement &&
        titleElement.textContent.toLowerCase().includes(search)
      ) {
        found = true
        titleElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        titleElement.classList.add(style.titleHighlight)
      } else if (titleElement) {
        titleElement.classList.remove(style.titleHighlight)
      }
    })

    // if (!found) {
    //   toast.error('沒有找到相關項目')
    // }
  }

  // 格式化時間的函數，將 '00:00:00' 轉換為 '00:00'
  const formatTime = (time) => {
    return time.slice(0, 5)
  }

  // 休息日的映射函數
  const mapDayToChinese = (dayNumber) => {
    const dayMapping = {
      7: '日',
      1: '一',
      2: '二',
      3: '三',
      4: '四',
      5: '五',
      6: '六',
    }
    return dayMapping[dayNumber] || '未知' // 如果沒有匹配到，返回'未知'
  }

  // 處理資料
  useEffect(() => {
    // 取得 seller 資料
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

    // 取得 products 資料跟分類
    const fetchProducts = async () => {
      try {
        const r = await fetch(`${PRODUCTS_DATA}/${seller_id}`)
        if (!r.ok) {
          throw new Error('網絡回應錯誤')
        }
        const productsData = await r.json()

        const ratingsResponse = await fetch(
          `${SHOP_PRODUCTS}/product-ratings/${seller_id}`,
        )
        if (!ratingsResponse.ok) {
          throw new Error('網絡回應錯誤')
        }
        const ratingsData = await ratingsResponse.json()

        // 結合產品數據與評分數據
        const productsWithRatings = productsData.map((product) => {
          const rating =
            ratingsData.find((r) => r.product_id === product.product_id) || {}
          return {
            ...product,
            average_night_rating: rating.average_night_rating || 0,
            total_comments: rating.total_comments || 0,
          }
        })

        // 根據評分降序排序所有產品，然後選擇前四個作為人氣精選
        const sortedProducts = productsWithRatings.sort(
          (a, b) => b.average_night_rating - a.average_night_rating,
        )
        setProducts(sortedProducts.slice(0, 4)) // 設置人氣精選的產品

        // 過濾並設置每個分類的產品
        const mainDishProducts = productsWithRatings.filter(
          (product) => product.category === '主食',
        )
        setMainDishes(mainDishProducts)

        const snackProducts = productsWithRatings.filter(
          (product) => product.category === '小吃',
        )
        setSnack(snackProducts)

        const sweetProducts = productsWithRatings.filter(
          (product) => product.category === '甜品',
        )
        setSweet(sweetProducts)

        const drinkProducts = productsWithRatings.filter(
          (product) => product.category === '飲料',
        )
        setDrink(drinkProducts)
      } catch (error) {
        console.error('撈取 products 資料錯誤:', error)
      }
    }

    // 取得評分的資料
    const fetchRating = async () => {
      try {
        const r = await fetch(`${SHOP_PRODUCTS}/store-ratings/${seller_id}`)

        if (!r.ok) throw new Error('網絡回應錯誤')
        const data = await r.json()
        setRating(data[0])
      } catch (error) {
        console.error('撈取 seller 資料錯誤:', error)
      }
    }

    const fetchProductRating = async () => {
      try {
        const r = await fetch(`${SHOP_PRODUCTS}/product-ratings/${seller_id}`)
        if (!r.ok) throw new Error('網絡回應錯誤')
        const data = await r.json()
        setProductRating(data)
      } catch (error) {
        console.error('撈取評分資料錯誤:', error)
      }
    }

    const fetchDiscount = async () => {
      try {
        const r = await fetch(`${SHOP_PRODUCTS}/seller-discount/${seller_id}`)
        if (!r.ok) throw new Error('网络响应错误')
        let data = await r.json()
        setDiscount(data[0])
      } catch (error) {
        console.error('获取评论数据错误:', error)
      }
    }

    fetchData()
    fetchProducts()
    fetchRating()
    fetchProductRating()
    fetchDiscount()
  }, [seller_id])

  // 處理購物車寬度
  useEffect(() => {
    const handleResize = () => {
      if (cartRef.current) {
        setCartWidth(cartRef.current.offsetWidth)
      }
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
                time1={`每周${mapDayToChinese(seller.rest_day)}休息`}
                time2={`下午${formatTime(
                  seller.opening_hours,
                )}到凌晨${formatTime(seller.closing_hours)}`}
                score={rating && Number(rating.average_night_rating).toFixed(1)}
                comment={rating ? rating.total_comments :'則留言'}
              />
            )}
          </div>
          {/* 優惠輪播 */}
          {discount ? (
            <Slider {...settings} className={style.slider}>
              {Array(10)
                .fill(1)
                .map((v, i) => (
                  <span key={i}>{discount ? discount.name : 'loading...'}</span>
                ))}
            </Slider>
          ) : (
            ''
          )}
          {/* search & nav */}
          <div className={`row d-flex align-items-center ${style.search}`}>
            <div className="col-12 col-md-3">
              <SearchBarSmaller onSearch={handleSearch} />
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
                    多帶杯飲料
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
                    const productRatings = productRating.find(
                      (r) => r.product_id === product.product_id,
                    )
                    return (
                      <div
                        className={`col-12 col-lg-3 ${style.productCardCol}`}
                        key={product.product_id}
                      >
                        <ProductCard
                          product_id={product.product_id}
                          imgUrl={`${API_SERVER}/public/${product.image_url}`}
                          title={product.product_name}
                          price={product.price}
                          percentage={
                            productRatings
                              ? Number(
                                  productRatings.average_night_rating,
                                ).toFixed(1)
                              : '無評分'
                          }
                          pepole={
                            productRatings ? productRatings.total_comments : '0'
                          }
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
                          percentage={
                            dish.average_night_rating
                              ? Number(dish.average_night_rating).toFixed(1)
                              : '無評分'
                          }
                          pepole={dish.total_comments || 0}
                          imgUrl={`${API_SERVER}/public/${dish.image_url}`}
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
                      <div
                        key={index}
                        className={`col-12 col-md-6 ${style.productCardCol2}`}
                      >
                        <ProductCard2
                          product_id={dish.product_id}
                          title={dish.product_name}
                          price={dish.price}
                          percentage={
                            dish.average_night_rating
                              ? Number(dish.average_night_rating).toFixed(1)
                              : '無評分'
                          }
                          pepole={dish.total_comments || 0}
                          imgUrl={`${API_SERVER}/public/${dish.image_url}`}
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
                      <div
                        key={index}
                        className={`col-12 col-md-6 ${style.productCardCol2}`}
                      >
                        <ProductCard2
                          product_id={dish.product_id}
                          title={dish.product_name}
                          price={dish.price}
                          percentage={
                            dish.average_night_rating
                              ? Number(dish.average_night_rating).toFixed(1)
                              : '無評分'
                          }
                          pepole={dish.total_comments || 0}
                          imgUrl={`${API_SERVER}/public/${dish.image_url}`}
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
                      <div
                        key={index}
                        className={`col-12 col-md-6 ${style.productCardCol2}`}
                      >
                        <ProductCard2
                          product_id={dish.product_id}
                          title={dish.product_name}
                          price={dish.price}
                          percentage={
                            dish.average_night_rating
                              ? Number(dish.average_night_rating).toFixed(1)
                              : '無評分'
                          }
                          pepole={dish.total_comments || 0}
                          imgUrl={`${API_SERVER}/public/${dish.image_url}`}
                          introduce={dish.product_description}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* cart */}
            <div ref={cartRef} className="col-md-3 d-none d-md-block">
              <StickyCart
                enabled={true}
                top={40}
                bottomBoundary={2860}
                style={{ width: cartWidth }}
              >
                <Cart />
              </StickyCart>
            </div>
          </div>
        </div>

        <div className="topicon"  onClick={()=>window.scrollTo(0, 0)}>↑TOP</div>
      </div>
    </SectionProducts>
  )
}