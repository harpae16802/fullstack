import React from "react";
// icons
import { FaThumbsUp, FaPlus } from "react-icons/fa";
// 樣式
import style from "./style.module.scss";

export default function ProductCard2({
  title = "",
  price = "",
  percentage = "",
  pepole = "",
  imgUrl = "",
}) {
  return (
    <div className={`p-0 d-flex ${style.productCard2}`}>
      <div
        className={`d-flex flex-column justify-content-center ${style.text}`}
      >
        <h5 className="mb-0">{title}</h5>
        <div className={`d-flex align-items-center`}>
          <span className={style.price}>${price}</span>
          <FaThumbsUp className={style.icon} />
          <span>{percentage}%</span>
          <span>({pepole})</span>
        </div>
        <p className={`mb-0 ${style.p}`}>
          含3支 吮指回味翅小腿~ 口味選擇：椒鹽、辣妹、苔客、梅子、韓式
        </p>
      </div>
      <img src={imgUrl} alt={title} className={style.img} />
      <button className={style.addBtn}>
        <FaPlus />
      </button>
    </div>
  );
}
