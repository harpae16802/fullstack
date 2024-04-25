import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import Point from '../others/point'
import Image from 'next/image'
import Link from 'next/link'
import styles from "@/styles/form.module.css"
import Pagination from '@/components/memberS/others/pagination'
import { FaHeart } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import favStyle from "@/styles/fav.module.css";
import favoriteApi from '@/api/favoriteApi'

export default function ticket() {
  const [tab, settab] = useState(1); 
  const [isBigScreen, setIsBigScreen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const [products,setProducts]=useState([]);
  const [stores,setStores]=useState([]);
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
  useEffect(()=>{
    (async function (){
      const fav1=await favoriteApi.favoriteSearch01Product() 
      if(fav1.success){
        setProducts(fav1.data.data);
      }
      const fav2=await favoriteApi.favoriteSearch02Store()
      console.log(fav2)
      if(fav2.success){ 
        setStores(fav2.data);
      }
    })();
  },[])



  return (
    // qrcodem.module
    <div className={classnames(favStyle["favaite"])}>
    <ul className={classnames("nav nav-tabs d-flex flex-grow-1 px-5")}>
    <li className="nav-item flex-grow-1">
      <Link onClick={(e) => { e.preventDefault(); settab(1) }} aria-current="page" href="/memberSystem/ticket" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles["btn-parmary-white"], `${tab == 1 && styles["active"]}`)}>收藏商品</Link>
    </li>
    <li className="nav-item flex-grow-1">
      <Link onClick={(e) => { e.preventDefault(); settab(2) }} aria-current="page" href="/memberSystem/ticket/?id=2" style={{ border: "2px solid grey" }} className={classnames("nav-link me-1", styles['border-1'], `${tab == 2 && styles["active"]}`, styles["btn-parmary-white"])}>收藏店家</Link>
    </li>
   
  </ul>
      {/* tab1*/}
      {tab == 1 && (
        <div className=" border1">
          <div className={classnames("itemgroup item1", styles["mb-0"])}>

            {/* flexBetween */}
            {products.map((v, i) => {
              return (
                <div className="creditItem number countGroup" key={i} >
                  <div className={classnames("itemgroup item1", styles["mb-0"])}>
                    {/* flexBetween */}
                    <div className={classnames(styles['border-1-grey'], favStyle["wrap2"], "mx-0 px-3 py-3", styles.flexBetween)}>
                      <div style={{ textAlign: "start" }} className={classnames(favStyle["postion-a1"])}>
                        <Image src="/ch.jpeg" alt="Description" width={90} height={90} />
                      </div>
                      <div className={classnames(favStyle["postion-a2"])}>
                        <small>{v.created_at}</small>
                        <h6 className={classnames(styles['btn-parmary-transparent'])}>{v.product_name} { isTabletOrMobile && (<FaHeart className='text-color iconsize' />)}</h6>
                       
                     
                        </div>


                      <div className={classnames("md-content mx-full", favStyle["postion-a4"])}>
                      {isBigScreen && (  <button type="submit" style={{ height: "50px" }} className={classnames("btn  recordBtn", styles["btn-parmary"])}>加入最愛<FaHeart className=' ms-2 colorw iconsize' /> </button>)}
   
                      </div>

                    </div>
                  </div>
                </div>
              )
            })
            }

          </div>
        </div>
      )}
      {/* tab2*/}
      {tab == 2 && (
        <div className=" border1">
          <div className={classnames("itemgroup item1", styles["mb-0"])}> 
            {/* flexBetween */}
            {stores.map((v, i) => {
              return (
                <div className="creditItem number countGroup" key={i} >
                  <div className={classnames("itemgroup item1", styles["mb-0"])}>
                    {/* flexBetween */}
                    <div className={classnames(styles['border-1-grey'], favStyle["wrap2"], "mx-0 px-3 py-3", styles.flexBetween)}>
                      <div style={{ textAlign: "start" }} className={classnames(favStyle["postion-a1"])}>
                        <Image src="/ch.jpeg" alt="Description" width={90} height={90} />
                      </div>
                      <div className={classnames(favStyle["postion-a2"])}>
                        <small>{v.created_at}</small>
                        <h6 className={classnames(styles['btn-parmary-transparent'])}>{v.seller_id} { isTabletOrMobile && (<FaHeart className='text-color iconsize' />)}</h6>
                      </div>


                      <div className={classnames("md-content mx-full", favStyle["postion-a4"])}>
                      {isBigScreen && (  <button type="submit" style={{ height: "50px" }} className={classnames("btn  recordBtn", styles["btn-parmary"])}>加入最愛<FaHeart className='text-color iconsize' /> </button>)}
               
                      </div>

                    </div>
                  </div>
                </div>
              )
            })
            }

          </div>
        </div>
      )}

 
    </div>
  )
}
