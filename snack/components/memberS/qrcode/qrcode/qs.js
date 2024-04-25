import React from 'react';
import QRCode from 'qrcode.react';
import { useQrcode } from '@/data/context/QrcodeContext';

export default function QrWithQRCodeGenerator() {

  const QRCodeGenerator = () => {
    let { QRcodeData } = useQrcode();

    QRcodeData = JSON.stringify(QRcodeData, null, 2);
    // 第二個參數可以過濾
    // var obj = { name: "John", age: 30, city: "New York" };
    // var myJSON = JSON.stringify(obj, ["name", "city"]);
    // //myJSON is 「{"name":"John","city":"New York"}」 
    return (
      <div>
        <QRCode value={QRcodeData} />
        <p>{QRcodeData}</p>
      </div>
    );
  };

  const jsonData = {
    name: '张三',
    age: 30,
    email: 'zhangsan@example.com'
  };

  return (
    <div>
      <QRCodeGenerator jsonData={jsonData} />
    </div>
  );
}
