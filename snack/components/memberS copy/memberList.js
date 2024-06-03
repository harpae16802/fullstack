import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });
import { selectNav } from "@/data/memberList";
import Link from "next/link";
import styles from "@/styles/form.module.css";
import classNames from "classnames";

export default function Home() {
  const [memberPage, setMemberPage] = useState("memberData");
  const [selectpage, setSelectpage] = useState(selectNav.data);

  useEffect(() => {
    const newSelectpage = selectpage.map((v) => {
      if (v.list) {
        return { ...v, toggle: false };
      }
      return v;
    });
    setSelectpage(newSelectpage);
  }, []);

  const handleToggle = (index) => {
    setSelectpage((prev) =>
      prev.map((v, i) => (i === index ? { ...v, toggle: !v.toggle } : v))
    );
  };

  return (
    <div>
      <div className={classNames(styles["border-1"], "accordion", "memberList")} id="accordionExample">
        {selectpage.map((v, i) => (
          <div className={`accordion-item ${v.list && "accordion-drop"}`} key={i}>
            <h2 className="accordion-header" id={`heading${i}`}>
              {v.href ? (
                <Link href={v.href}>
                  <button
                    className="accordion-button"
                    type="button"
                    aria-expanded={v.toggle}
                    aria-controls={`collapse${i}`}
                    onClick={() => setMemberPage(v.type)}
                  >
                    {v.title}
                  </button>
                </Link>
              ) : (
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${i}`}
                  aria-expanded={v.toggle}
                  aria-controls={`#collapse${i}`}
                  onClick={() => handleToggle(i)}
                >
                  {v.title}
                </button>
              )}
            </h2>
            {v.list && (
              <div
                id={`collapse${i}`}
                className={`accordion-collapse collapse ${v.toggle ? "show" : ""}`}
                aria-labelledby={`heading${i}`}
                data-bs-parent="#accordionExample"
              >
                {v.list.map((v2, i2) => (
                  <Link href={v2.href} key={v2.type}>
                    <div className="accordion-body" id="accordion-title">
                      {v2.title}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
