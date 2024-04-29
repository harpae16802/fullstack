import React, { useEffect, useState } from 'react'
import styles from "@/styles/form.module.css"
import Image from 'next/image'
import classNames from 'classnames'
import { FaHome } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import qrcodeStyles from "@/styles/qrcode.module.css";
import { myProduct, myProduct2, recordSearch } from '@/api/qrcodeApi';
import { useQrcode } from '@/data/context/QrcodeContext';
import { useRouter } from 'next/router';

export default function CreditComponts({ propsData }) {
  const router = useRouter();
  const { orderId, setOrderId } = useQrcode();
  const [data, setdata] = useState([]);
  const [choose, setdatachoose] = useState(-1);
  const [select, setselect] = useState(0);
  useEffect(() => {
    try {
      (async function () {
        sessionStorage.setItem("orderId","");
        let custom_id=0;
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        const searcha = params.get('search') || "";
        const searchaString = decodeURIComponent(searcha); 
        try {
          custom_id = JSON.parse(localStorage.getItem("Nightmarket-auth")).custom_id;
          const result = await myProduct({custom_id:custom_id}, searchaString); 
          if (result.success) {
            console.log(result)
            const data2 = result.data;
            setdata(data2);
          } else {
            setdata([]);
          }
        } catch (error) {
          console.error("获取custom_id失败:", error);
          setdata([]); // 如果获取失败，可以设置data为空数组或其他错误处理逻辑
          return; // 由于关键的custom_id无法获取，此处直接返回
        } 
      })();
    }
    catch (error) {
      console.error("Error in setStoredQRdata:", error);
    }
  }, [router]);
  const chooseHandler = (v) => {
    setdatachoose(v);
    setOrderId(v[0].order_id)
    sessionStorage.setItem('orderId', v[0].order_id);
    sessionStorage.setItem('title', "");
    sessionStorage.setItem('QRcodeDataCreate', []);
    sessionStorage.setItem('QRcodeData', []);
  }
  return (
    <>
      <div className={classNames(qrcodeStyles["navbar-top"], 'form')}>

        {data.map((v, i) => {
          return (
            <>
              <div key={i} className={classNames("d-flex border-1-main-bg     justify-content-between align-items-center ", styles["border-1"])} data-bs-toggle="collapse" data-bs-target={`#collapseExample${i}`} aria-expanded="false" aria-controls={`collapseExample${i}`}>
                <div className={classNames(qrcodeStyles["wrap0-ti"], styles["mx-full"], styles["btn-parmary-transparent"])} type="button" data-toggle="collapse">
                  <div className={classNames(styles["postion-a1"], 'd-flex')} >
                    <FaHome className={classNames("fahome  ", styles["text-color"])} />
                    <h3 className='sm-h3'> {v[0].seller_name} </h3>
                  </div>
                  <div className={classNames(styles["postion-a3"], 'd-flex')}></div>
                  <div className={classNames(styles["postion-a2"], 'd-flex')}>
                    {
                      choose != v && <button className={classNames(styles['border-1'], "px-3 ms-1 choosebtn  ", qrcodeStyles["choosebtn"], qrcodeStyles["smbtn"])} onClick={() => chooseHandler(v)}  >點選</button>
                    }
                    {v == choose && <button className={classNames(styles['border-1'], "px-3 ms-1  ", qrcodeStyles["choosebtn"], qrcodeStyles["smbtn"])}  >已選擇</button>
                    }

                    <IoIosArrowDown className="align-self-center" />

                  </div>
                </div>
              </div>
              {/**/}
              <div key={i} className={classNames("collapse")} id={`collapseExample${i}`}>
                {v.map((m, ia) => (
                  <div className="creditItem" key={ia}>
                    <div className={classNames("itemgroup item1", styles["mb-0"])}>
                      {/* flexBetween */}
                      <div className={classNames(styles['border-1-grey'], qrcodeStyles["wrap0"], "mx-0 px-3 py-3")}>
                        <div className={classNames(qrcodeStyles["postion-a1"], "text-center")}>
                          <Image src="/ch.jpeg" alt="Description" width={90} height={90} />
                        </div>
                        <div className={classNames(qrcodeStyles["postion-a2"])}>
                          <h6 className={classNames(styles['btn-parmary-transparent'])}>{m.product_name}</h6>
                        </div>
                        <div className={classNames("countGroup", styles.flexBetween, qrcodeStyles["postion-a3"])}>
                          <small>{m.payment_date}</small>
                        </div>
                        <div className={classNames(qrcodeStyles["postion-a4"])}>
                          <span className={classNames(styles["btn-parmary-transparent"])}>購買數量&nbsp;|&nbsp;{m.purchase_quantity} <br /></span>
                          <span className={classNames(styles["btn-parmary-red"])}>剩餘數量&nbsp;|&nbsp;{m.remain_count}<br /></span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}
