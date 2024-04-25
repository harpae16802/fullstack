import React from 'react'
import InputClass from '../inputs-class'
import InputDrop from '../input-drop'
import Inputbirthday from './memberS/input-drop-birthday'

export default function PersonForm() {


  return (
    <div>
       <div className="container">
      <form>
      <div className="row">
      <InputClass  title="帳號" cx="12" bindErr="errhandle"  />
      </div>  
        <div className="row">
      <InputClass  title="密碼" cx="12" mx="6" bindErr="errhandle"  /> 
      <InputClass  title="請重新輸入密碼" cx="12" mx="6" bindErr="errhandle"  /> 
      </div>  
      <div className="row"> 
      <InputClass  title="姓名" cx="12" mx="6" bindErr="errhandle"  /> 
      <InputClass  title="暱稱" cx="12" mx="6" bindErr="errhandle"  /> 
      </div>  
      <div className="row"> 
      <h6>生日</h6>
      
      <Inputbirthday  title="年" data="years" cx="12" mx="6" bindErr="errhandle"  />  
      <Inputbirthday  title="月" data="month" cx="12" mx="6" bindErr="errhandle"  />  
      <Inputbirthday  title="日" data="date" cx="12" mx="6" bindErr="errhandle"  />  
      </div>   
      </form>
    </div>

    </div>
  )
}
