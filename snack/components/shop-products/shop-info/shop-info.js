import React, { useState } from "react";
// icons
import { FaRegClock, FaRegStar, FaRegHeart, FaHeart } from "react-icons/fa";
// fetch 網址
import { FAVORITE_STORE } from "@/components/config/api-path";
// 樣式
import style from "./style.module.scss";

export default function ShopInfo({
  seller_id,
  shopName = "",
  time1 = "",
  time2 = "",
  score = "",
  comment = "",
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = async () => {
    try {
      const response = await fetch(`${FAVORITE_STORE}/${seller_id}`);
      const data = await response.json();
      if (data.success) {
        setIsFavorite(data.action === "add");
      } else {
        // 處理錯誤情況
        console.error("Failed to toggle favorite:", data.error);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className={`row ${style.shopInfo}`}>
      <div className={`col-12 d-flex ${style.title}`}>
        <h1 className={`fw-bold mb-0`}>{shopName}</h1>
        {isFavorite ? (
          <FaHeart className={`${style.icon}`} onClick={toggleFavorite} />
        ) : (
          <FaRegHeart className={`${style.icon}`} onClick={toggleFavorite} />
        )}
      </div>
      <div className={`col-12 d-flex align-items-center`}>
        <FaRegClock className={style.icon} />
        <span className={style.span}>{time1}</span>
        <span>{time2}</span>
      </div>
      <div className={`col-12 d-flex align-items-center`}>
        <FaRegStar className={style.icon} />
        <span className={style.span}>{score}</span>
        <span>({comment})</span>
        <a href="#" className={style.comment}>
          查看評論
        </a>
      </div>
    </div>
  );
}
