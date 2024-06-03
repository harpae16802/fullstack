import React, { useState } from 'react'
import Credit from "@/components/memberS/credit/creditComponts"
import Moblie from "@/components/memberS/credit/mobileComponts"
import Bank from "@/components/memberS/credit/bankComponts"
import styles from "@/styles/form.module.css"
import classNames from 'classnames'

export default function creditForm() {
    const creditData=[
        {
            title:"VISA", 
            data:"**** **** **** 1111",
            default2:true
        },
        {
            title:"JCB", 
            data:"**** **** **** 1111"
        },
    ];
    const mobileData =[ 
        {
            title:"Paypal", 
            data:"**** **** **** 1111",
            default2:true

        },
        {
            title:"LINE Pay", 
            data:"**** **** **** 1111"
        },
    ];
    const bankData =[ 
        {
            title:"國泰世華銀行", 
            data:"**** **** **** 1111",
            default2:true

        },
        {
            title:"新光銀行", 
            data:"**** **** **** 1111" 
        },
    ];
    const [createdatahandle, SetcreateDataHandle] = useState(creditData)
    const [mobiledatahandle, Setmobiledatahandle] = useState(mobileData)
    const [bankdatahandle, Setbankdatahandle] = useState(bankData)

    return (
        <>
            <h4>付款方式設定</h4>
            <h4 className={styles.creditTitle}>信用卡/金融卡</h4> 

            {Array.isArray(createdatahandle) && createdatahandle.length > 0 ? (
                createdatahandle.map((v, i) => (
                    <div 
                        className={classNames(styles.flexBetween, styles.border1, styles["rd-2"], "px-3 py-1 my-1")} 
                        key={i}
                    >
                        <Credit title={v.title} data={v.data} default2={v.default2} />
                    </div>
                ))
            ) : (
                <p>沒有信用卡/金融卡資料</p>
            )}

            <h4 className={styles.creditTitle}>行動支付</h4> 

            {Array.isArray(mobiledatahandle) && mobiledatahandle.length > 0 ? (
                mobiledatahandle.map((v, i) => (
                    <div 
                        className={classNames(styles.flexBetween, styles.border1, styles["rd-2"], "px-3 py-1 my-1")} 
                        key={i}
                    >
                        <Credit title={v.title} data={v.data} default2={v.default2} />
                    </div>
                ))
            ) : (
                <p>沒有行動支付資料</p>
            )}

            <h4 className={styles.creditTitle}>銀行帳號</h4> 

            {Array.isArray(bankdatahandle) && bankdatahandle.length > 0 ? (
                bankdatahandle.map((v, i) => (
                    <div 
                        className={classNames(styles.flexBetween, styles.border1, styles["rd-2"], "px-3 py-1 my-1")} 
                        key={i}
                    >
                        <Credit title={v.title} data={v.data} default2={v.default2} />
                    </div>
                ))
            ) : (
                <p>沒有銀行帳號資料</p>
            )}
        </>
    )
}
