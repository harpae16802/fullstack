

import SelectMenu from "@/components/memberS/person/selectMenu";
import QrcodeRecord from "@/components/memberS/qrcode/qrcodeRecord"
import color from "./color.module.css";
import StepComputer from "@/components/memberS/qrcode/step/stepComputer";
import Pagination from "@/components/memberS/others/pagination"
import QrcodeCurrent from "@/components/modal/qrcodeCurrent";
import Section from "@/components/layout/section";
import classNames from 'classnames'
import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { myProduct, myProduct2 } from '@/api/qrcodeApi'
import styles from "@/styles/form.module.css";
import qrcodeStyle from "@/styles/qrcode.module.css"
import { useRouter } from "next/router";
import AuthContent from "@/data/context/Authcontnet";

export default function QrcodeselectMobile1() {
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const router = useRouter();
  const [data, setdata] = useState([]);
  const myRef = useRef(null);
  // 如果滿足條件，則導航到 /other-page 路由
  // useEffect(() => {
  //   (async function () {
  //     const result = await myProduct();
  //     if (result?.success) {
  //       const data2 = result.data;
  //       setdata(data2);
  //     } else {
  //       setdata([]);
  //     }
  //   })();


  // }, []);
  const handleString = (e) => {
    e.preventDefault();

    const node = myRef.current.value;
    const queryString = '/memberSystem/qrcodeSelect/?search=' + node;

    // 使用 push 方法将带有查询字符串的 URL 添加到路由中
    router.push(`${queryString}`);
  };

  const pages = (url) => {
    router.push(`/memberSystem/${url}`);
  }
  return (

    <Section>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 ">
            <SelectMenu />
          </div>

          <div className="col-12 col-md-8">
            <div className={classNames("", styles["main-O-baground"])}>
              <h4 className="text-title">[Qrcode兌換]</h4>
              <StepComputer stepLevel="1" />
              <div className={classNames(styles['border-1'], styles["rd-2"], "mt-4 px-4 pt-4 pb-3")}>
                <form className="d-flex">
                  <div className="d-flex justify-content-center searchbar align-items-center">
                    <FaSearch className="fasearch" />
                    <label htmlFor="inputPassword2" className="visually-hidden">Password</label>
                    <input ref={myRef} type="text" style={{ height: "40px", width: "100%", textIndent: "30px", borderRadius: "20px", padding: " 0 100px 0  20px" }} className="form-control" id="inputPassword2" placeholder="搜尋商家名稱" />
                    <button type="submit"
                    
                      onClick={(e) => handleString(e)}
                      className={classNames("btn submit",color["color"], styles["btn-parmary"])}
                    >搜尋</button>
                  </div>
                </form>
              </div>
              <h4 className='creditTitle credit   text-smtitle'>我的商品</h4>
              <div className={classNames(styles['border-1'], styles["rd-2"])}>
                <QrcodeRecord />
              </div>


            </div>
            <div className=" d-flex justify-content-center">
              { /* <QrcodeCurrent />*/}

              <button type="button" onClick={
                () => {
                  const order_id = sessionStorage.getItem("orderId");
                  if (order_id) {
                    try {
                      const parsedOrderId = JSON.parse(order_id);
                      console.log(parsedOrderId)
                      // 現在可以使用解析後的值做任何操作
                      pages("qrcodeSelect2");
                    } catch (error) {
                      console.error("解析 sessionStorage 中的資料時出錯：", error);
                      // 在這裡處理解析錯誤，比如顯示錯誤訊息給用戶
                    }
                  }
                }}
                className={classNames("btn btn-outline-primary", qrcodeStyle["qrcodeRecord"])}>
                下一步
              </button>
            </div>
          </div>
        </div>

      </div>
    </Section>

  );
}


