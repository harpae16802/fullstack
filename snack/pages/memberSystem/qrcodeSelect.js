

import SelectMenu from "@/components/memberS/person/selectMenu";
import QrcodeRecord from "@/components/memberS/qrcode/qrcodeRecord"
import StepComputer from "@/components/memberS/qrcode/step/stepComputer";
import Pagination from "@/components/memberS/others/pagination"
import QrcodeCurrent from "@/components/modal/qrcodeCurrent";
import classNames from 'classnames'
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import styles from "@/styles/form.module.css";


export default function QrcodeselectMobile1() {
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);

  return (
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
                  <input type="text" style={{ height: "40px", width: "100%", textIndent: "30px", borderRadius: "20px", padding: " 0 100px 0  20px" }} className="form-control" id="inputPassword2" placeholder="搜尋關鍵字" />
                  <button type="submit"
                    className={classNames("btn submit", styles["btn-parmary"])}
                  >搜尋</button> 
                </div> 
              </form>  
            </div> 
            <h4 className='creditTitle credit   text-smtitle'>我的商品</h4>
            <div className={classNames(styles['border-1'], styles["rd-2"])}>
              <QrcodeRecord />
            </div>
            <Pagination />
            <div className="">
              <QrcodeCurrent />
              <button type="submit" className={classNames("btn", styles["btn-parmary"], styles["rd-30"])}>上一步 </button>
              <button type="submit" className={classNames("btn", styles["btn-parmary"], styles["rd-30"])}>下一步 </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}


