// // pages/order/orderStep1.js 總結帳頁面

import Section from '@/components/layout/section'
import React, { createContext, useContext, useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '@/styles/Order.module.css'
import OrderDetailItem from '@/components/Order/order1Seller'
import DiscountContentItem from '@/components/Order/addPurchaseProduct'
import { useAuth } from '@/contexts/custom-context'
import CheckoutProduct from '@/components/Order/checkoutProduct'
import { Modal, Button } from 'react-bootstrap'


export default function Order() {
  const { auth } = useAuth();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [groupedItems, setGroupedItems] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [chosenSeller, setChosenSeller] = useState(null);
  const [chosenItems, setChosenItems] = useState([]);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (selectedSeller) {
      setSelectedItems(groupedItems[selectedSeller]);
    }
    console.log('當前進度', step);
    console.log('選則的項目', selectedItems);
  }, [selectedSeller, groupedItems]);

  const handleSelectSeller = (seller, items) => {
    if (items.length > 0) {
      setChosenSeller(seller);
      setChosenItems(items);
      localStorage.setItem('selectedItems', JSON.stringify(items));
    }
  };

  const handleNext = () => {
    console.log('Selected Seller: ', chosenSeller);
    console.log('Selected Items: ', chosenItems);
    if (!chosenSeller || chosenItems.length === 0) {
      setShowAlertModal(true);
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };


  return (
    <>
      <Section>
        <div className={styles.outerFrame}>
          <div className={styles.orderTitle}>【 結帳頁面 】</div>
          {/* <div className={styles.stepBorder}> */}
          <div className={styles.stepContainer}>
            <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>1</div>
            <div className={`${styles.connector} ${step >= 2 ? styles.active : ''}`}></div>
            <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>2</div>
            <div className={`${styles.connector} ${step >= 3 ? styles.active : ''}`}></div>
            <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>3</div>
          </div>
          <div className={styles.textContainer}>
            <div className={`${styles.stepText} ${step >= 1 ? styles.active : ''}`}>訂單資訊</div>
            <div className={`${styles.stepText} ${step >= 2 ? styles.active : ''}`}>訂單優惠</div>
            <div className={`${styles.stepText} ${step >= 3 ? styles.active : ''}`}>完成</div>
          </div>
          {/* </div> */}
          
          <div className={styles.orderBorder}>
            <div className={`mt-5 ${styles}`}>
              {step === 1 && (
                <OrderDetailItem
                  onSelectSeller={handleSelectSeller}
                  onGroupedItemsChange={setGroupedItems}
                  setSelectedItems={setSelectedItems}
                />
              )}
            </div>
            <br />
            <div className={styles}>
              {step === 2 && <DiscountContentItem items={selectedItems} />}
            </div>
            <br />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
            {step !== 1 && (
              <div className={styles.previousButton} onClick={handleBack}>
                上一步
              </div>
            )}
            {step !== 2 && (
              <div className={styles.nextButton} onClick={handleNext} style={{ cursor: 'pointer' }}>
                下一步
              </div>
            )}
          </div>
          <br />
        </div>
        {showAlertModal && (
          <Modal show={showAlertModal} onHide={() => setShowAlertModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>提示</Modal.Title>
            </Modal.Header>
            <Modal.Body>您還沒有選擇任何商品結帳喔~</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setShowAlertModal(false)}>
                關閉
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Section>
    </>
  );
}
