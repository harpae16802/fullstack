import React from 'react'
import styles from "@/styles/form.module.css"
import Image from 'next/image'
export default function creditComponts({title="aa",data}) {
    
  return (
    <>
    <h4 className='creditTitle credit'>{data}</h4> 
       {data.map((v,i)=>{
            return  <div className="creditItem">
         
            <div className="form-check">
            <Image src="/face/ch.jpeg" alt="Description" width={60} height={60} /> 
                          <div className="time" style={{textAlign:'center'}}>
                            2024/03/01 <br/> 
                            海苔雞排 $80
                          </div> 
                <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
                <label className="form-check-label" htmlFor="flexCheckIndeterminate"> 
                </label>
            </div>
                 
            </div>
         })
  
       }
   
     
    </>
  )
}
