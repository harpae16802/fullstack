// /components/seller-logout.js
import React, { useState, useContext } from 'react'; 
import { useRouter } from 'next/router';
import { SellerContext } from '../contexts/SellerContext';
import LogoutModal from './sellerLogoutModal';

const NavbarLogout = () => {
    const router = useRouter();
    const { setSeller } = useContext(SellerContext);
    const [showLogoutModal, setShowLogoutModal] = useState(false); 

    const handleLogout = () => {
        // 清除localStorage中的seller_id
        localStorage.removeItem('sellerId');
        // 更新Context
        setSeller(null);
        
      setTimeout(() => {
        Replace()
      }, 3000);
        
       
    }; 
    const handleCloseLogoutModal = () => {
        // 關閉彈窗
        setShowLogoutModal(false);
    };
    const Replace = () => {
        router.replace('/');
    }

    return (
        <>
        <button onClick={handleLogout}
         className="dropdown-item">
            登出
        </button>

   
        <LogoutModal show={showLogoutModal} onClose={handleCloseLogoutModal} />
    </>
    );
};

export default NavbarLogout;
