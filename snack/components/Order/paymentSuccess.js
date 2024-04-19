import React from 'react';
import { ImCross } from 'react-icons/im';
import { FaCheck } from 'react-icons/fa';
import styles from '@/styles/Order.module.css'; // 確保引入了正確的樣式文件


const PaymentSuccessWindow = () => {
  return (
    <>
          <div style={{display:'flex',flexDirection:'column'}}>
                {/* '付款成功'視窗:外框 */}
                <div style={{
                width:'451px',
                height:'417px',
                backgroundColor:'#fff',
                borderRadius:'20px'
                }}>

                <div style={{display:'flex'}}>
                    <div style={{fontSize:'28px', color:'rgb(163, 44, 45)',marginLeft:'160px',marginTop:'20px',fontWeight:'900'}}>付款成功</div>

                    <ImCross style={{
                    marginTop:'30px',
                    marginLeft:'120px',
                    color:'rgb(163, 44, 45)',
                    fontSize:'22px',
                    fontWeight:'100'
                    }}/>

                </div>

               {/* 打勾圖示 */}
                <div style={{width:'101px',height:'101px',border:'solid 8px #7BDB73',marginTop:'25px',marginLeft:'168px',textAlign:'center',paddingTop:'20px',borderRadius:'30px'}}>
                <FaCheck style={{color:'#29A21E', fontSize:'45px',fontWeight:'900'}}/>
                </div>

                {/* 文字訊息:成功 */}
                <div style={{display:'flex',flexDirection:'column',textAlign:'center',marginTop:'30px'}}>
                    <div className={styles.successText}>您的扣款已成功!!</div>
                    <div className={styles.successText}>感謝您的惠顧</div>
                    <div className={styles.successText}>請按下一步</div>
                    <div className={styles.successText}>確認訂單</div>
                </div>
                
                <div className={styles.rbButton} style={{width:'144px',height:'38px',marginTop:'40px',marginLeft:'158px',paddingTop:'7px'}}>下一步</div>

                </div>
          </div>
    </>
  );
};

export default PaymentSuccessWindow;