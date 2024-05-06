import React from 'react'
import styles from '@/styles/Product.module.css'
import { ImCross } from 'react-icons/im'
import { RxCross1 } from 'react-icons/rx'
import { IoIosArrowDown } from 'react-icons/io'

export default function FilterOptions() {
  return (
    <div className={styles.div}>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#filterModal"
        className={`btn btn-primary ${styles.filterConditionButton}`}
      >
        <div className={styles.filterConditionText}>篩選條件 </div>
        <IoIosArrowDown className={styles.filterIcon} />
      </button>

      <div className={`modal-wrapper `} id="filterModalWrapper">
        <div
          className={`modal fade ${styles.modalLocation}`}
          id="filterModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="filterModalLabel"
          aria-hidden="true"
        >
          <div
            className={`modal-dialog modal-dialog-centered ${styles.filterModalSize}`}
          >
            <div className="modal-content">
              <div className="modal-body body">
                <div className={styles.filterContainer}>
                  {/* '商品篩選'視窗:外框 */}

                  <ImCross
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    style={{ color: '#A32C2D' }}
                    className={`btn-close ${styles.filterCross}`}
                  />
                  {/* <ImCross className={styles.filterCross} /> */}

                  <div className={styles.filterTitle}>評分</div>

                  <div className="container">
                    <div className="d-flex">
                      <div className={styles.filterCircle}></div>
                      <div className={styles.filterText}>3.5分以上</div>

                      <div className={styles.filterCircle}></div>
                      <div className={styles.filterText}>4分以上</div>

                      <div className={styles.filterCircle}></div>
                      <div className={styles.filterText}>4.5分以上</div>
                    </div>
                  </div>

                  <div className={styles.filterTitle}>價格</div>

                  <div className="container">
                    <div className="d-flex">
                      <div className={styles.filterCircle}></div>
                      <div className={styles.filterText}>$50以下</div>

                      <div className={styles.filterCircle}></div>
                      <div className={styles.filterText}>$100以下</div>

                      <div className={styles.filterCircle}></div>
                      <div className={styles.filterText}>$150以下</div>

                      <div className={styles.filterCircle}></div>
                      <div className={styles.filterText}>$200以下</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="qrcode-footer text-center mb-5 mt-5">
                <button
                  className={styles.filterButton}
                  style={{
                    color: ' #A32C2D',
                    backgroundColor: '#fff',
                    border: 'solid 2px #A32C2D',
                  }}
                >
                  重設
                </button>

                <button
                  className={styles.filterButton}
                  style={{
                    color: '#fff',
                    backgroundColor: ' #A32C2D',
                    border: 'none',
                    marginLeft: '20px',
                  }}
                >
                  套用
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
