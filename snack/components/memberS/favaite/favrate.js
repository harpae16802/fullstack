import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import Point from '../others/point'
import Image from 'next/image'
import Link from 'next/link'
import color from "../color.module.css";
import styles from "@/styles/form.module.css"
// import Pagination from '@/components/memberS/others/pagination'
import { FaHeart } from "react-icons/fa";
import favStyle from "@/styles/fav.module.css";
import favoriteApi from '@/api/favoriteApi'
import { useRouter } from 'next/router' 

export default function Ticket() {
  const router = useRouter();
  // tab切換
  const [tab, settab] = useState(1);
  const removeList = async (type, id) => {
    try {
      const custom_id = JSON.parse(localStorage.getItem("Nightmarket-auth")).custom_id;
      if (type === "product") {
        // favoriteDel01Product
        const fa1Del1 = await favoriteApi.favoriteDel01Product({ favorite_id: id, custom_id });
        setProducts(fa1Del1.data);
      }
      if (type === "store") { 
        const fa1Del2 = await favoriteApi.favoriteDel02Store({ favorite_id: id, custom_id });
        setStores(fa1Del2.data);
      }
    } catch (error) {
      console.error("Error in removeList:", error);
      // 在這裡處理錯誤，比如顯示錯誤訊息給用戶
    }
  }
  
  // rwd
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  // 商品資料
  const [products, setProducts] = useState([]);
  // 產品資料
  const [stores, setStores] = useState([]);
  // rwd
  useEffect(() => {
    const handleResize = () => {
      setIsBigScreen(window.innerWidth > 1200);
      setIsTabletOrMobile(window.innerWidth <= 1200);
    };

    // 監聽視窗大小變化
    window.addEventListener('resize', handleResize);
    // 初始設置一次
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [])
  // 給直
  const getDataFav = async (searchaString = "") => {
    const custom_id = JSON.parse(localStorage.getItem("Nightmarket-auth")).custom_id
    let searchqs = { custom_id: custom_id };
    // if(searchaString){
    //   searchqs["search"]=searchaString;
    // }
    try {
      // 給商品
      const fav1 = await favoriteApi.favoriteSearch01Product(searchqs, searchaString);
      if (fav1.success) {
        setProducts(fav1.data.data);
      }
      // 給商家 
      const fav2 = await favoriteApi.favoriteSearch02Store(searchqs, searchaString);
      if (fav2.success) {
        setStores(fav2.data);
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }

  useEffect(() => {
    getDataFav();
  }, []);

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const searcha = params.get('search') || "";
    const searchaString = decodeURIComponent(searcha);
    // setStoredQRdata(searchaString)
    getDataFav(searchaString);
  }, [router]);

  return (
    // qrcodem.module
    <div className={classnames(favStyle["favaite"])}>
      {/*tab*/}
      <ul className={classnames("nav nav-tabs d-flex flex-grow-1 px-5")}>
        <li className="nav-item flex-grow-1">
          <Link onClick={(e) => { e.preventDefault(); settab(1) }} aria-current="page" href="/memberSystem/ticket" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles["btn-parmary-white"], `${tab == 1 && styles["active"]}`)}>收藏商品</Link>
        </li>
        <li className="nav-item flex-grow-1">
          <Link onClick={(e) => { e.preventDefault(); settab(2) }} aria-current="page" href="/memberSystem/ticket/?id=2" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles['border-1'], `${tab == 2 && styles["active"]}`, styles["btn-parmary-white"])}>收藏店家</Link>
        </li>
      </ul>
      {/* tab1 商品*/}
      {tab == 1 && (
        <div className="border1">
          <div className={classnames("itemgroup item1", styles["mb-0"])}>
            {/* flexBetween */}
            {Array.isArray(products) && products.length > 0 ? (
              products.map((v, i) => {
                const handleRemoveProduct = () => {
                  removeList("product", v.favorite_id);
                };
                return (
                  <div className="creditItem number countGroup" key={i}>
                    <div className={classnames("itemgroup item1", styles["mb-0"])}>
                      {/* flexBetween */}
                      <div className={classnames(styles['border-1-grey'], favStyle["wrap2"], "mx-0 px-3 py-3", styles.flexBetween)}>
                        <div style={{ textAlign: "start" }} className={classnames(favStyle["postion-a1"])}>
                          <Image src={v.image_url} alt="Description" width={90} height={90} />
                        </div>
                        <div className={classnames(favStyle["postion-a2"])}>
                          <small>{v.created_at}</small>
                          <h6 className={classnames(styles['btn-parmary-transparent'])}>
                            {v.product_name} 
                            {isTabletOrMobile && (
                              <FaHeart
                                onClick={handleRemoveProduct}
                                className={classnames('text-color iconsize', color["color"])} 
                              />
                            )}
                          </h6> 
                        </div>  
                        <div className={classnames("md-content mx-full", favStyle["postion-a4"])}>
                          {isBigScreen && (
                            <button 
                              type="submit" 
                              onClick={handleRemoveProduct} 
                              style={{ height: "50px" }} 
                              className={classnames("btn recordBtn", color["color"], styles["btn-parmary"])}
                            >
                              移除最愛
                              <FaHeart className='ms-2 colorw iconsize' /> 
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <p>沒有收藏的商品</p>
            )}
          </div>
        </div>
      )}
      {/* tab2 店家*/}
      {tab == 2 && (
        <div className="border1">
          <div className={classnames("itemgroup item1", styles["mb-0"])}>
            {/* flexBetween */}
            {Array.isArray(stores) && stores.length > 0 ? (
              stores.map((v, i) => {
                const handleRemoveProduct = () => { 
                  removeList("store", v.favorite_id);
                };
                return (
                  <div className="creditItem number countGroup" key={i}>
                    <div className={classnames("itemgroup item1", styles["mb-0"])}>
                      {/* flexBetween */}
                      <div className={classnames(styles['border-1-grey'], favStyle["wrap2"], "mx-0 px-3 py-3", styles.flexBetween)}>
                        <div style={{ textAlign: "start" }} className={classnames(favStyle["postion-a1"])}>
                          <Image src={v.store_image} alt="Description" width={90} height={90} />
                        </div>
                        <div className={classnames(favStyle["postion-a2"])}>
                          <small>{v.created_at}</small>
                          <h6 className={classnames(styles['btn-parmary-transparent'])}>
                            {v.seller_id} 
                            {isTabletOrMobile && (
                              <FaHeart
                                onClick={handleRemoveProduct}
                                className={classnames('text-color iconsize', color["color"])} 
                              />
                            )}
                          </h6>
                        </div>
                        <div className={classnames("md-content mx-full", favStyle["postion-a4"])}>
                          {isBigScreen && (
                            <button 
                              onClick={handleRemoveProduct} 
                              type="submit" 
                              style={{ height: "50px" }} 
                              className={classnames("btn recordBtn", color["color"], styles["btn-parmary"])}
                            >
                              移除最愛
                              <FaHeart className='text-color iconsize' /> 
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <p>沒有收藏的店家</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
