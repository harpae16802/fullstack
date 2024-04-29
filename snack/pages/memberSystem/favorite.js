

import SelectMenu from "@/components/memberS/person/selectMenu";
import Favaite from "@/components/memberS/favaite/favrate"
import Search from "@/components/memberS/qrcode/searchbar"
import styles from "@/styles/form.module.css"
import { FaSearch } from "react-icons/fa";
import Pagination from "@/components/memberS/others/pagination"
import QrcodeCurrent from "@/components/modal/qrcodeCurrent";
import classNames from 'classnames'
import { useEffect,useRef, useState } from "react";
import Section from "@/components/layout/section";
import { useRouter } from "next/router";
export default function QrcodeselectMobile1() {
  const myRef = useRef(null); 
  const router = useRouter();
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsBigScreen(window.innerWidth > 500);
      setIsTabletOrMobile(window.innerWidth <= 500);
    };

    // 監聽視窗大小變化
    window.addEventListener('resize', handleResize);
    // 初始設置一次
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [])
  const setStoredQRdata = (search) => {

  }
  const handleString = (e) => {
    e.preventDefault();
    
    const node = myRef.current.value;
    const queryString = '/memberSystem/favorite/?search='+node;
 
    // 使用 push 方法将带有查询字符串的 URL 添加到路由中
    router.push(`${queryString}`); 
  };

  return (
    <Section>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 r">
            <SelectMenu />
          </div>
          <div className="col-12 col-md-8">
            <div className={classNames("", styles["main-O-baground"])}>
              <h4 className="text-title">[我的最愛]</h4>
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
              <div className={classNames(styles['border-1'], "px-4 py-3 mt-4", styles["rd-2"])}>
                <Favaite />
              </div>
              <Pagination />
              <div className="d-flex justify-content-center align-items-center">
                <QrcodeCurrent />
                <button type="submit" className={classNames("btn  px-5 mx-2", styles["btn-parmary"], styles["rd-30"])}>上一步 </button>
                <button type="submit" className={classNames("btn  px-5 mx-2", styles["btn-parmary"], styles["rd-30"])}>下一步 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}


