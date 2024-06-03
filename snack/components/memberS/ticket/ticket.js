import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import Point from '../others/point';
import Image from 'next/image';
import Link from 'next/link';
import styles from "@/styles/form.module.css";
import ticketStyle from '@/styles/ticket.module.css';
import { useIcon } from '@/data/context/ImgContext';
import { ticket01Select01, ticket01Select02, ticket01Select03, remainTicket } from "@/api/ticket";

export default function Ticket() {
  const { previewUrl } = useIcon(); 
  const [tab, settab] = useState(1);
  const router = useRouter(); 
  const [data1, setdata1] = useState([]);
  const [data2, setdata2] = useState([]);
  const [data3, setdata3] = useState([]);
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const [point, setPoint] = useState([]);
  const [pointMsg, setPointMsg] = useState([]);

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

        setPoint(data.data + "點");
        setPointMsg("目前點數:");
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      try { 
        const custom_id = JSON.parse(localStorage.getItem("Nightmarket-auth")).custom_id;

        const result1 = await ticket01Select01({ custom_id });
        setdata1(result1.success ? result1.data : []);

        const result2 = await ticket01Select02({ custom_id });
        setdata2(result2.success ? result2.data : []);

        const result3 = await ticket01Select03({ custom_id });
        setdata3(result3.success ? result3.data : []);
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    })();
  }, []);

  const renderTickets = (data) => {
    return data.map((v, i) => (
      <div key={i} className={classnames("card-body border-1-bg", ticketStyle["wrap"], styles.flexBetween)}>
        <div className={classnames(ticketStyle["postion-a1"])}>
          <Image src={previewUrl} alt="Description" width={80} height={80} />
        </div>
        <div className={classnames(styles.flexBetween, ticketStyle["postion-a2"])}>
          <h5 className="time" style={{ textAlign: 'center' }}>
            {v.play_date || v.payment_date} <br />
            {v.get_point ? '遊戲點數' : '商品折價'}
          </h5>
        </div>
        <div className={classnames("countGroup", styles.flexBetween, ticketStyle["postion-a3"])}>
          <div style={{ margin: "auto" }}>
            {v.get_point && `+${v.get_point}點`}
            {v.consume_gamepoint && `-${v.consume_gamepoint}點`}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className={classnames(ticketStyle["ticket"])}>
      <Point pointTitle={point} pointMsg={pointMsg} />
      <ul className={classnames("nav nav-tabs d-flex flex-grow-1 px-5")}>
        <li className="nav-item flex-grow-1">
          <Link onClick={(e) => { e.preventDefault(); settab(1); }} aria-current="page" href="/memberSystem/ticket" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles["btn-parmary-white"], { [styles["active"]]: tab === 1 })}>全部紀錄</Link>
        </li>
        <li className="nav-item flex-grow-1">
          <Link onClick={(e) => { e.preventDefault(); settab(2); }} aria-current="page" href="/memberSystem/ticket/?id=2" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles['border-1'], { [styles["active"]]: tab === 2 }, styles["btn-parmary-white"])}>已獲得</Link>
        </li>
        <li className="nav-item flex-grow-1">
          <Link onClick={(e) => { e.preventDefault(); settab(3); }} aria-current="page" href="/memberSystem/ticket/?id=3" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles['border-1'], { [styles["active"]]: tab === 3 }, styles["btn-parmary-white"])}>已使用</Link>
        </li>
      </ul>
      <div className="border1">
        <div className={classnames("itemgroup item1", styles["mb-0"])}>
          <div className="card">
            {tab === 1 && renderTickets(data1)}
            {tab === 2 && renderTickets(data2)}
            {tab === 3 && renderTickets(data3)}
          </div>
        </div>
      </div>
    </div>
  );
}
