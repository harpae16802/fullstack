import React, { useState, useCallback } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import styles from '../styles/navbar-seller.module.scss';

function ReplyModal({ show, onHide, commentId, submitReply, commentContent }) {
  const [reply, setReply] = useState('');
  const [showAlert, setShowAlert] = useState(false);  

  const handleSubmit = useCallback(() => {
    if (reply.trim() === '') {
      setShowAlert(true);  
      return;
    }
    submitReply(commentId, reply);
    setReply('');
    onHide();
  }, [commentId, reply, submitReply, onHide]);

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>回覆評論</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAlert && (
            <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
              您還沒有輸入內容唷
            </Alert>
          )}
          <div>
            <p><strong>評論內容:</strong></p>
            <p>{commentContent}</p>
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>回覆内容</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                maxLength={1000}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="输入回覆(最大限制1000字)..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            取消
          </Button>
          <Button variant="primary" className={styles.btnPrimary} onClick={handleSubmit}>
            回覆評論
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReplyModal;
