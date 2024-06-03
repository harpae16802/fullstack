import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { useRouter } from 'next/router';
import Point from '../others/point'
import Image from 'next/image'
import Link from 'next/link'
import styles from "@/styles/form.module.css"
import ticketStyle from '@/styles/ticket.module.css';
import Pagination from '@/components/memberS/others/pagination'
import { ticket02Select01, ticket02Select02 } from "@/api/ticket2"

export default function Ticket() {
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

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let result;
      if (tab === 2) {
        result = await ticket02Select02();
      } else {
        result = await ticket02Select01();
      }

      if (result.success) {
        setdata(result.data);
      } else {
        setdata([]);
      }
    };

    fetchData();
  }, [router, tab]);

  const renderTabContent = () => {
    return data.map((v, i) => (
      <div key={i} className={classnames("card-body border-1-bg", styles.flexBetween)}>
        <div className={classnames("", styles.flexBetween)}>
          <Image src="/ch.jpeg" alt="Description" width={tab === 2 ? 60 : 150} height={tab === 2 ? 60 : 150} />
          <div className="time ms-3" style={{ textAlign: 'center' }}>
            <h5>{v.level_id} {tab === 2 ? ` - ${v.level_count}` : ''} <br /> {v.play_date}</h5>
          </div>
        </div>
        <div className={classnames("countGroup", styles.flexBetween)}>
          <div style={{ display: 'flex' }}>
            <h5>
              {tab === 2 ? <span className='text-color'> +{v.get_point}點</span> : `${v.level_count} ${v.clear_score}分`}
            </h5>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className={classnames(ticketStyle["ticket"])}>
      <Point />
      <ul className={classnames("nav nav-tabs d-flex flex-grow-1 px-5")}>
        <li className="nav-item flex-grow-1">
          <Link onClick={(e) => { e.preventDefault(); settab(1) }} aria-current="page" href="/memberSystem/ticket" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles["btn-parmary-white"], { [styles["active"]]: tab === 1 })}>通關紀錄</Link>
        </li>
        <li className="nav-item flex-grow-1">
          <Link onClick={(e) => { e.preventDefault(); settab(2) }} aria-current="page" href="/memberSystem/ticket/?id=2" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles['border-1'], { [styles["active"]]: tab === 2 }, styles["btn-parmary-white"])}>成就紀錄</Link>
        </li>
      </ul>
      <div className="border1">
        <div className={classnames("itemgroup item1", styles["mb-0"])}>
          <div className="card">
            {renderTabContent()}
          </div>
        </div>
      </div>
      <Pagination />
    </div>
  )
}
