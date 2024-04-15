import Section from '@/components/layout/section'
import React from 'react'
import Image from 'next/image'
import styles from '@/styles/Setting.module.css'
import { IoSearchOutline } from "react-icons/io5";
import SearchBar from '@/components/common/search-bar'
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

const FilterOptions = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* '付款成功'視窗:外框 */}
      <div style={{
        width: '491px',
        height: '436px',
        backgroundColor: '#fff',
        borderRadius: '20px'
      }}>

        <ImCross style={{
          marginTop: '25px',
          marginLeft: '450px',
          color: 'rgb(163, 44, 45)',
          fontSize: '22px',
          fontWeight: '100'
        }} />

        <div className={styles.filterTitle}>距離</div>
        <div style={{ display: 'flex' }}>

          <div style={{display:'flex',marginTop:'10px'}}>
            <div className={styles.filterCircle} style={{marginTop:'3px',marginLeft:'30px'}}></div>
             <div className={styles.filterText} style={{marginLeft:'5px'}}>走路10分鐘內</div>
           </div>
         
         
           <div style={{display:'flex',marginTop:'10px'}}>
            <div className={styles.filterCircle} style={{marginTop:'3px',marginLeft:'30px'}}></div>
             <div className={styles.filterText} style={{marginLeft:'5px'}}>走路10分鐘內</div>
           </div>
           
          <div style={{display:'flex',marginTop:'10px'}}>
            <div className={styles.filterCircle} style={{marginTop:'3px',marginLeft:'30px'}}></div>
             <div className={styles.filterText} style={{marginLeft:'5px'}}>走路10分鐘內</div>
           </div>

        </div>

        <div className={styles.filterTitle}>評分</div>
        <div style={{ display: 'flex' }}>
         
        <div style={{display:'flex',marginTop:'10px'}}>
          <div className={styles.filterCircle} style={{marginTop:'3px',marginLeft:'30px'}}></div>
            <div className={styles.filterText} style={{marginLeft:'5px'}}>4.5分以上</div>
        </div>

        <div style={{display:'flex',marginTop:'10px'}}>
          <div className={styles.filterCircle} style={{marginTop:'3px',marginLeft:'30px'}}></div>
            <div className={styles.filterText} style={{marginLeft:'5px'}}>4.5分以上</div>
        </div>

        <div style={{display:'flex',marginTop:'10px'}}>
          <div className={styles.filterCircle} style={{marginTop:'3px',marginLeft:'30px'}}></div>
            <div className={styles.filterText} style={{marginLeft:'5px'}}>4.5分以上</div>
        </div>


        </div>

        <div className={styles.filterTitle}>價格</div>
        <div style={{ display: 'flex' }}>
         <div style={{display:'flex',marginTop:'10px'}}>
            <div className={styles.filterCircle} style={{marginTop:'3px',marginLeft:'30px'}}></div>
              <div className={styles.filterText} style={{marginLeft:'5px'}}>$50以上</div>
         </div>

         <div style={{display:'flex',marginTop:'10px'}}>
            <div className={styles.filterCircle} style={{marginTop:'3px',marginLeft:'30px'}}></div>
              <div className={styles.filterText} style={{marginLeft:'5px'}}>$50以上</div>
         </div>

         <div style={{display:'flex',marginTop:'10px'}}>
            <div className={styles.filterCircle} style={{marginTop:'3px',marginLeft:'30px'}}></div>
              <div className={styles.filterText} style={{marginLeft:'5px'}}>$50以上</div>
         </div>

         <div style={{display:'flex',marginTop:'10px'}}>
            <div className={styles.filterCircle} style={{marginTop:'3px',marginLeft:'30px'}}></div>
              <div className={styles.filterText} style={{marginLeft:'5px'}}>$50以上</div>
         </div>


        </div>

        {/* '重設 套用'按鈕 */}
        <div style={{ display: 'flex', marginTop: '40px', marginLeft: '140px' }}>
          <div className={styles.wbButton} style={{ width: '92px', height: '32px', paddingTop: '3px' }}>重設</div>
          <div className={styles.rbButton} style={{ width: '92px', height: '32px', paddingTop: '3px', marginLeft: '20px' }}>套用</div>
        </div>

      </div>
    </div>
  );
};


export default function ProductFilter() {
    return(
        <>
            <Section>
          
            <FilterOptions />

            </Section>
            </>
            )
}