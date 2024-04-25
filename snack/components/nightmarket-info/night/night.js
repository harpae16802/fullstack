import React from "react";
// icons
import { FaBusAlt } from "react-icons/fa";
// 樣式
import style from "./style.module.scss";

export default function Night() {
  return (
    <div className={`${style.container}`}>
      {/* 標題 */}
      <div className="row">
        <div className="col-12">
          <h3 className={style.nightName}>饒河街觀光夜市</h3>
        </div>
      </div>

      {/* 夜市資訊 */}
      <div className={`row ${style.nightInfo}`}>
        {/* 桌面版 */}
        <div className={`col-lg-8 d-none d-lg-block ${style.left}`}>
          <img
            src="/images/night01.jpg"
            alt="饒河街夜市全景"
            className={style.bigImage}
          />
          <div className="row">
            <div className="col-4">
              <img
                src="/images/shop02.jpg"
                alt="商店一"
                className={style.smallImage}
              />
            </div>
            <div className="col-4">
              <img
                src="/images/shop02.jpg"
                alt="商店二"
                className={style.smallImage}
              />
            </div>
            <div className="col-4">
              <img
                src="/images/shop02.jpg"
                alt="商店三"
                className={style.smallImage}
              />
            </div>
          </div>
        </div>
        {/* 手機版 */}
        <div className="col-12 d-lg-none p-0 mb-2">
          <div className={`d-flex overflow-auto ${style.scrollbar}`}>
            <img
              src="/images/night01.jpg"
              alt="饒河街夜市全景"
              className={`${style.mobileImg} img-fluid`}
            />
            <img
              src="/images/shop02.jpg"
              alt="商店一"
              className={`${style.mobileImg} img-fluid`}
            />
            <img
              src="/images/shop02.jpg"
              alt="商店二"
              className={`${style.mobileImg} img-fluid`}
            />
            <img
              src="/images/shop02.jpg"
              alt="商店三"
              className={`${style.mobileImg} img-fluid`}
            />
          </div>
        </div>

        {/* 右邊文字資訊 */}
        <div className={`col-12 col-lg-4 pt-0 pb-0 ${style.right}`}>
          <div className="row">
            <p className={`p-0 ${style.p}`}>
              饒河街夜市位於松山區八德路四段及撫遠街間的饒河街，全長600公尺，是臺北市區的大型觀光夜市之一。停泊船隻漸少，再加上八德路拓寬後，饒河街成為次要道路，商業活動大減。政府為了改善當地商家生計，遂於民國76年（西元1987年）將南松山橋下有照攤販集中至饒河街，規劃為五百公尺長，為臺北市第二條觀光夜市。攤位整齊，內容琳琅滿目，蚵仔麵線、牛雜麵。
            </p>
          </div>
          <div className={`row ${style.traffic}`}>
            <div className={style.title}>
              <FaBusAlt className={style.icon} />
              <h4 className={`m-0 fw-bold`}>大眾交通資訊</h4>
            </div>
            <div className={style.trafficInfo}>
              <div>
                <span className={`pe-4`}>公車</span>
                <span>榮富國小站</span>
              </div>
              <span>350公尺</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
