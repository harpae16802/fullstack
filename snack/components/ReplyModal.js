import React, { useState } from 'react'
import styles from '../styles/navbar-seller.module.scss'
import { Modal, Button, Form } from 'react-bootstrap'


function ReplyModal({ show, onHide, commentId, submitReply ,commentContent}) {
  const [reply, setReply] = useState('')

  const handleSubmit = () => {
    if (reply.trim() === '') {
      // 如果回复内容为空，则不执行提交回复的操作
      return;
    }
    submitReply(commentId, reply);
    setReply('');
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>回覆評論</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>
            <strong>評論內容：</strong>
          </p>
          <p>{commentContent}</p>
        </div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>回覆內容</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              maxLength={1000} 
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="輸入回復(最大限制1000字)..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className={styles.btnSecondary}  onClick={onHide}>
          取消
        </Button>
        <Button variant="primary"  className={styles.btnPrimary} onClick={handleSubmit}>
          回覆評論
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ReplyModal
