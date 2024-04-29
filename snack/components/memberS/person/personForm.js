import React, { useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import dataBirth from "@/data/birthday"
import classNames from 'classnames';
import styles from "@/styles/form.module.css"
import memberFormUpdate from '@/api/memberFormUpdate';
import { useNotify } from '@/data/context/use-notify'
// 主頁面的form
export default function PersonForm() {
  const {notify}=useNotify()
  const yearVal = useRef();
  const monthVal = useRef();
  const   dateVal  = useRef(); 
  const passwordErrVal = useRef();
  const repasswordErrVal = useRef();
  const [data, setdata] = useState({});
  const {
    register, setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [birthY, setBirthY] = useState([]);
  const [birthM, setBirthM] = useState([]);
  const [birthD, setBirthD] = useState([]);
  const [dateValue, setDateValue] = useState("");
  const [birthgety, setbirthgety] = useState("ooo");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setBirthY(dataBirth.years());
        setBirthM(dataBirth.month()); 
        const custom_id =JSON.parse(localStorage.getItem("Nightmarket-auth")).custom_id
        const memberData = await memberFormUpdate.searchMemberData({ custom_id:custom_id }); 
        setdata(memberData);
    
      
        if (memberData) {  
          setValue('custom_account',memberData.data[0].custom_account);
          setValue('custom_password',memberData.data[0].custom_password);
          setValue('custom_phone',memberData.data[0].custom_phone);
          setValue('custom_name',memberData.data[0].custom_name);
          setValue('custom_nickname',memberData.data[0].custom_nickname);
          setValue('custom_year',memberData.data[0].custom_year);
          setValue('custom_month',memberData.data[0].custom_month);
          setValue('custom_date',memberData.data[0].custom_date);
          setValue('custom_sex',memberData.data[0].custom_sex);
          setValue('custom_address',memberData.data[0].custom_address);
          setDateValue(memberData.data[0].custom_date)
        }
        const arrD=Array(memberData.data[0].custom_date).fill(1).map((v,i)=>{
          return i;
        })
        setBirthD(dataBirth.date(memberData.data[0].custom_year,memberData.data[0].custom_month));

      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
  
    fetchData();
  }, []);

  const selectChange = (e) => {
    const dateD = dataBirth.date(birthgety, e.target.value);
    setBirthD(dateD)
  }

  const custom_account = {
    name: "custom_account",
    setting: {
      required: { value: true, message: "此欄位必填" },
      minLength: { value: 5, message: "不得低過5個字" },
      maxLength: { value: 10, message: "不得超過10個字" },

    }
  };

  const password = React.useRef({});
  password.current = watch("custom_password", "");
  const repasswordErr = {
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
          if (value != password.current) {
            return "密碼不相同";
          }
          return true;
        },
      },
    }
  };
  const custom_password = {
    name: "custom_password",
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
  const custom_phone = {
    name: "custom_phone",
    setting: {
      required: { value: true, message: "此欄位必填" },
      pattern: {
        value: /^09\d{8}$/,
        message: "手機格式錯誤",
      },
    },
  }
  const custom_name =
  {
    name: "nameErr",
    setting: {
      required: { value: true, message: "此欄位必填" },

    },
  }
  const custom_nickname = {
    name: "custom_nickname",
    setting: {
      required: { value: true, message: "此欄位必填" },
    },
  }
  const custom_year = {
    name: "custom_year",
    required: { value: true, message: "此欄位必填" },
  }
  const custom_month = {
    name: "custom_month",
    setting: {
      required: { value: true, message: "此欄位必填" },
    },
  }
  const custom_date = {
    name: "custom_date",
    required: { value: true, message: "此欄位必填" },
  }
  const custom_sex = {
    name: "custom_sex",
    setting: {

    },
  }
  const custom_address = {
    name: "custom_address",
    setting: {

    },
  }


  // 送出表單
  const onSubmit = async (formData, e) => {
    e.preventDefault();  // 阻止表单默认提交行为
  
    try {
      // 从localStorage获取认证信息，并解析出custom_id
      const custom_id = JSON.parse(localStorage.getItem("Nightmarket-auth")).custom_id;
      
      // 创建一个新的URLSearchParams对象，并将表单中的所有字段追加进去
      const urlEncodedData = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        urlEncodedData.append(key, value);  // 将每个表单字段添加到URL参数中
      });
  
      // 单独追加custom_id
      urlEncodedData.append("custom_id", custom_id);
  
      // 将URLSearchParams对象转换成字符串，以便提交
      const formString = urlEncodedData.toString();
  
      // 此处可以将数据发送到服务器或API端点
      const result = await memberFormUpdate.formUpdate(formString);
      console.log(result);  // 打印服务器返回的结果
      
      if (result.success) {
        notify(true,'修改成功');  // 如果修改成功，通知用户
      } else {
        notify(false,'修改失败，请重试');  // 如果返回的结果不是成功的，通知用户失败
      }
    } catch (error) {
      console.error("提交表单时发生错误:", error);
      notify(false,'提交失败，请检查网络连接并重试');  // 通知用户错误信息
    }
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
                {...register("custom_account", custom_account.setting)}
                // onInput={handleSubmit(onSubmit)}
                // className={(errors.idInputErr && "inputErr") +" form-control"} 
                className={classNames(errors.custom_account ? "inputErr" : "", "form-control")}
                id="exampleInputId" aria-describedby="emailHelp" />

              {errors.custom_account && <div id="idInputHelp" style={{ color: "red" }} className="form-text">{errors["custom_account"]?.message}</div>}
            </div>
          </div>
          <div className="row">
            <div className={`col-12 col-md-6`}>
              <label htmlFor="exampleInputPassword" className="form-label">密碼</label>
              <input type="text" id="exampleInputPassword"
                ref={custom_password}
                className={classNames(errors.custom_password ? "inputErr" : "", "form-control")}
                {...register("custom_password", custom_password.setting)}
                // onInput={handleSubmit(onSubmit)}
                aria-describedby="passwordHelp" />
              {errors.custom_password && <div className="form-text" style={{ color: "red" }}>{errors["custom_password"]?.message}</div>}

            </div>
            <div className={`col-12 col-md-6`}>
              <label htmlFor="examplerepasswordEmail1" className="form-label">請重新輸入密碼</label>
              <input type="text"
                ref={repasswordErrVal}
                {...register("repasswordErr", repasswordErr.setting)}
                className={classNames(errors.repasswordErr ? "inputErr" : "", "form-control")}
                id="examplerepasswordEmail1" aria-describedby="examplerepasswordHelp" />
              {errors.repasswordErr && <div className="form-text" style={{ color: "red" }}> {errors["repasswordErr"]?.message}</div>}

            </div>
          </div>
          <div className="row">
            <div className={`col-12 col-md-6`}>
              <label htmlFor="exampleInputName" className="form-label">姓名</label>
              <input type="text"
                className={classNames(errors.custom_name ? "inputErr" : "", "form-control")}

                id="exampleInputName"
                {...register("custom_name", custom_name.setting)}

                aria-describedby="custom_name" />
              {errors.custom_name && <div className="form-text" style={{ color: "red" }}> {errors["custom_name"]?.message}</div>}
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="exampleInputEmail1" className="form-label" >暱稱</label>
              <input type="text"
                {...register("custom_nickname", custom_nickname.setting)}
                className={classNames(errors.custom_nickname ? "inputErr" : "", "form-control")}
                id="exampleInputEmail1" aria-describedby="emailHelp" />
              {errors.custom_nickname && <div className="form-text" style={{ color: "red" }}> {errors["custom_nickname"]?.message}</div>}
            </div>
          </div>
          <div className="row">


            <label htmlFor="inputGroupSelect01" className="form-label" >生日</label>
            <div className="col-12 col-md-4">
              <div className="face.input-group pa-1 " style={{ paddingRight: 0 }}>
                <select className="form-select pa-0" ref={yearVal}
                  {...register("custom_year", custom_year.setting)}
                  onChange={(e) => {
                    selectChange(e)
                    setbirthgety(e.target.value);

                  }} defaultValue="年" id="inputGroupSelect02">
                  <option value="年">年</option>
         
                  {birthY.map((v, i) => {
                    return <option value={v} key={v}>{v}</option>
                      ;
                  })}
                </select>
                {errors.custom_year && <div className="form-text" style={{ color: "red" }}> {errors["custom_year"]?.message}</div>}

              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="face.input-group pa-1 " style={{ paddingRight: 0 }}>
                <select className="form-select pa-0" ref={monthVal}
                  {...register("custom_month", custom_month.setting)}
                  onChange={(e) => selectChange(e)} defaultValue="月" id="inputGroupSelect02">
                  <option value="月">月</option>
                  {birthM.map((v, i) => {
                    return <option value={v} key={v}>{v}</option>
                      ;
                  })}
                </select>
                {errors.custom_month && <div className="form-text" style={{ color: "red" }}> {errors["custom_month"]?.message}</div>}

              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="face.input-group pa-1 " style={{ paddingRight: 0 }}>
                <select className="form-select pa-0"
                ref={register("custom_date", custom_date.setting)}
                  {...register("custom_date", custom_date.setting)}
                  defaultValue={custom_date}
                   id="inputGroupSelect03">
                    <option value={dateValue} >{dateValue}</option> 
                  <option >日</option>
                  {birthD.map((v, i) => {
                    return <option value={v} key={v}>{v}</option>
                      ;
                  })}
                </select>
                {errors.custom_date && <div className="form-text" style={{ color: "red" }}> {errors["custom_date"]?.message}</div>}

              </div>
            </div>
          </div>
          <div className="row">
            <div className={`col-12 col-md-6`}>
              <label htmlFor="sexGroupSelect01" className="form-label">性別</label>
              <select
                className={classNames("", " form-select pa-0")}
                {...register("custom_sex", custom_sex.setting)}
                defaultValue="0" id="sexGroupSelect01">
                <option value="0">不透漏</option>
                <option value="2">男</option>
                <option value="2">女</option>
              </select>
              {errors.custom_sex}

            </div>
            <div className={`col-12 col-md-6`}>
              <label htmlFor="exampleInputphone" className="form-label">電話</label>
              <input type="text"
                {...register("custom_phone", custom_phone.setting)}
                className={classNames(errors.custom_phone ? "inputErr" : "", " form-control")}
                id="exampleInputphone" aria-describedby="emailHelp" />
              {errors.custom_phone && <div id="emailHelp" className="form-text" style={{ color: "red" }}>{errors["custom_phone"]?.message}</div>}
            </div>
          </div>

          <div className="row">
            <div className={`col-12 col-md-12`}>
              <label htmlFor="exampleInputAddress" className="form-label">地址(選填)</label>
              <input type="text"
                {...register("custom_address", custom_address.setting)}
                className="form-control" id="exampleInputAddress" aria-describedby="emailHelp" />
              {errors.custom_address}
            </div>
          </div>
          <div className="row mt-4 justify-content-center"><button className='fxbtngrey'>送出</button></div>
        </form>
      </div>
    </div>
  )
}
