import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

function ReplyModal({ show, onHide, commentId, submitReply ,commentContent}) {
  const [reply, setReply] = useState('')

  const handleSubmit = () => {
    submitReply(commentId, reply)
    setReply('')
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide}>
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
        <Button variant="secondary" onClick={onHide}>
          取消
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          回覆評論
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ReplyModal
