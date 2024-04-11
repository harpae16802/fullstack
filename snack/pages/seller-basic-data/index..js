// pages/seller-basic-data/index.js
import React, { useEffect, useState, useContext, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { SELLER_API } from "./config";
import { useRouter } from "next/router";
import { useSeller } from "../../contexts/SellerContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Section from "@/components/layout/section";

export default function SellerBasicData() {
  // 使用 useRouter
  const router = useRouter();

  // 使用useRef 作為拿取DOM元素操作
  const fileInputRef = useRef(null);

  //拿取seller_id
  const { seller } = useSeller();
  const sellerId = seller?.id;

  // 賣家頭像 初始與更新
  const [imageVersion, setImageVersion] = useState(0);

  // 修改賣家資料 後 的狀態
  const [sellerData, setSellerData] = useState({
    account: "",
    password: "",
    storeName: "",
    contactNumber: "",
    email: "",
    companyAddress: "",
    companyDescription: "",
    openingHours: "09:00",
    closingHours: "22:00",
    restDay: "0",
    profilePicture: "",
  });

  // 使用Ref
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // 修改前 如果拿取到seller_id執行這裡
  useEffect(() => {
    console.log("index.js中的sellerId", sellerId);
    if (sellerId) {
      axios
        .get(`${SELLER_API}${sellerId}`)
        .then((response) => {
          const data = response.data.data; // 注意确保这里的路径正确
          console.log(data); // 查看数据结构

          setSellerData((prevData) => ({
            ...prevData,
            account: data.account || "",
            password: data.password || "",
            storeName: data.store_name || "",
            contactNumber: data.contact_number || "",
            email: data.email || "",
            companyAddress: data.company_address || "",
            companyDescription: data.company_description || "",
            openingHours: data.opening_hours || "17:00",
            closingHours: data.closing_hours || "23:00",
            restDay: data.rest_day?.toString() || "6",
            profilePicture: data.profile_picture || "",
            // 其他字段...
          }));
        })
        .catch((error) => {
          console.error("获取商家信息失败", error);
        });
    }
  }, [sellerId]);
  // 修改 更新 賣家的 資料
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSellerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 修改 更新 賣家所有資料 包含圖片
  const handleFileChange = (e) => {
    setSellerData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("account", sellerData.account);
    formData.append("password", sellerData.password);
    formData.append("storeName", sellerData.storeName);
    formData.append("contactNumber", sellerData.contactNumber);
    formData.append("email", sellerData.email);
    formData.append("companyAddress", sellerData.companyAddress);
    formData.append("companyDescription", sellerData.companyDescription);
    formData.append("restDay", sellerData.restDay);
    // 文字部分
    const storeImageInput = document.getElementById("store_image");
    if (storeImageInput && storeImageInput.files && storeImageInput.files[0]) {
      formData.append("store_image", storeImageInput.files[0]);
    }

    // 發送請求
    axios
      .put(`${SELLER_API}${sellerId}/edit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("更新成功");
        // UI
      })
      .catch((error) => {
        console.error("更新失败", error);
        alert("更新失败");
      });
  };

  // 更新賣家 頭貼 包含顯示
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    axios
      .put(
        `${SELLER_API}${sellerId}/edit/profilePicture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        alert("头像上传成功");
        setImageVersion((prevVersion) => prevVersion + 1); // 獲取頭貼
      })
      .catch((error) => {
        console.error("頭像上傳失敗", error);
        alert("頭像上傳失敗");
      });
  };
  // 生成24小時時間選項
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      const value = `${hour.toString().padStart(2, "0")}:00`;
      options.push(
        <option key={hour} value={value}>
          {value}
        </option>
      );
    }
    return options;
  };
  return (
    <Section>
      <div className="container mt-5">
        <div className="row">
          <div className="col-3">
            {/* 這裡的賣家頭像直接連結伺服器 */}
            <img
              src={`http://localhost:3002/public/seller/${sellerData.profilePicture}?v=${imageVersion}`}
              alt="卖家头像"
              style={{
                border: "2px solid black",
                width: "100px",
                height: "100px",
              }}
              onClick={handleImageClick} // 使用handleImageClick
            />

            <input
              type="file"
              id="profilePictureInput"
              style={{ display: "none" }}
              ref={fileInputRef} // 將ref賦予到DOM元素
              onChange={handleProfilePictureChange}
            />

            <div
              className="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <ul className="list-unstyled">
                <li>
                  <Link href="/seller-basic-data/">
                    <span className="nav-link">商家基本資料</span>
                  </Link>
                </li>
                <li>
                  <Link href="/seller-basic-data/bank">
                    <span className="nav-link">銀行帳號設定</span>
                  </Link>
                </li>
                <li>
                  <Link href="/seller-basic-data/orderList">
                    <span className="nav-link">訂單管理</span>
                  </Link>
                </li>
                <li>
                  <Link href="/seller-basic-data/addProduct">
                    <span className="nav-link">上架商品</span>
                  </Link>
                </li>
                <li>
                  <Link href="/seller-basic-data/producutsList">
                    <span className="nav-link">產品列表</span>
                  </Link>
                </li>
                <li>
                  <Link href="/seller-basic-data/reviews">
                    <span className="nav-link">賣家評論區</span>
                  </Link>
                </li>
                <li>
                  <Link href="/seller-basic-data/qrCode">
                    <span className="nav-link">QRcode掃描區</span>
                  </Link>
                </li>
                <li>
                  <Link href="/seller-basic-data/ad">
                    <span className="nav-link">廣告投放</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-1"></div> {/* 用於分隔 */}
          <div className="col-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="account" className="form-label">
                  使用帳號
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="account"
                  name="account"
                  placeholder="使用者帳號"
                  value={sellerData.account || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  使用者密碼
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="使用者密碼"
                  value={sellerData.password || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="storeName" className="form-label">
                  商家店名
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="storeName"
                  name="storeName"
                  placeholder="攤位名稱"
                  value={sellerData.storeName || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contactNumber" className="form-label">
                  商家連絡電話
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="連絡電話"
                  value={sellerData.contactNumber || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="電子郵件"
                  value={sellerData.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="companyAddress" className="form-label">
                  商家地址
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="companyAddress"
                  name="companyAddress"
                  placeholder="商家地址"
                  value={sellerData.companyAddress || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="store_image" className="form-label">
                  上傳商家圖片
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="store_image"
                  name="store_image"
                  onChange={handleFileChange} // 圖片
                />
              </div>
              <div className="mb-3">
                <label htmlFor="companyDescription" className="form-label">
                  店家簡介
                </label>
                <textarea
                  className="form-control"
                  id="companyDescription"
                  name="companyDescription"
                  rows="3"
                  placeholder="商家簡介"
                  value={sellerData.companyDescription || ""}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="row g-3 align-items-center mb-3">
                <div className="col-auto">
                  <label htmlFor="restDay" className="col-form-label">
                    選擇公休日
                  </label>
                </div>
                <div className="col-auto">
                  <select
                    className="form-select"
                    id="restDay"
                    name="restDay"
                    value={sellerData.restDay || ""}
                    onChange={handleChange}
                  >
                    {[...Array(7).keys()].map((day) => (
                      <option key={day} value={day + 1}>
                        {day + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-auto">
                  <label htmlFor="openingHours" className="col-form-label">
                    開始營業時間
                  </label>
                </div>
                <div className="col-auto">
                  <select
                    className="form-select"
                    id="openingHours"
                    name="openingHours"
                    value={sellerData.openingHours || ""}
                    onChange={handleChange}
                  >
                    {generateTimeOptions()}
                  </select>
                </div>
                <div className="col-auto">
                  <label htmlFor="closingHours" className="col-form-label">
                    結束營業時間
                  </label>
                </div>
                <div className="col-auto">
                  <select
                    className="form-select"
                    id="closingHours"
                    name="closingHours"
                    value={sellerData.closingHours || ""}
                    onChange={handleChange}
                  >
                    {generateTimeOptions()}
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                提交修改
              </button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}
