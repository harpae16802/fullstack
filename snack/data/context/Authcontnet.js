import React,{useEffect } from 'react';
import { useAuth } from '@/contexts/custom-context'
import { useRouter } from 'next/router';


function OuterComponent({ children }) {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => { 
    // 檢查用戶是否未認證，如果是，則重定向到登錄頁面
    
    if (!auth.custom_id) {
      // router.push("/login/login-custom");
    }
  }, [auth, router]);  // 加入 auth 和 router 作為依賴

  // 只在用戶已認證的情況下渲染子組件
  if (auth.custom_id) {
    return <div>{children}</div>;
  } else {
    return null;  // 當正在重定向或未認證時，不渲染任何內容
  }
}

export default OuterComponent;