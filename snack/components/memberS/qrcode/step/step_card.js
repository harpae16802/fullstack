import React from 'react'
import styles from "@/styles/form.module.css"
import classNames from 'classnames'
export default function Step_card({ title, value, color }) {
  return (
    <div className="card pa-0 mx-2  step_card  border-0">
      <div className={`card-body font-bold  border-0 ${color == "true" ? 'text-color' : 'text-m-color'}`}>
        <h6 className={classNames('card-title', "font-bold"
        )
        }>
          {title} </h6>
        <p className="card-text" >{value}</p>
      </div>
    </div>
  )
}
