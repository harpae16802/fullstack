// /components/AuthChecker.js
import { useEffect, useContext } from "react";
import { SellerContext } from "../contexts/SellerContext";
import { useRouter } from 'next/router';

const AuthChecker = ({ children }) => {
  const { seller, setSeller } = useContext(SellerContext);
  const router = useRouter();

  useEffect(() => {
    const storedSellerId = localStorage.getItem("sellerId");
    if (storedSellerId) {
      setSeller({ id: storedSellerId, isLoggedIn: true });
    } else {
      // 如果没有存储的 sellerId，可以重定向到登录页面
      // router.push('/seller-login');
    }
  }, []);

  return children;
};

export default AuthChecker;
