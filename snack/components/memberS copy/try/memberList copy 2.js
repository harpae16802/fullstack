import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { selectNav } from "@/data/memberList";
import Link from "next/link";
import styles from "@/styles/form.module.css";
import classNames from "classnames";
import { FaAngleDown } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [selectPage, setSelectPage] = useState(selectNav.data);
  const [memberPage, setMemberPage] = useState("memberData");

  useEffect(() => {
    const newSelectPage = selectPage.map((item) => ({
      ...item,
      toggle: item.list ? false : undefined,
    }));
    setSelectPage(newSelectPage);
  }, []);

  const handleItemClick = (index) => {
    const newSelectPage = [...selectPage];
    newSelectPage[index].toggle = !newSelectPage[index].toggle;
    setSelectPage(newSelectPage);
    setMemberPage(newSelectPage[index].type);
  };

  return (
    <div className="list-group border-1" key="Home">
      {selectPage.map((item, index) => (
        <div key={index}>
          <Link
            href={item.href || "#"}
            onClick={() => handleItemClick(index)}
            className={classNames(
              "list-group-item list-group-item-action",
              { active: item.type === memberPage },
              styles["text-parmary-nav"]
            )}
            aria-current="true"
          >
            {item.list ? <FaAngleDown /> : "\u00A0\u00A0\u00A0"}
            {item.title}
          </Link>
          {item.list &&
            item.toggle &&
            item.list.map((subItem, subIndex) => (
              <Link
                href={subItem.href || "/"}
                key={subItem.type}
                onClick={() => setMemberPage(subItem.type)}
                className={classNames(
                  "list-group-item list-group-item-action",
                  { active: subItem.type === memberPage },
                  styles["text-parmary-nav"]
                )}
                aria-current="true"
              >
                {"\u00A0\u00A0\u00A0\u00A0" + subItem.title}
              </Link>
            ))}
        </div>
      ))}
    </div>
  );
}
