import React, { useState } from 'react'
import styles from '@/styles/Product.module.css'
import ReactDOM from 'react-dom'
import Image from 'next/image'
import { RxCross1 } from 'react-icons/rx'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

// useState
import Modal from 'react-modal'
export default function Card({ product }) {
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [isFavorite, setIsFavorite] = useState(false) // 最愛
  const toggleFavoriteProducts = async () => {
    try {
      const r = await fetch(`${FAVORITE_PRODUCTS}/${product_id}`)
      const data = await r.json()
      if (data.success) {
        setIsFavorite(data.action === 'add')
      }
    } catch (error) {
      console.error('加入最愛 錯誤:', error)
    }
  }
  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <button onClick={openModal} style={{ width: '300px' }}>
        Open Modal
      </button>
      <>
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
          >
            <>
              <div>
                <>
                  <div
                    className="modal fade"
                    id="detailModal"
                    tabindex="-1"
                    aria-labelledby="detailModalLabel"
                    aria-hidden="true"
                  >
                    <div className={`modal-dialog ${styles.detailModalSize}`}>
                      <div className="modal-content">
                        <div className="modal-body">
                          <div className={styles.detailContainer}>
                            {/* 產品圖 */}
                            <Image
                              src={product.imageUrl}
                              width={759}
                              height={726}
                              className={styles.detailPic}
                              alt={product.imageUrl}
                            />

                            <div className={styles.detailTextArray}>
                              {/* <RxCross1 className={styles.detailCrossIcon}/> */}
                              <RxCross1
                                type="button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                className={`btn-close ${styles.detailCrossIcon}`}
                              ></RxCross1>

                              {/* 店家名稱 */}
                              <div className={styles.detailSeller}>
                                {product.store_name}
                              </div>
                              {/* 產品名稱 */}
                              <div className={styles.detailProductName}>
                                {product.product_name}
                              </div>

                              {/* 產品描述 */}
                              <div className={styles.detailIntroduce}>
                                {product.product_description}
                              </div>
                              {/* 價格 */}
                              <div className={styles.detailPrice}>
                                ${product.price}
                              </div>

                              {/* '+ -'按鈕 */}
                              <div className={styles.detailNumber}>
                                <button className={styles.detailNumberButton}>
                                  -
                                </button>
                                <div className={styles.detailNumberShow}>1</div>
                                <button className={styles.detailNumberButton}>
                                  +
                                </button>
                              </div>

                              {/* 收藏 加入購物車 */}
                              <div
                                style={{
                                  display: 'flex',
                                  marginTop: '20px',
                                  marginLeft: '115px',
                                  color: '#A32C2D',
                                  fontSize: '30px',
                                }}
                              >
                                {/* 加入收藏 */}
                                {isFavorite ? (
                                  <FaHeart
                                    className={styles.collectIcon}
                                    onClick={toggleFavoriteProducts}
                                  />
                                ) : (
                                  <FaRegHeart
                                    className={styles.collectIcon}
                                    onClick={toggleFavoriteProducts}
                                  />
                                )}

                                <button className={styles.addCartButton}>
                                  加入購物車
                                </button>
                                <button className={styles.immediateBuyButton}>
                                  立即購買
                                </button>
                              </div>
                              {/* // 手風琴:營養成分表 */}
                              <div
                                className={`accordion accordion-flush ${styles.detailAccordionPosition}`}
                                id="accordionFlushExample"
                              >
                                <div className="accordion-item">
                                  <h2
                                    className="accordion-header"
                                    id="flush-headingOne"
                                  >
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapseOne"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseOne"
                                    >
                                      成分 :
                                    </button>
                                  </h2>
                                  <div
                                    id="flush-collapseOne"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="flush-headingOne"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div
                                      className={`accordion-body ${styles.detailIngredient}`}
                                    >
                                      {product.product_ingredient}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* 營養成分表 */}
                              <div
                                className="accordion accordion-flush"
                                id="accordionFlushExample"
                              >
                                <div className="accordion-item">
                                  <h2
                                    className="accordion-header"
                                    id="flush-headingTwo"
                                  >
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapseTwo"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseTwo"
                                    >
                                      營養成分:
                                    </button>
                                  </h2>
                                  <div
                                    id="flush-collapseTwo"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="flush-headingTwo"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div
                                      className={`accordion-body ${styles.nutritionIngredient}`}
                                    >
                                      {product.product_nutrition}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* 下方按鈕 */}
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </>
          </Modal>
        </div>
      </>
    </>
  )
}
