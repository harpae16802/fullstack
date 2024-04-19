import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';

const CameraQRScanner = ({ onCodeDetected }) => {
  const webcamRef = useRef(null);

  // 定义一个方法来处理扫描逻辑
  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, img.width, img.height);
        if (code) {
          console.log("QR Code detected: ", code.data);
          onCodeDetected(code.data);
        }
      };
      img.src = imageSrc;
    } else {
      console.log("No image captured.");
    }
  };

  // 使用 useEffect 配合 setInterval 来周期性执行扫描
  useEffect(() => {
    const interval = setInterval(capture, 2000); // 每2秒扫描一次
    return () => clearInterval(interval); // 组件卸载时清除定时器
  }, []);

  return (
    <Webcam
      audio={false}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      videoConstraints={{
        width: 770,
        height: 400,
        facingMode: "environment"
      }}
    />
  );
};

export default CameraQRScanner;
