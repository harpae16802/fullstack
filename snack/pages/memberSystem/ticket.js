import React, { useEffect,useState  } from 'react'
import Ticket from "@/components/memberS/ticket/ticket"
import SelectMenu from "@/components/memberS/person/selectMenu"; 
import classNames from 'classnames';
import styles from "@/styles/form.module.css"
import {ticket01Select01} from "@/api/ticket" 
import Section from "@/components/layout/section";

export default function Ticket01() {
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
    <Section>
      <div className="container">
        <div className="row">
          <div className="col-12 col-xl-4">
            <SelectMenu />
          </div>
          <div className="col-12 col-xl-8">
          <div className={classNames("", styles["main-O-baground"])}>
          <h4 className="text-title">[我的點數]</h4>
             <Ticket /> 

          </div>
        </div>
        </div>

      </div>
    </Section>
  )
}
