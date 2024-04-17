import React, { useEffect, useState } from 'react'
import Ticket from "@/components/memberS/ticket/ticket2"
import TicketMobile from "@/components/memberS/ticket/mobile/ticket2"
import SelectMenu from "@/components/memberS/person/selectMenu";
import classNames from 'classnames' 
import styles from"@/styles/form.module.css";

export default function ticket() { 
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  useEffect(()=>{
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
  
  },[])
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-xl-3 ">
            <SelectMenu />
          </div>
          <div className="col-12 col-xl-9">
          <div className={classNames("", styles["main-O-baground"])}> 
          <h4 className="text-title">[我的遊戲紀錄]</h4>
            {isBigScreen &&  <Ticket />}
          {isTabletOrMobile &&   <TicketMobile />}  
          </div>
          </div>
        </div>

      </div>
    </>
  )
}
