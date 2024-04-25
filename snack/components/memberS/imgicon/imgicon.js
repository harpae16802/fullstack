import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/form.module.css"
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className={classNames("md-5 imgicon", styles.imgIconContent)}>

        <label htmlFor="formFile" className="form-label"></label>
        <Image
          src="/face/face.png"
          alt='Mountains'
          width={125}
          height={125}
          className={classNames("imgIcon-b", styles.ImageIcon)}
          objectFit='contain'
        /> 

      </div>
      <div className={classNames("card pt-3 pb-3", styles["border-1"])}  >
        <div className={classNames("card-body text-center", styles["text-color"])}  >
          你今天想吃夜市嗎
        </div>
      </div>


    </>
  );
}
