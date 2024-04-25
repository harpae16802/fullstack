import React from 'react'
import classNames from 'classnames' 
import Image from 'next/image'
import Link from 'next/link'
import styles from "@/styles/form.module.css"
import Pagination from '@/components/memberS/others/pagination'
 
import { FaAngleDown } from "react-icons/fa";

export default function ticket() {
  return (
    <div> 
      <ul className={classNames("nav nav-tabs d-flex flex-grow-1 px-5")}>
        <li className="nav-item flex-grow-1">
          <Link aria-current="page" href="#" style={{ border: "2px solid grey" }} className={classNames("nav-link me-1", styles["btn-parmary-white"], styles["active"])}>通關紀錄</Link>
        </li>
        <li className="nav-item flex-grow-1">
          <Link aria-current="page" href="#" style={{ border: "2px solid grey" }} className={classNames("nav-link me-1", styles['border-1'], styles["btn-parmary-white"])}>成就紀錄</Link>
        </li>
   
      </ul>
      <div className=" border1">
        <div className={classNames("itemgroup item1", styles["mb-0"])}>

          <div className="card">
            {/* flexBetween */}
            {Array(4).fill(1).map(() => {
              return <div className={classNames("card card-body", styles.flexBetween)}>
                <div className={classNames("", styles.flexBetween)}>
                  <Image src="/ch.jpeg" alt="Description" width={60} height={60} />
                  <div className="time" style={{ textAlign: 'center' }}>
                      2024/02/01    <br />    楊威雨 
                  </div>
                  <h5 className='ms-3'>楊威雨</h5> 
                </div>
                <div >
                <h5>士林夜市 豪大雞排</h5>
                <p className='full30-width'>這家的料理該怎麼說的,簡而言之就是好吃再詳細說一些的話就是喜歡他的的調味，甜而不膩然後又易入口</p>
                </div>
                <div className={classNames("countGroup", styles.flexBetween)}>
                  <div className='d-flex align-items-center justify-items-center '>
                  <button type="submit" style={{height:"50px"}} className={classNames("btn  recordBtn", styles["btn-parmary"])}>查看詳細 </button>

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
