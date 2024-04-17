import React from 'react'
import styles from "@/styles/form.module.css"
import classNames from 'classnames'
import Image from 'next/image'
import { FaTrash } from "react-icons/fa6";
export default function creditComponts({data}) {
    
  return (
    <>
    <div className={classNames(styles.credit,styles["border-1"],styles["rd-2"],styles["mx-full"]," d-flex justify-content-between align-items-center")}>  
    <div className='d-flex justify-content-center align-items-center'>
    <input className=" align-items-center" type="checkbox" value="" id="flexCheckDefault"/> 

          <Image src="/ch.jpeg" alt="Description" className='mx-3' width={60} height={60} /> 
           <h5 className='me-2'> VISA </h5>
            <button className={classNames(" align-items-center",styles["btn-parmary"])} style={{fontSize:"14px"}} htmlFor="flexCheckDefault">
            預設 
          </button>
    </div> 
      <h4   className={classNames("align-items-center mx-1",styles.creditTitle,"px-0 mx-0 mb-0 pb-0")}>{data}</h4> 
            <div className={classNames(" flex-between")} >   
                  <FaTrash   style={{color:"#A32C2D"}}/>
              </div> 
</div>
     
    </>
  )
}
