import React, { useEffect, useState } from 'react'
import styles from "@/styles/form.module.css"
import color from"../color.module.css";
import Image from 'next/image'
import classNames from 'classnames'
import { FaHome } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import qrcodeStyles from "@/styles/qrcode.module.css";
import { myProduct2 } from '@/api/qrcodeApi';
import { useQrcode } from '@/data/context/QrcodeContext';
import { useRouter } from 'next/router';

export default function CreditComponts() {
  const router = useRouter();
  const { orderId, setOrderId, QRcodeData, setQRcodeData, QRcodeDataCreate, setQRcodeDataCreate, title, setitle } = useQrcode();
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const [data, setdata] = useState([]);

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
  }, [])

  async function setStoredQRdata(searchaString = "") {
    try {
      const storedQRcodeDataCreate = sessionStorage.getItem("QRcodeDataCreate");
      if (!storedQRcodeDataCreate || JSON.parse(storedQRcodeDataCreate).length <= 0) {
        let result = [];
        if (searchaString) {
          result = await myProduct2({ order_id: orderId }, searchaString);
        } else {
          result = await myProduct2({ order_id: orderId });
        }
        if (result.success) {
          const newData = result.data.map(v => ({ ...v, isinput: false, isvalue: 0 }));
          setitle(newData[0]);
          setdata(newData);
          setQRcodeDataCreate(newData);
          sessionStorage.setItem('QRcodeDataCreate', JSON.stringify(newData));
          sessionStorage.setItem('QRcodeData', JSON.stringify(newData));
          sessionStorage.setItem('title', JSON.stringify(newData[0]));
        } else {
          setQRcodeDataCreate([]);
          setitle({});
          setdata([]);
        }
      } else {
        const storedData = JSON.parse(storedQRcodeDataCreate);
        setdata(storedData);
        setQRcodeDataCreate(storedData);
        setitle(JSON.parse(sessionStorage.getItem('title')));
      }
    } catch (error) {
      console.error("Error in setStoredQRdata:", error);
    }
  }

  useEffect(() => {
    setStoredQRdata();
  }, [])

  useEffect(() => {
    setStoredQRdata();
  }, [orderId])

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const searcha = params.get('search') || "";
    const searchaString = decodeURIComponent(searcha);
    setStoredQRdata(searchaString)
  }, [router]);

  const setbtn = (i) => {
    const newData = [...data];
    newData[i].isinput = !newData[i].isinput;
    newData[i].isvalue = newData[i].isinput ? 1 : 0;
    setdata(newData);
  }

  const setValue = (v, i, v2) => {
    const newData = [...data];
    newData[i].isvalue = v2;
    setdata(newData);
    setQRcodeData([{ order_id: v.order_id }]);
    setQRcodeDataCreate(newData);
  }

  return (
    <div className={classNames('form', styles["navbar-top"])}>
      <div className={classNames("d-flex border-0 justify-content-between align-items-center", styles["navbar-top"], styles["mb-0"], styles["border-1"])} data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">
        <div className={classNames("d-flex border-0 qrcodeProduct", styles["mx-full"], styles["btn-parmary-transparent"])} type="button" data-toggle="collapse">
          <div className='d-flex align-content-end pe-1 w80 sm-w80'>
            <FaHome className={classNames("fahome", styles["text-color"])} />
            <h3 className='sm-h3'> {title?.seller_name}</h3>
          </div>
          <div className='w-auto d-flex justify-content-end text-end'>
            <button className={classNames(styles['border-1'], "px-3 ms-1", qrcodeStyles["choosebtn"], qrcodeStyles["smbtn"])}>已選擇</button>
            <IoIosArrowDown className="align-self-center" />
          </div>
        </div>
      </div>
      <div className={classNames("collapse")} id="collapseExample1">
        {data.length > 0 ? data.map((v, i) => (
          <div className="creditItem number countGroup" key={i}>
            <div className={classNames("itemgroup item1", styles["mb-0"])}>
              <div className={classNames(styles['border-1-grey'], qrcodeStyles["wrapr2"], "mx-0 px-3 py-3", styles.flexBetween)}>
                <div className={classNames("md-content", qrcodeStyles["postion-a1"])}>
                  <Image src={v.image_url} alt="Description" width={90} height={90} />
                </div>
                <div className={classNames(qrcodeStyles["postion-a6"])}>
                  <input className="form-check-input" type="checkbox" onChange={() => setbtn(i)} defaultChecked={v.isinput} id="flexCheck" />
                </div>
                <div className={classNames(qrcodeStyles["postion-a2"])}>
                  <small>{v.payment_date}</small>
                  <h6 className={classNames(styles['btn-parmary-transparent'])}>{v.product_name}</h6>
                </div>
                <div className={classNames("dropdown number countGroup", qrcodeStyles["postion-a3"], `${v.isinput ? "pointerEvents-show" : "pointerEvents-none"}`)}>
                  <a className={classNames(qrcodeStyles.btna, "btn progressParmary-second dropdown-toggle")} href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    {v.isvalue}
                  </a>
                  <ul className="dropdown-menu fixed-height" style={{ width: '80px' }} aria-labelledby="dropdownMenuLink">
                    {Array(v.purchase_quantity).fill(1).map((v2, i2) => (
                      <li key={i2} onClick={() => setValue(v, i, i2 + 1)} className="text-center">
                        {i2 + 1}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )) : <div>暫無資料</div>}
      </div>
    </div>
  )
}
