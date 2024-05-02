
import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import selectNav from "@/data/memberList";
import Link from "next/link";
import styles from "@/styles/form.module.css"
import classNames from "classnames";
import { FaAngleDown } from "react-icons/fa";
export default function Home() {

  const [selectpage, setSelectpage] = useState(selectNav.data);
  const [memberPage, setMemberPage] = useState("memberData");
  useEffect(() => {
    const newSelectpage = [...selectpage];

    newSelectpage.forEach((v, i) => {
      if (v.list) {
        newSelectpage[i].toggle = false
      }
    })
    setSelectpage(newSelectpage);
    console.log(newSelectpage)

  }, []) 

  return (
    <>
      <div className="list-group border-1" key="Home">
        {selectpage.map((v, i) => {

          return (
            <>
              <Link href={v.href || '#'}
              
              key={i}
              onClick={() => {
                setMemberPage(v.type); 

                const newpage = [...selectpage];
                newpage[i].toggle = !newpage.toggle;
                setSelectpage(newpage);
                console.log(newpage)

              }} 
                className={classNames(
                  `list-group-item list-group-item-action
                  
           ${(v.type == memberPage ? "active" : "")}`,
                  styles["text-parmary-nav"],
                )}
                aria-current="true">   {v.list ? <FaAngleDown /> : '\u00A0\u00A0\u00A0'}{v.title}</Link>
              {v.list ? v.list.map((v, i) => {

                return (
                  <Link href={v.href || '/'} 
                  key={v.type}
                  onClick={() => {
                    setMemberPage(v.type)  

                  }} 

                    className={classNames(
                      `list-group-item list-group-item-action
                    ${(v.toggle ? "itemShow" : "itemClose")}
                    ${(v.type == memberPage ? "active" : "")}`,
                      styles["text-parmary-nav"],
                    )}
                    aria-current="true">{'\u00A0\u00A0\u00A0\u00A0' + v.title}{v.toggle?"111":"false"} </Link>

                )
              }) : ''}

            </>


          )
        })}
      </div>
    </>
  );
}
