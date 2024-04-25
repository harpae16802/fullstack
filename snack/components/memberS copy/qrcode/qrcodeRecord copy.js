import classNames from 'classnames'
import React from 'react' 
import Image from 'next/image'
import styles from "@/styles/form.module.css"
import Ticket from"@/components/memberS/ticket/ticket";
export default function Qrcode() {
  return (
    <div>
      <h4>我的商品</h4> 
    <Ticket />
      <div className={classNames("itemgroup item1",styles["mb-0"])}>
          <p  className={classNames("",styles["mb-0"])}> 
            <button className={classNames("btn  ",styles["mx-full"],styles["btn-parmary"])} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">
          士林夜市&nbsp;&nbsp;豪大雞排
            </button>
          </p>
          {/* flexBetween */}
          <div className={ classNames("collapse")} id="collapseExample1">
            <div className={ classNames("card card-body",styles.flexBetween)}>
                  <div className={ classNames("",styles.flexBetween)}>
                  <Image src="/ch.jpeg" alt="Description" width={60} height={60} /> 
                          <div className="time" style={{textAlign:'center'}}>
                            2024/03/01 <br/> 
                            海苔雞排 $80
                          </div> 
                       
                </div> 
                <div className={ classNames("countGroup",styles.flexBetween)}>
                <div>
                            購買數量&nbsp;|&nbsp;5 <br />
                            購買數量&nbsp;|&nbsp;5 <br />
              </div>
              <div>
              <button type="submit" className={classNames("btn  mx-2",styles["btn-parmary"])}>選擇商品</button>
              </div>
                </div>
                
             
              </div>
          </div>
    </div>
      <div className={classNames("itemgroup item2",styles["mb-0"])}>
      <p className={classNames("",styles["mb-0"])}> 
        <button className={classNames("btn   ",styles["mx-full"],styles["btn-parmary"])} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2">
        士林夜市&nbsp;&nbsp;豪大雞排
        </button>
      </p>
      <div className="collapse" id="collapseExample2">
        <div className="card card-body">
          Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
        </div>
      </div>
      </div>
      <div  className={classNames("itemgroup item3",styles["mb-0"])}>
      <p className={classNames("",styles["mb-0"])}> 
        <button className={classNames("btn   ",styles["mx-full"],styles["btn-parmary"])} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample3" aria-expanded="false" aria-controls="collapseExample3">
        士林夜市&nbsp;&nbsp;豪大雞排
        </button>
      </p>
      <div className="collapse" id="collapseExample3">
        <div className="card card-body">
          Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
        </div>
        <div className="card card-body">
          Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
        </div>
      </div>
      </div>
      <div className={classNames("itemgroup item4",styles["mb-0"])}>
      <p className={classNames("",styles["mb-0"])}> 
        <button className={classNames("btn ",styles["mx-full"],styles["btn-parmary"])}  type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample4" aria-expanded="false" aria-controls="collapseExample4">
        士林夜市&nbsp;&nbsp;豪大雞排
        </button>
      </p>
      <div className="collapse" id="collapseExample4">
        <div className="card card-body">
          Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
        </div>
      </div>
      </div>
      
    </div>
  )
}
