import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { useRouter } from 'next/router';
import Point from '../others/point'
import Image from 'next/image'
import Link from 'next/link'
import styles from "@/styles/form.module.css"
import ticketStyle from '@/styles/ticket.module.css';
import Pagination from '@/components/memberS/others/pagination'
import { ticket02Select01, ticket02Select02,remainTicket } from "@/api/ticket2"
export default function ticket() {
  const[point,setPoint]=useState([]);
  const[pointMsg,setPointMsg]=useState([]);
  const [tab, settab] = useState(1);
  const router = useRouter();
  const [data, setdata] = useState([]);
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);

  // 設定rwd
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
        const data= await remainTicket()
   
        setPoint("第"+data.data+"關");
        setPointMsg("目前進度:")
      } catch (error) { 
        console.log("error:", error);
      }
    })();
  }, [])

  // tab切換資料
  useEffect(() => {
    if (tab == 2) { 
      (async function () {
        // 成就紀錄
        const result = await ticket02Select02();
        if (result.success) {
          setdata(result.data);
        } else {
          setdata([]);

        }
      })();
      settab(2)

    }
    
    if(tab == 1) {
      //通關紀錄
      (async function () {
        const result = await ticket02Select01();
        if (result.success) {
          setdata(result.data);
        } else {
          setdata([]);

        }
      })();
      settab(1)
    }
  }, [router,tab])
  return (
    <div className={classnames(ticketStyle["ticket"])}>
       {/*  關卡上方勘版 */}
   
    <Point pointTitle={point} pointMsg={pointMsg}  />
     {/*  tab */}
      <ul className={classnames("nav nav-tabs d-flex flex-grow-1 px-5")}>
        <li className="nav-item flex-grow-1">
          <Link onClick={(e) => { e.preventDefault(); settab(1) }} aria-current="page" href="/memberSystem/ticket" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles["btn-parmary-white"], `${tab == 1 && styles["active"]}`)}>通關紀錄</Link>
        </li>
        <li className="nav-item flex-grow-1">
          <Link onClick={(e) => { e.preventDefault(); settab(2) }} aria-current="page" href="/memberSystem/ticket/?id=2" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles['border-1'], `${tab == 2 && styles["active"]}`, styles["btn-parmary-white"])}>成就紀錄</Link>
        </li>
      </ul>
      <div className=" border1">
        <div className={classnames("itemgroup item1", styles["mb-0"])}>
 
          <div className="card">
            {/* 1  */}
    {/*通關紀錄*/}
 
            {/* flexBetween   {Array(4).fill(1).map(() => { */}
            {tab == 1   && data.map((v, i) => {
              return (
                <div key={i} className={classnames("card-body time-wrap   border-1-bg  ", styles.flexBetween)}>
                  <h5>
                    <Image src="/ch.jpeg" alt="Description" width={80} height={80} />
                     {v.level_id}&nbsp; 
                     {v.level_count}
                    </h5>
                  <div className='p16'>
                    <h5 > {v.play_date}  </h5>
                  </div>
                 

                </div>
              )
            })}
            {/* 2  */} 
                {/*成就紀錄*/}
            {tab == 2 && data.map((v, i) => {
 
              return (<div className={classnames("card-body   border-1-bg time-wrap  ")}>
               
                <Image src="/ch.jpeg" alt="Description" width={80} height={80} />
                <div className="time ms-3" style={{ textAlign: 'center' }}>
                  <h5 className='p16'>{v.level_id} - {v.level_count}<br /></h5>
                </div>
                <div className='ma-md-no ma-auto' > 
                  <h5> <span className='text-color'> +  {v.get_point}點</span></h5>
                </div>
              </div>
              )
            })}


          </div>

        </div>
      </div>
      <Pagination />
    </div>
  )
}
