// 內建
import React from "react";
// icons
import { FaThumbsUp, FaPlus } from "react-icons/fa";
// 樣式
import style from "./style.module.scss";

export default function ProductCard({
  imgUrl = "",
  title = "",
  price = "",
  percentage = "",
  pepole = "",
}) {
  return (
    <div className={style.card}>
      <div className={style.imgDiv}>
        <img src={imgUrl} className={style.img} />
        <button className={style.addBtn}>
          <FaPlus />
        </button>
      </div>
      <div className={style.textDiv}>
        <h5 className={`fw-bold mb-0`}>{title}</h5>
        <div className="d-flex align-items-center">
          <span className={style.price}>${price}</span>
          <span className="d-flex align-items-center">
            <FaThumbsUp className={style.icon} />
            {percentage}% ({pepole})
          </span>
        </div>
      </div>
    </div>
  );
}
