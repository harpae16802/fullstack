import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ReplyModal({ show, onHide, commentId, submitReply }) {
  const [reply, setReply] = useState('');

  const handleSubmit = () => {
    submitReply(commentId, reply);
    setReply('');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>回覆評論</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>回覆內容</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="輸入回復..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>取消</Button>
        <Button variant="primary" onClick={handleSubmit}>回覆評論</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReplyModal;
