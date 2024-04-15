import { Inter } from "next/font/google";
import { useState, useEffect } from "react"; // 添加了 useEffect 的引入
const inter = Inter({ subsets: ["latin"] });
import selectNav from "@/data/memberList";
import Link from "next/link";
import styles from "@/styles/form.module.css";
import classNames from "classnames";
import {
  FaBars,
  FaReceipt 
} from 'react-icons/fa' 
export default function Home() {
  const [memberPage, setMemberPage] = useState("memberData");
  const [selectpage, setSelectpage] = useState(selectNav.dataMobile);

  useEffect(() => {
    const newSelectpage = [...selectpage];

    newSelectpage.forEach((v, i) => {
      if (v.list) {
        newSelectpage[i].toggle = false;
      }
    });
    setSelectpage(newSelectpage);
  }, []); // 添加了空数组作为 useEffect 的第二个参数，确保 useEffect 只在组件挂载时执行一次

  //  {/* select 表單選單 */}
  return (
    <div className={classNames(styles["md-open"],"border-1-main")}>
      {/* select 表單選單 */}
      <button
      className="navbar-toggler text-color d-flex justify-content-center "
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent000"
      aria-controls="navbarSupportedContent000"
      aria-expanded="false"
      aria-label="Toggle navigation"
  
  >
      <FaBars/> 目錄 <FaReceipt />
    </button>
          
      <div className="container collapse navbar-collapse" id="navbarSupportedContent000"> 
       <div className="navbar-nav accordion memeberList row" >
        {selectpage.map((v, i) => (
          <div className={`nav-item col-12 accordion-item ${v.list && 'accordion-drop'}`}  key={i}>
            <h2 className=" accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="true" aria-controls={`#collapse${i}`}>
              {v.title}
              </button>
            </h2> 

          </div>
        ))}

      </div>
      </div>
    
    </div>
  );
}