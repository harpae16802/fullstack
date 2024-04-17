import React from 'react'
import styles from "@/styles/form.module.css"
import classNames from 'classnames'
export default function Step_card({title,value}) {
  return ( 
        <div className="card pa-0 mx-2  step_card  border-0">
            <div className="card-body  border-0">
                <h6 className={classNames("card-title",styles["text-parmary"])}>{title}</h6> 
                <p className="card-text" >{value}</p> 
            </div>
        </div>  
  )
}
