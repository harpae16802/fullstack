import React from 'react';
import { ImCross } from 'react-icons/im'; // 請確保已經導入所需的圖示組件
import styles from '@/styles/Order.module.css'; // 確保引入了正確的樣式文件


const PointsRedeemWindow = ({ points }) => {
  return (

   <>

   <div >

    {/* '消耗點數'視窗:外框 */}
    <div style={{
    width:'450px',
    height:'370px',
    backgroundColor:'#fff',
    borderRadius:'20px'
    }}>

   {/* '消耗點數'視窗:內容 */}
    <div style={{display:'flex', flexDirection:'column'}}>

    <ImCross style={{
        marginTop:'15px',
        marginLeft:'410px',
        color:'rgb(163, 44, 45)'
        }}/>
        
    
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
        <div style={{color:'rgb(163, 44, 45)'}}>1014</div>
        <div>點</div>
    </div>

    {/* 點數:數量增減 */}
    <div style={{
        display:'flex',
        marginTop:'10px',
        marginLeft:'165px'
        }}>

    <div  className={styles.cosumeButton}>-</div>
    <div  className={styles.cosumeButton} style={{ backgroundColor:'#fff',border:'solid 1px  rgb(225, 223, 223)', paddingLeft:'4px'}}>10</div>
    <div className={styles.cosumeButton}>+</div>

    </div>

    {/* 兌換現金:文字 */}
    <div style={{display:'flex'}}>
        <h4 style={{marginTop:'35px',marginLeft:'130px',fontWeight:'bolder'}}>兌換現金:</h4>
        <h4 style={{marginTop:'35px',marginLeft:'30px',fontWeight:'bolder'}}>$1</h4>
    </div>

    {/* '取消使用 兌換現金'按鈕 */}
    <div style={{display:'flex', marginTop:'25px',marginLeft:'110px'}}>
        <div className={styles.wbButton}>取消使用</div>
        <div className={styles.rbButton} style={{marginLeft:'20px'}}>兌換現金</div>
    </div> 

        {/* column */}
    </div>

</div>


   </div>

   </>

  );
};

export default PointsRedeemWindow;