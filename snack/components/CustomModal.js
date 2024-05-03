import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const CustomModal = ({ show, onClose, title, body }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          關閉
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomModal
