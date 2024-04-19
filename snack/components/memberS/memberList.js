import { Inter } from "next/font/google";
import { useState, useEffect } from "react"; // 添加了 useEffect 的引入
const inter = Inter({ subsets: ["latin"] });
import selectNav from "@/data/memberList";
import Link from "next/link";
import styles from "@/styles/form.module.css";
import classNames from "classnames";

export default function Home() {
  const [memberPage, setMemberPage] = useState("memberData");
  const [selectpage, setSelectpage] = useState(selectNav.data);

  useEffect(() => {
    const newSelectpage = [...selectpage];

    newSelectpage.forEach((v, i) => {
      if (v.list) {
        newSelectpage[i].toggle = false;
      }
    });
    setSelectpage(newSelectpage);
  }, []); // 添加了空数组作为 useEffect 的第二个参数，确保 useEffect 
  
  //  {/* select 表單選單 */}
  return (
    <div >
      {/* select 表單選單 */}
      <div className={classNames(styles["border-1"],"accordion memeberList" )} id="accordionExample">
        {selectpage.map((v, i) => (
          <div className={`accordion-item ${v.list && 'accordion-drop'}`} key={i}>
            <h2 className="accordion-header" id="headingOne">
              {v.href &&
                <Link href={v.href}>
                
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="true" aria-controls={`#collapse${i}`}>
                    {v.title}
                  </button>
                </Link>
              }
              
            </h2> 

          </div>
        ))}

      </div>
    </div>
  );
}