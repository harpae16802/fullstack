
import styles from "@/styles/form.module.css"
import Image from 'next/image'
import classNames from 'classnames'
import { FaHome } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import qrcodeStyles from "@/styles/qrcode.module.css";
import React, { useEffect, useState } from 'react'
import { myProduct, myProduct2 } from '@/api/qrcodeApi';
// 我是第二夜
export default function creditComponts() {

  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const [data, setdata] = useState([]);
  const [fadata, setfadata] = useState(0);


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
  useEffect(() => {
    (async function () {
      const result = await myProduct2();
      if (result.success) {
        result.data = result.data.map((v, i) => {
          return { ...v, isinput: false, isvalue: 0 }
        })
        setdata(result.data);
      } else {
        setdata([]);
      }
    })();
  }, []);
  const setbtn = (i) => {
    const newData = [...data]; // 先複製一份原有的狀態
    newData[i].isinput = !newData[i].isinput; // 更新需要修改的值  
    setdata(newData);
  }
  const setValue = (i,v2) => {
    const newData = [...data]; // 先複製一份原有的狀態
    newData[i].isvalue = v2; // 更新需要修改的值  
    setdata(newData); 
  }

  return (
    <div className={classNames('form', styles["navbar-top"])} >
      <div className={classNames("d-flex   border-0 justify-content-between align-items-center ", styles["navbar-top"], styles["mb-0"], styles["border-1"])} data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">
        <div
          className={classNames("d-flex border-0 qrcodeProduct", styles["mx-full"], styles["btn-parmary-transparent"])} type="button" data-toggle="collapse">
          <div className='d-flex align-content-end pe-1 w80  sm-w80' >
            <FaHome className={classNames("fahome  ", styles["text-color"])} />
            <h3 className='sm-h3'> 士林夜市&nbsp;&nbsp;豪大雞排 </h3>
          </div>
          <div className='w-auto d-flex justify-content-end   text-end'>
            <button className={classNames(styles['border-1'], "px-3 ms-1 choosebtn  ", qrcodeStyles["smbtn"])}  >已選擇</button>
            <IoIosArrowDown className="align-self-center" />

          </div>
        </div>
      </div>
      {/* 這裡是內容*/}
      <div className={classNames("collapse")} id="collapseExample1">

        {data.map((v, i) => {
          return (
            <div className="creditItem number countGroup" key={i} >
              <div className={classNames("itemgroup item1", styles["mb-0"])} >
                {/* flexBetween */}
                <div className={classNames(styles['border-1-grey'], qrcodeStyles["wrap2"], "mx-0 px-3 py-3", styles.flexBetween)}>
                  <div className={classNames("md-content", qrcodeStyles["postion-a1"])}>
                    <Image src="/ch.jpeg" alt="Description" width={90} height={90} />
                  </div>
                  <div className={classNames(qrcodeStyles["postion-a6"])}>
                    <input class="form-check-input"
                      type="checkbox"
                      onChange={() => setbtn(i)}
                      defaultChecked={v.isinput}
                      id="flexCheck" />
                  </div>
                  <div className={classNames(qrcodeStyles["postion-a2"])}>
                    <small>2024/03/01</small>
                    <h6 className={classNames(styles['btn-parmary-transparent'])}>{v.product_name}</h6>
                  </div>
                  <div className={classNames("dropdown number countGroup", qrcodeStyles["postion-a3"], `${v.isinput ? "pointerEvents-show" : "pointerEvents-none"}`)}>
                    <a class="btn progressParmary-second dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                      {v.isvalue}
                    </a>
             

                    <ul class="dropdown-menu fixed-height" style={{ width: '80px' }} aria-labelledby="dropdownMenuLink">
                    {v.rowCountarr.map((v2, i2) => {
                      return (
                        <li key={v2} onClick={()=>{setValue(i,v2)}} className="text-center">
                          {v2}
                        </li>
                      );
                    })}
                    </ul>
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
