
import { useState } from "react"; 
import Image from "next/image";
import SelectMenu from "@/components/memberS/person/selectMenu";
import PersonForm from "@/components/memberS/person/personForm";
import Setimgicon from "@/components/memberS/imgicon/setimgicon"; 
import styles from "@/styles/form.module.css"
import { FaSearch } from "react-icons/fa";
import classNames from "classnames";

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-xl-3 ">
            <SelectMenu />
          </div>
          <div className="col-12 col-xl-9">
            <div className={classNames("", styles["main-O-baground"])}>
              <div className={classNames("row", styles["main-O-baground-border50"], styles["setMdGrid"])}>
                <div className="col-12 col-xl-9 xl-full-width">
                <div className="container"> 
                <PersonForm />
                </div>
                </div>
                <div   className={classNames("col-12 col-xl-3 xl-close", styles["setPersonFormGrid"])}>
                <Setimgicon  />  
                </div>
              </div> 

            </div>
          </div>
        </div>

      </div>
    </>
  );
}
