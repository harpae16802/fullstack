import React, { useEffect, useState } from 'react'
import styles from "@/styles/form.module.css"
import Image from 'next/image'
import classNames from 'classnames'
import { FaHome } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import qrcodeStyles from "@/styles/qrcode.module.css";
import { useQrcode } from '@/data/context/QrcodeContext';

export default function CreditComponts() {
  const { setQRcodeDataOrder } = useQrcode();
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const [t1, setT1] = useState({});
  const [QrcodeOrder, setQrcodeOrder] = useState([]);

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
    // 初始化賦值，查詢特定訂單資訊
    const storedQRcodeDataCreate = sessionStorage.getItem("QrcodeOrder");
    if (storedQRcodeDataCreate) {
      const parsedData = JSON.parse(storedQRcodeDataCreate);
      setQRcodeDataOrder(parsedData);
      setQrcodeOrder(parsedData);
      setT1(parsedData[0]);
    }
  }, [setQRcodeDataOrder]);

  return (
    <div className={classNames('form', styles["navbar-top"])}>
      <div className={classNames("d-flex border-0 justify-content-between align-items-center", styles["navbar-top"], styles["border-1"])} data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">
        <div className={classNames("d-flex border-0 qrcodeProduct", styles["mx-full"], styles["btn-parmary-transparent"])} type="button" data-toggle="collapse">
          <div className='d-flex align-content-end pe-1 w80 sm-w80'>
            <FaHome className={classNames("fahome pt-1 smt-1", styles["text-color"])} />
            <h3 className='sm-h3'>{t1?.seller_name}</h3>
          </div>
          <div className='w-auto d-flex justify-content-end text-end'>
            <button className={classNames(styles['border-1'], "px-3 ms-1 choosebtn", qrcodeStyles["smbtn"])}>已選擇</button>
            <IoIosArrowDown className="align-self-center" />
          </div>
        </div>
      </div>
      {/* 這裡是內容 */}
      <div className={classNames("collapse")} id="collapseExample1">
        {QrcodeOrder.length > 0 ? QrcodeOrder.map((v, i) => (
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
                  兌換 : {v.isvalue}
                </div>
              </div>
            </div>
          </div>
        )) : <div>暫無資料</div>}
      </div>
    </div>
  )
}
