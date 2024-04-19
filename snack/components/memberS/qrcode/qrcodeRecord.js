import React, { useEffect, useState } from 'react'
import styles from "@/styles/form.module.css"
import Image from 'next/image'
import classNames from 'classnames'
import { FaHome } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import qrcodeStyles from "@/styles/qrcode.module.css";
import { myProduct,myProduct2 } from '@/api/qrcodeApi';
 
export default function CreditComponts() {
  const [data, setdata] = useState([]);
  const [select, setselect] = useState(0);
  useEffect(() => {
    (async function () {
      const result = await myProduct();  
      if (result.success) {
        setdata(result.data); 
      } else {
        setdata([]);
      }
    })();
  }, []);

  return (
    <>
    <div className={classNames(qrcodeStyles["navbar-top"],'form') }>
      <div className={classNames("d-flex border-0 justify-content-between align-items-center ", styles["border-1"])} data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">
        <div
          className={classNames("d-flex  border-0 qrcodeProduct", styles["mx-full"], styles["btn-parmary-transparent"])} type="button" data-toggle="collapse">
          <div className='d-flex align-content-end pe-1 w80  sm-w80' >
            <FaHome className={classNames("fahome  ", styles["text-color"])} />
            <h3 className='sm-h3'> 士林夜市&nbsp;&nbsp;豪大雞排 </h3>
          </div>
          <div className='w-auto d-flex justify-content-end   text-end'>
            <button className={classNames(styles['border-1'], "px-3 ms-1 choosebtn  ",qrcodeStyles["smbtn"])}  >已選擇</button>
            <IoIosArrowDown className="align-self-center"   />
         
            </div>
        </div> 
      </div>
      {/* 這裡是內容*/}
      <div className={classNames("collapse")} id="collapseExample1">
     
        {data.map((v, i) => {
          return (
            <div className="creditItem" key={i} >
              <div className={classNames("itemgroup item1", styles["mb-0"])}>
                {/* flexBetween */}
                <div className={classNames(styles['border-1-grey'], qrcodeStyles["wrap"], "mx-0 px-3 py-3", styles.flexBetween)}>
                  <div className={classNames(qrcodeStyles["postion-a1"],"text-center")}>
                    <Image src="/ch.jpeg" alt="Description" width={90} height={90} />
                  </div>
                  <div className={classNames(qrcodeStyles["postion-a2"])}>
                    <h6 className={classNames(styles['btn-parmary-transparent'])}>{v.product_name}</h6>
                  </div> <div>
                  </div>
                  <div className={classNames("countGroup", styles.flexBetween, qrcodeStyles["postion-a3"])}>
                    <small>{v.payment_date}</small>
                  </div>
                  <div className={classNames(qrcodeStyles["postion-a4"])}>
                    <span className={classNames(styles["btn-parmary-transparent"])}>購買數量&nbsp;|&nbsp;{v.purchase_quantity} <br /></span>
                    <span className={classNames(styles["btn-parmary-red"])}>剩餘數量&nbsp;|&nbsp;{v.totalcount}<br /></span>
                  </div>  
                </div>
              </div>
            </div>
          )
        })
        }

      </div>
    </div>
    </>
  )
}
