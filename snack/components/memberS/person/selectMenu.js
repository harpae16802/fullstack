import React from 'react'
import ImgIcon from "@/components/memberS/imgicon/imgicon"
import MemberList from "@/components/memberS/memberList"
import MemberListMobile from "@/components/memberS/memberListMobile/memberList"
// import styled from 'styled-components';
import styles from"@/styles/form.module.css";
import classNames from 'classnames';
// npm install --save styled-components
// 
export default function SelectMenu() { 
  return (
    <>
      <div className={classNames("selectMenuPostion")}>
        <div className={classNames(styles["lg-open"],"mb-3")}>
          <ImgIcon />
        </div>

        <div className="">
          <MemberList />
          <MemberListMobile />

        </div>
      </div>

    </>
  )
}
