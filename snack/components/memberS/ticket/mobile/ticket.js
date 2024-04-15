import React from 'react'
import classNames from 'classnames'
import Point from '../../others/point'
import Image from 'next/image'
import Link from 'next/link'
import styles from "@/styles/form.module.css"
import Pagination from '@/components/memberS/others/pagination'
export default function ticket() {
  return (
    <div className={classNames(styles["md-open"],"ticket")}>
      <Point />
      <ul className={classNames("nav nav-tabs d-flex flex-grow-1 px-5")}>
        <li className="nav-item flex-grow-1">
          <Link aria-current="page" href="#" style={{ border: "2px solid grey" }} className={classNames("nav-link me-1", styles["btn-parmary-white"], styles["active"])}>全部紀錄</Link>
        </li>
        <li className="nav-item flex-grow-1">
          <Link aria-current="page" href="#" style={{ border: "2px solid grey" }} className={classNames("nav-link me-1", styles['border-1'], styles["btn-parmary-white"])}>已獲得</Link>
        </li>
        <li className="nav-item flex-grow-1">
          <Link aria-current="page" href="#" style={{ border: "2px solid grey" }} className={classNames("nav-link me-1", styles['border-1'], styles["btn-parmary-white"])}>已使用</Link>
        </li>
      </ul>
      <div className=" border1">
        <div className={classNames("itemgroup item1", styles["mb-0"])}>

          <div className="card">
            {/* flexBetween */}
            {Array(4).fill(1).map(() => {
              return <div className={classNames("border-1-bg card-body", styles.flexBetween)}>
                <div className={classNames("", styles.flexBetween)}>
                <div style={{width:"150px"}}>
                <dir className="productImage">
                <Image src="/ch.jpeg" alt="Description" width={100} height={100} layout='responsive' />
              </dir>  </div>
                  <div className="time" style={{ textAlign: 'center' }}>
                    遊戲獎勵
                    <br />  2024/0202
                  </div>

                </div>
                <div className={classNames("countGroup", styles.flexBetween)}>
                  <div style={{ display: 'flex' }}>
                    +10<h5>點</h5>
                  </div>
                  <div>
                  </div>
                </div>


              </div>
            })
            }
          </div>

        </div>
      </div>
      <Pagination/>
    </div>
  )
}
