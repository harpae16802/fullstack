import React, { useState } from 'react'
import Image from 'next/image'
import { FiHeart } from 'react-icons/fi'
import { IoIosArrowDown } from 'react-icons/io'
import styles from '@/styles/Product.module.css' // 確保引入了正確的樣式文件
import { RxCross1 } from 'react-icons/rx'
import { Modal, Button } from 'react-bootstrap'

export default function IndexProductDetailCard({
  imageUrl = '',
  seller = '',
  product = '',
  description = '',
  price = '',
  ingredient = '',
  nutrition = '',
  handleCloseModal=()=>{},
}) 

{
  return (
    <>
      <Modal show='true' style={{backgroundColor:'transparent',marginLeft:'-500px',overflow:'visible'}} >
        <div className={styles.detailContainer} style={{backgroundColor:'transparent'}}>
          {/* 產品圖 */} 
          <div className="prdimg">

          <Image
            src={imageUrl}
            width={759}
            height={726}
            className={styles.detailPic}
            style={{backgroundColor:'transparent',borderRadius:'8px 0px 0px 8px',objectFit:'cover',top:'-50px'}}
          />
          </div> 
         

          <div className={styles.detailTextArray} style={{backgroundColor:'#ffffff',borderRadius:'0px 10px 10px 0px'}}>
            <RxCross1 className={styles.detailCrossIcon} style={{cursor:'pointer',marginRight:'20px'}} onClick={handleCloseModal} />

            {/* 店家名稱 */}
            <div className={styles.detailSeller}>{seller}</div>
            {/* 產品名稱 */}
            <div className={styles.detailProductName}>{product}</div>

            {/* 產品描述 */}
            <div className={styles.detailIntroduce}>{description}</div>
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
              <FiHeart className={styles.detailHeartIcon} />

              <button className={styles.addCartButton}>加入購物車</button>

              <button className={styles.immediateBuyButton}>立即購買</button>
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
      </Modal>
    </>
  )
}
