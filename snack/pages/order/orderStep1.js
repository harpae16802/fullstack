import Section from '@/components/layout/section'
import React, { createContext, useContext,useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '@/styles/Order.module.css'
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import OrderDetailItem from '@/components/Order/order1Seller'
import DiscountContentItem from '@/components/Order/addPurchaseProduct'
import CheckoutProduct from '@/components/Order/checkoutProduct'

export  const OrderStep1 = () => {

  //訂單數量
  const [dataCount, setDataCount] = useState(0); // 使用useState来存储数据数量
  const [productCount, setProductCount] = useState(0)

  // 模拟从后台获取数据的效果，你需要根据实际情况修改这部分代码
  useEffect(() => {
    // 这里可以是从后台获取数据的逻辑，这里暂时模拟一个数量
    const fetchDataCount = async () => {
      // 模拟从后台获取数据的过程
      const count = 3; // 假设从后台获取到的数据数量为3
      setDataCount(count);
    };

    const fetchProductCount = async () => {
      // 模拟从后台获取数据的过程
      const productCount = 2; // 假设从后台获取到的数据数量为3
      setProductCount(productCount);
    };

    // fetchDataCount();
    // fetchProductCount();

  }, [dataCount,productCount]);

}


export default function Order() {
  return (
    <>
        <Section>
        {/* 最外層容器 */}
        <div class={styles.outerFrame}>
            <div className={styles.orderTitle}>【 結帳頁面 】</div>

            {/* 步驟紅色邊框 */}
            <div className={styles.stepBorder}>
                
                  {/* 步驟圓圈&長條 */}
              <div className="container">
                  <div className={styles.step1}>1</div>
                  <div className={styles.connectGrey}></div>
                  <div className={styles.stepUndo}>2</div>
                  <div className={styles.connectGrey}></div>
                  <div className={styles.stepUndo}>3</div>
              </div>

                  <br />

                  {/* 步驟文字 */}
                  <div className={styles.textContainer}>
                    <div className={styles.step1Text}>訂單資訊</div>
                    <div className={styles.step2UndoText}>訂單優惠</div>
                    <div className={styles.step3UndoText}>完成</div>
                  </div>
                 
            </div>

           {/* 訂單詳細 紅色邊框 */}
          <div className={styles.orderBorder}>

           {/* 訂單詳細 外層容器 */}
           <div className={styles.order1Container}>
           <CheckoutProduct />
           </div>
         

            <br/>
          
           {/* 訂單詳細 外層容器 */}
           <div className={styles.order1Container}>
           <CheckoutProduct />
           </div>

            <br/>

           {/* 訂單詳細 外層容器 */}
           <div className={styles.order1Container}>
           <CheckoutProduct />
           </div>

<h2 className={styles.discountTitle}>【優惠加購】</h2>



    {/* 優惠加購:產品列容器*/}
    <div className={styles.discountContainer}>
    
    <MdArrowBackIosNew className={styles.leftArrow}/>

    <div className={styles.discountArrangement}>

            {/* 優惠加購:產品內容1 */}
           <DiscountContentItem
            seller = "姊姊抓的餅"
            product = "豬排蛋"
            imageUrl = "/images/蛋塔.jpg"
            price="70"
           /> 

       {/* 優惠加購:產品內容2 */}
       <DiscountContentItem
            seller = "姊姊抓的餅"
            product = "豬排蛋"
            imageUrl = "/images/蛋塔.jpg"
            price="70"
           /> 

     {/* 優惠加購:產品內容3 */}
     <DiscountContentItem
            seller = "姊姊抓的餅"
            product = "豬排蛋"
            imageUrl = "/images/蛋塔.jpg"
            price="70"
           /> 

        {/* discountArrangement */}
    </div>

      <MdArrowForwardIos className={styles.rightArrow} />

        {/* discountContainer */}
    </div> 

 
            {/* orderBorder */}
          </div>

       {/* '上一步 下一步'按鈕 */}
          <div style={{display:'flex',justifyContent:'center'}}>
            <button className={styles.previousButton}>上一步</button>
            <button className={styles.nextButton}>下一步</button>
          </div>

          {/* outerFrame */}
        </div>

        </Section>
    </>
  )
}
