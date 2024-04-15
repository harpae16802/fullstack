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
                    <div className={classNames("d-flex flex-column content-column-center")}>
                      <dir className="productImage">
                        <Image src="/ch.jpeg" alt="Description" width={100} height={100} layout='responsive' />
                      </dir>
                      <div className='number'>
                        <span className='numbericon' >+</span>
                        <span className='numbericon'>1</span>
                        <span className='numbericon'>+</span>
                      </div>

                    </div>
                    <div className={classNames("countGroup", styles.flexBetween)}>
                      <div className="time px-2" style={{ textAlign: 'center' }}>
                        <h6 className={classNames(styles['btn-parmary-transparent'])}>海苔雞排</h6>    <small>2024/03/01</small>
                     <button type="submit" className={classNames("btn text-sm", styles["btn-parmary"], styles["rd-30"])}>加入購物車 </button>
                
                      </div> 

                    </div>
                  </div>
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
