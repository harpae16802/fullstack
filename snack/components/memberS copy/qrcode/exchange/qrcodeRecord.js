import React from 'react'
import styles from "@/styles/form.module.css"
import Image from 'next/image'
import classNames from 'classnames'
import { FaHome } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";

export default function creditComponts() {

  return (
    <div className={classNames("", styles["lg-open"])}> 
      <div className={classNames("d-flex  justify-content-between align-items-center ", styles["mb-0"], styles["border-1"])}  data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">
        <div
          className={classNames(" px-3 py-3 border-0 qrcodeProduct", styles["mx-full"], styles["btn-parmary-transparent"])} type="button" data-toggle="collapse">
          <div className='d-flex pe-1'>
            <FaHome className={classNames("fahome", styles["text-color"])} />
            <h3> 士林夜市&nbsp;&nbsp;豪大雞排 </h3>
          </div>



          <button className={classNames(styles['border-1'], "px-3 ms-1 choosebtn")}  >已選擇</button>
        </div>
        <IoIosArrowDown className='me-3' />
      </div>
      {/* 這裡是內容*/}
      <div className={classNames("collapse")} id="collapseExample1">
        {Array(3).fill(1).map((v, i) => {

          return (
            <div className="creditItem" key={i} >

              <div className={classNames("itemgroup item1", styles["mb-0"])}>
                {/* flexBetween */}
                <div className={classNames(styles['border-1-grey'], "mx-0 px-3 py-3", styles.flexBetween)}>
                  <div className={classNames("", styles.flexBetween)}>
                    <Image src="/ch.jpeg" alt="Description" width={60} height={60} />
                    <div className="time px-2" style={{ textAlign: 'center' }}>
                      <h6 className={classNames(styles['btn-parmary-transparent'])}>海苔雞排</h6>    <small>2024/03/01</small>

                    </div>
                  </div>
                  <div className={classNames("countGroup", styles.flexBetween)}>
                    <div>
                      <span className={classNames(styles["btn-parmary-transparent"])}>購買數量&nbsp;|&nbsp;5 <br /></span>
                      <span className={classNames(styles["btn-parmary-red"])}>剩餘數量&nbsp;|&nbsp;5<br /></span>
                    </div>
                    <div>
                      <button type="submit" className={classNames("btn  mx-2 text-color border-1", styles["btn-parmary"])}>選擇商品 <CgAddR className={classNames(styles["btn-parmary"])} /></button>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          )
        })
        }

      </div>  
    </div>
  )
}
