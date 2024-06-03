import React, { useEffect, useState } from "react";
// 元件
import SectionNopaddin from "@/components/layout/section-nopaddin";
import SearchBar from "@/components/common/search-bar";
import CategoryCard from "@/components/nightmarket-info/category/category-card";
import Night from "@/components/nightmarket-info/night/night";
import ShopCard from "@/components/nightmarket-info/shop-card/shop-card";
// api-path
import {
  MARKET_SELLER,
  CATEGORY,
  MARKET,
  STORE_RATINGS,
  API_SERVER,
} from "@/components/config/api-path";
// 樣式
import style from "./nightmarket-info.module.scss";

export default function NightmarketInfo() {
  const [featuredShops, setFeaturedShops] = useState([]);
  const [allShops, setAllShops] = useState([]);
  const [banner, setBanner] = useState([]);

  // 食物分類物件，寫死
  const categories = [
    {
      id: 6,
      imgUrl: "/images/category-main.png",
      title: "主食",
      imgStyle: { top: "-50px", left: "-56px" },
    },
    {
      id: 5,
      imgUrl: "/images/category-snack.png",
      title: "小吃",
      imgStyle: { top: "-60px", left: "-56px" },
    },
    {
      id: 4,
      imgUrl: "/images/category-soup.png",
      title: "湯品",
      imgStyle: { top: "-30px", left: "-64px" },
    },
    {
      id: 3,
      imgUrl: "/images/category-sweet.png",
      title: "甜品",
      imgStyle: { top: "-50px", left: "-56px" },
    },
    {
      id: 1,
      imgUrl: "/images/category-saltynacks.png",
      title: "點心",
      imgStyle: { top: "-46px", left: "-50px" },
    },
    {
      id: 2,
      imgUrl: "/images/category-drink.png",
      title: "飲料",
      imgStyle: { top: "-40px", left: "-52px" },
    },
  ];

  // 使用 useEffect 來獲取數據
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured shops
        const featuredResponse = await fetch(`${MARKET_SELLER}`);
        const featuredData = await featuredResponse.json();
        setFeaturedShops(featuredData.slice(0, 3));

        // Fetch all shops
        const allResponse = await fetch(`${MARKET_SELLER}`);
        const allData = await allResponse.json();
        setAllShops(allData);

        // Fetch banner ads
        const bannerResponse = await fetch(`${MARKET}/ad/banner`);
        const bannerData = await bannerResponse.json();
        const fixedPaths = bannerData.map((ad) => ({
          ...ad,
          image_path: ad.image_path.replace(/\\/g, "/"),
        }));
        setBanner(fixedPaths);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SectionNopaddin>
      <img
        src="/images/shop-banner01.jpg"
        alt="bannerAd"
        className={style.bannerAd}
      />

      <SearchBar />

      <div className={`container-fluid ${style.content}`}>
        <div className={`row ${style.category}`}>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`col-xs-6 col-md-2 d-flex justify-content-center ${style.categoryCard}`}
            >
              <CategoryCard {...category} />
            </div>
          ))}
        </div>

        <div className={`row`}>
          <div className="col">
            <Night />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <h3 className={style.shopsTitle}>店家列表</h3>
          </div>
        </div>

        <div className={`row ${style.shopCard}`}>
          {allShops.map((shop, index) => (
            <div
              key={index}
              className={`col d-flex justify-content-center ${style.col}`}
            >
              <ShopCard
                imgUrl={`${API_SERVER}/public/${shop.store_image}`}
                title={shop.store_name}
                time1={`每周${shop.rest_day}休息`}
                time2={`下午${shop.opening_hours}到凌晨${shop.closing_hours}`}
                score={shop.score ? shop.score.toFixed(1) : 0}
                comment={
                  shop.commentCount
                    ? `(${shop.commentCount}則留言)`
                    : "(暫無評論)"
                }
              />
            </div>
          ))}
        </div>
      </div>
    </SectionNopaddin>
  );
}
