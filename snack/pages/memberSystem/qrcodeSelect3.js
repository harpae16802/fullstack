

import SelectMenu from "@/components/memberS/person/selectMenu";
import QrcodeRecord from "@/components/memberS/qrcode/qrcodeRecord3"
import StepComputer from "@/components/memberS/qrcode/step/stepComputer";
import Search from "@/components/memberS/qrcode/searchbar"
import qrcodeStyle from "@/styles/qrcode.module.css" 
import styles from "@/styles/form.module.css"
import Pagination from "@/components/memberS/others/pagination"
import QrcodeCurrent from "@/components/modal/qrcodeCurrent";
import { useState, useEffect } from "react";
import classNames from 'classnames'
import Image from "next/image";
import Section from "@/components/layout/section";
import { useRouter } from "next/router"; 
export default function QrcodeselectMobile2() {
  const router = useRouter();

  const pages = (url) => {
    router.push(`/memberSystem/${url}`); 
  }
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
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

            <StepComputer stepLevel="3" />
            <div className=" mt-2 d-flex justify-content-center">

              <Image src="/images.png" alt="Description" width={250} height={250} />
            </div>


            <h4 className='creditTitle credit   text-smtitle' style={{ border: 0 }}>我的商品</h4>
            <div className={classNames(styles['border-1'], "px-4 py-3 mt-4", styles["rd-2"])}>
              <QrcodeRecord />  
            </div> 
          

          </div>
          <div className="d-flex justify-content-center align-items-center">
            
          { /* <QrcodeCurrent />*/}

          <button type="button" onClick={() => pages("qrcodeSelect3")} className={classNames("btn btn-outline-primary",qrcodeStyle["qrcodeRecord"])}>
            上一步
          </button>

          <button type="button" onClick={() => pages("qrcodeSelect4")} className={classNames("btn btn-outline-primary",qrcodeStyle["qrcodeRecord"])}>
            下一步
          </button>
       </div>
        </div>
      </div>

    </div>
    </Section>
  );
}


