// pages/seller-basic-data/producutsList.js
import React, { useEffect, useState, useContext, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { SELLER_API, PRODUCTS_API } from "./config"; // 引入配置
import { useSeller } from "../../contexts/SellerContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Section from "@/components/layout/section";

const ProductsList = () => {
  // 使用 useRouter
  const router = useRouter();

  // 使用useRef 作為拿取DOM元素操作
  const fileInputRef = useRef(null);

  //拿取seller_id
  const { seller } = useSeller();
  const sellerId = seller?.id;
  const [products, setProducts] = useState([]);
  const [imageVersion, setImageVersion] = useState(0); //  imageVersion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  // 使用Ref
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  useEffect(() => {
    if (seller?.id) {
      axios
        .get(
          `${PRODUCTS_API}${seller.id}?page=${currentPage}&limit=${itemsPerPage}`
        )
        .then((response) => {
          setProducts(response.data.products);
          setTotalItems(response.data.total); // 设置总项数
        })
        .catch((error) => console.error("获取产品列表失败", error));
    }
  }, [sellerId, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages);

    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}
        >
          <a className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </a>
        </li>
      );
    }

    return pageNumbers;
  };
  // 賣家頭項
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    axios
      .put(`${SELLER_API}${sellerId}/edit/profilePicture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("头像上传成功");
        setImageVersion((prevVersion) => prevVersion + 1); // 更新頭貼版本以重新加載圖片
      })
      .catch((error) => {
        console.error("頭像上传失败", error);
        alert("頭像上传失败");
      });
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <Section>
      <div className="container mt-5">
        <div className="row">
          <div className="col-3">
            {/* 這裡的賣家頭像直接連結伺服器 */}
            <img
              src={`http://localhost:3002/public/seller/${seller?.profilePicture}?v=${imageVersion}`}
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
                  <Link href="/seller-basic-data/productList">
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
          {/* 表格 */}
          <div className="col-8">
            <table>
              <thead>
                <tr>
                  <th>產品名稱</th>
                  <th>產品數量</th>
                  <th>產品類別</th>
                  <th>產品價格</th>
                  <th>產品狀態</th>
                  <th>修改</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.product_id}>
                    <td>{product.productName}</td>
                    <td>{product.stockQuantity}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.status}</td>
                    <td>
                      <Link href={`/modify/${product.product_id}`}>修改</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav>
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <a
                    className="page-link"
                    onClick={() => {
                      if (currentPage > 1) {
                        handlePageChange(currentPage - 1);
                      }
                    }}
                  >
                    上一页
                  </a>
                </li>
                {renderPageNumbers()}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    onClick={() => {
                      if (currentPage < totalPages) {
                        handlePageChange(currentPage + 1);
                      }
                    }}
                  >
                    下一页
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProductsList;
