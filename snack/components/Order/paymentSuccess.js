import React from 'react';
import { ImCross } from 'react-icons/im';
import { FaCheck } from 'react-icons/fa';
import styles from '@/styles/Order.module.css'; // 確保引入了正確的樣式文件
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentSuccessWindow = () => {
  return (
    <>

<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  付款成功
</button>

<div class="modal fade " id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog" className={styles.paymentSuccessWidth}>
        <div class="modal-content">
          
              <div class="modal-body body" className={styles.paymentSuccessHeight}>
                        
              <div >

              <div style={{display:'flex',flexDirection:'column'}}>
                {/* '付款成功'視窗:外框 */}
              

               
                    <div className={styles.paymentSuccessText}>付款成功</div>

                    <ImCross type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" className={styles.paymentSuccessCross} />

              

               {/* 打勾圖示 */}
                <div className={styles.successGreenFrame}>
                <FaCheck className={styles.successTickIcon}/>
                </div>

                {/* 文字訊息:成功 */}
                <div className={styles.successTextContainer}>
                    <div className={styles.successText}>您的扣款已成功!!</div>
                    <div className={styles.successText}>感謝您的惠顧</div>
                    <div className={styles.successText}>請按下一步</div>
                    <div className={styles.successText}>確認訂單</div>
                </div>
                
                <div className={styles.nextTextButton}>下一步</div>

                
          </div>

</div>

           </div>
           
  
                    </div>
                </div>
            </div>


    </>
  );
};

export default PaymentSuccessWindow;