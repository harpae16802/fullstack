import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { useRouter } from 'next/router';
import Point from '../others/point'
import Image from 'next/image'
import Link from 'next/link'
import styles from "@/styles/form.module.css"
import ticketStyle from '@/styles/ticket.module.css';
// 大頭貼
import { useIcon } from '@/data/context/ImgContext';
// import Pagination from '@/components/memberS/others/pagination'
import { ticket01Select01, ticket01Select02, ticket01Select03, remainTicket } from "@/api/ticket"
export default function ticket() {
  let  { previewUrl } = useIcon(); 
  const [tab, settab] = useState(1)
  const router = useRouter(); 
  // 設定tab資料
  const [data1, setdata1] = useState([]);
  const [data2, setdata2] = useState([]);
  const [data3, setdata3] = useState([]);
  // rwd
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
    // 分數訊息
  const [point, setPoint] = useState([]);
  const [pointMsg, setPointMsg] = useState([]);
  // 控制rwd
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
  // 設定分數
  useEffect(() => {
    
    (async function () {
      try {
        const custom_id = JSON.parse(localStorage.getItem("Nightmarket-auth")).custom_id;
        const data = await remainTicket({custom_id:custom_id})

        setPoint(data.data + "點");
        setPointMsg("目前點數:")
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, [])

  // 切換資料
  
  useEffect(() => {
    let custom_id = JSON.parse(localStorage.getItem("Nightmarket-auth")).custom_id;
    (async function () {
      try { 
        // 已獲得
        const result = await ticket01Select02({custom_id:custom_id});
        if (result.success) {
          setdata2(result.data);
          // 設定預設值 
        } else {
          setdata2([]);
        }

        // 已使用
        const result3 = await ticket01Select03({custom_id:custom_id});
        if (result3.success) {
          setdata3(result3.data);
        } else {
          setdata3([]);
        }

        // 全部 
        const result1 = await ticket01Select01({custom_id:custom_id});
        if (result1.success) {
          setdata1(result1.data);
        } else {
          setdata1([]);

        }
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    })();
  }, []);
  return (
    <div className={classnames(ticketStyle["ticket"])}>
      {/*上方看板*/}
      <Point pointTitle={point} pointMsg={pointMsg} />
      {/*切換bar*/}
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
      {/*內容*/}

      <div className=" border1">
        <div className={classnames("itemgroup item1", styles["mb-0"])}>

          <div className="card">
            {/* 1  */}
            {/* 全部紀錄  */}

            {/* flexBetween   {Array(4).fill(1).map(() => { */}
            {tab == 1 && data1.map((v, i) => {
              return (<div key={i} className={classnames(" card-body border-1-bg ", ticketStyle["wrap"], styles.flexBetween)}>
                <div className={classnames(ticketStyle["postion-a1"])}>
                  <Image  src={previewUrl} alt="Description" width={80} height={80} />
                </div>
                <div className={classnames(styles.flexBetween, ticketStyle["postion-a2"])}>
                  <h5 className="time" style={{ textAlign: 'center' }}>
                    {v.play_date}  <br />
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
            {/* 已獲的  */}

            {tab == 2 && data2.map((v, i) => {
              return (<div key={i} className={classnames(" card-body border-1-bg ", ticketStyle["wrap"], styles.flexBetween)}>
                <div className={classnames(ticketStyle["postion-a1"])}>
                  <Image src={previewUrl} alt="Description" width={80} height={80} />
                </div>
                <div className={classnames(styles.flexBetween, ticketStyle["postion-a2"])}>
                  <h5 className="time" style={{ textAlign: 'center' }}>
                    {v.play_date}  <br />
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
            {/* 已使用 */}

            {tab == 3 && data3.map((v, i) => {
              return (<div key={i} className={classnames(" card-body border-1-bg ", ticketStyle["wrap"], styles.flexBetween)}>
              <div className={classnames(ticketStyle["postion-a1"])}>  
                <Image src={previewUrl} alt="Description" width={80} height={80} />
                  </div>
                  <div className={classnames(styles.flexBetween, ticketStyle["postion-a2"])}>
                  <h5 className="time" style={{ textAlign: 'center' }}>
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
   
    </div>
  )
}
