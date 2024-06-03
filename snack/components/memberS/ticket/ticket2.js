import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import Point from '../others/point';
import Image from 'next/image';
import Link from 'next/link';
import styles from "@/styles/form.module.css";
import { useIcon } from '@/data/context/ImgContext';
import ticketStyle from '@/styles/ticket.module.css';
import { ticket02Select01, ticket02Select02, remainTicket } from "@/api/ticket2";

export default function Ticket() {
  const { previewUrl } = useIcon(); 
  const [point, setPoint] = useState([]);
  const [pointMsg, setPointMsg] = useState([]);
  const [tab, settab] = useState(1);
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
    (async function () { 
      try {
        const custom_id = JSON.parse(localStorage.getItem("Nightmarket-auth")).custom_id;
        const data = await remainTicket({ custom_id });
        setPoint(`第${data.data}關`);
        setPointMsg("目前進度:");
      } catch (error) { 
        console.log("error:", error);
      }
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const custom_id = JSON.parse(localStorage.getItem("Nightmarket-auth")).custom_id;
      let result;
      if (tab === 2) {
        result = await ticket02Select02({ custom_id });
      } else {
        result = await ticket02Select01({ custom_id });
      }

      if (result.success) {
        setdata(result.data);
      } else {
        setdata([]);
      }
    };

    fetchData();
  }, [router, tab]);

  return (
    <div className={classnames(ticketStyle["ticket"])}>
      <Point pointTitle={point} pointMsg={pointMsg} />
      <ul className={classnames("nav nav-tabs d-flex flex-grow-1 px-5")}>
        <li className="nav-item flex-grow-1">
          <Link onClick={(e) => { e.preventDefault(); settab(1) }} href="/memberSystem/ticket" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles["btn-parmary-white"], { [styles["active"]]: tab === 1 })}>通關紀錄</Link>
        </li>
        <li className="nav-item flex-grow-1">
          <Link onClick={(e) => { e.preventDefault(); settab(2) }} href="/memberSystem/ticket/?id=2" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles['border-1'], { [styles["active"]]: tab === 2 }, styles["btn-parmary-white"])}>成就紀錄</Link>
        </li>
      </ul>
      <div className="border1">
        <div className={classnames("itemgroup item1", styles["mb-0"])}>
          <div className="card">
            {tab === 1 && data.map((v, i) => (
              <div key={i} className={classnames("card-body time-wrap border-1-bg", styles.flexBetween)}>
                <Image src={previewUrl} alt="Description" width={80} height={80} />
                <div className='p16'>
                  <h5>{v.level_id}&nbsp;{v.level_count}</h5>
                  <h5>{v.play_date}</h5>
                </div>
              </div>
            ))}
            {tab === 2 && data.map((v, i) => (
              <div key={i} className={classnames("card-body time-wrap border-1-bg", styles.flexBetween)}>
                <Image src={previewUrl} alt="Description" width={80} height={80} />
                <div className='p16'>
                  <h5>{v.level_id} - {v.level_count}</h5>
                  <h5><span className='text-color'> + {v.get_point}點</span></h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
