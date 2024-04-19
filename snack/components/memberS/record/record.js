import React, { useEffect, useState } from 'react';
import classnames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import styles from "@/styles/form.module.css"
import Pagination from '@/components/memberS/others/pagination'
import recordStyle from "@/styles/record.module.css"
import { FaAngleDown, FaHeart } from "react-icons/fa";

export default function ticket() {
  const [tab, settab] = useState(1);
  const [numberbtn, setnumberbtn] = useState(1);
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsBigScreen(window.innerWidth > 1200);
      setIsTabletOrMobile(window.innerWidth <= 1200);
    };

    // 監聽視窗大小變化
    window.addEventListener('resize', handleResize);
    // 初始設置一次
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [])

  return (
    <div className={classnames(recordStyle["record"])}>
      <ul className={classnames("nav nav-tabs d-flex flex-grow-1 px-5")}>
        <li className="nav-item flex-grow-1">
          <Link onClick={(e) => { e.preventDefault(); settab(1) }} aria-current="page" href="/memberSystem/ticket" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles["btn-parmary-white"], `${tab == 1 && styles["active"]}`)}>所有留言</Link>
        </li>
        <li className="nav-item flex-grow-1">
          <Link onClick={(e) => { e.preventDefault(); settab(2) }} aria-current="page" href="/memberSystem/ticket/?id=2" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles['border-1'], `${tab == 2 && styles["active"]}`, styles["btn-parmary-white"])}>查看回覆</Link>
        </li>
        
      </ul>
      <div className=" border1">
        <div className={classnames("itemgroup item1", styles["mb-0"])}>

          <div className="card">
            {/* flexBetween */}
            {tab == 1 && (
              Array(4).fill(1).map(() => {
                return (
                  <div>
                    <div className={classnames("card-body", recordStyle["wrap"], styles.flexBetween)}>
                      <div className={classnames(styles.flexBetween, recordStyle["postion-a1"])}>
                        <div className='content-row-center content-sm-column-center '>
                          <div className="time" style={{ textAlign: 'center' }}>
                            2024/02/01
                          </div>
                          <h5 className='ms-3'>楊威雨</h5>
                        </div>

                      </div>
                      <div className={classnames(recordStyle["postion-a2"])}>
                        <h5>士林夜市 豪大雞排</h5>
                        {isBigScreen && <p className={classnames('full30-width', recordStyle["fixed"])}>這家的料理該怎麼說的,簡而言之就是好吃再詳細說一些的話就是喜歡他的的調味，甜而不膩然後又易入口</p>}
                      </div>
                      <div className={classnames("countGroup", styles.flexBetween, recordStyle["postion-a3"])}>
                        <div className={classnames('d-flex align-items-end justify-items-end ', styles["justify-self-end"])}>
                         <button type="button" className={classnames("btn ",recordStyle["smchoosebtn"])}>查看詳細 </button>
                         
                        </div>
                      </div>

                    </div>
                    <div>
                         {isTabletOrMobile && <p className={classnames('full30-width', recordStyle["fixed"])}>這家的料理該怎麼說的,簡而言之就是好吃再詳細說一些的話就是喜歡他的的調味，甜而不膩然後又易入口</p>}
                  
                    </div>

                  </div>
                )
              })
            )}
            {/* 第二段 */}
            {tab == 2&& (
              Array(4).fill(1).map(() => {
                return (
                  <div>
                    <div className={classnames("card-body", recordStyle["wrap"], styles.flexBetween)}>
                      <div className={classnames(styles.flexBetween, recordStyle["postion-a1"])}>
                        <div className='content-row-center content-sm-column-center '>
                          <div className="time" style={{ textAlign: 'center' }}>
                            2024/02/01
                          </div>
                          <h5 className='ms-3'>楊威雨</h5>
                        </div>

                      </div>
                      <div className={classnames(recordStyle["postion-a2"])}>
                        <h5>士林夜市 豪大雞排</h5>
                        {isBigScreen && <p className={classnames('full30-width', recordStyle["fixed"])}>這家的料理該怎麼說的,簡而言之就是好吃再詳細說一些的話就是喜歡他的的調味，甜而不膩然後又易入口</p>}
                      </div>
                      <div className={classnames("countGroup", styles.flexBetween, recordStyle["postion-a3"])}>
                        <div className={classnames('d-flex align-items-end justify-items-end ', styles["justify-self-end"])}>
                         <button type="button" className={classnames("btn ",recordStyle["smchoosebtn"])}>查看詳細 </button>
                         
                        </div>
                      </div>

                    </div>
                    <div>
                         {isTabletOrMobile && <p className={classnames('full30-width', recordStyle["fixed"])}>這家的料理該怎麼說的,簡而言之就是好吃再詳細說一些的話就是喜歡他的的調味，甜而不膩然後又易入口</p>}
                  
                    </div>

                  </div>
                )
              })
            )}
             {/* 第三段 */}
           
          </div>

        </div>
      </div> 
    </div>
  )
}
