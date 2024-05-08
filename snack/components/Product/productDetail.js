// import React, { useEffect, useState } from 'react'
// import Image from 'next/image'
// import { FiHeart } from 'react-icons/fi'
// import { IoIosArrowDown } from 'react-icons/io'
// import styles from '@/styles/Product.module.css' // 確保引入了正確的樣式文件
// import { RxCross1 } from 'react-icons/rx'
// import tstyle from './tstyle.module.scss'
// import { useCartContext } from '@/contexts/cartContext'
// import {
//   FaThumbsUp,
//   FaPlus,
//   FaRegHeart,
//   FaHeart,
//   FaMinus,
// } from 'react-icons/fa'

// export default function ProductDetailCard({
//   imageUrl = '',
//   seller = '',
//   product = '',
//   description = '',
//   price = '',
//   ingredient = '',
//   nutrition = '',
//   onClose,
//   favorite,
//   isFavorite,
//   product_id,
// }) {
//   const { addToCart } = useCartContext()
//   const [quantity, setQuantity] = useState(0)

//   // 增加数量
//   const increaseQuantity = () => {
//     setQuantity((prev) => prev + 1)
//   }

//   // 减少数量，确保数量不会低于0
//   const decreaseQuantity = () => {
//     setQuantity((prev) => (prev > 0 ? prev - 1 : 0))
//   }

//   // 加入購物車
//   const handleAddToCart = () => {
//     addToCart(product_id, quantity)
//     onClose()
//   }

//   // 加入购物车并跳转
//   const handleBuyNow = () => {
//     if (quantity > 0) {
//       // 确保有选择数量
//       addToCart(product_id, quantity)
//       onClose()
//       window.location.href = '/order/orderStep1'
//     } else {
//       alert('请选择商品数量！')
//     }
//   }

//   return (
//     <>
//       <div className={styles.detailContainer}>
//         {/* 產品圖 */}
//         <Image
//           src={imageUrl}
//           width={759}
//           height={726}
//           className={styles.detailPic}
//         />

//         <div className={styles.detailTextArray}>
//           <RxCross1 className={styles.detailCrossIcon} onClick={onClose} />

//           {/* 店家名稱 */}
//           <div className={styles.detailSeller}>{seller}</div>
//           {/* 產品名稱 */}
//           <div className={styles.detailProductName}>{product}</div>

//           {/* 產品描述 */}
//           <div className={styles.detailIntroduce}>{description}</div>
//           {/* 價格 */}
//           <div className={styles.detailPrice}>${price}</div>

//           {/* '+ -'按鈕 */}
//           <div className={`${tstyle.quantity}`}>
//             <button onClick={decreaseQuantity}>
//               <FaMinus />
//             </button>
//             <input
//               type="text"
//               min="1"
//               value={quantity}
//               style={{ border: 'none', outline: 'none' }}
//               readOnly
//             />

//             <button onClick={increaseQuantity}>
//               <FaPlus />
//             </button>
//           </div>

//           {/* 收藏 加入購物車 */}
//           <div
//             className="align-items-center"
//             style={{
//               display: 'flex',
//               marginTop: '20px',
//               marginLeft: '115px',
//               color: '#A32C2D',
//               fontSize: '30px',
//             }}
//           >
//             {isFavorite ? (
//               <FaHeart
//                 className={`${styles.detailHeartIcon}`}
//                 onClick={favorite}
//               />
//             ) : (
//               <FaRegHeart
//                 className={`${styles.detailHeartIcon}`}
//                 onClick={favorite}
//               />
//             )}

//             <button
//               className={`btn btn-outline-primary ms-3`}
//               onClick={handleAddToCart}
//             >
//               加入購物車
//             </button>

//             <a
//               href="/order/orderStep1"
//               className="btn btn-primary ms-2"
//               onClick={handleBuyNow}
//             >
//               立即購買
//             </a>
//           </div>

//           {/* 虛線 */}
//           <div className={styles.detailDashed}></div>

//           <div className={styles.ingredientText}>成分</div>

//           {/* 成分 */}
//           <div className={styles.detailIngredient}>含有 : {ingredient}</div>

//           <IoIosArrowDown className={styles.ingredientDown1} />

//           {/* 實線 */}
//           <div className={styles.detailSolid}></div>

//           {/* 營養成分表 */}
//           <div className={styles.nutritionIngredient}>{nutrition}</div>
//           <IoIosArrowDown className={styles.ingredientDown2} />
//         </div>
//       </div>

//       <FiHeart className={styles.detailProductCollect} />
//     </>
//   )
// }

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import styles from '@/styles/Product.module.css' // 確保引入了正確的樣式文件
import { RxCross1 } from 'react-icons/rx'
import 'bootstrap/dist/css/bootstrap.min.css'
// fetch 網址
import {
  FAVORITE_PRODUCTS,
  C_FAVORITE_PRODUCTS,
} from '@/components/config/api-path'
// 樣式
import style from '@/components/shop-products/product-card/style.module.scss'

