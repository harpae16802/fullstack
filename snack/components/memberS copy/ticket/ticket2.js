import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Point from '../others/point';
import Image from 'next/image';
import Link from 'next/link';
import styles from "@/styles/form.module.css";
import Pagination from '@/components/memberS/others/pagination';
import { useRouter } from 'next/router';
import { ticket02Select01, ticket02Select02 } from "@/api/ticket2";

export default function Ticket() {
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
    const fetchData = async () => {
      let result;
      if (router.query.id == 2) {
        result = await ticket02Select02();
        settab(2);
      } else {
        result = await ticket02Select01();
        settab(1);
      }

      if (result.success) {
        setdata(result.data);
      } else {
        setdata([]);
      }
    };

    fetchData();
  }, [router.query.id]);

  return (
    <div className='ticket'>
      <Point />
      <ul className={classnames("nav nav-tabs d-flex flex-grow-1 px-5")}>
        <li className="nav-item flex-grow-1">
          <Link aria-current="page" href="/memberSystem/ticket2" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles["btn-parmary-white"], `${tab == 1 && styles["active"]}`)}>通關紀錄</Link>
        </li>
        <li className="nav-item flex-grow-1">
          <Link aria-current="page" href="/memberSystem/ticket2?id=2" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles["btn-parmary-white"], `${tab == 2 && styles["active"]}`)}>成就紀錄</Link>
        </li>
      </ul>
      <div className="border1">
        <div className={classnames("itemgroup item1", styles["mb-0"])}>
          <div className="card">
            {tab == 1 && data.map((v, i) => (
              <div key={i} className={classnames("card-body border-1-bg", styles.flexBetween)}>
                <Image src="/ch.jpeg" alt="Description" width={150} height={150} />
                <div className="ms-3" style={{ textAlign: 'center' }}>
                  <h5>{v.level_id} <br /> {v.play_date}</h5>
                </div>
                <div className={classnames("countGroup", styles.flexBetween)}>
                  <div style={{ display: 'flex' }}>
                    <h5>{v.level_count} <span className='text-color'>{v.clear_score}分</span></h5>
                  </div>
                </div>
              </div>
            ))}
            {tab == 2 && data.map((v, i) => (
              <div key={i} className={classnames("card-body border-1-bg", styles.flexBetween)}>
                <Image src="/ch.jpeg" alt="Description" width={60} height={60} />
                <div className="ms-3" style={{ textAlign: 'center' }}>
                  <h5>{v.level_id} - {v.level_count}<br /></h5>
                </div>
                <div className={classnames("countGroup", styles.flexBetween)}>
                  <div style={{ display: 'flex' }}>
                    <h5><span className='text-color'>+{v.get_point}點</span></h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pagination />
    </div>
  );
}
