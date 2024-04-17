import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import Point from '../others/point'
import Image from 'next/image'
import Link from 'next/link'
import styles from "@/styles/form.module.css"
import Pagination from '@/components/memberS/others/pagination'
import { useRouter } from 'next/router'
import  { ticket02Select01, ticket02Select02 } from "@/api/ticket2"

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
    if (router.query.id == 2) {
      (async function () {
        const result = await ticket02Select02();
        if (result.success) {
          setdata(result.data);
        } else {
          setdata([]);

        }
      })();
      settab(2)

    } else {
      (async function () {
        const result = await ticket02Select01();
        if (result.success) {
          console.log("aaaa");
          console.log(result)
          setdata(result.data);
        } else {
          setdata([]);

        }
      })();
      settab(1)
    }
  }, [router])
  return (
    <div className='ticket'>
      <ul className={classnames("nav nav-tabs d-flex flex-grow-1 px-5")}>
        <li className="nav-item flex-grow-1">
          <Link aria-current="page" href="/memberSystem/ticket2" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles["btn-parmary-white"], `${tab == 1 && styles["active"]}`)}>通關紀錄</Link>
        </li>
        <li className="nav-item flex-grow-1">
          <Link aria-current="page" href="/memberSystem/ticket2?id=2" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles["btn-parmary-white"], `${tab == 2 && styles["active"]}`)}>成就紀錄</Link>
        </li>

      </ul>
      <div className=" border1">
        <div className={classnames("itemgroup item1", styles["mb-0"])}>

          <div className="card">
            {/* flexBetween */} 
            {tab==1 &&data.map((v,i) => {
              {v}
              return (<div className={classnames("card-body   border-1-bg  ", styles.flexBetween)}>
                <div className={classnames("", styles.flexBetween)}>
                  <Image src="/ch.jpeg" alt="Description" width={150} height={150} />
                  <div className="time ms-3" style={{ textAlign: 'center' }}>

                    <h5 className=''>{v.level_id} <br /> {v.play_date}</h5>

                  </div>

                </div>
                <div className={classnames("countGroup", styles.flexBetween)}>
                  <div style={{ display: 'flex' }}>
                    <h5> {v.level_count} <span className='text-color'> {v.clear_score}分</span></h5>

                  </div>
                  <div>
                  </div>
                </div>


              </div>
              )
            }) } 
            {tab==2 &&data.map((v,i) => {
            
              return (<div className={classnames("card-body   border-1-bg  ", styles.flexBetween)}>
                <div className={classnames("", styles.flexBetween)}>
                  <Image src="/ch.jpeg" alt="Description" width={60} height={60} />
                  <div className="time ms-3" style={{ textAlign: 'center' }}>

                    <h5 className=''>{v.level_id} - {v.level_count}<br /></h5>

                  </div>

                </div>
                <div className={classnames("countGroup", styles.flexBetween)}>
                  <div style={{ display: 'flex' }}>
                    <h5> <span className='text-color'> +{v.get_point}點</span></h5>

                  </div>
                  <div>
                  </div>
                </div>


              </div>
              )
            }) } 
           
          </div>

        </div>
      </div>
      <Pagination />
    </div>
  )
}
