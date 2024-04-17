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
    <>
    {/* select 表單選單 */}
      <div className="list-group border-1">
        {selectpage.map((v, i) => (
          <div key={i}>
            <Link
              href={v.href || "#"}
              onClick={() => {
                setMemberPage(v.type);

                // 复制 selectpage 数组
                const newSelectpage = [...selectpage];

                // 如果当前项有子项列表，则切换子项列表的显示状态
                if (v.list) {
                  newSelectpage[i].toggle = !newSelectpage[i].toggle;
                }

                setSelectpage(newSelectpage);
              }}
              className={classNames(
                `list-group-item list-group-item-action ${
                  v.type == memberPage ? "active" : ""
                }`,
                styles["text-parmary-nav"]
              )}
              aria-current="true"
            >
              {v.title}
            </Link>

            {/* 如果当前项的 toggle 属性为 true，则渲染子项列表 */}
            {v.list &&
              v.list.map((v2, i2) => (
                <Link
                  key={i2}
                  href={v2.href || "/"}
                  onClick={() => {
                    setMemberPage(v2.type);
                  }}
                  className={classNames(
                    `list-group-item list-group-item-action 
                    ${v.toggle ? "itemShow" : "itemClose"
                    } ${v2.type == memberPage ? "active" : ""}`,
                    styles["text-parmary-nav"]
                  )}
                  aria-current="true"
                >
                  {"\u00A0\u00A0\u00A0\u00A0" + v.title}
                </Link>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}