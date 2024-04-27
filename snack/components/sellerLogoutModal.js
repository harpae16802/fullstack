import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const LogoutModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>登出成功</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        您已成功登出。
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          關閉
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
