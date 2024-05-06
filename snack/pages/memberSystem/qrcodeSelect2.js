import SelectMenu from "@/components/memberS/person/selectMenu";
import QrcodeRecord from "@/components/memberS/qrcode/qrcodeRecord2"
import StepComputer from "@/components/memberS/qrcode/step/stepComputer";
 
import styles from "@/styles/form.module.css"
import qrcodeStyle from "@/styles/qrcode.module.css"
import Pagination from "@/components/memberS/others/pagination"
import QrcodeCurrent from "@/components/modal/qrcodeCurrent";
import { useState,useRef, useEffect } from "react";
import { myProduct, myProduct2, recordSearch,insertProduct } from '@/api/qrcodeApi';
import { useQrcode } from '@/data/context/QrcodeContext';
import classNames from 'classnames'
import Section from "@/components/layout/section";
import { useData } from "@/pages/context/qrcodeProduct"
import { useRouter } from "next/router";
import AuthContent from "@/data/context/Authcontnet";
import CreditComponts from "@/components/memberS/creditForm";
import { FaSearch } from "react-icons/fa";
export default function QrcodeselectMobile1() {
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const { data, setData } = useData(); // 修改為使用解構賦值，保持一致性
  const {  orderId, setOrderId, QRcodeData, QrcodeOrder,setQRcodeDataOrder, setQRcodeData,QRcodeDataCreate, setQRcodeDataCreate } = useQrcode();
  const myRef = useRef(null); 
  const router = useRouter(); 
  const pages = (url) => {
    router.push(`/memberSystem/${url}`);
  }
  useEffect(() => {
    const handleResize = () => {
      setIsBigScreen(window.innerWidth > 500);
      setIsTabletOrMobile(window.innerWidth <= 500);
    };
    const pages = (url) => {
      router.push(`/memberSystem/${url}`);
    }
    // 監聽視窗大小變化
    window.addEventListener('resize', handleResize);
    // 初始設置一次
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [])
  const handleString = (e) => {
    e.preventDefault();
    
    const node = myRef.current.value;
    const queryString = '/memberSystem/qrcodeSelect2/?search='+node;
 
    // 使用 push 方法将带有查询字符串的 URL 添加到路由中
    router.push(`${queryString}`); 
  };
  const createQrcode=async(e)=>{
    e.preventDefault(); // 阻止 
    // insertProduct建立QRcode 
    // 記得%
    const newQRcodeDataCreate = QRcodeDataCreate.filter(item => item.isinput);  
     const result = await insertProduct(newQRcodeDataCreate);
    //  alert(JSON.stringify(result))
     setQRcodeDataOrder(newQRcodeDataCreate)
     sessionStorage.setItem('QrcodeOrder', JSON.stringify(newQRcodeDataCreate));

  if (result.success) {
      setQRcodeData(result.data) 
      sessionStorage.setItem('QRcodeData', JSON.stringify(result.data));
        router.push(`/memberSystem/qrcodeSelect3`)
      } else {
        console.log("錯誤")
      }
  }
  return (
    
    
      <Section>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 ">
              <SelectMenu />
            </div> 
            <div className="col-12 col-md-8">
              <div className={classNames("", styles["main-O-baground"])}> 
                <h4 className="text-title">[Qrcode兌換]</h4> 
                <StepComputer stepLevel="2" />
                <div className={classNames(styles['border-1'], styles["rd-2"], "mt-4 px-4 pt-4 pb-3")}>
                  <form className="d-flex">
                    <div className="d-flex justify-content-center searchbar align-items-center">
                      <FaSearch className="fasearch" />
                      <label htmlFor="inputPassword2" className="visually-hidden">Password</label>
                      <input  ref={myRef} type="text" style={{ height: "40px", width: "100%", textIndent: "30px", borderRadius: "20px", padding: " 0 100px 0  20px" }} className="form-control" id="inputPassword2" placeholder="搜尋產品名稱" />
                      <button type="submit"
                      onClick={(e)=>handleString(e)}
                        className={classNames("btn submit", styles["btn-parmary"])}
                      >搜尋</button>

                    </div> 
                  </form>  
                </div> 
                <h4 className='creditTitle credit   text-smtitle' style={{ border: 0 }}>我的商品</h4>
                <div className={classNames(styles['border-1'], "px-4 py-3 mt-4", styles["rd-2"])}>
                  <QrcodeRecord />
                </div> 
              </div>
              <div className="d-flex justify-content-center align-items-center"> 
                { /* <QrcodeCurrent />*/} 
                <button type="button" onClick={() => pages("qrcodeSelect1")} className={classNames("btn btn-outline-primary", qrcodeStyle["qrcodeRecord"])}>
                  上一步
                </button> 
                <button type="button"
                onClick={(e) => {
               
                 createQrcode(e);
               }} 
               
               className={classNames("btn btn-outline-primary",qrcodeStyle["qrcodeRecord"])}  
              >
                 下一步
               </button>
              </div>
            </div>
          </div> 
        </div>
      </Section>
  
  );
}


