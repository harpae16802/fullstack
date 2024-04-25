import React, { useEffect, useState } from "react";
// 套件
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
// fetch 網址
import { MARKET_DATA } from "@/components/config/api-path";
// 樣式
import style from "./style.module.scss";

const MapComponent = () => {
  // 所有夜市
  const [places, setPlaces] = useState([]);

  // 地圖預設顯示台灣中心點
  const centerPosition = [23.973875, 120.982024];

  // 自定義地圖 maker
  const createCustomIcon = (market_name) => {
    return new L.divIcon({
      className: style.btn,
      html: `<button class="${style.placeBtn}">${market_name}</button>`,
      iconSize: L.point(30, 30),
      iconAnchor: [30, 30],
    });
  };

  // 撈資料呈現
  useEffect(() => {
    const fetchData = async () => {
      try {
        const r = await fetch(MARKET_DATA);
        if (!r.ok) {
          throw new Error("Network response 錯誤");
        }
        const data = await r.json();
        setPlaces(
          data.map((place) => ({
            ...place,
            position: place.latitude_and_longitude.split(", ").map(Number),
          }))
        );
      } catch (error) {
        console.log("fetch 錯誤:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <MapContainer
      center={centerPosition}
      zoom={8}
      style={{ height: "72vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {places.map((point) => (
        <Marker
          key={point.market_id}
          position={point.position}
          icon={createCustomIcon(point.market_name)}
        >
          <Popup offset={L.point(46, -24)} className={style.popup}>
            <div className={style.card}>
              <img
                src={`/images/night/${point.market_img}`}
                alt=""
                className={style.img}
              />
              <div className={`d-flex justify-content-between ${style.text}`}>
                <div>
                  <h4 className="fw-bold">{point.market_name}</h4>
                  <a href="#" className={`text-decoration-none ${style.a}`}>
                    看更多夜市介紹
                  </a>
                </div>
                <div
                  className={`d-flex justify-content-center align-items-center ${style.score}`}
                >
                  <h6 className="fw-bold m-0">4.7</h6>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
