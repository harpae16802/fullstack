import { createContext, useContext, useEffect, useState } from 'react';
import memberFormUpdate from '@/api/memberFormUpdate'; 

// 建立圖片相關的 context
export const ImgIconContent = createContext();

// 自訂 hook 來訪問圖片相關的 context
export const useIcon = () => useContext(ImgIconContent);

// 圖片提供者組件，用於提供圖片相關的資料
export const ImgProvider = ({ children }) => {
    // 使用 useState hook 建立狀態變數 previewUrl，並設置初始值為 null
    const [previewUrl, setPreviewUrl] = useState("/ch.png");

    // 使用 useEffect hook 來執行副作用，一般用於資料取得等操作
    useEffect(() => {
        // 定義一個 fetchData 函數，用於異步取得圖片資料
        const fetchData = async () => {
            try {
                // 使用 memberFormUpdate.searchImg() 方法來取得圖片資料
                const imgb = await memberFormUpdate.searchImg(); 
                // 將取得的圖片資料設置到 previewUrl 狀態變數中 
                setPreviewUrl(imgb.result); 
            } catch (error) {
                // 若取得圖片資料失敗，則輸出錯誤訊息到控制台
                console.error("取得圖片資料失敗:", error);
            }
        };

        // 呼叫 fetchData 函數來取得圖片資料
        fetchData();

        // 指定 useEffect 的依賴項，當依賴項發生變化時才會重新執行 useEffect
    }, []); // 空的依賴項表示只在組件掛載時執行一次

    // 返回圖片相關的 context 提供者，並將 previewUrl 狀態及 setPreviewUrl 函數提供給子組件使用
    return (
        <ImgIconContent.Provider value={{ previewUrl, setPreviewUrl }}>
            {children}
        </ImgIconContent.Provider>
    );
};
