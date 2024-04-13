// // pages/seller-basic-data/SellerSidebar.js
// import React, { useRef, useState, useContext } from "react";
// import Link from "next/link";
// import axios from "axios";
// import { SELLER_API } from "./config";
// import { SellerContext } from "../../contexts/SellerContext"; // 假设你有这样的context
// import styles from "../../styles/navbar-seller.module.scss";

// const SellerSidebar = () => {
//   const { seller, setSeller } = useContext(SellerContext);
//   const [imageVersion, setImageVersion] = useState(0); // 添加一个状态来控制图片更新
//   const sellerId = seller?.id;
//   const fileInputRef = useRef(null);

//   const handleImageClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleProfilePictureChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("profilePicture", file);

//     try {
//       // 上传图片
//       const response = await axios.put(
//         `${SELLER_API}${sellerId}/edit/profilePicture`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       // 图片上传成功
//       alert("頭像上傳成功");
//       setImageVersion((prev) => prev + 1); // 更新图片版本号
//     } catch (error) {
//       // 图片上传失败
//       console.error("頭像上傳失敗", error);
//       alert("頭像上傳失敗");
//     }
//   };
//   return (
//     <div className={styles.sellerSidebarWrapper}>
//       <img
//         src={`${SELLER_API}/public/seller/${sellerId}/profilePicture?v=${imageVersion}`}
//         alt="賣家頭像"
//         className={styles.profilePicture}
//         onClick={handleImageClick}
//       />
//       <input
//         type="file"
//         style={{ display: "none" }}
//         ref={fileInputRef}
//         onChange={handleProfilePictureChange}
//       />
//       <div
//         className={` ${styles.sellerSidebarWrapper}`}
//         id="v-pills-tab"
//         role="tablist"
//         aria-orientation="vertical"
//       >
//         <ul className="list-unstyled">
//           <li>
//             <Link href="/seller-basic-data/" passHref>
//               <span className={styles.navLink}>商家基本資料</span>
//             </Link>
//           </li>
//           <li>
//             <Link href="/seller-basic-data/bank" passHref>
//               <span className={styles.navLink}>銀行帳號設定</span>
//             </Link>
//           </li>
//           <li>
//             <Link href="/seller-basic-data/orderList">
//               <span className={styles.navLink}>訂單管理</span>
//             </Link>
//           </li>
//           <li>
//             <Link href="/seller-basic-data/addProduct">
//               <span className={styles.navLink}>上架商品</span>
//             </Link>
//           </li>
//           <li>
//             <Link href="/seller-basic-data/producutsList">
//               <span className={styles.navLink}>產品列表</span>
//             </Link>
//           </li>
//           <li>
//             <Link href="/seller-basic-data/reviews">
//               <span className={styles.navLink}>賣家評論區</span>
//             </Link>
//           </li>
//           <li>
//             <Link href="/seller-basic-data/qrCode">
//               <span className={styles.navLink}>QRcode掃描區</span>
//             </Link>
//           </li>
//           <li>
//             <Link href="/seller-basic-data/ad">
//               <span className={styles.navLink}>廣告投放</span>
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SellerSidebar;
