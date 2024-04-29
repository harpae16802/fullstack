
import styles from "@/styles/form.module.css"
import Image from 'next/image'
import classNames from 'classnames'
import { FaHome } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import qrcodeStyles from "@/styles/qrcode.module.css";
import { useQrcode } from '@/data/context/QrcodeContext';
import React, { useEffect, useState } from 'react'
import { myProduct, myProduct2, recordSearch } from '@/api/qrcodeApi';
import { useRouter } from 'next/router';
// 我是第二夜
export default function creditComponts() {
  const router = useRouter();
  // choosedata
  const [choosedata, setChoosedata] = useState({});
  const { orderId, setOrderId, QRcodeData, setQRcodeData, QRcodeDataCreate, setQRcodeDataCreate, title, setitle } = useQrcode();
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  // 顯示葉面值
  const [data, setdata] = useState([]);
  // 標頭  
  // 設定新的值給各個介面 
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
        console.log(result)
        if (result.success) {
          result.data = result.data.map((v, i) => {
            return { ...v, isinput: false, isvalue: 0 }
          })
          // 給予最上層名字
          // 第一次內容賦予
          setitle(result.data[0]);
          setdata(result.data);
          setQRcodeDataCreate(result.data);

          // 第二次以上內容賦予 
          sessionStorage.setItem('QRcodeDataCreate', JSON.stringify(result.data));
          sessionStorage.setItem('QRcodeData', JSON.stringify(result.data));
          sessionStorage.setItem('title', JSON.stringify(result.data[0]));
        } else {
          setQRcodeDataCreate([]);
          setitle({});
          setdata([]);
        }
        ;
      } else {
        // 其解析為 JavaScript 物件或陣列
        setdata(JSON.parse(storedQRcodeDataCreate));
        setQRcodeDataCreate(JSON.parse(storedQRcodeDataCreate));
        setitle(JSON.parse(sessionStorage.getItem('title')));
      }
    } catch (error) {
      console.error("Error in setStoredQRdata:", error);
    }
  }

  useEffect(() => {
    // 初始化賦值
    // 查詢特定訂單資訊  
    setStoredQRdata();
  }, [])
  useEffect(() => {
    // 初始化賦值
    // 查詢特定訂單資訊  
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
    // 判斷true與否 的checkbox
    const newData = [...data]; // 先複製一份原有的狀態
    newData[i].isinput = !newData[i].isinput; // 更新需要修改的值  
    if (newData[i].isinput) {
      newData[i].isvalue = 1; // 更新需要修改的值  
    } else {
      newData[i].isvalue = 0; // 更新需要修改的值  
    }
    setdata(newData);


  }
  // 改變資料的職
  const setValue = (v, i, v2) => {
    const newData = [...data]; // 先複製一份原有的狀態
    console.log(v2)
    newData[i].isvalue = v2; // 更新需要修改的值  
    setdata(newData);
    // 給弘仁的
    setQRcodeData([{ order_id: v.order_id }]);
    // 改變值 
    setQRcodeDataCreate(newData);

  }

  return (
    <div className={classNames('form', styles["navbar-top"])} >
      <div className={classNames("d-flex   border-0 justify-content-between align-items-center ", styles["navbar-top"], styles["mb-0"], styles["border-1"])} data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">
        <div
          className={classNames("d-flex border-0 qrcodeProduct", styles["mx-full"], styles["btn-parmary-transparent"])} type="button" data-toggle="collapse">
          <div className='d-flex align-content-end pe-1 w80  sm-w80' >
            <FaHome className={classNames("fahome  ", styles["text-color"])} />
            <h3 className='sm-h3'> {title.seller_name}</h3>
          </div>
          <div className='w-auto d-flex justify-content-end   text-end'>

            <button className={classNames(styles['border-1'], "px-3 ms-1  ", qrcodeStyles["choosebtn"], qrcodeStyles["smbtn"])}  >已選擇</button>
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
                <div className={classNames(styles['border-1-grey'], qrcodeStyles["wrapr2"], "mx-0 px-3 py-3", styles.flexBetween)}>
                  <div className={classNames("md-content", qrcodeStyles["postion-a1"])}>
                    <Image src="/ch.jpeg" alt="Description" width={90} height={90} />
                  </div>
                  <div className={classNames(qrcodeStyles["postion-a6"])}>
                    <input className="form-check-input"
                      type="checkbox"
                      onChange={() => setbtn(i)}
                      defaultChecked={v.isinput}
                      id="flexCheck" />
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
                      {Array(v.purchase_quantity).fill(1).map((v2, i2) => {
                        return (
                          <li key={i2}
                            onClick={() => {
                              setValue(v, i, i2 + 1);
                            }}
                            className="text-center">
                            {i2 + 1}
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
