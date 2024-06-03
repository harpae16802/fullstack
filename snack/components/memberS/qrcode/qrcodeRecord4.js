import React, { useEffect, useState } from 'react'
import styles from "@/styles/form.module.css"
import Image from 'next/image'
import classNames from 'classnames'
import { FaHome } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import qrcodeStyles from "@/styles/qrcode.module.css";
import { useQrcode } from '@/data/context/QrcodeContext'
import { myProduct2 } from '@/api/qrcodeApi';
import { useRouter } from 'next/router';

export default function CreditComponents() {
  const router = useRouter();
  const { orderId, setOrderId, QRcodeData, setQRcodeData, QRcodeDataCreate, setQRcodeDataCreate } = useQrcode();
  const [numberbtn, setnumberbtn] = useState(1);
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const [storedQRcodeDataCreate, setStoredQRcodeDataCreate] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsBigScreen(window.innerWidth > 1200);
      setIsTabletOrMobile(window.innerWidth <= 1200);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderId = sessionStorage.getItem("orderId");
        const result = await myProduct2({ order_id: orderId });
        if (result.success) {
          const data2 = result.data;
          setTitle(JSON.parse(sessionStorage.getItem("QRcodeDataCreate"))[0]?.seller_name || "");
          setStoredQRcodeDataCreate(data2);
        } else {
          setStoredQRcodeDataCreate([]);
        }
      } catch (error) {
        console.error("获取订单数据失败:", error);
        setStoredQRcodeDataCreate([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const searcha = params.get('search') || "";
    const searchaString = decodeURIComponent(searcha);

    if (searchaString) {
      const filteredArray = storedQRcodeDataCreate.filter(item => item.product_name.includes(searchaString));
      setStoredQRcodeDataCreate(filteredArray);
    }
  }, [router]);

  return (
    <div className={classNames(styles["navbar-top"], 'form')}>
      <div className={classNames("d-flex border-0", styles["mb-0"], styles["border-1"])} data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">
        <div className={classNames("d-flex justify-content-between align-items-center border-0 qrcodeProduct", styles["mx-full"], styles["btn-parmary-transparent"])} type="button" data-toggle="collapse">
          <div className='d-flex align-content-end pe-1 w75'>
            <FaHome className={classNames("fahome pt-1", styles["text-color"])} />
            <h3 className='sm-h3'>{title}</h3>
          </div>
          <div className='w25 w-auto text-end d-flex justify-content-end'>
            <button className={classNames(styles['border-1'], "px-3 ms-1 choosebtn", qrcodeStyles["smbtn"])}>已選擇</button>
            <IoIosArrowDown className="align-self-center" />
          </div>
        </div>
      </div>
      {/* 這裡是內容*/}
      <div className={classNames("collapse")} id="collapseExample1">
        {storedQRcodeDataCreate.map((v, i) => (
          <div className="creditItem number countGroup" key={i}>
            <div className={classNames("itemgroup item1", styles["mb-0"])}>
              {/* flexBetween */}
              <div className={classNames(styles['border-1-grey'], qrcodeStyles["wrap3"], "mx-0 px-3 py-3", styles.flexBetween)}>
                <div style={{ textAlign: "start" }} className={classNames(qrcodeStyles["postion-a1"])}>
                  <Image src={v.image_url} alt="Description" width={90} height={90} />
                </div>
                <div className={classNames(qrcodeStyles["postion-a2"])}>
                  <small>{v.payment_date}</small>
                  <h6 className={classNames(styles['btn-parmary-transparent'])}>{v.product_name}</h6>
                </div>
                <div className={classNames("md-content", qrcodeStyles["postion-a4"])}>
                  <button type="button" className={classNames("btn mx-2 text-color border-1 ma-0", styles["btn-parmary"])}>
                    <span style={{ color: "white" }}>剩餘數量: {v.remain_count}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
