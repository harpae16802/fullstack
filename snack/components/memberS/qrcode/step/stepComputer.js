import React from 'react'
import styles from "@/styles/form.module.css"
import StepCard from "@/components/memberS/qrcode/step/step_card"
import classNames from 'classnames'
export default function StepComputer({ stepLevel }) { 
  return (
    <div className={classNames(styles['border-1'], styles["lg-open"], "py-2", styles["rd-2"], "stepComputer")}>
      <div className={classNames("card mx-2 stepComputerCard", styles.step)}>
        <div className={classNames("card-body", styles.stepPostion, styles.step)}>
          <h2 className={classNames(styles["iconWidth"], styles.step, 
            "progressParmary",`${stepLevel>=1?"active":""}`)}>1</h2>
          <h2 className={classNames(" col-auto", styles.iconGrow, "progressParmary",`${stepLevel>=2?"active":""}`)}></h2>
          <h2 className={classNames(styles["iconWidth"], styles.step, "progressParmary",`${stepLevel>=2?"active":""}`)}>2</h2>
          <h2 className={classNames(" col-auto", styles.iconGrow, "progressParmary",`${stepLevel>=3?"active":""}`)}></h2>
          <h2 className={classNames(styles["iconWidth"], styles.step, "progressParmary",`${stepLevel>=3?"active":""}`)}>3</h2>
        </div>
      </div>
      <div className='stepcard' >
        <div className={`d-flex justify-content-center border-0 `}>
          <StepCard title="選擇商品" value="可選擇多樣商品，但只能來自同一家商店喔!" color='true' />
        </div>
        <div className='d-flex justify-content-center border-0'>
          <StepCard title="確認商品" value="可選擇多樣商品，但只能來自同一家商店喔!"  color='false' />
        </div>
        <div className='d-flex justify-content-center border-0'>
          <StepCard title="兌換QRcode" value="可選擇多樣商品，但只能來自同一家商店喔!"  color='false' />
        </div>
      </div>
    </div>
  )
}
