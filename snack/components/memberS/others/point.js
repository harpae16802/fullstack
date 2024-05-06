import classNames from 'classnames'
import styles from "@/styles/form.module.css"

import React, { useEffect, useState } from 'react' 
// 標頭.訊息
// 上方勘版
export default function Point({pointTitle,pointMsg}) { 
 
  return (
    <>
      <div className={classNames('container d-flex justify-content-center align-items-center flex-column my-4', styles["rd-2"], styles["border-1"])} style={{ padding: "30px" }} >
        <h4>{pointMsg}</h4>
        <h1><span className={classNames(styles['text-color'])}>{pointTitle}</span></h1>
      </div>

    </>
  )
}
