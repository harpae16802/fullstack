import React, { useEffect,useState } from 'react'
import ImgIcon from "@/components/memberS/imgicon/imgicon"
import MemberList from "@/components/memberS/memberList" 
// import styled from 'styled-components';
import styles from"@/styles/form.module.css";
import classNames from 'classnames';
import { useRouter } from 'next/router'; 
import { useMediaQuery } from 'react-responsive'


// npm install --save styled-components
// 
export default function SelectMenu() { 
  const router = useRouter();
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

  console.log(router.pathname)
  return (
    <>
      <div className={classNames("selectMenuPostion")}>
        <div className={classNames(styles["lg-open"],"mb-3")}>
          <ImgIcon />
        </div>

        <div className="">
         <MemberList /> 
       

        </div>
      </div>

    </>
  )
}
