import Qrcode from '@/components/memberS/qrcode';
import { createContext, useContext, useEffect, useState } from 'react';


// 創建
export const QrcodeContext = createContext();

// 自定訪問
export const useQrcode = () => useContext(QrcodeContext);

// Provider 组件，提供資料
export const QrcodeProvider = ({ children }) => {
  const [orderId, setOrderId] = useState(-1);  // orderId 
  const [QRcodeData, setQRcodeData] = useState([]);  // QRcodeData others QRcode建立
  const [QRcodeDataCreate, setQRcodeDataCreate] = useState([]);  // QRcodeData   QRcode建立資料庫
  const [QrcodeOrder, setQRcodeDataOrder] = useState([]);  // QrcodeOrder  建立訂單內容
  const [title, setitle] = useState({});  // QRcodeData   QRcode建立資料庫
  useEffect((v,i)=>{
    // sessionStorage.setItem('QRcodeData', JSON.stringify(QRcodeData)); 
    // sessionStorage.setItem('QRcodeDataCreate', JSON.stringify(QRcodeDataCreate));
    // sessionStorage.setItem('QrcodeOrder', JSON.stringify(QrcodeOrder));
    // sessionStorage.setItem('orderId', orderId); 
    // sessionStorage.setItem('title', JSON.stringify(title));

  },[]) 
  return (
    <QrcodeContext.Provider value={{
      orderId,
      setOrderId,
      QRcodeData,
      setQRcodeData,
      QRcodeDataCreate,
      setQRcodeDataCreate,
      QrcodeOrder,
      setQRcodeDataOrder,
      title,
      setitle

    }}>
      {children}
    </QrcodeContext.Provider>
  );
};


