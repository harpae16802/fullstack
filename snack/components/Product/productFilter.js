import React from 'react'
import styles from '@/styles/Product.module.css'
import { ImCross } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";


const FilterOptions = () => {
    return (
    <>


<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  看更多
</button>

<div class="modal fade " id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog">
        <div class="modal-content">
         
              <div class="modal-body body">
                        
                <div className={styles.filterContainer}>

{/* '商品篩選'視窗:外框 */}


<ImCross type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{color: '#A32C2D'}}  className={styles.filterCross}
/>
{/* <ImCross className={styles.filterCross} /> */}

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
  
    </div>
           </div>
           
              <div class="qrcode-footer text-center mb-5 mt-5">

               <button className={styles.filterButton} style={{color:' #A32C2D', backgroundColor:'#fff', border:'solid 2px #A32C2D'}}>重設</button>

              <button className={styles.filterButton} style={{color:'#fff',backgroundColor:' #A32C2D',border:'none', marginLeft:'20px' }}>套用</button>
          
                        </div>
                    </div>
                </div>
            </div>




    </>

    );
  };

export default FilterOptions;





