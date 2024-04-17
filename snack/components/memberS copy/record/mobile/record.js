import React from 'react'
import classNames from 'classnames'
import Point from '../../others/point'
import Image from 'next/image'
import Link from 'next/link'
import styles from "@/styles/form.module.css"
import Pagination from '@/components/memberS/others/pagination'
import { FaTrash } from "react-icons/fa";

export default function ticket() {
  return (
    <div className='favrote'>
      <ul className={classNames("nav nav-tabs d-flex flex-grow-1 px-5")}>
        <li className="nav-item flex-grow-1">
          <Link aria-current="page" href="#" style={{ border: "2px solid grey" }} className={classNames("nav-link me-1", styles["btn-parmary-white"], styles["active"])}>所有留言</Link>
        </li>
        <li className="nav-item flex-grow-1">
          <Link aria-current="page" href="#" style={{ border: "2px solid grey" }} className={classNames("nav-link me-1", styles['border-1'], styles["btn-parmary-white"])}>查看回覆</Link>
        </li>
        <li className="nav-item flex-grow-1">
        <Link aria-current="page" href="#" style={{ border: "2px solid grey" }} className={classNames("nav-link me-1", styles['border-1'], styles["btn-parmary-white"])}>查看收藏</Link>
      </li>

      </ul>
      <div className=" border1">
        <div className={classNames("itemgroup item1", styles["mb-0"])}>

          <div className="card">
            {/* flexBetween */}
            
            {Array(4).fill(1).map(() => {
              return (  
                <div className={classNames("card full-width card-body mb-0")}>

                  {/* flexBetween */}
                  <div className={classNames("full-width", "mx-0 px-3 py-3", styles.flexBetween)}>
                    <div className={classNames("d-flex ")}>
                 
                    <Image src="/ch.jpeg" alt="Description" width={60} height={60} />
                    <div className="time" style={{ textAlign: 'center' }}>
                        2024/02/01    <br />    楊威雨 
                    </div> 
                    </div>
                    <button type="submit" style={{height:"50px"}} className={classNames("btn  sm-btn ", styles["btn-parmary"])}>查看詳細 </button>
                    <button type="submit" style={{height:"50px"}} className={classNames("btn  sm-btn ", styles["text-color"],styles["border-001"])}>到店面 </button>
                    <div>
                    </div>
                    </div>
                    <p className='full30-width single-ellipsis'>這家的料理該怎麼說的,簡而言之就是好吃再詳細說一些的話就是喜歡他的的調味，甜而不膩然後又易入口</p>
                </div>)
            })
            }
          </div>

        </div>
      </div>
      <Pagination />
    </div>
  )
}
