import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/form.module.css"
import classNames from "classnames";
import { useState } from "react"; 

const inter = Inter({ subsets: ["latin"] });

export default function Setimg() {
  const [file, setFile] = useState(null);
  const loadImg = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const formData = new FormData();
    formData.append('file', file); 
    try {
      const response = await fetch('http://127.0.0.1:3006/backRoute/bigImg', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log('Upload successful:', data);
      console.log('Upload successful:', formData);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };


return (
  <>
    <div className={classNames("md-5", styles.imgIconContent)}
      style={{
        height: "125px"
        , position: "relative"
        , height: "125px",
        textAlign: "center",
        bottom: "-2em",
        margin: "auto",
        zIndex: "5"
      }}>
      <label htmlFor="formFile" className="form-label" style={{position:"relative"}}>
      <Image
        src="/face/face.png"
        alt='Mountains'
        width={125}
        height={125}
        className={classNames("imgIcon", styles.ImageIcon)}
        objectFit='contain'
        style={{ borderRadius: "50%" }}
      />

      <input
        className={classNames("form-control", "imgIcon", styles.fileData)}
        onChange={loadImg}
        accept="image/png,image/jpg"
        style={{ height: "125px", opacity: 0,zIndex:3,position:"absolute" }}
        type="file" id="formFile" />
        </label>
    </div>
    <div className={classNames("card mb-2 pt-5 ", styles["border-1"])}  >
      <div className={classNames("card-body text-center", styles["text-color"])}  >
        選擇圖片
      </div>
    </div>
  </>
);
} 