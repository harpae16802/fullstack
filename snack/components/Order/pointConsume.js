import React from 'react';
import { ImCross } from 'react-icons/im'; // 請確保已經導入所需的圖示組件
import styles from '@/styles/Order.module.css'; // 確保引入了正確的樣式文件
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PointsRedeemWindow ({
     points = "",
     })  {

  return (

   <>


   {/* bootstrap:互動視窗 */}
   <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" className={styles.usePoint}>
  使用點數
</button>

<div class="modal fade " id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog" style={{maxWidth:'480px'}}>
        <div class="modal-content">
          
              <div class="modal-body body" style={{height:'370px'}}>
                        
              <div >




{/* '消耗點數'視窗:內容 */}
<div className={styles.consumeContainer}>

<ImCross type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" className={styles.pointConsumeCross}/>
    

<h4 style={{
    fontWeight:'bolder',
    marginTop:'40px',
    marginLeft:'170px'
}}>持有點數</h4>

 {/* 點數:擁有數量 */}
<div style={{
    display:'flex',
    marginTop:'3px',
    marginLeft:'190px',
    fontWeight:'bolder'
}}>
    <div style={{color:'rgb(163, 44, 45)'}}>{points}</div>
    <div>點</div>
</div>

{/* 點數:數量增減 */}
<div style={{
    display:'flex',
    marginTop:'10px',
    marginLeft:'165px'
    }}>

<div  className={styles.consumeButton}>-</div>
<div  className={styles.consumeButton} style={{ backgroundColor:'#fff',border:'solid 1px  rgb(225, 223, 223)', paddingLeft:'4px'}}>10</div>
<div className={styles.consumeButton}>+</div>

</div>

{/* 兌換現金:文字 */}
<div style={{display:'flex'}}>
    <div style={{marginTop:'30px',marginLeft:'160px',fontWeight:'bolder'}}>兌換現金:</div>
    <div style={{marginTop:'30px',marginLeft:'30px',fontWeight:'bolder'}}>$1</div>
</div>

{/* '取消使用 兌換現金'按鈕 */}
{/* <div style={{display:'flex', marginTop:'25px',marginLeft:'110px'}}>
    <div className={styles.wbButton}>取消使用</div>
    <div className={styles.rbButton} style={{marginLeft:'20px'}}>兌換現金</div>
</div>  */}

    {/* column */}
</div>




</div>


<div style={{display:'flex', marginTop:'25px',marginLeft:'110px'}}>
<div className={styles.wbButton}>取消使用</div>
<div className={styles.rbButton} style={{marginLeft:'20px'}}>兌換現金</div>
</div> 



           </div>

  
                    </div>
                </div>
            </div>

   </>

  );
};

