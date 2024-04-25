import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ jsonData }) => {
  const jsonString = JSON.stringify(jsonData);

  return (
    <div>
      <h2>QR 码生成器</h2>
      <QRCode value={jsonString} />
      <p>{jsonString}</p>
    </div>
  );
};

const Qr = () => {
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
};

export default Qr;