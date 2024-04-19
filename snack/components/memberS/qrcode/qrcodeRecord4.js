
import styles from "@/styles/form.module.css"
import Image from 'next/image'
import classNames from 'classnames'
import { FaHome } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import qrcodeStyles from "@/styles/qrcode.module.css";
import React, { useEffect, useState } from 'react'


// 我是第二夜
export default function creditComponts() {
  const [numberbtn, setnumberbtn] = useState(1);
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsBigScreen(window.innerWidth > 1200);
      setIsTabletOrMobile(window.innerWidth <= 1200);
    };

    // 監聽視窗大小變化
    window.addEventListener('resize', handleResize);
    // 初始設置一次
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [])

  return (
    <div className={classNames(styles["navbar-top"],'form') }>
      <div className={classNames("d-flex  border-0 justify-content-between align-items-center ", styles["mb-0"], styles["border-1"])} data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">
        <div className={classNames("d-flex   border-0 qrcodeProduct", styles["mx-full"], styles["btn-parmary-transparent"])} type="button" data-toggle="collapse">
          <div className='d-flex align-content-end pe-1 w75  ' >
            <FaHome className={classNames("fahome pt-1", styles["text-color"])} />
            <h3 className='sm-h3'> 士林夜市&nbsp;&nbsp;豪大雞排 </h3>
          </div>
          <div className='w25 w-auto text-end d-flex justify-content-end'>
            <button className={classNames(styles['border-1'], " mb-1 choosebtn  ", qrcodeStyles["smbtn"])}  >已選擇</button>
            <IoIosArrowDown className=" align-self-center" />
          </div>
        </div>
      </div>
      {/* 這裡是內容*/}
      <div className={classNames("collapse")} id="collapseExample1">
        {Array(3).fill(1).map((v, i) => {
          return (
            <div className="creditItem number countGroup" key={i} >
              <div className={classNames("itemgroup item1", styles["mb-0"])}>
                {/* flexBetween */}
                <div className={classNames(styles['border-1-grey'], qrcodeStyles["wrap3"], "mx-0 px-3 py-3", styles.flexBetween)}>
                  <div style={{ textAlign: "start" }} className={classNames(qrcodeStyles["postion-a1"])}>
                    <Image src="/ch.jpeg" alt="Description" width={90} height={90} />
                  </div>
                  <div className={classNames(qrcodeStyles["postion-a2"])}>
                    <small>2024/03/01</small>
                    <h6 className={classNames(styles['btn-parmary-transparent'])}>海苔雞排</h6>
                  </div>


                  <div className={classNames("md-content", qrcodeStyles["postion-a4"])}>

                    <button type="button" readonly className={classNames("btn  mx-2 text-color border-1 classbtn ma-0", styles["btn-parmary"])}>剩餘數量: 5 </button>

                  </div>

                </div>
              </div>
            </div>
          )
        })
        }

      </div>
    </div>
  )
}
