import React from 'react';
import Image from 'next/image';
import { FiHeart } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import styles from '@/styles/Product.module.css'; // 確保引入了正確的樣式文件
import { RxCross1 } from "react-icons/rx";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProductDetailCard({
  imageUrl = "",
  seller = "",
  product = "",
  description = "",
  price = "",
  ingredient = "",
  nutrition=""
}) { 

  return (
    <>
    
   
<button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className={` ${styles.seeMoreButton}`}>
  看更多
</button>


<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className={`modal-dialog ${styles.modalSize}`}>
    <div className="modal-content">
      
      {/* 標題 */}
       {/* 右上角叉叉 */}
       {/* <RxCross1 type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{color: '#A32C2D'}}></RxCross1> */}

        {/* <button type="button" class="btn-close" style={{color: '#A32C2D'}}
         data-bs-dismiss="modal" aria-label="Close"></button> */}


     
      <div className="modal-body">
       
      <div className={styles.detailContainer}>
      {/* 產品圖 */}
       <Image src={imageUrl} width={759} height={726} className={styles.detailPic}/>

     <div className={styles.detailTextArray}>

     {/* <RxCross1 className={styles.detailCrossIcon}/> */}
     <RxCross1 type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" className={styles.detailCrossIcon} ></RxCross1>

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
    <div style={{display:'flex', marginTop:'20px',marginLeft:'115px',color:'#A32C2D',fontSize:'30px'}}>

    <FiHeart  className={styles.detailHeartIcon}/>

    <button className={styles.addCartButton}>加入購物車</button>

    <button className={styles.immediateBuyButton}>立即購買</button>

    </div>

    {/* 虛線 */}
   <div className={styles.detailDashed}></div>

   <div className={styles.ingredientText}>成分</div>

    {/* 成分 */}
    <div className={styles.detailIngredient}>含有 : {ingredient}</div>

    <IoIosArrowDown className={styles.ingredientDown1}  />

    {/* 實線 */}
    <div className={styles.detailSolid}></div>

        {/* 營養成分表 */}
     <div className={styles.nutritionIngredient}>{nutrition}</div>
        <IoIosArrowDown className={styles.ingredientDown2}/>
        

       </div>

    </div>

    <FiHeart  className={styles.detailProductCollect}/>


      </div>
      {/* 下方按鈕 */}
      <div class="modal-footer">

        {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>
        <button type="button" class="btn btn-primary"></button> */}

      </div>

    </div>
  </div>
</div>
    

    </>
 
  );
};

