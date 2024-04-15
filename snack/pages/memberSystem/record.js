import React from 'react'
import Record from "@/components/memberS/record/record"
import RecordMobile from "@/components/memberS/record/mobile/record"
import SelectMenu from "@/components/memberS/person/selectMenu";
import classNames from 'classnames' 
import styles from"@/styles/form.module.css";


export default function ticket() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-xl-3 ">
            <SelectMenu />
          </div>
          <div className="col-12 col-xl-9">
        <div className={classNames("", styles["main-O-baground"])}>


            <Record />
            <RecordMobile />

          </div>
          </div>
        </div>

      </div>
    </>
  )
}
