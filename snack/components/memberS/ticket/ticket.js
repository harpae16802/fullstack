import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { useRouter } from 'next/router';
import Point from '../others/point'
import Image from 'next/image'
import Link from 'next/link'
import styles from "@/styles/form.module.css"
import ticketStyle from '@/styles/ticket.module.css';
import Pagination from '@/components/memberS/others/pagination'
import { ticket01Select01, ticket01Select02, ticket01Select03 } from "@/api/ticket"
export default function ticket() {
  const [tab, settab] = useState(1)
  const router = useRouter();
  const [data, setdata] = useState([]);
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsBigScreen(window.innerWidth > 500);
      setIsTabletOrMobile(window.innerWidth <= 500);
    };

    // 監聽視窗大小變化
    window.addEventListener('resize', handleResize);
    // 初始設置一次
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [])

  useEffect(() => {
    if (tab == 2) {
      (async function () {
        const result = await ticket01Select02();
        if (result.success) {
          setdata(result.data);
        } else {
          setdata([]);

        }
      })();
      settab(2)

    } else if (tab == 3) {
      (async function () {
        const result = await ticket01Select03();
        if (result.success) {
          setdata(result.data);
        } else {
          setdata([]);
        }
      })();
      settab(3)

    } else {
      (async function () {
        const result = await ticket01Select01();
        if (result.success) {
          setdata(result.data);
        } else {
          setdata([]);

        }
      })();
      settab(1)
    }
  }, [tab])
  return (
    <div className={classnames(ticketStyle["ticket"])}>
      <Point />
      <ul className={classnames("nav nav-tabs d-flex flex-grow-1 px-5")}>
        <li className="nav-item flex-grow-1">
          <Link onClick={(e) => { e.preventDefault(); settab(1) }} aria-current="page" href="/memberSystem/ticket" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles["btn-parmary-white"], `${tab == 1 && styles["active"]}`)}>全部紀錄</Link>
        </li>
        <li className="nav-item flex-grow-1">
          <Link onClick={(e) => { e.preventDefault(); settab(2) }} aria-current="page" href="/memberSystem/ticket/?id=2" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles['border-1'], `${tab == 2 && styles["active"]}`, styles["btn-parmary-white"])}>已獲得</Link>
        </li>
        <li className="nav-item flex-grow-1">
          <Link onClick={(e) => { e.preventDefault(); settab(3) }} aria-current="page" href="/memberSystem/ticket/?id=3" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles['border-1'], `${tab == 3 && styles["active"]}`, styles["btn-parmary-white"])}>已使用</Link>
        </li>
      </ul>
      <div className=" border1">
        <div className={classnames("itemgroup item1", styles["mb-0"])}>

          <div className="card">
            {/* 1  */}

            {/* flexBetween   {Array(4).fill(1).map(() => { */}
            {tab == 1 && data.map((v, i) => {
              return (<div key={i} className={classnames(" card-body border-1-bg ", ticketStyle["wrap"], styles.flexBetween)}>
                <div className={classnames(ticketStyle["postion-a1"])}>
                  <Image src="/ch.jpeg" alt="Description" width={80} height={80} />
                </div>
                <div className={classnames(styles.flexBetween, ticketStyle["postion-a2"])}>
                  <h5 className="time" style={{ textAlign: 'center' }}>
                   <span>{v.payment_date} </span>  <br />
                    遊戲點數
                  </h5>

                </div>
                <div className={classnames("countGroup", styles.flexBetween, ticketStyle["postion-a3"])}>
                  <div style={{ margin: "auto" }}>
                  
                    {v.get_point && <>+{v.get_point}點 </>}
                    {v.consume_gamepoint && <>-{v.consume_gamepoint}點  </>}

                  </div>

                  <div>
                  </div>
                </div>
              </div>)
            })
            }
            {/* 2  */}
            {tab == 2 && data.map((v, i) => {
              return (<div key={i}  className={classnames(" card-body border-1-bg ", ticketStyle["wrap"], styles.flexBetween)}>
                <div className={classnames(ticketStyle["postion-a1"])}>
                  <Image src="/ch.jpeg" alt="Description" width={80} height={80} />
                </div>
                <div className={classnames(styles.flexBetween,ticketStyle["postion-a2"])}>
                  <h5 style={{ textAlign: 'center' }}>
                    <span>{v.play_date} </span> <br />
                    遊戲點數
                  </h5>

                </div>
                <div className={classnames("countGroup", styles.flexBetween, ticketStyle["postion-a3"])}>
                <div style={{ margin: "auto" }}>
                  {v.get_point && <>+{v.get_point}點  </>}
                    {v.consume_gamepoint && <>-{v.consume_gamepoint}點 </>}
                  </div>
                  <div>
                  </div>
                </div>
              </div>)
            })
            }
            {/* 3  */}

            {tab == 3 && data.map((v, i) => {
              return (
                <div v key={i} className={classnames("card card-body border-1-bg", ticketStyle["wrap"], styles.flexBetween)}>
                  <div className={classnames(ticketStyle["postion-a1"])}> 
                  <Image src="/ch.jpeg" alt="Description" width={80} height={80} />
                  </div>
                  <div className={classnames(styles.flexBetween,ticketStyle["postion-a2"])}>
                    <h5 className='ms-3 text-center' > 
                    <span> {v.payment_date}</span>
                      <br />
                      商品折價 </h5>  
                  </div>
                  <div className={classnames("countGroup", styles.flexBetween, ticketStyle["postion-a3"])}>
                  <div style={{ margin: "auto" }}>
                    {v.consume_gamepoint && <>-{v.consume_gamepoint}點  </>}
                    </div>
                    <div>
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
