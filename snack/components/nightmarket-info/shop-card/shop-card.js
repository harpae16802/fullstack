import React from "react";
// icons
import { FaRegClock, FaRegStar } from "react-icons/fa";
// 樣式
import style from "./style.module.scss";

export default function ShopCard({
  imgUrl = "",
  title = "",
  time1 = "",
  time2 = "",
  score = "",
  comment = "",
}) {
  return (
    <div className={style.card}>
      <img src={imgUrl} alt={`${title}`} className={style.img} />
      <div className={style.text}>
        <h5 className={style.title}>{title}</h5>
        <div className={style.time}>
          <FaRegClock className={style.icon} />
          <span className={style.span}>{time1}</span>
          <span>{time2}</span>
        </div>
        <div className={style.score}>
          <FaRegStar className={style.icon} />
          <span>
            {score} {comment}
          </span>
        </div>
      </div>
    </div>
  );
}