export default function ProductDetailCard({
  imageUrl = '',
  seller = '',
  product = '',
  description = '',
  price = '',
  ingredient = '',
  nutrition = '',
  product_id = '',
}) {
  const [open, setOpen] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false) // 最愛
  console.log(product_id)
  // 加入收藏 - 商品
  const toggleFavoriteProducts = async () => {
    try {
      const r = await fetch(`${FAVORITE_PRODUCTS}/${product_id}`)
      const data = await r.json()
      if (data.success) {
        setIsFavorite(data.action === 'add')
      }
    } catch (error) {
      console.error('加入最愛 錯誤:', error)
    }
  }
  useEffect(() => {
    // 检查收藏状态
    const checkFavoriteStatus = async () => {
      const r = await fetch(`${C_FAVORITE_PRODUCTS}/${product_id}`)
      const data = await r.json()
      if (data.isFavorite !== undefined) {
        setIsFavorite(data.isFavorite)
      }
    }

    checkFavoriteStatus()
  }, [product_id])

  return (
    <>
      <button
        onClick={() => handleProductClick(product)}
        className={styles.seeMoreButton}
        type="button"
        data-bs-toggle="modal"
      >
        看更多
      </button>

      {selectedProducts &&
        selectedProducts.product_id === product.product_id && (
          <div
            className="modal fade"
            id="detailModal"
            tabindex="-1"
            aria-labelledby="detailModalLabel"
            aria-hidden="true"
          >
            <div className={`modal-dialog ${styles.detailModalSize}`}>
              <div className="modal-content">
                {/* 右上角叉叉 */}
                {/* <RxCross1 type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{color: '#A32C2D'}}></RxCross1> */}

                {/* <button type="button" class="btn-close" style={{color: '#A32C2D'}}
         data-bs-dismiss="modal" aria-label="Close"></button> */}

                <div className="modal-body">
                  <div className={styles.detailContainer}>
                    {/* 產品圖 */}
                    <Image
                      src={imageUrl}
                      width={759}
                      height={726}
                      className={styles.detailPic}
                      alt={imageUrl}
                    />

                    <div className={styles.detailTextArray}>
                      {/* <RxCross1 className={styles.detailCrossIcon}/> */}
                      <RxCross1
                        type="button"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        className={`btn-close ${styles.detailCrossIcon}`}
                      ></RxCross1>

                      {/* 店家名稱 */}
                      <div className={styles.detailSeller}>{seller}</div>
                      {/* 產品名稱 */}
                      <div className={styles.detailProductName}>{product}</div>

                      {/* 產品描述 */}
                      <div className={styles.detailIntroduce}>
                        {description}
                      </div>
                      {/* 價格 */}
                      <div className={styles.detailPrice}>${price}</div>

                      {/* '+ -'按鈕 */}
                      <div className={styles.detailNumber}>
                        <button className={styles.detailNumberButton}>-</button>
                        <div className={styles.detailNumberShow}>1</div>
                        <button className={styles.detailNumberButton}>+</button>
                      </div>

                      {/* 收藏 加入購物車 */}
                      <div
                        style={{
                          display: 'flex',
                          marginTop: '20px',
                          marginLeft: '115px',
                          color: '#A32C2D',
                          fontSize: '30px',
                        }}
                      >
                        {/* 加入收藏 */}
                        {isFavorite ? (
                          <FaHeart
                            className={styles.collectIcon}
                            onClick={toggleFavoriteProducts}
                          />
                        ) : (
                          <FaRegHeart
                            className={styles.collectIcon}
                            onClick={toggleFavoriteProducts}
                          />
                        )}

                        <button className={styles.addCartButton}>
                          加入購物車
                        </button>

                        <button className={styles.immediateBuyButton}>
                          立即購買
                        </button>
                      </div>

                      {/* // 手風琴:營養成分表 */}
                      <div
                        className={`accordion accordion-flush ${styles.detailAccordionPosition}`}
                        id="accordionFlushExample"
                      >
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="flush-headingOne"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseOne"
                              aria-expanded="false"
                              aria-controls="flush-collapseOne"
                            >
                              成分 :
                            </button>
                          </h2>
                          <div
                            id="flush-collapseOne"
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingOne"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div
                              className={`accordion-body ${styles.detailIngredient}`}
                            >
                              {ingredient}
                            </div>
                          </div>
                        </div>

                        <div class="accordion-item"></div>
                      </div>

                      {/* <IoIosArrowDown className={styles.ingredientDown1}  /> */}

                      {/* 營養成分表 */}
                      <div
                        className="accordion accordion-flush"
                        id="accordionFlushExample"
                      >
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="flush-headingTwo"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseTwo"
                              aria-expanded="false"
                              aria-controls="flush-collapseTwo"
                            >
                              營養成分:
                            </button>
                          </h2>
                          <div
                            id="flush-collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingTwo"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div
                              className={`accordion-body ${styles.nutritionIngredient}`}
                            >
                              {nutrition}
                            </div>
                          </div>
                        </div>

                        <div class="accordion-item"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 下方按鈕 */}
              </div>
            </div>
          </div>
        )}
    </>
  )
}
