import classNames from 'classnames'
import styles from "@/styles/form.module.css"

import React from 'react'

export default function point() {
  return (
    <>
    <div className={classNames( 'container d-flex justify-content-center align-items-center flex-column my-4',styles["rd-2"],styles["border-1"])} style={{padding:"30px"}} >
        <h4>目前持有</h4>
        <h1><span className={classNames(styles['text-color'])}>1024</span>點</h1>
    </div>
      
    </>
  )
}
