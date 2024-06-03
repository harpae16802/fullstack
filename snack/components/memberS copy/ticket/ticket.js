import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import Point from '../others/point';
import Image from 'next/image';
import Link from 'next/link';
import styles from "@/styles/form.module.css";
import Pagination from '@/components/memberS/others/pagination';
import { ticket01Select01, ticket01Select02, ticket01Select03 } from "@/api/ticket";

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
        result = await ticket01Select02();
        settab(2);
      } else if (router.query.id == 3) {
        result = await ticket01Select03();
        settab(3);
      } else {
        result = await ticket01Select01();
        settab(1);
      }

      if (result.success) {
        setdata(result.data);
      } else {
        setdata([]);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className='ticket'>
      <Point />
      <ul className={classnames("nav nav-tabs d-flex flex-grow-1 px-5")}>
        <li className="nav-item flex-grow-1">
          <Link aria-current="page" href="/memberSystem/ticket" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles["btn-parmary-white"], `${tab == 1 && styles["active"]}`)}>全部紀錄</Link>
        </li>
        <li className="nav-item flex-grow-1">
          <Link aria-current="page" href="/memberSystem/ticket/?id=2" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles['border-1'], `${tab == 2 && styles["active"]}`, styles["btn-parmary-white"])}>已獲得</Link>
        </li>
        <li className="nav-item flex-grow-1">
          <Link aria-current="page" href="/memberSystem/ticket/?id=3" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles['border-1'], `${tab == 3 && styles["active"]}`, styles["btn-parmary-white"])}>已使用</Link>
        </li>
      </ul>
      <div className="border1">
        <div className={classnames("itemgroup item1", styles["mb-0"])}>
          <div className="card">
            {/* All Records */}
            {!router.query.id && data.map((v, i) => (
              <div key={i} className={classnames("card-body border-1-bg", styles.flexBetween)}>
                <Image src="/ch.jpeg" alt="Description" width={150} height={150} />
                <div className={classnames(styles.flexBetween)}>
                  <h5 className="time" style={{ textAlign: 'center' }}>
                    {v.payment_date} <br />
                    遊戲獎勵
                  </h5>
                </div>
                <div className={classnames("countGroup", styles.flexBetween)}>
                  <div style={{ display: 'flex' }}>
                    {v.get_point && <>{`+${v.get_point}`}<h5>點</h5></>}
                    {v.consume_gamepoint && <>{`-${v.consume_gamepoint}`}<h5>點</h5></>}
                  </div>
                </div>
              </div>
            ))}

            {/* Received Records */}
            {router.query.id == 2 && data.map((v, i) => (
              <div key={i} className={classnames("card-body border-1-bg", styles.flexBetween)}>
                <Image src="/ch.jpeg" alt="Description" width={60} height={60} />
                <div className={classnames(styles.flexBetween)}>
                  <h5 style={{ textAlign: 'center' }}>
                    {v.play_date} <br />
                    遊戲獎勵
                  </h5>
                </div>
                <div className={classnames("countGroup", styles.flexBetween)}>
                  <div style={{ display: 'flex' }}>
                    {v.get_point && <>{`+${v.get_point}`}<h5>點</h5></>}
                    {v.consume_gamepoint && <>{`-${v.consume_gamepoint}`}<h5>點</h5></>}
                  </div>
                </div>
              </div>
            ))}

            {/* Used Records */}
            {router.query.id == 3 && data.map((v, i) => (
              <div key={i} className={classnames("card-body border-1-bg", styles.flexBetween)}>
                <Image src="/ch.jpeg" alt="Description" width={60} height={60} />
                <div className={classnames(styles.flexBetween)}>
                  <h5 className='ms-3'>
                    {v.payment_date} <br />
                    商品折價
                  </h5>
                </div>
                <div className={classnames("countGroup", styles.flexBetween)}>
                  <div style={{ display: 'flex' }}>
                    {v.get_point && <>{`+${v.get_point}`}<h5>點</h5></>}
                    {v.consume_gamepoint && <>{`-${v.consume_gamepoint}`}<h5>點</h5></>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pagination />
    </div>
  )
}
