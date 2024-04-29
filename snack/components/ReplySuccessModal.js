import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import styles from '../styles/navbar-seller.module.scss'
function ReplySuccessModal({ show, onHide }) {
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>回覆成功</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        回覆已經提交
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className={styles.btnPrimary} onClick={onHide}>
            確定
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  
export default ReplySuccessModal
