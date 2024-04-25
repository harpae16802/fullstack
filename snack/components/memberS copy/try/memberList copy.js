 
import Image from "next/image";
import { Inter } from "next/font/google";    
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import selectNav from "@/data/memberList";
import Link from "next/link";
import styles from "@/styles/form.module.css"
import classNames from "classnames";
export default function Home() {

  const [memberPage,setMemberPage]=useState("memberData")

  return (
    <>
    <div className="list-group border-1">
    {selectNav.data.map((v,i)=>{ 
      return(
        <Link href={v.href || '/'}  onClick={()=>setMemberPage(v.type)}
        key={i}
         className={classNames(
          `list-group-item list-group-item-action
           ${(v.type==memberPage?"active":"")}`,
           styles["text-parmary-nav"],
         )} 
         aria-current="true">{v.title}</Link>
      )
    })}
    </div>
    </>
  );
}
