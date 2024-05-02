import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/form.module.css"
import classNames from "classnames";

import { useEffect, useState,useRef } from "react"; 

const inter = Inter({ subsets: ["latin"] });

// 選擇圖片
export default function Setimg() {
  const [file, setFile] = useState(null); 
  const fileInputRef = useRef(null); 
   // 選中的檔案
   const [selectedFile, setSelectedFile] = useState(null)
   // 預覽圖片(呼叫URL.createObjectURL得到的網址)
   const [previewUrl, setPreviewUrl] = useState("/face/ch.jpeg")
 
   // 選擇檔案有變動時的處理函式
   const handleFileChange = (e) => {
     // 取得檔案，只取第一個檔案
     const file = e.target.files[0]
 
     if (file) {
       setSelectedFile(file)
       // 檔案有變時設定回初始值
       handleFileUpload(file);
       setPreviewUrl('')

     } else {
       setSelectedFile(null)
       // 檔案有變時設定回初始值
       setPreviewUrl('')
     }
   }
 
   // 上傳到伺服器 
   const handleFileUpload = async (event) => {
    // const selectedFile = event.target.files[0];
    const selectedFile = event;
    setFile(selectedFile);
    if(file){
      const objjectUrl=URL.createObjectURL(file)
      setPreviewUrl(objjectUrl)
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await fetch('http://127.0.0.1:3006/backRoute/bigImg', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log('Upload successful:', data);

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
   // 當選擇檔案時，建立預覽圖的網址。使用的是狀態連鎖更動的樣式 A狀態 -> B狀態
   useEffect(() => {
     if (selectedFile) {
       // 透過URL.createObjectURL()得到預覽圖片的網址
       const objectUrl = URL.createObjectURL(selectedFile)
       //console.log(objectUrl)
       // 設定預覽圖片的網址
       setPreviewUrl(objectUrl)
     }
   }, [selectedFile])
   // ^^^^^^^^^^^^^^ 這裡代表只有在selectedFile有變動(之後)才會執行
 
  // 修改圖片
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };


  return (
    <div className="setimg">
      <div className={classNames("md-5 setimgicon", styles.imgIconContent)} >
   
        <label htmlFor="formFile" className={classNames("imgIconWidth","form-label",styles["lg-open"])}>
          <Image
            src={previewUrl}
            alt='Mountains'
            width={125}
            height={125}
            className={classNames("imgIcon")}
            objectFit='contain'
            style={{ borderRadius: "50%" }}
          />  
        </label>
        <label htmlFor="formFile" className={classNames("imgIconWidth","form-label",styles["md-open"])}>
       <div className="imgIconWidth">
       <Image
       src={previewUrl}
       alt='Mountain22s' 
       className={classNames("imgIcon")}
       width={200}
       height={200}
       objectFit='contain'
       style={{ borderRadius: "50%" }}
     />  
       </div>
       
      </label>
        <div style={{ position: "relative" }}>

          <input
            className={classNames("form-control setimgiconInput imgIcon", styles.fileData)}
            onChange={handleFileChange}
            ref={fileInputRef}
            accept="image/png,image/jpg"
            type="file" id="formFile" />


          <button   onClick={handleFileButtonClick}    className={classNames("card-body text-center fxbtn", styles["text-color"])}  >
            選擇圖片
          </button>
        </div>

      </div>
    </div>
  );
} 