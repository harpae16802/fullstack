import React from 'react'
import classNames from 'classnames'
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
              return <div className={classNames("border-1-bg card-body", styles.flexBetween)}>
                <div className={classNames("", styles.flexBetween)}>
                  <div className='d-flex flex-column justify-content-center '>
                    <dir className="productImage">
                      <Image src="/ch.jpeg" alt="Description" width={100} height={100} layout='responsive' />
                    </dir>   <h3 className='font-bold'> 射氣球</h3>
                  </div>
                </div>
                <div className={classNames("countGroup")}>
                  <h5 className='font-bold text-end'>第二關</h5>
                  <h5 className='text-end'> 第一次通關 </h5>
                  <h5 className='text-color text-end'> +10點</h5>
                  <p className='text-end'>  2024/02/01  </p>
                  <div>
                  </div>
                </div>


              </div>
            })
            }
          </div>

        </div>
      </div>
      <Pagination />
    </div>
  )
}
