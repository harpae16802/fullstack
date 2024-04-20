import Section from '@/components/layout/section'
import React, { createContext, useContext } from 'react'
import Image from 'next/image'
import styles from '@/styles/Order.module.css'
import { IoSearchOutline } from "react-icons/io5";
import { FaShopify } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { Container, Row, Col } from 'react-bootstrap';

export default function Order() {
  return (
    <>
        <Section>
        {/* 最外層容器 */}
        <div class={styles.outerFrame } style={{height:'1250px'}}>
            <h2 className={styles.orderTitle}>【 結帳頁面 】</h2>

            {/* 步驟紅色邊框 */}
            <div className={styles.stepBorder}>
                
                  {/* 步驟圓圈&長條 */}
                  <div className="container">
                  <div className={styles.step1} style={{marginTop:'60px',marginLeft:'293px'}}>1</div>
                  <div className={styles.connect2}></div>
                  <div className={styles.step1}>2</div>
                  <div className={styles.connect2}></div>
                  <div className={styles.step1}>3</div>
                  <div className={styles.connect2}></div>
                  <div className={styles.step1}>4</div>
                </div>
                  <br />

                  {/* 步驟文字 */}
                  <div className={styles.textContainer}>
                    <div className={styles.step1Text} style={{marginTop:'50px',marginLeft:'435px'}}>訂單資訊</div>
                    <div className={styles.step1Text} style={{marginTop:'50px',marginLeft:'120px'}}>訂單優惠</div>
                    <div className={styles.step1Text} style={{marginTop:'50px',marginLeft:'125px'}}>付款方式</div>
                    <div className={styles.step1Text} style={{marginTop:'50px',marginLeft:'145px'}}>完成</div>
                    {/* textContainer */}
                  </div>
                 
            </div>

           {/* 訂單詳細 紅色邊框 */}
          <div className={styles.orderBorder} style={{height:'690px'}}>

          <h1 style={{
                fontWeight:'bolder',
                marginTop:'50px',
                marginLeft:'45px'
             }}>訂單詳細</h1>

           {/* 訂單詳細 外層容器 */}
            <div className={styles.orderContainer} style={{
                marginTop:'15px',
                height:'520px',
                border:'solid 5px rgb(163, 44, 45)',
                borderRadius:'10px'
                }}>
             
             
             {/*結帳後 訂單詳細 */}
            <div style={{display:'flex', justifyContent:'space-between'}} className={styles.borderBottom}>
                <div className={styles.orderinformation1}>買家帳號</div>
                <div className={styles.orderinformation2}>訂單編號</div>
                <div className={styles.orderinformation2} >訂單日期</div>
                <div className={styles.orderinformation2}>訂單總金額</div>
            </div>

            <div style={{display:'flex', justifyContent:'space-between'}} className={styles.borderBottom}>
                <div className={styles.orderinformation1}>Test123</div>
                <div className={styles.orderinformation2}>20240206280</div>
                <div className={styles.orderinformation2 } style={{marginRight:'85px'}}>2024-02-06</div>
                <div className={styles.orderinformation2}>NT.2800</div>
            </div>  

              {/* 訂單詳細:列 */}
            <div style={{display:'flex',flexDirection:'column'}}>
                {/* 訂單詳細:行 */}
                <div style={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
                    <div className={styles.orderinformation1}>商品名稱</div>
                    <div className={styles.orderinformation2}>商品數量</div>
                    <div className={styles.orderinformation2} >商品價格</div>
                    <div className={styles.orderinformation2}>商品總價</div>
                </div>

                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div className={styles.orderinformation1} style={{marginLeft:'85px'}}>雞排</div>
                    <div className={styles.orderinformation2} style={{marginLeft:'25px'}}>5</div>
                    <div className={styles.orderinformation2} style={{marginLeft:'25px'}}>NT.120</div>
                    <div className={styles.orderinformation2} style={{color:'#ff2828'}}>NT.600</div>
                </div>

                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div className={styles.orderinformation1} style={{marginLeft:'85px'}}>雞排</div>
                    <div className={styles.orderinformation2} style={{marginLeft:'25px'}}>5</div>
                    <div className={styles.orderinformation2} style={{marginLeft:'25px'}}>NT.120</div>
                    <div className={styles.orderinformation2} style={{color:'#ff2828'}}>NT.600</div>
                </div>

                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div className={styles.orderinformation1} style={{marginLeft:'85px'}}>雞排</div>
                    <div className={styles.orderinformation2} style={{marginLeft:'25px'}}>5</div>
                    <div className={styles.orderinformation2} style={{marginLeft:'25px'}}>NT.120</div>
                    <div className={styles.orderinformation2} style={{color:'#ff2828'}}>NT.600</div>
                </div>

                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div className={styles.orderinformation1} style={{marginLeft:'85px'}}>雞排</div>
                    <div className={styles.orderinformation2} style={{marginLeft:'25px'}}>5</div>
                    <div className={styles.orderinformation2} style={{marginLeft:'25px'}}>NT.120</div>
                    <div className={styles.orderinformation2} style={{color:'#ff2828'}}>NT.600</div>
                </div>

                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div className={styles.orderinformation1} style={{marginLeft:'85px'}}>雞排</div>
                    <div className={styles.orderinformation2} style={{marginLeft:'25px'}}>5</div>
                    <div className={styles.orderinformation2} style={{marginLeft:'25px'}}>NT.120</div>
                    <div className={styles.orderinformation2} style={{color:'#ff2828'}}>NT.600</div>
                </div>

            </div>

              {/* orderContainer */}
            </div>

 
            {/* orderBorder */}
          </div>
          
       

       {/* '查看商品 繼續選購'按鈕 */}
          <div style={{display:'flex',justifyContent:'center'}}>
            <div className={styles.previousButton}>查看商品</div>
            <div className={styles.nextButton} style={{paddingTop:'3px'}}>繼續選購</div>
          </div>

          {/* outerFrame */}
        </div>

        </Section>
    </>
  )
}
