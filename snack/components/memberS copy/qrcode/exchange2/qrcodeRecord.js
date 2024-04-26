import React from 'react'
import styles from "@/styles/form.module.css"
import Image from 'next/image'
import classNames from 'classnames'
import { FaHome } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
// 我是第二夜
export default function creditComponts() {

  return (
    <div className={classNames("", styles["lg-open"])}>

      <div className={classNames("d-flex  justify-content-between align-items-center ", styles["mb-0"], styles["border-1"])}  data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">
        <div
          className={classNames(" px-3 py-3 border-0 qrcodeProduct", styles["btn-parmary-transparent"])} type="button">
          <div className='d-flex pe-1'>
            <FaHome className={classNames("fahome", styles["text-color"])} />
            <h3> 士林夜市&nbsp;&nbsp;豪大雞排 </h3>
          </div>



          <button className={classNames(styles['border-1'], "px-3 ms-1 choosebtn")}  >已選擇</button>
        </div>
        <IoIosArrowDown className='me-3' />
      </div>
      <div className={classNames("collapse")} id="collapseExample1">
        {Array(3).fill(1).map((v, i) => {

          return (
            <div className="creditItem" key={i} >

              <div className={classNames("itemgroup item1", styles["mb-0"])}>
                {/* flexBetween */}
                <div className={classNames(styles['border-1-grey'], "mx-0 px-3 py-3", styles.flexBetween)}>
                  <div className={classNames("", styles.flexBetween)}>
                    <Image src="/ch.jpeg" alt="Description" width={60} height={60} />
                    <div className="time " style={{ textAlign: 'center' }}>
                      <h6 className={classNames(styles['btn-parmary-transparent'])}>海苔雞排</h6>    <small>2024/03/01</small>

                    </div>
                  </div>
                  <div className={classNames("countGroup", styles.flexBetween)}>
                    <div className='number'>
                      <span className='numbericon' >+</span>
                      <span className='numbericon'>1</span>
                      <span className='numbericon'>+</span>
                    </div>
                    <div>
                      <FaTrash className='text-color'/>
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
