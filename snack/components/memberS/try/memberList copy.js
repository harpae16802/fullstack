import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import { selectNav } from "@/data/memberList";
import Link from "next/link";
import styles from "@/styles/form.module.css";
import classNames from "classnames";
import { FaAngleDown } from "react-icons/fa";

export default function Home() {
  const [selectpage, setSelectpage] = useState(selectNav.data);
  const [memberPage, setMemberPage] = useState("memberData");

  useEffect(() => {
    const newSelectpage = [...selectpage];
    newSelectpage.forEach((v, i) => {
      if (v.list) {
        newSelectpage[i].toggle = false;
      }
    });
    setSelectpage(newSelectpage);
  }, []);

  const handleItemClick = (i) => {
    setMemberPage(selectpage[i].type);

    const newpage = [...selectpage];
    newpage[i].toggle = !newpage[i].toggle;
    setSelectpage(newpage);
  };

  const handleSubItemClick = (parentIndex, subIndex) => {
    setMemberPage(selectpage[parentIndex].list[subIndex].type);
  };

  return (
    <div className="list-group border-1" key="Home">
      {selectpage.map((v, i) => (
        <div key={i}>
          <Link
            href={v.href || "#"}
            onClick={() => handleItemClick(i)}
            className={classNames(
              `list-group-item list-group-item-action ${v.type == memberPage ? "active" : ""}`,
              styles["text-parmary-nav"]
            )}
            aria-current="true"
          >
            {v.list ? <FaAngleDown /> : '\u00A0\u00A0\u00A0'}
            {v.title}
          </Link>
          {v.list && v.toggle && v.list.map((subItem, subIndex) => (
            <Link
              href={subItem.href || "/"}
              key={subItem.type}
              onClick={() => handleSubItemClick(i, subIndex)}
              className={classNames(
                `list-group-item list-group-item-action ${subItem.type == memberPage ? "active" : ""}`,
                styles["text-parmary-nav"]
              )}
              aria-current="true"
            >
              {'\u00A0\u00A0\u00A0\u00A0' + subItem.title}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
