import React, { useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import dataBirth from "@/data/birthday"
import classNames from 'classnames';
import styles from"@/styles/form.module.css"
import memberFormUpdate from '@/api/memberFormUpdate';

// 主頁面的form
export default function PersonForm() {
  const yearVal = useRef();
  const monthVal = useRef();
  const passwordErrVal = useRef();
  const repasswordErrVal = useRef();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [birthY, setBirthY] = useState([]);
  const [birthM, setBirthM] = useState([]);
  const [birthD, setBirthD] = useState([]);

  useEffect(() => {
    setBirthY(dataBirth.years());
    setBirthM(dataBirth.month());  
  }, [])
 
  const selectChange = (e) => {  
    const dateD = dataBirth.date(yearVal.current.value, e.target.value);
    setBirthD(dateD)
  }

  const idInputErr= {
    name: "idInputErr",
    setting: {
    
        required: { value: true, message: "此欄位必填" },
        minLength: { value: 5, message: "不得低過5個字" },
        maxLength: { value: 10, message: "不得超過10個字" },
      
    }
  }; 

  const password = React.useRef({});
  password.current = watch("passwordErr", "");
  const repasswordErr=  {
    name: "repasswordErr",
    setting: {
      required: { value: true, message: "此欄位必填" },
      minLength: { value: 5, message: " 5-20個字" },
      maxLength: { value: 20, message: "5-20個字" },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,20}$/,
        message: "至少一個數字、大小寫、 5-20 個字"
      }, 
      validate: {
        taipei: (value) => {
          
          if (value!= password.current) {
            return "密碼不相同";
          }
          return true;
        },
      },
    }
  };
  const passwordErr= {
    name: "passwordErr",
    setting: {
      required: { value: true, message: "此欄位必填" },
      minLength: { value: 5, message: "5-20個字" },
      maxLength: { value: 20, message: "5-20個字" },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,20}$/,
        message: "至少一個數字、大小寫、 5-20 個字"
      },
     
    },
  };
  const phoneErr= {
    name: "phoneErr",
    setting: {
      required: { value: true, message: "此欄位必填" },
      pattern: {
        value: /^09\d{8}$/,
        message: "手機格式錯誤",
      },
    },
  }
  const nameErr=
  {
    name: "nameErr",
    setting: {
      required: { value: true, message: "此欄位必填" },
     
    },
  }
  const nickErr={
    name: "nickErr",
    setting: {
      required: { value: true, message: "此欄位必填" },
    },
  } 
  const yearErr={
    name: "yearErr",
    setting: {
      pattern: {
        value: /^[0-9]*$/,
        message: "請填寫"
      }
    },
  } 
  const monthErr={
    name: "monthErr",
    setting: {
      pattern: {
        value: /^[0-9]*$/,
        message: "請填寫"
      }
    },
  } 
  const dateErr={
    name: "dateErr",
    setting: {
      pattern: {
        value: /^[0-9]*$/,
        message: "請填寫"
      }
    },
  } 


    // 送出表單
    const onSubmit = async(formData,e) =>{ 
      e.preventDefault();  
      const urlEncodedData = new URLSearchParams(formData).toString();
     const result=await memberFormUpdate.formUpdate(urlEncodedData);
     console.log(result)
     
     }
  return (
    <div>
    {/* // 主頁面的form */}
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <div className="row">
            <div className={`col-12 col-md-12`}>
              <label htmlFor="exampleInputId" className="form-label">帳號</label>
              <input type="text"
                {...register("idInputErr", idInputErr.setting)}
                // onInput={handleSubmit(onSubmit)}
                // className={(errors.idInputErr && "inputErr") +" form-control"} 
                className={classNames(errors.idInputErr?"inputErr":"","form-control")}
                id="exampleInputId" aria-describedby="emailHelp" />
 
              {errors.idInputErr && <div id="idInputHelp" style={{ color: "red" }} className="form-text">{errors["idInputErr"]?.message}</div>}
            </div>
          </div>
          <div className="row">
            <div className={`col-12 col-md-6`}>
              <label htmlFor="exampleInputPassword" className="form-label">密碼</label>
              <input type="text"  id="exampleInputPassword"
                ref={passwordErrVal}
                className={classNames(errors.passwordErr?"inputErr":"","form-control")}
                {...register("passwordErr", passwordErr.setting) }
                // onInput={handleSubmit(onSubmit)}
                aria-describedby="passwordHelp" />
              {errors.passwordErr && <div className="form-text"  style={{ color: "red" }}>{errors["passwordErr"]?.message}</div>}
 
            </div>
            <div className={`col-12 col-md-6`}>
              <label htmlFor="examplerepasswordEmail1" className="form-label">請重新輸入密碼</label>
              <input type="text"
                ref={repasswordErrVal}
                {...register("repasswordErr", repasswordErr.setting)}
                className={classNames(errors.repasswordErr?"inputErr":"","form-control")}
                 id="examplerepasswordEmail1" aria-describedby="examplerepasswordHelp" />
              {errors.repasswordErr && <div className="form-text"  style={{ color: "red" }}> {errors["repasswordErr"]?.message}</div>}

            </div>
          </div>
          <div className="row">
            <div className={`col-12 col-md-6`}>
              <label htmlFor="exampleInputName" className="form-label">姓名</label>
              <input type="text"
              className={classNames(errors.nameErr?"inputErr":"","form-control")}
              
              id="exampleInputName"
              {...register("nameErr", nameErr.setting) } 
             
                aria-describedby="nameErr" />
              {errors.nameErr && <div className="form-text"> {errors["passwordErr"]?.message}</div>}
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="exampleInputEmail1" className="form-label" >暱稱</label>
              <input type="text"
              {...register("nickErr", nickErr.setting) }  
                className={classNames(errors.nickErr?"inputErr":"","form-control")}
                id="exampleInputEmail1" aria-describedby="emailHelp" />
              {errors.nickErr && <div className="form-text" style={{ color: "red" }}> {errors["nickErr"]?.message}</div>}
            </div>
          </div>
          <div className="row">


          <label htmlFor="inputGroupSelect01" className="form-label" >生日</label>
            <div className="col-12 col-md-4">
              <div className="face.input-group pa-1 " style={{ paddingRight: 0 }}>

                <select className="form-select pa-0"
                {...register("yearErr", yearErr.setting) } 
                ref={yearVal} defaultValue="年" id="inputGroupSelect01">

                  <option value='ooo'>年</option>
                  {birthY.map((v, i) => { 
                    return <option value={v} key={v}>{v}</option>
                      ;
                  })}
                  
                </select>  
                {errors.yearErr && <div className="form-text" style={{ color: "red" }}> {errors["yearErr"]?.message}</div>}
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="face.input-group pa-1 " style={{ paddingRight: 0 }}>
                <select className="form-select pa-0" ref={monthVal}
                {...register("monthErr", monthErr.setting) } 
                onChange={(e)=>selectChange(e)} defaultValue="月" id="inputGroupSelect02">
                  <option value="月">月</option>

                  {birthM.map((v, i) => {
                    return <option value={v} key={v}>{v}</option>
                      ;
                  })}
                </select>
                {errors.monthErr && <div className="form-text" style={{ color: "red" }}> {errors["monthErr"]?.message}</div>}

              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="face.input-group pa-1 " style={{ paddingRight: 0 }}>
                <select className="form-select pa-0" 
                {...register("dateErr", dateErr.setting) } 
                defaultValue="Choose..." id="inputGroupSelect03">
                  <option >日</option>
                  {birthD.map((v, i) => {
                    return <option value={v} key={v}>{v}</option>
                      ;
                  })}
                </select>
                {errors.dateErr && <div className="form-text" style={{ color: "red" }}> {errors["dateErr"]?.message}</div>}

              </div>
            </div>
          </div>
          <div className="row">
            <div className={`col-12 col-md-6`}>
              <label htmlFor="sexGroupSelect01" className="form-label">性別</label>
              <select  
              className={classNames(""," form-select pa-0")}
              
              defaultValue="0" id="sexGroupSelect01">
                <option value="0">不透漏</option>
                <option value="2">男</option>
                <option value="2">女</option>
              </select>
            </div>
            <div className={`col-12 col-md-6`}>
              <label htmlFor="exampleInputphone" className="form-label">電話</label>
              <input type="text"  
              {...register("phoneErr", phoneErr.setting) }   
              className={classNames(errors.phoneErr?"inputErr":""," form-control")}
                id="exampleInputphone" aria-describedby="emailHelp" />
              {errors.phoneErr && <div id="emailHelp" className="form-text" style={{ color: "red" }}>{errors["phoneErr"]?.message}</div>}
            </div>
          </div>

          <div className="row">
            <div className={`col-12 col-md-12`}>
              <label htmlFor="exampleInputAddress" className="form-label">地址(選填)</label>
              <input type="text" className="form-control" id="exampleInputAddress" aria-describedby="emailHelp" />
            </div>
          </div>
          <div className="row mt-4 justify-content-center"><button className='fxbtngrey'>送出</button></div>
        </form>
      </div>
    </div>
  )
}
