

import SelectMenu from "@/components/memberS/person/selectMenu";
import QrcodeRecord from "@/components/memberS/qrcode/qrcodeRecord4"
import StepComputer from "@/components/memberS/qrcode/step/stepComputer";
import Search from "@/components/memberS/qrcode/searchbar"
import styles from "@/styles/form.module.css"
import Pagination from "@/components/memberS/others/pagination"
import qrcodeStyle from "@/styles/qrcode.module.css" 
import QrcodeCurrent from "@/components/modal/qrcodeCurrent";
import { useState, useEffect } from "react";
import classNames from 'classnames'
import Section from "@/components/layout/section";
import { useRouter } from "next/router";

export default function QrcodeselectMobile1() {
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsBigScreen(window.innerWidth > 500);
      setIsTabletOrMobile(window.innerWidth <= 500);
    };

    // 監聽視窗大小變化
    window.addEventListener('resize', handleResize);
    // 初始設置一次
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [])
  const pages = (url) => {
    router.push(`/memberSystem/${url}`); 
  }
  return (
    <Section>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 r">
            <SelectMenu />
          </div>

          <div className="col-12 col-md-8">
            <div className={classNames("", styles["main-O-baground"])}>

              <h4 className="text-title">[Qrcode兌換]</h4>

              <StepComputer stepLevel="3" />
              <Search />

              <h4 className='creditTitle credit   text-smtitle' style={{ border: 0 }}>已兌換商品</h4>
              <div className={classNames(styles['border-1'], "px-4 py-3 mt-4", styles["rd-2"])}>
                <QrcodeRecord />
              </div>


            </div> 
            <div className="d-flex justify-content-center align-items-center">
              <QrcodeCurrent />
            
          <button type="button" onClick={() => pages("qrcodeSelect3")} className={classNames("btn btn-outline-primary",qrcodeStyle["qrcodeRecord"])}>
          上一步
        </button>
            </div>
          </div>
        </div>

      </div>
    </Section>
  );
}


