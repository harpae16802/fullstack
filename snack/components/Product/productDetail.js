import React from 'react'
import Image from 'next/image'
import { FiHeart } from 'react-icons/fi'
import { IoIosArrowDown } from 'react-icons/io'
import styles from '@/styles/Product.module.css' // 確保引入了正確的樣式文件
import { RxCross1 } from 'react-icons/rx'
import tstyle from './tstyle.module.scss'
import {
  FaThumbsUp,
  FaPlus,
  FaRegHeart,
  FaHeart,
  FaMinus,
} from 'react-icons/fa'

export default function ProductDetailCard({
  imageUrl = '',
  seller = '',
  product = '',
  description = '',
  price = '',
  ingredient = '',
  nutrition = '',
  onClose,
  favorite,
  isFavorite,
}) {
  return (
    <>
      <div className={styles.detailContainer}>
        {/* 產品圖 */}
        <Image
          src={imageUrl}
          width={759}
          height={726}
          className={styles.detailPic}
        />

        <div className={styles.detailTextArray}>
          <RxCross1 className={styles.detailCrossIcon} onClick={onClose} />

          {/* 店家名稱 */}
          <div className={styles.detailSeller}>{seller}</div>
          {/* 產品名稱 */}
          <div className={styles.detailProductName}>{product}</div>

          {/* 產品描述 */}
          <div className={styles.detailIntroduce}>{description}</div>
          {/* 價格 */}
          <div className={styles.detailPrice}>${price}</div>

          {/* '+ -'按鈕 */}
          <div className={`${tstyle.quantity}`}>
            <button>
              <FaMinus />
            </button>
            <input
              type="text"
              min="1"
              value="0"
              style={{ border: 'none', outline: 'none' }}
              readOnly
            />
            <button>
              <FaPlus />
            </button>
          </div>
          {/* <div className={styles.detailNumber}>
            <button className={styles.detailNumberButton}>-</button>
            <div className={styles.detailNumberShow}>1</div>
            <button className={styles.detailNumberButton}>+</button>
          </div> */}

          {/* 收藏 加入購物車 */}
          <div
            className="align-items-center"
            style={{
              display: 'flex',
              marginTop: '20px',
              marginLeft: '115px',
              color: '#A32C2D',
              fontSize: '30px',
            }}
          >
            {isFavorite ? (
              <FaHeart
                className={`${styles.detailHeartIcon}`}
                onClick={favorite}
              />
            ) : (
              <FaRegHeart
                className={`${styles.detailHeartIcon}`}
                onClick={favorite}
              />
            )}

            {/* <FiHeart className={styles.detailHeartIcon} onClick={favorite} /> */}

            <button className={`btn btn-outline-primary ms-3`}>
              加入購物車
            </button>
            {/* <button className={styles.addCartButton}>加入購物車</button> */}

            <button className="btn btn-primary ms-2">立即購買</button>
            {/* <button className={styles.immediateBuyButton}>立即購買</button> */}
          </div>

          {/* 虛線 */}
          <div className={styles.detailDashed}></div>

          <div className={styles.ingredientText}>成分</div>

          {/* 成分 */}
          <div className={styles.detailIngredient}>含有 : {ingredient}</div>

          <IoIosArrowDown className={styles.ingredientDown1} />

          {/* 實線 */}
          <div className={styles.detailSolid}></div>

          {/* 營養成分表 */}
          <div className={styles.nutritionIngredient}>{nutrition}</div>
          <IoIosArrowDown className={styles.ingredientDown2} />
        </div>
      </div>

      <FiHeart className={styles.detailProductCollect} />
    </>
  )
}
