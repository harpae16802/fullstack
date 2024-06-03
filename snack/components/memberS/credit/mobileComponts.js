import React from 'react'
import styles from "@/styles/form.module.css"

export default function CreditComponents({ title = "aa", data }) {
  return (
    <div className={styles.credit}>
      <h4 className='creditTitle'>{title}</h4>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((v, i) => (
          <div className={classNames("creditItem", styles.credit)} key={i}>
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                value="" 
                id={`flexCheckIndeterminate${i}`} 
              />
              <label 
                className="form-check-label" 
                htmlFor={`flexCheckIndeterminate${i}`}
              >
                {v}
              </label>
            </div>
          </div>
        ))
      ) : (
        <p>沒有可顯示的資料</p>
      )}
    </div>
  )
}
