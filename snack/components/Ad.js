import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Ad() {
  const [showModal, setShowModal] = useState(false);
  const [reply, setReply] = useState('');

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleSubmit = () => {
    console.log('回复内容：', reply);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        显示广告上传成功
      </Button>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>上传成功</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>您的广告已成功上传！</p>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            回复评论
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Ad;
