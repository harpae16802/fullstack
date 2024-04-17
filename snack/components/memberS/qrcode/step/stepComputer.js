import React, { useEffect, useState } from 'react'
import styles from "@/styles/form.module.css"
import StepCard from "@/components/memberS/qrcode/step/step_card"
import classNames from 'classnames' 
import stepStyles from"@/styles/step.module.css";

export default function StepComputer({ stepLevel }) { 
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  useEffect(()=>{
  const handleResize = () => {
    // 1280
    setIsBigScreen(window.innerWidth > 1280);
    setIsTabletOrMobile(window.innerWidth <=1280);
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
    <div className={classNames(styles['border-1'], "py-2", styles["rd-2"], "stepComputer")}>
      <div className={classNames("card mx-2 stepComputerCard", stepStyles.step)}>
      
    
      
       <div className={classNames("card-body", stepStyles.stepPostion, stepStyles.step)}>
          <h2 className={classNames(styles["iconWidth"], styles.step, 
            "progressParmary",`${stepLevel>=1?"active":""}`)}>1</h2>
          <h2 className={classNames(" col-auto", styles.iconGrow, "progressParmary",`${stepLevel>=2?"active":""}`)}></h2>
          <h2 className={classNames(styles["iconWidth"], stepStyles.step, "progressParmary",`${stepLevel>=2?"active":""}`)}>2</h2>
          <h2 className={classNames(" col-auto", styles.iconGrow, "progressParmary",`${stepLevel>=3?"active":""}`)}></h2>
          <h2 className={classNames(styles["iconWidth"], stepStyles.step, "progressParmary",`${stepLevel>=3?"active":""}`)}>3</h2>
        </div>
       
      </div>
      <div className='stepcard' >
      {(isBigScreen ||stepLevel=="1") && ( <div className={`d-flex justify-content-center border-0 `}>
          <StepCard title="選擇商品" value="可選擇多樣商品，但只能來自同一家商店喔!" color={stepLevel == 1 ? 'true' : 'false'}  />
        </div>)}
        {(isBigScreen ||stepLevel=="2") && (<div className='d-flex justify-content-center border-0'>
          <StepCard title="確認商品" value="可選擇多樣商品，但只能來自同一家商店喔!" color={stepLevel == 2 ? 'true' : 'false'}  />
        </div>)}
        {(isBigScreen ||stepLevel=="3") && ( <div className='d-flex justify-content-center border-0'>
          <StepCard title="兌換QRcode" value="可選擇多樣商品，但只能來自同一家商店喔!" color={stepLevel == 3 ? 'true' : 'false'}  />
        </div>)}
      </div>
    </div>
  )
}
