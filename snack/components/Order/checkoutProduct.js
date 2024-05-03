import styles from '@/styles/Order.module.css'

import React, { createContext, useContext,useState, useEffect } from 'react'
import { FaShopify } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Order1Seller from '@/components/Order/order1Seller'
import Order1Product from '@/components/Order/order1Product'


const CheckoutProduct = ({ dataCount, productCount}) => {
    // 使用dataCount确定循环次数
    const renderItems = () => {
      return [...Array(dataCount)].map((_, index) => (
        <div className="accordion" id={`accordionPanelsStayOpenExample${index}`} key={index}>
          <div className="accordion-item">
            <h2 className="accordion-header" id={`panelsStayOpen-heading${index}`}>
              <button className={`accordion-button ${styles.customAccordionButton}`} type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse${index}`} aria-expanded="false" aria-controls={`panelsStayOpen-collapse${index}`} style={{ backgroundColor: 'transparent', color: 'inherit', borderBottom: 'solid 1px #B1B7B5' }}>
              {/* 商家資訊 */}
                <Order1Seller nightmarket="士林夜市" seller="豪大雞排" />
              </button>
            </h2>
            <div id={`panelsStayOpen-collapse${index}`} className={`accordion-collapse collapse`} aria-labelledby={`panelsStayOpen-heading${index}`} data-bs-parent={`#accordionPanelsStayOpenExample${index}`}>
              <div className="accordion-body">

        {/* 商品資訊 */}
        {Array(2)
        .fill(null)
        .map((v,i) => {
          return (
            <div key={i} className='d-flex'>
            <Order1Product imageUrl="/images/鹹酥雞.jpg" product="海苔雞排" price="80" />
            </div>
          )
        })}


              </div>
            </div>
          </div>
        </div>
      ));
    };
  
    return (
      <div className="checkoutProduct">
        {renderItems()}
      </div>
    );
  };
  
  export default CheckoutProduct;
