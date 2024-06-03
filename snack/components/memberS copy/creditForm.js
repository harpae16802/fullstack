import React, { useState } from 'react';
import Credit from "@/components/memberS/credit/creditComponts";
import Moblie from "@/components/memberS/credit/mobileComponts";
import Bank from "@/components/memberS/credit/bankComponts";
import styles from "@/styles/form.module.css";
import classNames from 'classnames';

export default function CreditForm() {
  const creditData = [
    {
      title: "VISA",
      data: "**** **** **** 1111",
      default2: true
    },
    {
      title: "JCB",
      data: "**** **** **** 1111"
    }
  ];

  const mobileData = [
    {
      title: "Paypal",
      data: "**** **** **** 1111",
      default2: true
    },
    {
      title: "LINE Pay",
      data: "**** **** **** 1111"
    }
  ];

  const bankData = [
    {
      title: "國泰世華銀行",
      data: "**** **** **** 1111",
      default2: true
    },
    {
      title: "新光銀行",
      data: "**** **** **** 1111"
    }
  ];

  const [createdatahandle, setCreateDataHandle] = useState(creditData);
  const [mobiledatahandle, setMobileDataHandle] = useState(mobileData);
  const [bankdatahandle, setBankDataHandle] = useState(bankData);

  return (
    <>
      <h4>付款方式設定</h4>
      <h4 className={styles.creditTitle}>信用卡/金融卡</h4>
      {createdatahandle.map((v, i) => (
        <div
          className={classNames(styles.flexBetween, styles.border1, styles["rd-2"], "px-3 py-1 my-1")}
          key={i}
        >
          <Credit title={v.title} data={v.data} default2={v.default2} />
        </div>
      ))}
      <h4 className={styles.creditTitle}>行動支付</h4>
      {mobiledatahandle.map((v, i) => (
        <div
          className={classNames(styles.flexBetween, styles.border1, styles["rd-2"], "px-3 py-1 my-1")}
          key={i}
        >
          <Credit title={v.title} data={v.data} default2={v.default2} />
        </div>
      ))}
      <h4 className={styles.creditTitle}>銀行帳號</h4>
      {bankdatahandle.map((v, i) => (
        <div
          className={classNames(styles.flexBetween, styles.border1, styles["rd-2"], "px-3 py-1 my-1")}
          key={i}
        >
          <Credit title={v.title} data={v.data} default2={v.default2} />
        </div>
      ))}
    </>
  );
}
