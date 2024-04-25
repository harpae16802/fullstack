import React from 'react'
import styles from "@/styles/form.module.css"
export default function creditComponts({title="aa",data}) {
    
  return (
    <div className={styles.credit}>
    <h4 className='creditTitle '>{data}</h4> 
       {data.map((v,i)=>{
            return (
             <div className="creditItem styles.credit">
            <div className="form-check ">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
                <label className="form-check-label" htmlFor="flexCheckIndeterminate"> 
                </label>
            </div>
                 
            </div>
            )
         })
  
       }
   
     
    </div>
  )
}
