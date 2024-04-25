// pages/seller-login/login.js
import React, { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSeller } from "../../contexts/SellerContext";

import Section from "@/components/layout/section";


const Login = () => {
  const [loading, setLoading] = useState(false); // loding動畫
  const accountRef = useRef("");
  const passwordRef = useRef("");
  const { setSeller } = useSeller();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // loding動畫
    console.log("登入嘗試", { account, password });
    const formData = new FormData();
    formData.append("account", accountRef.current.value);
    formData.append("password", passwordRef.current.value);

    try {
      const response = await axios.post(
        "http://localhost:3002/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("登录响应", response.data);

      if (response.data.success) {
        localStorage.setItem("sellerId", response.data.sellerId);
        setSeller({ id: response.data.sellerId, isLoggedIn: true });
        setLoading(false); // 结束加载
        router.push("/seller-basic-data"); // 数据已保存，执行跳转
      } else {
        setLoading(false); // 结束加载
        alert(response.data.message);
      }
    } catch (error) {
      setLoading(false); // 结束加载
      console.error("登录请求失败", error);
      alert("登录失败");
    }
  };

  return (
    <Section>
      <div className="container mt-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="account" className="form-label">
              帳號:
            </label>
            <input
              type="text"
              id="account"
              className="form-control"
              ref={accountRef}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              密碼:
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              ref={passwordRef}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            登入
          </button>
          {loading && <div>Loading...</div>}
        </form>
      </div>
    </Section>
  );
};

export default Login;
