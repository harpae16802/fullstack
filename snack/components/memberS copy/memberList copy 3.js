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
  }, []); // 添加了空数组作为 useEffect 的第二个参数，确保 useEffect 只在组件挂载时执行一次

  //  {/* select 表單選單 */}
  return (
    <div className={classNames(styles["lg-open"])}>
      {/* select 表單選單 */}
      <div className="accordion memeberList " id="accordionExample">
        {selectpage.map((v, i) => (
          <div className={`accordion-item ${v.list && 'accordion-drop'}`} key={i}>
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="true" aria-controls={`#collapse${i}`}>
              {v.title}
              </button>
            </h2>
            {v.list &&
              v.list.map((v2, i2) => (

              <div id={`collapse${i}`} key={v.title} className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                {v2.title}
                 </div>
              </div>
            ))}

          </div>
        ))}

      </div>
    </div>
  );
}