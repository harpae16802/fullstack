import React from 'react'
// import InputClass from './memberS/inputs-class'
// import InputDrop from './memberS/input-drop' 
// import form from '@/data/form'
// import face from "@/styles/face.module.css"

export default function PersonForm() { 
  return (
    <div>
       <div className="container">
      <form> 

      <div className="row">
      <div className={`col-12 col-md-12`}>
        <label htmlFor="exampleInputEmail1" className="form-label">帳號</label> 
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text"> with anyone else.</div> 
     </div> 
      </div>  
        <div className="row">
        <div className={`col-12 col-md-6`}>
        <label htmlFor="exampleInputEmail1" className="form-label">密碼</label> 
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text"> with anyone else.</div> 
     </div>  

     <div className={`col-12 col-md-6`}>
        <label htmlFor="exampleInputEmail1" className="form-label">請重新輸入密碼</label> 
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text"> with anyone else.</div> 
     </div> 
      </div>  
      <div className="row">
      <div className={`col-12 col-md-6`}>
        <label htmlFor="exampleInputEmail1" className="form-label">姓名</label> 
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text"> with anyone else.</div> 
     </div> 
        <div className="col-12 col-md-6">
          <label htmlFor="exampleInputEmail1" className="form-label">暱稱</label> 
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text"> with anyone else.</div>  
       </div>  
    </div>
    <div className="row"> 
      <h6 className='col-12'>生日</h6>
      <div className="col-12 col-md-4"> 
      <div className="face.input-group pa-1 " style={{paddingRight:0}}> 
      <select className="form-select pa-0" defaultValue="Choose..." id="inputGroupSelect01">
        <option disabled hidden>年</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
        </div>
        </div>
        <div className="col-12 col-md-4"> 
        <div className="face.input-group pa-1 " style={{paddingRight:0}}> 
        <select className="form-select pa-0" defaultValue="Choose..." id="inputGroupSelect01">
          <option disabled hidden>年</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
          </div>
          </div>

          <div className="col-12 col-md-4"> 
          <div className="face.input-group pa-1 " style={{paddingRight:0}}> 
          <select className="form-select pa-0" defaultValue="Choose..." id="inputGroupSelect01">
            <option disabled hidden>年</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
            </div>
            </div>
      </div>
      <div className="row"> 
          <div className={`col-12 col-md-6`}>
            <label htmlFor="exampleInputEmail1" className="form-label">性別</label> 
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text"> with anyone else.</div> 
        </div>  
        <div className={`col-12 col-md-6`}>
          <label htmlFor="exampleInputEmail1" className="form-label">電話</label> 
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text"> with anyone else.</div> 
       </div> 
      </div>  
        
      <div className="row"> 
        <div className={`col-12 col-md-12`}>
          <label htmlFor="exampleInputEmail1" className="form-label">地址</label> 
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text"> with anyone else.</div> 
       </div> 
      </div>   
      </form> 
      </div> 
    </div>
  )
}
