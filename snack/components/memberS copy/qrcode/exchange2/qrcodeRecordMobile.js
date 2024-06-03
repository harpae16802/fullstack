import React, { useState } from 'react'
import styles from "@/styles/form.module.css"
import Image from 'next/image'
import classNames from 'classnames'
import { FaHome } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io"; 

export default function QrcodeMobile() {
  const [numberbtn, setNumberbtn] = useState(1);

  const handleIncrement = () => setNumberbtn(prev => prev + 1);
  const handleDecrement = () => setNumberbtn(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      <div className={classNames("d-flex justify-content-between align-items-center qrcodeRecord", styles["mb-0"], styles["border-1"], styles["md-open"])} data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">
        <div className={classNames("px-3 py-3 border-0 qrcodeProduct", styles["mx-full"], styles["btn-parmary-transparent"])} type="button">
          <div className='d-flex align-items-center pe-1'>
            <FaHome className={classNames("fahome", styles["text-color"])} />
            <h3>士林夜市&nbsp;&nbsp;豪大雞排</h3>
          </div>
          <button className={classNames(styles['border-1'], "px-3 ms-1 choosebtn")}>已選擇</button>
        </div>
        <IoIosArrowDown className='me-3' />
      </div>
      <div className={classNames("collapse")} id="collapseExample1">
        {Array(3).fill(1).map((v, i) => (
          <div className="creditItem qrcodeRecordMobile" key={i}>
            <div className={classNames("itemgroup item1", styles["mb-0"])}>
              <div className={classNames(styles['border-1-grey'], "mx-0 px-3 py-3", styles.flexBetween)}>
                <div className='d-flex flex-column'>
                  <div className="productImage">
                    <Image src="/ch.jpeg" alt="Description" width={100} height={100} layout='responsive' />
                  </div>
                </div>
                <div className="time d-flex flex-column align-items-center justify-content-evenly" style={{ textAlign: 'center' }}>
                  <small>2024/03/01</small>
                  <h6 className={classNames(styles['btn-parmary-transparent'])}>海苔雞排</h6>
                  <div className='number d-flex align-items-center'>
                    <span className='numbericon' onClick={handleIncrement}>+</span>
                    <span className='numbericon no-background'>
                      <input readOnly type="number" value={numberbtn} className='supernumb' />
                    </span>
                    <span className='numbericon' onClick={handleDecrement}>-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
