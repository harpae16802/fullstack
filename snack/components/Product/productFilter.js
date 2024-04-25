import React from 'react'
import styles from '@/styles/Product.module.css'
import { ImCross } from "react-icons/im";


const FilterOptions = () => {
    return (
    
      <div style={{ display: 'flex', flexDirection: 'column',position: 'relative',
      width: '100vw', // 使用視口寬度
      height: '100vh', // 使用視口高度
      display: 'flex',
      justifyContent: 'center', // 水平置中
      alignItems: 'center', }}>

        {/* '商品篩選'視窗:外框 */}
        <div className={styles.paymentSize} >
  
          <ImCross className={styles.filterCross} />
  
          <div className={styles.filterTitle}>距離</div>

          <div className="container">
            <div className="d-flex">

              <div className={styles.filterCircle}></div>
              <div className={styles.filterText}>走路10分鐘內</div>

              <div className={styles.filterCircle}></div>
              <div className={styles.filterText}>走路10分鐘內</div>

              <div className={styles.filterCircle}></div>
              <div className={styles.filterText}>走路10分鐘內</div>

            </div>

          </div>
    

          <div className={styles.filterTitle}>評分</div>

          <div className="container">
            <div className="d-flex">

              <div className={styles.filterCircle}></div>
              <div className={styles.filterText}>4.5分以上</div>

              <div className={styles.filterCircle}></div>
              <div className={styles.filterText}>4.5分以上</div>

              <div className={styles.filterCircle}></div>
              <div className={styles.filterText}>4.5分以上</div>

            </div>

          </div>
  
          <div className={styles.filterTitle}>價格</div>

          <div className="container">
            <div className="d-flex">

              <div className={styles.filterCircle}></div>
              <div className={styles.filterText}>$50以上</div>

              <div className={styles.filterCircle}></div>
              <div className={styles.filterText}>$100以上</div>

              <div className={styles.filterCircle}></div>
              <div className={styles.filterText}>$150以上</div>

              <div className={styles.filterCircle}></div>
              <div className={styles.filterText}>$200以上</div>

            </div>

          </div>
  
          {/* '重設 套用'按鈕 */}
          <div className={styles.filterButtonInterval}>

            <button className={styles.filterButton} style={{color:' #A32C2D', backgroundColor:'#fff',border:'solid 2px #A32C2D'}}>重設</button>

            <button className={styles.filterButton} style={{color:'#fff',backgroundColor:' #A32C2D',border:'none',marginLeft:'20px' }}>套用</button>
          </div>
  
        </div>
      </div>
    );
  };

export default FilterOptions;