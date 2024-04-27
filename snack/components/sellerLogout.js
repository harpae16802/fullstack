// /components/seller-logout.js
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { SellerContext } from '../contexts/SellerContext';

const NavbarLogout = () => {
    const router = useRouter();
    const { setSeller } = useContext(SellerContext);

    const handleLogout = () => {
        // 清除localStorage中的seller_id
        localStorage.removeItem('sellerId');
        // 更新Context
        setSeller(null);
        // 重定向到首頁
        router.replace('/');
    };

    return (
        <button onClick={handleLogout}  className="dropdown-item" >
            登出
        </button>
    );
};

export default NavbarLogout;
