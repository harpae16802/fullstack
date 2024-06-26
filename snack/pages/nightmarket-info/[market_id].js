import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import SectionNopaddin from '@/components/layout/section-nopaddin';
import SearchBar from '@/components/common/search-bar';
import CategoryCard from '@/components/nightmarket-info/category/category-card';
import Night from '@/components/nightmarket-info/night/night';
import ShopCard from '@/components/nightmarket-info/shop-card/shop-card';
import {
  MARKET_SELLER,
  CATEGORY,
  MARKET,
  STORE_RATINGS,
  API_SERVER,
} from '@/components/config/api-path';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './nightmarket-info.module.scss';

export default function NightmarketInfo({ initialMarketData }) {
  if (!initialMarketData) {
    return <div>Loading...</div>;
  }
  
  const router = useRouter();
  const { market_id } = router.query;

  const [featuredShops, setFeaturedShops] = useState([]); // 夜市店家圖片(3)
  const [allShops, setAllShops] = useState([]); // 所有商家的數據
  const [banner, setBanner] = useState([]); // ad banner

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 8000,
    autoplaySpeed: 8000,
    cssEase: 'linear',
    pauseOnDotsHover: true,
  };

  const categories = [
    {
      id: 6,
      imgUrl: '/images/category-main.png',
      title: '主食',
      imgStyle: { top: '-50px', left: '-56px' },
    },
    {
      id: 5,
      imgUrl: '/images/category-snack.png',
      title: '小吃',
      imgStyle: { top: '-60px', left: '-56px' },
    },
    {
      id: 4,
      imgUrl: '/images/category-soup.png',
      title: '湯品',
      imgStyle: { top: '-30px', left: '-64px' },
    },
    {
      id: 3,
      imgUrl: '/images/category-sweet.png',
      title: '甜品',
      imgStyle: { top: '-50px', left: '-56px' },
    },
    {
      id: 1,
      imgUrl: '/images/category-saltynacks.png',
      title: '點心',
      imgStyle: { top: '-46px', left: '-50px' },
    },
    {
      id: 2,
      imgUrl: '/images/category-drink.png',
      title: '飲料',
      imgStyle: { top: '-40px', left: '-52px' },
    },
  ];

  const marketInfo = initialMarketData[0] || {};

  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await fetch(`${CATEGORY}/${categoryId}`);
      const filteredShops = await response.json();
      if (!Array.isArray(filteredShops)) {
        console.error('分類店家數據格式錯誤:', filteredShops);
        setAllShops([]); // 清空列表
        return;
      }

      if (filteredShops.length > 0) {
        const ratingsResponse = await fetch(`${STORE_RATINGS}/${market_id}`);
        const ratingsData = await ratingsResponse.json();
        if (!Array.isArray(ratingsData)) {
          console.error('評分數據格式錯誤:', ratingsData);
          setAllShops([]); // 清空列表
          return;
        }

        const shopsWithRatings = filteredShops.map((shop) => {
          const ratingInfo =
            ratingsData.find((rating) => rating.seller_id === shop.seller_id) || {};
          return {
            ...shop,
            score: Number(ratingInfo.average_night_rating),
            commentCount: ratingInfo.total_comments,
          };
        });

        setAllShops(shopsWithRatings); // 更新顯示篩選後的店家列表
      } else {
        setAllShops([]); // 如果沒有找到任何店家，清空列表
      }

      const shopListElement = document.getElementById('shopList');
      if (shopListElement) {
        shopListElement.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('獲取分類店家數據失敗:', error);
    }
  };

  const mapDayToChinese = (dayNumber) => {
    const dayMapping = {
      7: '日',
      1: '一',
      2: '二',
      3: '三',
      4: '四',
      5: '五',
      6: '六',
    };
    return dayMapping[dayNumber] || '未知';
  };

  const formatTime = (time) => {
    return time.slice(0, 5);
  };

  useEffect(() => {
    if (!market_id) return;

    const fetchData = async () => {
      try {
        const marketResponse = await fetch(`${MARKET_SELLER}/${market_id}`);
        const marketData = await marketResponse.json();
        if (!Array.isArray(marketData)) {
          console.error('商家數據格式錯誤:', marketData);
          return;
        }

        const ratingsResponse = await fetch(`${STORE_RATINGS}/${market_id}`);
        const ratingsData = await ratingsResponse.json();
        if (!Array.isArray(ratingsData)) {
          console.error('評分數據格式錯誤:', ratingsData);
          return;
        }

        const shopsWithRatings = marketData.map((shop) => {
          const ratingInfo =
            ratingsData.find((rating) => rating.seller_id === shop.seller_id) || {};
          return {
            ...shop,
            score: Number(ratingInfo.average_night_rating),
            commentCount: ratingInfo.total_comments,
          };
        });

        const shopImages = shopsWithRatings.map((shop) => shop.store_image);
        setFeaturedShops(shopImages.slice(0, 3));
        setAllShops(shopsWithRatings);

        const bannerResponse = await fetch(`${MARKET}/ad/banner`);
        const bannerData = await bannerResponse.json();
        if (!Array.isArray(bannerData)) {
          console.error('廣告數據格式錯誤:', bannerData);
          return;
        }

        const fixedPaths = bannerData.map((ad) => ({
          ...ad,
          image_path: ad.image_path.replace(/\\/g, '/'),
        }));
        setBanner(fixedPaths);
      } catch (error) {
        console.error('獲取數據失敗:', error);
      }
    };

    fetchData();
  }, [market_id]);

  return (
    <SectionNopaddin>
      <Slider {...settings} className={`col-12 ${style.bannerAd}`}>
        {banner.map((v, i) => (
          <div key={i}>
            <img
              src={`${API_SERVER}/public/${v.image_path}`}
              alt={`Image ${i + 1}`}
              className={style.bannerImg}
            />
          </div>
        ))}
      </Slider>

      <SearchBar />

      <div className={`container-fluid ${style.content}`}>
        <div className={`row ${style.category}`}>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`col-xs-6 col-md-2 d-flex justify-content-center ${style.categoryCard}`}
            >
              <CategoryCard
                {...category}
                onClick={() => handleCategoryClick(category.id)}
              />
            </div>
          ))}
        </div>

        <div className={`row`}>
          <div className="col">
            <Night
              nightName={marketInfo.market_name}
              introduction={marketInfo.market_introduction}
              nightImg={marketInfo.market_img}
              store_image={featuredShops}
              market_id={market_id}
            />
          </div>
        </div>

        <div className={`row`}>
          <div className="col-xs-12">
            <h3 className={style.shopsTitle} id="shopList">
              店家列表
            </h3>
          </div>
        </div>

        <div className={`row ${style.shopCard}`}>
          {allShops.map((seller, index) => {
            const handleCardClick = () => {
              router.push(`http://localhost:3000/shop-products/${seller.seller_id}`);
            };
            const restDayChinese = mapDayToChinese(seller.rest_day);
            const openingTime = formatTime(seller.opening_hours);
            const closingTime = formatTime(seller.closing_hours);
            return (
              <div
                key={index}
                className={`col-3 d-flex justify-content-center ${style.col}`}
              >
                <ShopCard
                  imgUrl={`${API_SERVER}/public/${seller.store_image}`}
                  title={seller.store_name}
                  time1={`每周${restDayChinese}休息`}
                  time2={`下午${openingTime}到凌晨${closingTime}`}
                  score={seller.score ? seller.score.toFixed(1) : 0}
                  comment={
                    seller.commentCount
                      ? `(${seller.commentCount}則留言)`
                      : '(暫無評論)'
                  }
                  onClick={handleCardClick}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="topicon" onClick={() => window.scrollTo(0, 0)}>↑TOP</div>
    </SectionNopaddin>
  );
}

export async function getServerSideProps(context) {
  let initialMarketData = [];

  try {
    const { market_id } = context.params;

    const response = await fetch(`${MARKET}/${market_id}`);
    if (response.ok) {
      initialMarketData = await response.json();
    } else {
      console.error('API response error:', response.statusText);
    }
  } catch (error) {
    console.error('获取市场数据失败', error);
  }

  return {
    props: {
      initialMarketData,
    },
  };
}
