 import React from 'react'
import classNames from 'classnames'
import Point from '../others/point'
import Image from 'next/image'
import Link from 'next/link'
import styles from "@/styles/form.module.css"
import Pagination from '@/components/memberS/others/pagination'
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
                  
                  <h5 className='ms-3'>第二關 <br />  2024/02/01</h5>
                   
                  </div>

                </div>
                <div className={classNames("countGroup", styles.flexBetween)}>
                  <div style={{ display: 'flex' }}>
                   <h5> 第一次通關 <span className='text-color'> +10點</span></h5>
                   
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
